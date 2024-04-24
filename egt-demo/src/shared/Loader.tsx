import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import styles from "../styles/common.module.scss";

const icon = <LoadingOutlined style={{ fontSize: 72 }} spin />;

export const Loader = () => (
  <Spin
    indicator={icon}
    className={styles['ant-spin']}    
  />
);
