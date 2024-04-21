import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { User } from "../../interfaces/index";
import { notify } from "../../utils/toast";

interface UserState {
  users: User[];
  status: string;
  error: string | null;
}

const initialState: UserState = {
  users: [],
  status: "",
  error: null,
};

export const fetchUsers = createAsyncThunk("users/fetch", async (thunkAPI) => {
  const response = await axios.get(`${process.env.REACT_APP_API_URL}/users`);
  return response.data;
});

export const usersSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    editUser: (state: UserState, action: PayloadAction<User>) => {
      const updatedUser = action.payload;
      const index = state.users.findIndex((user) => user.id === updatedUser.id);

      if (index !== -1) {
        state.users[index] = updatedUser;
        notify("success", `User ${updatedUser.name} has been edited successfully!`);
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state: UserState, action) => {
        state.status = "pending";
      })
      .addCase(fetchUsers.fulfilled, (state: UserState, action) => {
        state.users = action.payload;
        state.status = "success";
        state.error = null;
      })
      .addCase(fetchUsers.rejected, (state: UserState, action) => {
        state.status = "failed";
        state.error = "Failed to fetch users";
      });
  },
});

export const { editUser } = usersSlice.actions;
export default usersSlice.reducer;
