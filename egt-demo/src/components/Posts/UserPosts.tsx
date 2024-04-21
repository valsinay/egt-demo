import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { Typography } from "antd";
import { UserItem } from "../Users/UserItem";
import { useParams } from "react-router-dom";
import { EmptyState, Loader } from "../../shared";
import { User, Post } from "../../interfaces/index";
import { fetchPosts } from "../../features/posts/postsSlice";
import { UserPost } from "./UserPost";
import styled from "../../styles/posts.module.scss";

const { Title } = Typography;

export const UserPosts = () => {
  const { userId } = useParams();
  const dispatch = useAppDispatch();
  const users = useAppSelector((state) => state.user.users);
  const usersStatus = useAppSelector((state) => state.user.status);
  const posts = useAppSelector((state) => state.post.posts);
  const postsStatus = useAppSelector((state) => state.post.status);
  const currentUser = users.find((user: User) => user.id === Number(userId));

  useEffect(() => {
    if (userId) {
      dispatch(fetchPosts(userId));
    }
  }, [dispatch, userId]);

  if(usersStatus === "pending") return <Loader />;
  
  const Posts = () => {
    if (postsStatus === "pending") return <Loader />;
    if (!posts.length) return <EmptyState description="No user posts available" />;

    return (
      <>  
        <Title level={2}>{`${currentUser?.name}'s Posts`}</Title>
        <div  className={styled["posts-wrapper"]}>
          {posts.map((post: Post) => (
            <UserPost post={post} key={post.id} />
          ))}
        </div>
      </>
    );
  };

  return (
    <div className={styled["user-posts-wrapper"]}>
      <Title level={2}>{`User Details`}</Title>
      {currentUser && (
        <>
          <UserItem user={currentUser} isUserPostsLayout />
          <Posts />
        </>
      )}
    </div>
  );
};
