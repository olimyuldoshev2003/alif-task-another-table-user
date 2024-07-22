import * as React from "react";
import Dialog from "@mui/material/Dialog";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import {
  IUsers,
  setCity,
  setEmail,
  setFirstName,
  setIsCorrectForm,
  setLastName,
  setLoadingAddUser,
  setModalAdd,
  setPhone,
  setStatus,
  validUser,
} from "../../reducers/usersState";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { postUser } from "../../api/api";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="down" ref={ref} {...props} />;
});

export default function AddUserModal() {
  const dispatch = useAppDispatch();

  //States from redux
  const loadingAddUser = useAppSelector(
    (state) => state.usersState.loadingAddUser
  );
  const formErrors = useAppSelector((state) => state.usersState.formErrors);
  const modalAdd = useAppSelector((state) => state.usersState.modalAdd);
  const isCorrectForm = useAppSelector(
    (state) => state.usersState.isCorrectForm
  );
  const firstName = useAppSelector((state) => state.usersState.firstName);
  const lastName = useAppSelector((state) => state.usersState.lastName);
  const email = useAppSelector((state) => state.usersState.email);
  const status = useAppSelector((state) => state.usersState.status);
  const phone = useAppSelector((state) => state.usersState.phone);
  const city = useAppSelector((state) => state.usersState.city);

  const savedUsers: IUsers = useAppSelector(
    (state) => state.usersState.savedUsers
  );
  const users = useAppSelector((state) => state.usersState.users);

  const [validation, setValidation] = React.useState({
    firstName: false,
    lastName: false,
    email: false,
    phone: false,
    city: false,
  });

  // const [open, setOpen] = React.useState(false);

  const handleClickOpen = (): void => {
    dispatch(setModalAdd(true));
  };

  const handleClose = (): void => {
    dispatch(setModalAdd(false));
  };

  const handleStatusChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ): void => {
    dispatch(setStatus(event.target.value));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();

    let newUser: IUsers = {
      id: `${Date.now()}`,
      name: firstName,
      surname: lastName,
      email: email,
      status: status === "true" ? true : false,
      phone: phone,
      city: city,
    };

    dispatch(validUser(newUser));
  };

  React.useEffect(() => {
    if (isCorrectForm) {
      // Check if there's a duplicate user based on name, surname, email, and phone
      const isDuplicate = users.some(
        (item) =>
          (item.name === savedUsers.name &&
            item.surname === savedUsers.surname) ||
          item.email === savedUsers.email ||
          item.phone === savedUsers.phone
      );

      if (isDuplicate) {
        alert("This user is existed");
      } else {
        dispatch(postUser(savedUsers));
        dispatch(setLoadingAddUser(true));
      }

      dispatch(setIsCorrectForm(false));
      setTimeout(() => {
        dispatch(setLoadingAddUser(false));
        dispatch(setModalAdd(false))
      }, 2000);
    } else {
      dispatch(setIsCorrectForm(false));
    }
  }, [isCorrectForm]);

  return (
    <React.Fragment>
      <button
        className="bg-red-500 text-[15px] px-5 py-1 rounded-lg text-white"
        onClick={handleClickOpen}
      >
        Add new User
      </button>
      <Dialog
        open={modalAdd}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <form
          action=""
          className="p-4 w-[254px] flex flex-col gap-2"
          onSubmit={handleSubmit}
        >
          <div className="block_close_modal_button flex justify-end">
            <span
              className="text-end text-[24px] font-semibold cursor-pointer"
              onClick={handleClose}
            >
              &times;
            </span>
          </div>
          <h1 className="text-center text-[19px] font-semibold">
            Add new user
          </h1>
          <div className="label_input_name flex flex-col gap-1">
            <label
              className="cursor-pointer flex items-center gap-1 text-[15px] font-semibold"
              htmlFor="firstName"
            >
              First Name
              <span className="text-red-700">* </span>
            </label>
            <input
              type="text"
              id="firstName"
              placeholder="John"
              className={`border-[1px] ${
                (validation.firstName && firstName.trim() === "") ||
                formErrors.name !== ""
                  ? `border-red-400`
                  : `border-gray-400`
              } px-2 py-1 rounded-[5px] outline-none text-[14px]`}
              value={firstName}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                dispatch(setFirstName(event.target.value))
              }
              onFocus={() => {
                setValidation({ ...validation, firstName: false });
              }}
              onBlur={() => {
                setValidation({ ...validation, firstName: true });
              }}
              required={true}
            />
            <span
              className={`text-red-500 ${
                formErrors.name === "" ? `hidden` : `block`
              }`}
            >
              {formErrors.name}
            </span>

            {formErrors.name === "" && (
              <span
                className={`text-red-500 ${
                  (validation.firstName && firstName.trim() === "") ||
                  formErrors.name !== ""
                    ? `block`
                    : `hidden`
                }`}
              >
                Required field
              </span>
            )}
          </div>
          <div className="label_input_surname flex flex-col gap-1">
            <label
              className="cursor-pointer flex items-center gap-1 text-[15px] font-semibold"
              htmlFor="lastName"
            >
              Last Name <span className="text-red-700">*</span>
            </label>
            <input
              type="text"
              id="lastName"
              placeholder="Doe"
              className={`border-[1px] ${
                validation.lastName && lastName.trim() === ""
                  ? `border-red-400 `
                  : `border-gray-400`
              } px-2 py-1 rounded-[5px] outline-none text-[14px]`}
              value={lastName}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                dispatch(setLastName(event.target.value))
              }
              onFocus={() => {
                setValidation({ ...validation, lastName: false });
              }}
              onBlur={() => {
                setValidation({ ...validation, lastName: true });
              }}
              required={true}
            />
            <span
              className={`text-red-500 ${
                formErrors.surname === "" ? `hidden` : `block`
              }`}
            >
              {formErrors.surname}
            </span>
            {formErrors.surname === "" && (
              <span
                className={`text-red-500 ${
                  (validation.lastName && lastName.trim() === "") ||
                  formErrors.surname !== ""
                    ? `block`
                    : `hidden`
                }`}
              >
                Required field
              </span>
            )}
          </div>
          <div className="label_input_email flex flex-col gap-1">
            <label
              className="cursor-pointer flex items-center gap-1 text-[15px] font-semibold"
              htmlFor="email"
            >
              Email <span className="text-red-700">*</span>
            </label>
            <input
              type="email"
              id="email"
              placeholder="example@gmail.com"
              className={`border-[1px] ${
                (validation.email && email.trim() === "") ||
                formErrors.email !== ""
                  ? `border-red-400 `
                  : `border-gray-400`
              } px-2 py-1 rounded-[5px] outline-none text-[14px]`}
              value={email}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                dispatch(setEmail(event.target.value))
              }
              onFocus={() => {
                setValidation({ ...validation, email: false });
              }}
              onBlur={() => {
                setValidation({ ...validation, email: true });
              }}
              required={true}
            />
            <span
              className={`text-red-500 ${
                formErrors.email === "" ? `hidden` : `block`
              }`}
            >
              {formErrors.email}
            </span>
            {formErrors.email === "" && (
              <span
                className={`text-red-500 ${
                  validation.email && email.trim() === "" ? `block` : `hidden`
                }`}
              >
                Required field
              </span>
            )}
          </div>
          <div className="label_input_status flex flex-col gap-1">
            <label
              className="cursor-pointer flex items-center gap-1 text-[15px] font-semibold"
              htmlFor="status"
            >
              Status <span className="text-red-700">*</span>
            </label>
            <select
              id="status"
              className="border-gray-400 border-[1px] px-2 py-1 rounded-[5px] outline-none text-[14px] cursor-pointer"
              value={status}
              onChange={handleStatusChange}
              required={true}
            >
              <option value="false">Offline</option>
              <option value="true">Online</option>
            </select>
          </div>
          <div className="label_input_phone flex flex-col gap-1">
            <label
              className="cursor-pointer flex items-center gap-1 text-[15px] font-semibold"
              htmlFor="numberPhone"
            >
              Phone <span className="text-red-700">*</span>
            </label>
            <input
              type="number"
              id="numberPhone"
              placeholder="55-555-55-55"
              className={`border-[1px] ${
                (validation.phone && phone.trim() === "") ||
                formErrors.phone !== ""
                  ? `border-red-400 `
                  : `border-gray-400`
              } px-2 py-1 rounded-[5px] outline-none text-[14px]`}
              value={phone}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                dispatch(setPhone(event.target.value))
              }
              onFocus={() => {
                setValidation({ ...validation, phone: false });
              }}
              onBlur={() => {
                setValidation({ ...validation, phone: true });
              }}
              required={true}
            />
            <span
              className={`text-red-500 ${
                formErrors.phone === "" ? `hidden` : `block`
              }`}
            >
              {formErrors.phone}
            </span>
            {formErrors.phone === "" && (
              <span
                className={`text-red-500 ${
                  validation.phone && phone.trim() === "" ? `block` : `hidden`
                }`}
              >
                Required field
              </span>
            )}
          </div>
          <div className="label_input_city flex flex-col gap-1">
            <label
              htmlFor="city"
              className="cursor-pointer flex items-center gap-1 text-[15px] font-semibold"
            >
              City <span className="text-red-700">*</span>
            </label>
            <input
              type="text"
              id="city"
              placeholder="New York"
              className={`border-[1px] ${
                (validation.city && city.trim() === "") ||
                formErrors.city !== ""
                  ? `border-red-400 `
                  : `border-gray-400`
              } px-2 py-1 rounded-[5px] outline-none text-[14px]`}
              value={city}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                dispatch(setCity(event.target.value))
              }
              onFocus={() => {
                setValidation({ ...validation, city: false });
              }}
              onBlur={() => {
                setValidation({ ...validation, city: true });
              }}
              required={true}
            />
            <span
              className={`text-red-500 ${
                formErrors.city === "" ? `hidden` : `block`
              }`}
            >
              {formErrors.city}
            </span>
            {formErrors.city === "" && (
              <span
                className={`text-red-500 ${
                  validation.city && city.trim() === "" ? `block` : `hidden`
                }`}
              >
                Required field
              </span>
            )}
          </div>

          <button
            className="bg-red-500 text-[15px] px-5 py-1 rounded-lg text-white disabled:bg-red-400 mt-3"
            type="submit"
            disabled={loadingAddUser}
          >
            {loadingAddUser ? `Loading...` : `ADD`}
          </button>
        </form>
      </Dialog>
    </React.Fragment>
  );
}
