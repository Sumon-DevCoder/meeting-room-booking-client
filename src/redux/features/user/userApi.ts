import { baseApi } from "../../api/baseApi";

export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => ({
        method: "GET",
        url: "/users",
      }),
      providesTags: ["users"],
    }),
    getUserById: builder.query({
      query: (userId) => ({
        method: "GET",
        url: `/users/${userId}`,
      }),
      providesTags: ["users"],
    }),
    createUser: builder.mutation({
      query: (userData) => ({
        method: "POST",
        url: `/users`,
        body: userData,
      }),
      invalidatesTags: ["users"],
    }),
    deleteUserById: builder.mutation({
      query: (userId) => ({
        method: "DELETE",
        url: `/users/${userId}`,
      }),
      invalidatesTags: ["users"],
    }),
    updateUserById: builder.mutation({
      query: ({ id, role }) => {
        console.log("api hitting", id, role);
        return {
          method: "PUT",
          url: `/users/${id}`,
          body: role,
        };
      },
      invalidatesTags: ["users"],
    }),
  }),
});

export const {
  useGetUsersQuery,
  useUpdateUserByIdMutation,
  useCreateUserMutation,
  useDeleteUserByIdMutation,
} = userApi;
