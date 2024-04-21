import React, { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { Users } from "./components/Users/Users";
import { fetchUsers } from "./features/user/usersSlice";
import { useAppDispatch } from "./store/store";
import { NavBar } from "./components/NavBar";
import { UserPosts } from "./components/Posts/UserPosts";

export const App = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  return (
    <>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path={"/"} element={<Users />} />
          <Route path={"/posts/:userId"} element={<UserPosts />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </>
  );
};
