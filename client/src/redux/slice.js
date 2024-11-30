import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  openAddPostModel: false,
  openEditProfileModel: false,
  anchorEl: null,
  anchorEl2: null,
  darkMode: false,
  myInfo: null,
  user: {},
  allPost: [],
  postId: null,
  searchedUser: [],
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

    addUser: (state, action) => {
      state.user = action.payload;
    },

    addSingle: (state, action) => {
      const newArr = [...state.allPost];
      const updatedArr = [...action.payload.post, ...newArr];
      state.allPost = updatedArr;
    },

    addToAllPost: (state, action) => {
      // log to all post
    },

    deleteThePost: (state, action) => {
      const postArr = [...state.allPost];
      const newArr = postArr.filter((e) => e.id === state.postId);
      state.allPost = newArr;
    },

    addToSearchUser: (state, action) => {
      state.searchedUser = action.payload;
    },

    addPostId: (state, action) => {
      state.postId = action.payload;
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
  addUser,
  addSingle,
  addToAllPost,
  deleteThePost,
  addToSearchUser,
  addPostId,
} = serviceSlice.actions;
export default serviceSlice.reducer;
