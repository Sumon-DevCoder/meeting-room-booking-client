import { baseApi } from "../../api/baseApi";

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (userInfo) => ({
        url: "auth/login",
        method: "POST",
        body: userInfo,
      }),
    }),
    signup: builder.mutation({
      query: (userData) => {
        console.log("auth hii", userData);

        return {
          url: "/auth/signup",
          method: "POST",
          body: userData,
        };
      },
    }),
  }),
});
