import { Button, Result } from "antd";
import { useNavigate } from "react-router-dom";
import styles from '../../styles/common.module.scss'

export const NotFound = () => {
  const navigate = useNavigate();
  
return (
  <Result
    className={styles.not_found}
    status="404"
    title="404"
    subTitle="Sorry, the page you visited does not exist."
    extra={
      <Button
        type="primary"
        onClick={() => {
          navigate("/");
        }}
      >
        Back Home
      </Button>
    }
  />
);
};
