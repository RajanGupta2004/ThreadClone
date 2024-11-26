import { configureStore } from "@reduxjs/toolkit";
import serviceReducer from "../redux/slice";

export const store = configureStore({
  reducer: {
    service: serviceReducer,
  },
});
