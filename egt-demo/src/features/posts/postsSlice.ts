import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { Post, EditPostProps } from "../../interfaces/index";
import { notify } from "../../utils/toast";

interface PostState {
  posts: Post[];
  status: string;
  error: string | null;
}

const initialState: PostState = {
  posts: [],
  status: "",
  error: null,
};

export const fetchPosts = createAsyncThunk(
  "posts/fetch",
  async (userId: string) => {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/posts?userId=${userId}`
    );
    return response.data;
  }
);

export const deletePost = createAsyncThunk(
  "post/deletePost",
  async (postId: string) => {
    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/posts/${postId}`);
      notify("success", `The post has been successfully deleted!`);
    } catch (error: any) {
      notify("error", `Something went wrong. Error: ${error.message}`);
    }
  }
);

export const editPost = createAsyncThunk(
  "post/editPost",
  async ({ id, data }: EditPostProps) => {
    try {
      await axios.put(`${process.env.REACT_APP_API_URL}/posts/${id}`, { data });
      notify(
        "success",
        `Post "${data.title}" has been successfully updated using the API`
      );
    } catch (error: any) {
      notify("error", `Something went wrong. Error: ${error.message}`);
    }
  }
);

export const postsSlice = createSlice({
  name: "post",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state: PostState, action) => {
        state.status = "pending";
      })
      .addCase(fetchPosts.fulfilled, (state: PostState, action) => {
        state.posts = action.payload;
        state.status = "success";
        state.error = null;
      })
      .addCase(fetchPosts.rejected, (state: PostState, action) => {
        state.status = "failed";
        state.error = "Failed to fetch posts";
      })
      .addCase(deletePost.pending, (state: PostState, action) => {
        state.status = "pending";
      })
      .addCase(deletePost.fulfilled, (state: PostState, action) => {
        state.status = "success";
        state.error = null;
      })
      .addCase(deletePost.rejected, (state: PostState, action) => {
        state.status = "failed";
        state.error = "Failed to delete post";
      });
  },
});

export default postsSlice.reducer;
