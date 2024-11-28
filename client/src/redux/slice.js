import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  openAddPostModel: false,
  openEditProfileModel: false,
  anchorEl: null,
  anchorEl2: null,
  darkMode: false,
  myInfo: null,
};

const serviceSlice = createSlice({
  name: "service",
  initialState,

  reducers: {
    openAddToPost: (state, action) => {
      state.openAddPostModel = action.payload;
    },
    openEditProfile: (state, action) => {
      state.openEditProfileModel = action.payload;
    },

    toggleMainMenu: (state, action) => {
      state.anchorEl = action.payload;
    },

    toggleMyMenu: (state, action) => {
      state.anchorEl2 = action.payload;
    },
    toggleColorMode: (state) => {
      state.darkMode = !state.darkMode;
    },

    addMyInfo: (state, action) => {
      state.myInfo = action.payload;
    },
  },
});

export const {
  openAddToPost,
  openEditProfile,
  toggleMainMenu,
  toggleMyMenu,
  toggleColorMode,
  addMyInfo,
} = serviceSlice.actions;
export default serviceSlice.reducer;
