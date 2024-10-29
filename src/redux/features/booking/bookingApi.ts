import { baseApi } from "../../api/baseApi";

export const bookingApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getbookingByUser: builder.query({
      query: (userId) => ({
        method: "GET",
        url: `/bookings/${userId}`,
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
      query: ({ id, bookingInfo }) => {
        console.log("booking api hitting", { id, bookingInfo });
        return {
          method: "PUT",
          url: `/bookings/${id}`,
          body: bookingInfo,
        };
      },
      invalidatesTags: ["bookings"],
    }),
  }),
});

export const {
  useGetbookingByUserQuery,
  useGetSinglebookingQuery,
  useCreatebookingMutation,
  useDeletebookingByIdMutation,
  useUpdatebookingByIdMutation,
} = bookingApi;
