import { TypedUseSelectorHook, useSelector } from "react-redux";
import { RootState } from "../redux/store";

// Define a custom hook for type-safe access to the Redux store's state
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector; 