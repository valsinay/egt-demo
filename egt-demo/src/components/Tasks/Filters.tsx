import { useEffect, useState } from "react";
import { useAppSelector } from "../../store/store";
import styles from '../../styles/filters.module.scss'

export interface FilterProps {
  title?: string;
  userId?: number;
  completed?: boolean;
}

interface TasksFilterProps {
    setFilters: (filters: FilterProps) => void;
}
export const Filters = ({setFilters}: TasksFilterProps) => {
    const [title, setTitle] = useState<string>('');
    const [completed, setCompleted] = useState<string>('all');
    const [userId, setUserId] = useState<string>('all');
    const users = useAppSelector((state) => state.user.users);

    useEffect(() => {
        handleFilterChange()
    }, [title, userId, completed])

    const clearFilters = () => {
      setCompleted("all")
      setUserId("all")
      setTitle("")
    };
    
    const handleFilterChange = () => {
        setFilters({
            title: title ? title : undefined,
            completed: completed !== 'all' ? completed === 'true' : undefined,
            userId: userId !== 'all' ? parseInt(userId) : undefined
        });
    };

    return (
      <div className={styles.wrapper}>
        <input
          placeholder="Filter by title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <select
          value={completed}
          onChange={(e) => setCompleted(e.target.value)}
        >
          <option value="all">All Statuses</option>
          <option value="true">Done</option>
          <option value="false">Undone</option>
        </select>
        <select
          value={userId}
          onChange={(e) => {
            setUserId(e.target.value);
          }}
        >
          <option value="all">All Users</option>
          {users.map((user) => (
            <option key={user.id} value={user.id}>
              {user.name}
            </option>
          ))}
        </select>
        <button className={styles.clearBtn} onClick={clearFilters}>
          Clear
        </button>
      </div>
    );
};
