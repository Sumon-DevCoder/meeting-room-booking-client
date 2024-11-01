import { baseApi } from "../../api/baseApi";

export const slotApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getSlots: builder.query({
      query: () => ({
        method: "GET",
        url: "/slots/availability",
      }),
      providesTags: ["slots"],
    }),
    getSingleSlots: builder.query({
      query: (id) => {
        console.log("slot api hitting", id);
        return {
          method: "GET",
          url: `/slots/${id}`,
        };
      },
      providesTags: ["slots"],
    }),
    getSlotByRoom: builder.query({
      query: (roomId) => {
        console.log("api hitting", roomId);
        return {
          method: "GET",
          url: `/slots/room/${roomId}`,
        };
      },
    }),
    createSlot: builder.mutation({
      query: (slotData) => ({
        method: "POST",
        url: `/slots`,
        body: slotData,
      }),
      invalidatesTags: ["slots"],
    }),
    deleteSlotById: builder.mutation({
      query: (slotId) => {
        console.log("hitting api", slotApi);
        return {
          method: "DELETE",
          url: `/slots/${slotId}`,
        };
      },
      invalidatesTags: ["slots"],
    }),
    updateslotById: builder.mutation({
      query: ({ id, slotInfo }) => {
        console.log("slot api hitting", { id, slotInfo });
        return {
          method: "PUT",
          url: `/slots/${id}`,
          body: slotInfo,
        };
      },
      invalidatesTags: ["slots"],
    }),
  }),
});

export const {
  useGetSlotsQuery,
  useGetSlotByRoomQuery,
  useCreateSlotMutation,
  useDeleteSlotByIdMutation,
  useUpdateslotByIdMutation,
  useGetSingleSlotsQuery,
} = slotApi;
