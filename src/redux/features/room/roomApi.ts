import { baseApi } from "../../api/baseApi";

export const roomApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getRooms: builder.query({
      query: () => ({
        method: "GET",
        url: "/rooms",
      }),
    }),
  }),
});

export const { useGetRoomsQuery } = roomApi;
