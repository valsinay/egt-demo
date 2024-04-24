import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import axios from "axios";
import { Task } from '../../interfaces/index';

interface TaskState {
    tasks: Task[];
    status: string;
    error: string | null;
}

const initialState: TaskState = {
    tasks: [],
    status: "",
    error: null
};

export const fetchTasks = createAsyncThunk(
    "tasks/fetch",
    async (thunkAPI) => {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/todos`);
        return response.data;
    },
);

export const TasksSlice = createSlice({
    name: "task",
    initialState,
    reducers: {
        toggleStatusChange: (state: TaskState, action: PayloadAction<Task>) => {
            const task = state.tasks.find((t: Task) => t.id === action.payload.id);
            if (task) {
                task.completed = !task.completed;
            }
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchTasks.pending, (state: TaskState, action) => {
                state.status = "pending";
            })
            .addCase(fetchTasks.fulfilled, (state: TaskState, action) => {
                state.status = "success";
                state.tasks = action.payload;
                state.error = null;
            })
            .addCase(fetchTasks.rejected, (state: TaskState, action) => {
                state.status = "failed";
                state.error = "Failed to fetch tasks"
            });
    },
});

export const {toggleStatusChange} = TasksSlice.actions;
export default TasksSlice.reducer;