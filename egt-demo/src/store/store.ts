import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import usersSlice from "../features/user/usersSlice";
import tasksSlice from "../features/tasks/tasksSlice";
import postsSlice from "../features/posts/postsSlice";

export const store = configureStore({
  reducer: {
    user: usersSlice,
    post: postsSlice,
    task: tasksSlice,
  },
});

type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
