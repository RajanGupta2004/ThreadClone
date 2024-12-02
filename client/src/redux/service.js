import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  addMyInfo,
  addSingle,
  addToAllPost,
  addUser,
  deleteThePost,
} from "./slice";

export const serviceApi = createApi({
  reducerPath: "serviceApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8000/api/v1",
    credentials: "include",
  }),

  keepUnusedDataFor: 60 * 60 * 24 * 7,

  tagTypes: ["Post", "Usre", "Me"],

  endpoints: (builder) => ({
    signin: builder.mutation({
      query: (data) => ({
        url: "sign-in",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Me"],
    }),

    login: builder.mutation({
      query: (data) => ({
        url: "login",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Me"],
    }),

    myInfo: builder.query({
      query: () => ({
        url: "me",
        method: "GET",
      }),
      async onQueryStarted(params, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          //   console.log("Data", data);
          dispatch(addMyInfo(data));
        } catch (error) {
          console.log("Error in myInfo cleint", error);
        }
      },
    }),

    logoutMe: builder.mutation({
      query: () => ({
        url: "logout",
        method: "POST",
      }),
      invalidatesTags: ["Me"],
    }),

    userDetails: builder.query({
      query: (id) => ({
        url: `user/${id}`,
        method: "GET",
      }),

      async onQueryStarted(params, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(addUser(data));
        } catch (error) {
          console.log("Errror in user details", error);
        }
      },
    }),

    searchUsers: builder.query({
      query: (query) => ({
        url: `user/search/${query}`,
        method: "GET",
      }),
    }),

    followUser: builder.mutation({
      query: (id) => ({
        url: `user/follow${id}`,
        method: "PUT",
      }),
    }),

    updateProfile: builder.mutation({
      query: (data) => ({
        url: "update",
        method: "PUT",
        body: data,
      }),
    }),

    addPost: builder.mutation({
      query: (data) => ({
        url: `post`,
        method: "POST",
        body: data,
      }),

      async onQueryStarted(params, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(addSingle(data));
        } catch (error) {
          console.log("ERROR in add post", error);
        }
      },
    }),

    allPost: builder.query({
      query: (page) => ({
        url: `post?page=${page}`,
        method: "GET",
      }),

      providesTags: (result) => {
        return result
          ? [
              ...result.posts.map(({ _id }) => ({ type: "Post", id: _id })),
              { type: "Post", id: "LIST" },
            ]
          : [{ type: "Post", id: "LIST" }];
      },

      async onQueryStarted(params, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(addToAllPost(data));
        } catch (error) {
          console.log("Error in get all post", error);
        }
      },
    }),

    deletePost: builder.mutation({
      query: (id) => ({
        url: `post/${id}`,
        method: "DELETE",
      }),

      async onQueryStarted(params, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(deleteThePost(data));
        } catch (error) {
          console.log("Error in delet post", error);
        }
      },
    }),

    likePost: builder.mutation({
      query: (id) => ({
        url: `post/like/${id}`,
        method: "PUT",
      }),
    }),

    singlePost: builder.query({
      query: (id) => ({
        url: `singlepost/${id}`,
        method: "GET",
      }),
    }),

    addComment: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `comment/${id}`,
        method: "POST",
        body: data,
      }),
    }),
    deleteComment: builder.mutation({
      query: ({ postId, id }) => ({
        url: `comment/${postId}/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useSigninMutation,
  useLoginMutation,
  useMyInfoQuery,
  useLogoutMeMutation,
  useUserDetailsQuery,
  useSearchUsersQuery,
  useFollowUserMutation,
  useAddPostMutation,
  useDeletePostMutation,
  useLikePostMutation,
  useSinglePostQuery,
  useAddCommentMutation,
  useDeleteCommentMutation,
  useUpdateProfileMutation,
  useAllPostQuery,
} = serviceApi;
