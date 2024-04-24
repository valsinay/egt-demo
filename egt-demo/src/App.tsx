import React, { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { Users, Tasks, UserPosts, NavBar, NotFound } from "./components";
import { fetchUsers } from "./features/user/usersSlice";
import { useAppDispatch } from "./store/store";
import styles from './styles/common.module.scss'

export const App = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  return (
    <>
    <BrowserRouter>
        <NavBar />
    <div className={styles.main_container}>
        <Routes>
          <Route path={"/"} element={<Users />} />
          <Route path={"/posts/:userId"} element={<UserPosts />} />
          <Route path={"/tasks"} element={<Tasks />} />
          <Route path={"*"} element={<NotFound />} />
        </Routes>
    </div>
      </BrowserRouter>
      <ToastContainer />
    </>
  );
};
