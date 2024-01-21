import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";

import { useDispatch } from "react-redux";

const store = configureStore({
  reducer: { user: userReducer },
});

type RootState = ReturnType<typeof store.getState>;

export const userState = (state: RootState) => state.user;

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();

export default store;
