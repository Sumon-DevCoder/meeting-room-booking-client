// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5001/api" }),
  endpoints: (builder) => ({
    getRooms: builder.query({
      query: () => ({
        method: "GET",
        url: "/rooms",
      }),
    }),
  }),
});

export const { useGetRoomsQuery } = baseApi;
