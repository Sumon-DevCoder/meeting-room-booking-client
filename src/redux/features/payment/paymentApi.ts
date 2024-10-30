import { baseApi } from "../../api/baseApi";

export const paymentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getPaymentByUser: builder.query({
      query: (userId) => ({
        method: "GET",
        url: `/payment/${userId}`,
      }),
      providesTags: ["payments"],
    }),
    getSinglePayment: builder.query({
      query: (paymentId) => {
        console.log("api hitting", paymentId);
        return {
          method: "GET",
          url: `/payments/${paymentId}`,
        };
      },
    }),
    createPayment: builder.mutation({
      query: (paymentData) => ({
        method: "POST",
        url: `/payments`,
        body: paymentData,
      }),
      invalidatesTags: ["payments"],
    }),
    deletePaymentById: builder.mutation({
      query: (paymentId) => ({
        method: "DELETE",
        url: `/payments/${paymentId}`,
      }),
      invalidatesTags: ["payments"],
    }),
    updatePaymentById: builder.mutation({
      query: ({ id, paymentInfo }) => {
        console.log("payment api hitting", { id, paymentInfo });
        return {
          method: "PUT",
          url: `/payments/${id}`,
          body: paymentInfo,
        };
      },
      invalidatesTags: ["payments"],
    }),
  }),
});

export const {
  useGetPaymentByUserQuery,
  useGetSinglePaymentQuery,
  useCreatePaymentMutation,
  useDeletePaymentByIdMutation,
  useUpdatePaymentByIdMutation,
} = paymentApi;
