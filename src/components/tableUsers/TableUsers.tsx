import { useEffect } from "react";
import "./style.css";

import { IUsers } from "../../reducers/usersState";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { getUsers } from "../../api/api";

// Images

import imageNotFound from "../../assets/user-not-found.png"

const TableUsers = () => {
  const dispatch = useAppDispatch();

  const loadingUsers = useAppSelector((state) => state.usersState.loadingUsers);
  const users = useAppSelector((state) => state.usersState.users);

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  return (
    <>
      <div className="table_users_component overflow-x-auto">
        {loadingUsers ? (
          <div className="loading_block flex justify-center items-center">
            <div className="loader"></div>
          </div>
        ) : (
          <table className="border-collapse w-[66rem] mx-auto mt-7">
            <thead>
              <tr className="bg-lime-400">
                <th className="border-[1px] border-black w-96 px-7 py-2">
                  First Name
                </th>
                <th className="border-[1px] border-black w-96 px-7 py-2">
                  Last Name
                </th>
                <th className="border-[1px] border-black w-96 px-7 py-2">
                  Email
                </th>
                <th className="border-[1px] border-black w-96 px-7 py-2">
                  Status
                </th>
                <th className="border-[1px] border-black w-96 px-7 py-2">
                  Phone
                </th>
                <th className="border-[1px] border-black w-96 px-7 py-2">
                  City
                </th>
              </tr>
            </thead>
            {users.map((item: IUsers) => {
              return (
                <tbody key={item.id}>
                  <tr className="bg-yellow-300">
                    <td className="border-[1px] border-black w-96 px-7 py-2">
                      <h1 className="text-center text-[18px] text-black font-medium">
                        {item.name}
                      </h1>
                    </td>
                    <td className="border-[1px] border-black w-96 px-7 py-2">
                      <h1 className="text-center text-[18px] text-black font-medium">
                        {item.surname}
                      </h1>
                    </td>
                    <td className="border-[1px] border-black w-96 px-7 py-2">
                      <h1 className="text-center text-[15px] text-black font-medium">
                        {item.email}
                      </h1>
                    </td>
                    <td className="border-[1px] border-black w-96 px-7 py-2">
                      <h1
                        className={`text-center px-4 py-1 text-white rounded-[7px] ${
                          item.status ? `bg-green-700` : ` bg-red-700`
                        }`}
                      >
                        {item.status ? `ACTIVE` : `INACTIVE`}
                      </h1>
                    </td>
                    <td className="border-[1px] border-black w-96 px-7 py-2">
                      <h1 className="text-center text-[14px] text-black font-semibold">
                        {item.phone}
                      </h1>
                    </td>
                    <td className="border-[1px] border-black w-96 px-7 py-2">
                      <h1 className="text-center text-[18px] text-black font-medium">
                        {item.city}
                      </h1>
                    </td>
                  </tr>
                </tbody>
              );
            })}
          </table>
        )}
        {loadingUsers === false && users.length === 0 && (
          <div className="flex justify-center mt-3">
            <h1>Users not found</h1>
            <img src={imageNotFound} alt="" />
          </div>
        )}
      </div>
    </>
  );
};

export default TableUsers;
