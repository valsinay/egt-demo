import { Empty } from 'antd';
import styles from '../styles/common.module.scss';

interface EmptyStateProps {
    description?:string
}
export const EmptyState = ({description}:EmptyStateProps) => <Empty description={description} className={styles['ant-empty']} />;

