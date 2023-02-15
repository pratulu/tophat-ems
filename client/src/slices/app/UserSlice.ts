import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import EMS_CLIENT from "../../api";
import { useGetAllUsersQuery } from "./ApiSlice";

const fetchAllUsers = createAsyncThunk("fetchUsers", async () => {
  const response = await EMS_CLIENT.get("all-users");
  console.log("RESPONSE grggrtj5j: ", response.data);
});
console.log("okhfiugeqrh8ihgiq43", { useGetAllUsersQuery });

const initialState: any = [];

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    addUsers: (state, action) => {
      state = state.push(...action.payload);
      fetchAllUsers();
    },
    newUsers: (state, action) => {
      state = [...state, action.payload];
    },
  },
});

export const { addUsers, newUsers } = usersSlice.actions;
export default usersSlice.reducer;
