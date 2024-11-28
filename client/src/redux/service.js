import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { addMyInfo } from "./slice";

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
  }),
});

export const {
  useSigninMutation,
  useLoginMutation,
  useMyInfoQuery,
  useLogoutMeMutation,
} = serviceApi;
