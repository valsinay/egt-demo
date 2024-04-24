import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { notify } from "../../utils/toast";
import { fetchTasks } from "../../features/tasks/tasksSlice";
import { Table } from "./Table";
import { Loader, EmptyState } from "../../shared";
import { FilterProps, Filters } from "./Filters";
import { Task } from "../../interfaces";

export const Tasks = () => {
  const dispatch = useAppDispatch();
  const tasks = useAppSelector((state) => state.task.tasks);
  const status = useAppSelector((state) => state.task.status);
  const error = useAppSelector((state) => state.task.error);

  const [filters, setFilters] = useState<FilterProps>({});
  const [filteredTasks, setFilteredTasks] = useState<Task[]>(tasks);
  const [currentPage, setCurrentPage] = useState<number>(1);

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  useEffect(() => {
    if (status === "failed" && error) {
      notify("error", error);
    }
  }, [status, error]);

  useEffect(() => {
    handleFilterChange();
  }, [tasks, filters, currentPage]);

  const handleFilterChange = () => {
    let newFilteredTasks = [...tasks];
    if (filters.title) {
      newFilteredTasks = newFilteredTasks.filter((task) =>
        task.title.includes(filters.title!)
      );
    }
    if (typeof filters.completed !== "undefined") {
      newFilteredTasks = newFilteredTasks.filter(
        (task) => task.completed === filters.completed
      );
    }
    if (filters.userId) {
      newFilteredTasks = newFilteredTasks.filter(
        (task) => task.userId === filters.userId
      );
    }
    setFilteredTasks(newFilteredTasks);
    setCurrentPage(1);
  };

  if (status === "pending") return <Loader />;
  if (!tasks.length) return <EmptyState />;

  return (
    <>
      <Filters setFilters={setFilters} />
      <Table filteredTasks={filteredTasks} currentPage={currentPage} setCurrentPage={setCurrentPage}/>
    </>
  );
};
