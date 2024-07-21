import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store/store";
import { getUsers } from "../api/api";

export interface IUsers {
  name: string;
  surname: string;
  email: string;
  status: boolean;
  phone: string;
  city: string;
  id: string;
}

export interface IFormErrors {
  name: string;
  surname: string;
  email: string;
  phone: string;
  city: string;
}

// Define a type for the slice state
export interface IUsersState {
  users: IUsers[];
  loadingUsers: boolean;
  formErrors: IFormErrors;
  loadingAddUser: boolean;
}

export interface TableUsersProps {
  loadingUsers: boolean;
  users: IUsers[];
}

// Define the initial state using that type
const initialState: IUsersState = {
  users: [],
  loadingUsers: false,
  formErrors: {
    name: "",
    surname: "",
    email: "",
    phone: "",
    city: "",
  },
  loadingAddUser: false,
};

export const usersSlice = createSlice({
  name: "usersState",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setLoadingAddUser(state: IUsersState, action: PayloadAction<boolean>) {
      state.loadingAddUser = action.payload;
    },
    validUser(state: IUsersState, {payload}: PayloadAction<IUsers>) {
      if (payload.phone.length > 9) {
        state.formErrors.phone = "Number phone must be 9 numbers"
      }


    }
  },
  extraReducers(builder) {
    builder
      .addCase(getUsers.pending, (state: IUsersState) => {
        state.loadingUsers = true;
      })
      .addCase(
        getUsers.fulfilled,
        (state: IUsersState, action: PayloadAction<IUsers[]>) => {
          state.loadingUsers = false;
          state.users = action.payload;
        }
      )
      .addCase(getUsers.rejected, (state: IUsersState) => {
        state.loadingUsers = false;
      });
  },
});

export const {setLoadingAddUser, validUser} = usersSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state.usersState;
export default usersSlice.reducer;
