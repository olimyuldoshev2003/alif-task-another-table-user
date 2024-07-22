import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store/store";
import { getUsers, postUser } from "../api/api";

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
  firstName: string;
  lastName: string;
  email: string;
  status: string;
  phone: string;
  city: string;
  modalAdd: boolean;
  savedUsers: IUsers;
  loadingUsers: boolean;
  formErrors: IFormErrors;
  isCorrectForm: boolean;
  loadingAddUser: boolean;
}

export interface TableUsersProps {
  loadingUsers: boolean;
  users: IUsers[];
}

// Define the initial state using that type
const initialState: IUsersState = {
  users: [],
  firstName: "",
  lastName: "",
  email: "",
  status: "",
  phone: "",
  city: "",
  modalAdd: false,
  savedUsers: {
    name: "",
    surname: "",
    email: "",
    status: false,
    city: "",
    phone: "",
    id: "",
  },
  loadingUsers: false,
  formErrors: {
    name: "",
    surname: "",
    email: "",
    phone: "",
    city: "",
  },
  isCorrectForm: false,
  loadingAddUser: false,
};

export const usersSlice = createSlice({
  name: "usersState",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setFirstName(state: IUsersState, action: PayloadAction<string>) {
      state.firstName = action.payload;
    },
    setLastName(state: IUsersState, action: PayloadAction<string>) {
      state.lastName = action.payload;
    },
    setEmail(state: IUsersState, action: PayloadAction<string>) {
      state.email = action.payload;
    },
    setStatus(state: IUsersState, action: PayloadAction<string>) {
      state.status = action.payload;
    },
    setPhone(state: IUsersState, action: PayloadAction<string>) {
      state.phone = action.payload;
    },
    setCity(state: IUsersState, action: PayloadAction<string>) {
      state.city = action.payload;
    },
    setModalAdd(state: IUsersState, action: PayloadAction<boolean>) {
      state.modalAdd = action.payload;
    },
    setLoadingAddUser(state: IUsersState, action: PayloadAction<boolean>) {
      state.loadingAddUser = action.payload;
    },
    validUser(state: IUsersState, { payload }: PayloadAction<IUsers>) {
      const { email, city, name, surname, phone } = payload;
      if (
        name.trim() === "" ||
        surname.trim() === "" ||
        email.trim() === "" ||
        city.trim() === "" ||
        phone.trim() === ""
      ) {
        alert("Please field all of this fields out");
      } else {
        if (!email || !isValidEmail(email)) {
          state.formErrors.email = "Please enter a valid email address";
        } else {
          state.formErrors.email = "";
        }

        if (!phone || !isValidTajikPhoneNumber(phone)) {
          state.formErrors.phone = "Please enter a valid email address";
        } else {
          state.formErrors.phone = "";
        }

        if (
          email &&
          isValidEmail(email) &&
          phone &&
          isValidTajikPhoneNumber(phone)
        ) {
          state.loadingAddUser = true;
          state.savedUsers = payload;
            // state.modalAdd = false
          // setTimeout(() => {
          //   state.loadingAddUser = false;
          // }, 3000)
          state.isCorrectForm = true;
          state.firstName = "";
          state.lastName = "";
          state.email = "";
          state.status = "false";
          state.phone = "";
          state.city = "";
          
          state.formErrors.name = ""
          state.formErrors.surname = ""
          state.formErrors.email = ""
          state.formErrors.city = ""
          state.formErrors.phone = ""
        }
      }
    },
    setIsCorrectForm(state: IUsersState, action: PayloadAction<boolean>) {
      state.isCorrectForm = action.payload;
    },
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
      })
      .addCase(postUser.pending, (state: IUsersState) => {
        state.loadingAddUser = true;
      })
      .addCase(postUser.fulfilled, (state: IUsersState) => {
        setTimeout(() => {
          state.loadingAddUser = false;
          state.modalAdd = false
        }, 1000);
      })
      .addCase(postUser.rejected, (state: IUsersState) => {
        setTimeout(() => {
          state.loadingAddUser = false;
          state.modalAdd = false
        }, 1000);
      });
  },
});

const isValidEmail = (email: string): boolean => {
  const emailRegex: RegExp = /\S+@\S+\.\S+/;
  const trimmedEmail: string = email.trim(); // Remove leading and trailing whitespace
  return emailRegex.test(trimmedEmail);
};

const isValidTajikPhoneNumber = (phone: string): boolean => {
  const phoneRegex: RegExp = /^\992\d{9}$/;
  const trimmedPhone: string = phone.trim(); // Remove leading and trailing whitespace
  return phoneRegex.test(trimmedPhone);
};

export const {
  setModalAdd,
  setLoadingAddUser,
  validUser,
  setIsCorrectForm,
  setFirstName,
  setLastName,
  setEmail,
  setStatus,
  setPhone,
  setCity,
} = usersSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state.usersState;
export default usersSlice.reducer;
