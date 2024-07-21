import { useEffect } from "react";
import "./style.css";

import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { getUsers } from "../../api/api";

// Images

import imageNotFound from "../../assets/user-not-found.png";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  styled,
  tableCellClasses,
} from "@mui/material";

const TableUsers = () => {
  const dispatch = useAppDispatch();

  const loadingUsers = useAppSelector((state) => state.usersState.loadingUsers);
  const users = useAppSelector((state) => state.usersState.users);

  //For Table
  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  return (
    <>
      <TableContainer  sx={{ marginTop: `20px` }}>
        {loadingUsers ? (
          <div className="loading_block flex justify-center items-center">
            <div className="loader"></div>
          </div>
        ) : (
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>First Name</StyledTableCell>
                <StyledTableCell>Last Name</StyledTableCell>
                <StyledTableCell>Email</StyledTableCell>
                <StyledTableCell>Status</StyledTableCell>
                <StyledTableCell>Phone</StyledTableCell>
                <StyledTableCell>City</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((item) => {
                return (
                  <StyledTableRow key={item.id}>
                    <StyledTableCell component="th" scope="row">
                      {item.name}
                    </StyledTableCell>
                    <StyledTableCell>{item.surname}</StyledTableCell>
                    <StyledTableCell>{item.email}</StyledTableCell>
                    <StyledTableCell>
                      <Typography
                        className={`text-center px-1 py-2 text-white rounded-[7px] ${
                          item.status ? `bg-green-700` : ` bg-red-500`
                        }`}
                      >
                        {item.status ? `ACTIVE` : `INACTIVE`}
                      </Typography>
                    </StyledTableCell>
                    <StyledTableCell>{item.phone}</StyledTableCell>
                    <StyledTableCell>{item.city}</StyledTableCell>
                  </StyledTableRow>
                );
              })}
            </TableBody>
          </Table>
        )}
        {loadingUsers === false && users.length === 0 && (
          <div className="flex flex-col justify-center items-center mt-3 gap-3">
            <h1 className="text-[20px] font-medium">Users not found</h1>
            <img className="w-52" src={imageNotFound} alt="" />
          </div>
        )}
      </TableContainer>
    </>
  );
};

export default TableUsers;
