import { baseApi } from "../../api/baseApi";

export const roomApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getRooms: builder.query({
      query: () => ({
        method: "GET",
        url: "/rooms",
      }),
      providesTags: ["rooms"],
    }),
    getSingleRoom: builder.query({
      query: (roomId) => {
        console.log("api hitting", roomId);
        return {
          method: "GET",
          url: `/rooms/${roomId}`,
        };
      },
    }),
    createRoom: builder.mutation({
      query: (roomData) => ({
        method: "POST",
        url: `/rooms`,
        body: roomData,
      }),
      invalidatesTags: ["rooms"],
    }),
    deleteRoomById: builder.mutation({
      query: (roomId) => ({
        method: "DELETE",
        url: `/rooms/${roomId}`,
      }),
      invalidatesTags: ["rooms"],
    }),
    updateRoomById: builder.mutation({
      query: ({ id, roomInfo }) => {
        console.log("room api hitting", { id, roomInfo });
        return {
          method: "PUT",
          url: `/rooms/${id}`,
          body: roomInfo,
        };
      },
      invalidatesTags: ["rooms"],
    }),
  }),
});

export const {
  useGetRoomsQuery,
  useGetSingleRoomQuery,
  useCreateRoomMutation,
  useDeleteRoomByIdMutation,
  useUpdateRoomByIdMutation,
} = roomApi;
