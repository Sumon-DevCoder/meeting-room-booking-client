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
    // getUserById: builder.query({
    //   query: (userId) => ({
    //     method: "GET",
    //     url: `/users/${userId}`,
    //   }),
    //   providesTags: (result, error, id) => [{ type: "users", id }],
    // }),
    // createUser: builder.mutation({
    //   query: (userData) => ({
    //     method: "POST",
    //     url: `/users`, // Endpoint to create a new user
    //     body: userData,
    //   }),
    //   invalidatesTags: ["users"],
    // }),
    // deleteUserById: builder.mutation({
    //   query: (userId) => ({
    //     method: "DELETE",
    //     url: `/users/${userId}`, // Endpoint to delete a user by ID
    //   }),
    //   invalidatesTags: ["users"],
    // }),
    updateUserById: builder.mutation({
      query: ({ id, userInfo }) => ({
        method: "PUT",
        url: `/users/${id}`, // Endpoint to update user information
        body: userInfo,
      }),
      invalidatesTags: ["users"],
    }),
  }),
});

export const { useGetUsersQuery, useUpdateUserByIdMutation } = userApi;
