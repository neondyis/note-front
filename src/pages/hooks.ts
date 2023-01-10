// Use throughout your app instead of plain `useDispatch` and `useSelector`
import {AppDispatch, RootState} from "./Home/redux/noteStore";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";

export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector