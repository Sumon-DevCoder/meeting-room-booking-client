// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/api" }),
  endpoints: (builder) => ({
    getBooking: builder.query({
      query: () => ({
        method: "GET",
        url: "/booking",
      }),
    }),
  }),
});

export const { useGetBookingQuery } = baseApi;
