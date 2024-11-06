import { baseApi } from "../../api/baseApi";

export const orderApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllorder: builder.query({
      query: () => ({
        method: "GET",
        url: `/orders`,
      }),
      providesTags: ["orders"],
    }),
    getSingleorder: builder.query({
      query: (orderId) => {
        console.log("api hitting", orderId);
        return {
          method: "GET",
          url: `/orders/${orderId}`,
        };
      },
    }),
    getorderByUser: builder.query({
      query: (email) => {
        console.log("api hitting", email);
        return {
          method: "GET",
          url: `/orders/${email}`,
        };
      },
    }),
    createorder: builder.mutation({
      query: (orderData) => ({
        method: "POST",
        url: `/orders/create`,
        body: orderData,
      }),
      invalidatesTags: ["orders"],
    }),
    deleteorderById: builder.mutation({
      query: (orderId) => ({
        method: "DELETE",
        url: `/orders/${orderId}`,
      }),
      invalidatesTags: ["orders"],
    }),
    updateorderById: builder.mutation({
      query: ({ id, status }) => {
        console.log("order api hitting", { id, status });
        return {
          method: "PUT",
          url: `/orders/${id}`,
          body: status,
        };
      },
      invalidatesTags: ["orders"],
    }),
  }),
});

export const {
  useGetAllorderQuery,
  useGetorderByUserQuery,
  useGetSingleorderQuery,
  useCreateorderMutation,
  useDeleteorderByIdMutation,
  useUpdateorderByIdMutation,
} = orderApi;
