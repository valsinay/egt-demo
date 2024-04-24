import React, { useEffect, useState } from "react";
import { Button, Form, Input, Modal, Typography } from "antd";
import { Post, PostItemValues } from "../../interfaces/index";
import styles from "../../styles/posts.module.scss";
import {
  deletePost,
  editPost,
  fetchPosts,
} from "../../features/posts/postsSlice";
import { useAppDispatch } from "../../store/store";
import { useParams } from "react-router-dom";

interface UserPostProps {
  post: Post;
}

const { Paragraph } = Typography;

export const UserPost = ({ post }: UserPostProps) => {
  const dispatch = useAppDispatch();
  const { userId } = useParams();
  const [form] = Form.useForm();
  const values = Form.useWatch([], form);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const [isFormDataChanged, setIsFormDataChanged] = useState<boolean>(false);
  const [disableSaveChanges, setDisableSaveChanges] = useState<boolean>(false);

  const { id, title, body } = post;

  const initialValues: PostItemValues = {
    title,
    body,
  };

  useEffect(() => {
    form.setFieldsValue(initialValues);
  }, []);

  useEffect(() => {
    form.validateFields({ validateOnly: true }).then(
      () => {
        setDisableSaveChanges(true);
      },
      () => {
        setDisableSaveChanges(false);
      }
    );
  }, [values]);

  const handleSaveChangesBtnClick = async () => {
    const { title, body } = values;
    await dispatch(editPost({ id, data: { title, body } }));

    if (userId) {
      dispatch(fetchPosts(userId));
    }
    setIsFormDataChanged(false);
  };

  const handleDelete = async () => {
    await dispatch(deletePost(id));
  };

  const onOk = async () => {
    await handleDelete();
    setIsDeleteModalOpen(false);
    if (userId) {
      dispatch(fetchPosts(userId));
    }
  };

  return (
    <>
      <Modal
        centered
        title="Delete Post"
        open={isDeleteModalOpen}
        onOk={onOk}
        onCancel={() => setIsDeleteModalOpen(false)}
        okText="Delete"
      >
        <Paragraph>Are you sure you want to delete this post?</Paragraph>
      </Modal>

      <div className={styles["post"]}>
        <Form
          layout="vertical"
          form={form}
          name={`post_id_${id}`}
          onValuesChange={() => setIsFormDataChanged(true)}
          onFinish={handleSaveChangesBtnClick}
        >
          <Form.Item
            label="Title"
            name="title"
            rules={[{ required: true, whitespace: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Body"
            name="body"
            rules={[{ required: true, whitespace: true }]}
          >
            <Input />
          </Form.Item>

          <Button
            type="primary"
            htmlType="submit"
            disabled={!disableSaveChanges || !isFormDataChanged}
            className={styles["submit-btn"]}
          >
            Save Changes
          </Button>
          <Button
            type="primary"
            danger
            onClick={() => setIsDeleteModalOpen(true)}
          >
            Delete
          </Button>
        </Form>
      </div>
    </>
  );
};
