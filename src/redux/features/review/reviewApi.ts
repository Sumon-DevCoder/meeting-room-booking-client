import { baseApi } from "../../api/baseApi";

export const reviewApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllReview: builder.query({
      query: () => ({
        method: "GET",
        url: `/reviews`,
      }),
      providesTags: ["reviews"],
    }),
    getReviewByRoom: builder.query({
      query: (reviewId) => ({
        method: "GET",
        url: `/reviews/${reviewId}`,
      }),
      providesTags: ["reviews"],
    }),
    getSingleReview: builder.query({
      query: (reviewId) => {
        console.log("api hitting", reviewId);
        return {
          method: "GET",
          url: `/reviews/${reviewId}`,
        };
      },
    }),
    createReview: builder.mutation({
      query: (reviewData) => ({
        method: "POST",
        url: `/reviews`,
        body: reviewData,
      }),
      invalidatesTags: ["reviews"],
    }),
    deletereviewById: builder.mutation({
      query: (reviewId) => ({
        method: "DELETE",
        url: `/reviews/${reviewId}`,
      }),
      invalidatesTags: ["reviews"],
    }),
    updatereviewById: builder.mutation({
      query: ({ id, data }) => {
        console.log("review api hitting", { id, status });
        return {
          method: "PUT",
          url: `/reviews/${id}`,
          body: data,
        };
      },
      invalidatesTags: ["reviews"],
    }),
  }),
});

export const {
  useGetAllReviewQuery,
  useGetReviewByRoomQuery,
  useGetSingleReviewQuery,
  useCreateReviewMutation,
  useDeletereviewByIdMutation,
  useUpdatereviewByIdMutation,
} = reviewApi;
