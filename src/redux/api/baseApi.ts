/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  BaseQueryApi,
  BaseQueryFn,
  createApi,
  DefinitionType,
  FetchArgs,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";
import { logout, setUser } from "../features/auth/authSlice";
import { toast } from "sonner";
import { TResponse } from "../../types/global";

// pass token for every request to server
const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:5001/api",
  headers: {
    "Content-Type": "application/json",
  },
  credentials: "include",

  // we can sent accessToken per request to backend
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth?.token;

    if (token) {
      headers.set("authorization", `${token}`);
    }

    return headers;
  },
});

// create custom baseQuery for generate new token by refreshToken
const baseQueryWithRefreshToken: BaseQueryFn<
  FetchArgs,
  BaseQueryApi,
  DefinitionType
> = async (arg, api, extraOptions): Promise<any> => {
  let result = (await baseQuery(arg, api, extraOptions)) as TResponse;

  console.log("result fo custom base query", result);

  if (result.error?.status === 404) {
    return toast.error(result.error?.data?.message);
  } else if (result.error?.status === 403) {
    return toast.error(
      "Forbidden: You do not have permission to access this resource."
    );
  }

  // if token is expired then we got an error
  if (result.error?.status === 401) {
    console.log("token is expired");
    // try to get new token req for new Token
    const res = await fetch("http://localhost:5001/api/auth/refresh-token", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    // get new token
    const data = await res.json();

    if (data?.data?.accessToken) {
      const user = (api.getState() as RootState).auth.user;

      // set new access Token in state
      api.dispatch(
        setUser({
          user,
          token: data.data.accessToken,
        })
      );

      result = (await baseQuery(arg, api, extraOptions)) as TResponse;

      console.log("token generate success");
    } else {
      console.log("logout success because unauthorized user");
      api.dispatch(logout());
    }
  }

  return result;
};

// base api
export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: baseQueryWithRefreshToken,
  tagTypes: ["rooms"],
  endpoints: () => ({}),
});
