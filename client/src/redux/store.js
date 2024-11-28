import { configureStore } from "@reduxjs/toolkit";
import serviceReducer from "../redux/slice";
import { serviceApi } from "./service";

export const store = configureStore({
  reducer: {
    service: serviceReducer,

    [serviceApi.reducerPath]: serviceApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(
      serviceApi.middleware
    ),
});
