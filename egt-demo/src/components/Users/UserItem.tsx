import { useEffect, useState } from "react";
import { Button, Col, Form, Input, Row, Space } from "antd";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../store/store";
import { User, UserFormValues } from "../../interfaces/index";
import { editUser } from "../../features/user/usersSlice";

interface UserFormItemProps {
  user: User;
  isUserPostsLayout?: boolean;
}

export const UserItem = ({
  user,
  isUserPostsLayout = false,
}: UserFormItemProps) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [isEditDisabled, setIsdEditDisabled] = useState<boolean>(true);
  const [isFormDataChanged, setIsFormDataChanged] = useState<boolean>(false);

  const [form] = Form.useForm();
  const values = Form.useWatch([], form);

  const {
    id,
    name,
    username,
    phone,
    email,
    address: { street, city, suite },
  } = user;

  const initialValue: UserFormValues = {
    name,
    phone,
    email,
    street,
    suite,
    city,
    username,
  };

  useEffect(() => {
    form.setFieldsValue(initialValue);
  }, []);

  useEffect(() => {
    form.validateFields({ validateOnly: true }).then(
      () => {
        setIsdEditDisabled(true);
      },
      () => {
        setIsdEditDisabled(false);
      }
    );
  }, [values]);

  const onReset = () => {
    setIsFormDataChanged(false);
    form.setFieldsValue(initialValue);
  };

  const handleSaveChangesBtnClick = (data: UserFormValues) => {
    const { name, email, phone, street, username, suite, city } = data;

    const updatedUser = {
      ...user,
      name,
      username,
      phone,
      email,
      address: {
        ...user.address,
        city,
        suite,
        street,
      },
    };
    dispatch(editUser(updatedUser));
    setIsFormDataChanged(false);
  };

  return (
    <Form
      labelAlign="left"
      layout="vertical"
      labelWrap
      wrapperCol={{ flex: 1 }}
      colon={false}
      form={form}
      onFinish={handleSaveChangesBtnClick}
      onValuesChange={() => setIsFormDataChanged(true)}
    >
      <Row gutter={32}>
        <Col>
          <Form.Item label="Name" name="name">
            <Input />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[{ type: "email", required: true }]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col>
          <Form.Item
            label="Username"
            name="username"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item label="Phone" name="phone">
            <Input />
          </Form.Item>
        </Col>
        <Col>
          <Form.Item
            label="City"
            name="city"
            rules={[
              {
                required: true,
                whitespace: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Street"
            name="street"
            rules={[
              {
                required: true,
                whitespace: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col>
          <Form.Item
            label="Suite"
            name="suite"
            rules={[
              {
                required: true,
                whitespace: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Col>
      </Row>
      <Form.Item>
        <Space>
          {!isUserPostsLayout && (
            <Button
              type="default"
              htmlType="button"
              onClick={() => navigate(`posts/${id}`)}
            >
              See All Posts
            </Button>
          )}
          <Button
            type="default"
            htmlType="button"
            onClick={onReset}
            disabled={!isFormDataChanged}
          >
            Reset
          </Button>
          <Button
            type="primary"
            htmlType="submit"
            disabled={!isEditDisabled || !isFormDataChanged}
          >
            Save Changes
          </Button>
        </Space>
      </Form.Item>
    </Form>
  );
};
