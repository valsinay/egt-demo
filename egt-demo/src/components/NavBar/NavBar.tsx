import React, { useState } from "react";
import { Menu, MenuProps } from "antd";
import { useNavigate } from "react-router-dom";
import { CheckSquareOutlined, UserOutlined } from "@ant-design/icons";
import styles from "../../styles/common.module.scss";

type MenuKeys = "users" | "tasks";

export const NavBar = () => {
  const navigate = useNavigate();
  const [current, setCurrent] = useState<MenuKeys>("users");

  const items: MenuProps["items"] = [
    {
      icon: <UserOutlined />,
      label: "Users list",
      key: "users",
      onClick: () => {
        navigate("/");
        setCurrent("users");
      },
      className: styles["ant-menu-item"],
    },
    {
      icon: <CheckSquareOutlined />,
      label: "Tasks",
      key: "tasks",
      onClick: () => {
        navigate("/tasks");
        setCurrent("tasks");
      },
      className: styles["ant-menu-item"],
    },
  ];

  return (
    <header>
      <Menu
        className={styles["ant-menu"]}
        selectedKeys={[current]}
        items={items}
        mode="vertical"
      />
    </header>
  );
};
