import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "./store";

// Define useAppDispatch and useAppSelector correctly
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector = <TSelected>(
  selector: (state: RootState) => TSelected
) => useSelector(selector);
