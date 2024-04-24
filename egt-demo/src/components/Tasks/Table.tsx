import { useEffect } from "react";
import { Button, Pagination } from "antd";
import { CheckCircleTwoTone, CloseCircleTwoTone } from "@ant-design/icons";
import styles from "../../styles/table.module.scss";
import { Task } from "../../interfaces";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { toggleStatusChange } from "../../features/tasks/tasksSlice";

interface TableProps {
  filteredTasks: Task[];
  currentPage: number;
  setCurrentPage: (page: number) => void;
}

export const Table = ({filteredTasks, currentPage, setCurrentPage}: TableProps) => {
  const dispatch = useAppDispatch();
  const tasksPerPage = 10;

  const users = useAppSelector((state) => state.user.users);
  const totalPages = Math.ceil(filteredTasks.length / tasksPerPage);

  const lastPostIndex = currentPage * tasksPerPage;
  const firstPostIndex = lastPostIndex - tasksPerPage;
  const currentPosts = filteredTasks.slice(firstPostIndex, lastPostIndex);

  useEffect(() => {
    if (currentPage > totalPages && totalPages !== 0) {
        setCurrentPage(totalPages);
    }
}, [filteredTasks.length]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className={styles.wrapper}>
      <table className={styles.table}>
        <thead>
          <tr className={styles.row_header}>
            <th className={styles.cell}>Id</th>
            <th className={styles.cell}>Title</th>
            <th className={styles.cell}>Owner</th>
            <th className={styles.cell}>Status</th>
            <th className={styles.cell}>Change Status</th>
          </tr>
        </thead>
        <tbody>
          {currentPosts.map((task: Task) => {
            const user = users.find((user) => user.id === task.userId);

            return (
              <tr className={styles.row} key={task.id}>
                <td className={styles.cell} data-title="Id">
                  {task.id}
                </td>
                <td className={styles.cell} data-title="Title">
                  {task.title}
                </td>
                <td className={styles.cell} data-title="Owner">
                  {user?.name}
                </td>
                <td className={styles.cell} data-title="Status">
                  {task.completed ? (
                    <CheckCircleTwoTone
                      className={styles.icon}
                      twoToneColor="#52c41a"
                    />
                  ) : (
                    <CloseCircleTwoTone
                      className={styles.icon}
                      twoToneColor="red"
                    />
                  )}
                </td>
                <td className={styles.cell} data-title="Change Status">
                  <Button
                    className={styles.btn}
                    onClick={() => dispatch(toggleStatusChange(task))}
                  >
                    Mark as {`${task.completed ? "Undone" : "Done"}`}
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <Pagination
        defaultCurrent={1}
        current={currentPage}
        total={filteredTasks.length}
        pageSize={tasksPerPage}
        onChange={handlePageChange}
        responsive
        hideOnSinglePage
        showLessItems
        showSizeChanger={false}
        className={styles["ant-pagination"]}
      />
    </div>
  );
};
