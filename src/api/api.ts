import { AsyncThunk, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { IUsers } from "../reducers/usersState";

interface AsyncThunkConfig {}

type GetUsersThunk = AsyncThunk<IUsers[], void, AsyncThunkConfig>;

// Get Users
export const getUsers: GetUsersThunk = createAsyncThunk<IUsers[]>(
  "api/getUsers",
  async () => {
    try {
      const { data } = await axios.get<IUsers[]>(
        import.meta.env.VITE_API_USERS
      );
      return data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
);

export const postUser = createAsyncThunk(
  "api/postUser",
  async (user: IUsers, {dispatch}) => {
    try {
      const { data } = await axios.post(import.meta.env.VITE_API_USERS, user);
      
      dispatch(getUsers())
    } catch (error) {
      console.error("Error posting user:", error);
      throw error;
    }
  }
);

