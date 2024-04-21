import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import styled from "../styles/common.module.scss";

const icon = <LoadingOutlined style={{ fontSize: 72 }} spin />;

export const Loader = () => (
  <Spin
    indicator={icon}
    className={styled['ant-spin']}    
  />
);
