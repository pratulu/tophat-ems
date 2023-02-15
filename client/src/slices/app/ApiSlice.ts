import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "BE_CONNECTION_STRING",

  baseQuery: fetchBaseQuery({ baseUrl: "/api" }),

  endpoints: (builder) => ({
    getPosts: builder.query({
      query: () => "/all-users",
    }),
  }),
});

export const { useGetAllUsersQuery } = apiSlice;
