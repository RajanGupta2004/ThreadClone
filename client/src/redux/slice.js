import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  openAddPostModel: false,
};

const serviceSlice = createSlice({
  name: "service",
  initialState,

  reducers: {
    openAddToPost: (state, action) => {
      state.openAddPostModel = action.payload;
    },
  },
});

export const { openAddToPost } = serviceSlice.actions;
export default serviceSlice.reducer;
