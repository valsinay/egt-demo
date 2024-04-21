import { Empty } from 'antd';
import styled from '../styles/common.module.scss';

interface EmptyStateProps {
    description?:string
}
export const EmptyState = ({description}:EmptyStateProps) => <Empty description={description} className={styled['ant-empty']} />;

