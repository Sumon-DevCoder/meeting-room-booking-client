import { baseApi } from "../../api/baseApi";

export const bookingApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllbooking: builder.query({
      query: () => ({
        method: "GET",
        url: `/bookings`,
      }),
      providesTags: ["bookings"],
    }),
    getbookingByUser: builder.query({
      query: (email) => ({
        method: "GET",
        url: `/bookings/${email}`,
      }),
      providesTags: ["bookings"],
    }),
    getSinglebooking: builder.query({
      query: (bookingId) => {
        console.log("api hitting", bookingId);
        return {
          method: "GET",
          url: `/bookings/${bookingId}`,
        };
      },
    }),
    createbooking: builder.mutation({
      query: (bookingData) => ({
        method: "POST",
        url: `/bookings`,
        body: bookingData,
      }),
      invalidatesTags: ["bookings"],
    }),
    deletebookingById: builder.mutation({
      query: (bookingId) => ({
        method: "DELETE",
        url: `/bookings/${bookingId}`,
      }),
      invalidatesTags: ["bookings"],
    }),
    updatebookingById: builder.mutation({
      query: ({ id, status }) => {
        console.log("booking api hitting", { id, status });
        return {
          method: "PUT",
          url: `/bookings/${id}`,
          body: status,
        };
      },
      invalidatesTags: ["bookings"],
    }),
  }),
});

export const {
  useGetAllbookingQuery,
  useGetbookingByUserQuery,
  useGetSinglebookingQuery,
  useCreatebookingMutation,
  useDeletebookingByIdMutation,
  useUpdatebookingByIdMutation,
} = bookingApi;
