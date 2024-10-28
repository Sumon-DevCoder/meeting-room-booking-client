import { useEffect } from "react";
import { useGetSingleRoomQuery } from "@/redux/features/room/roomApi";
import { useCreateSlotMutation } from "@/redux/features/slot/slotApi";
import { TError } from "@/types";
import { TSlots } from "@/types/slots.types";
import { FieldValues, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const CreateSlots = ({ selectedRoomId }: { selectedRoomId: string }) => {
  const [createSlot] = useCreateSlotMutation();
  const { data } = useGetSingleRoomQuery(selectedRoomId);
  const navigate = useNavigate();
  const room = data?.data;

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue, // Use setValue to update form values
  } = useForm<TSlots>();

  // Set default values for roomName and roomNo after data fetch
  useEffect(() => {
    if (room) {
      setValue("roomName", room.name || "");
      setValue("roomNo", room.roomNo ? String(room.roomNo) : "");
    }
  }, [room, setValue]);

  // onSubmit
  const onSubmit = async (data: FieldValues) => {
    const toastId = toast.loading("Creating Slot...");

    console.log(room?.name);

    try {
      const slotInfo = {
        roomId: room?._id,
        roomName: room?.name,
        roomNo: room?.roomNo,
        date: data.date,
        startTime: data.startTime,
        endTime: data.endTime,
      };

      console.log("slotInfo", slotInfo);

      const res = await createSlot(slotInfo).unwrap();

      if (res) {
        toast.success(res?.message, { id: toastId, duration: 3000 });
        reset();
        navigate("/admin/slots-list");
      }

      console.log("res", res);
    } catch (err) {
      const serverMsgErr =
        (err as TError)?.data?.message || "Something went wrong";

      if (serverMsgErr) {
        return toast.error(serverMsgErr, {
          id: toastId,
          duration: 3000,
        });
      } else if (err) {
        return toast.error("Something went wrong", {
          id: toastId,
          duration: 2000,
        });
      }
    }
  };

  return (
    <div className="mx-auto w-full bg-white shadow-md rounded-lg p-8">
      <h2 className="text-2xl font-semibold text-indigo-700 text-center mb-4">
        Create a New Slot
      </h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-1 md:grid-cols-2 gap-5"
      >
        {/* Room Name */}
        <div>
          <label
            htmlFor="room-name"
            className="mb-2 block text-sm font-medium text-indigo-700"
          >
            Room Name
          </label>
          <input
            type="text"
            {...register("roomName", { required: "Room Name is required" })}
            id="room-name"
            placeholder="Room Name"
            className="w-full rounded-md border border-gray-300 bg-white py-3 px-4 text-sm font-medium text-gray-700 outline-none focus:border-indigo-500 focus:shadow-md"
          />
          {errors.roomName && (
            <p className="text-red-500">{errors.roomName.message as string}</p>
          )}
        </div>

        {/* Room Number */}
        <div>
          <label
            htmlFor="room-no"
            className="mb-2 block text-sm font-medium text-indigo-700"
          >
            Room Number
          </label>
          <input
            type="text"
            {...register("roomNo", {
              required: "Room Number is required",
              pattern: {
                value: /^[0-9]+$/,
                message: "Room Number must be a number",
              },
            })}
            id="room-no"
            placeholder="Room Number"
            className="w-full rounded-md border border-gray-300 bg-white py-3 px-4 text-sm font-medium text-gray-700 outline-none focus:border-indigo-500 focus:shadow-md"
          />
          {errors.roomNo && (
            <p className="text-red-500">{errors.roomNo.message as string}</p>
          )}
        </div>

        {/* Start Time */}
        <div>
          <label
            htmlFor="start-time"
            className="mb-2 block text-sm font-medium text-indigo-700"
          >
            Start Time
          </label>
          <input
            type="time"
            {...register("startTime", { required: "Start Time is required" })}
            id="start-time"
            className="w-full rounded-md border border-gray-300 bg-white py-3 px-4 text-sm font-medium text-gray-700 outline-none focus:border-indigo-500 focus:shadow-md"
          />
          {errors.startTime && (
            <p className="text-red-500">{errors.startTime.message as string}</p>
          )}
        </div>

        {/* End Time */}
        <div>
          <label
            htmlFor="end-time"
            className="mb-2 block text-sm font-medium text-indigo-700"
          >
            End Time
          </label>
          <input
            type="time"
            {...register("endTime", { required: "End Time is required" })}
            id="end-time"
            className="w-full rounded-md border border-gray-300 bg-white py-3 px-4 text-sm font-medium text-gray-700 outline-none focus:border-indigo-500 focus:shadow-md"
          />
          {errors.endTime && (
            <p className="text-red-500">{errors.endTime.message as string}</p>
          )}
        </div>

        {/* Date */}
        <div>
          <label
            htmlFor="date"
            className="mb-2 block text-sm font-medium text-indigo-700"
          >
            Date
          </label>
          <input
            type="date"
            {...register("date", {
              required: "Date is required",
              validate: {
                futureOrToday: (value) => {
                  const selectedDate = new Date(value);
                  const today = new Date();
                  today.setHours(0, 0, 0, 0); // Clear time for accurate comparison

                  return (
                    selectedDate >= today || "Date must be present or future"
                  );
                },
              },
            })}
            id="date"
            className="w-full rounded-md border border-gray-300 bg-white py-3 px-4 text-sm font-medium text-gray-700 outline-none focus:border-indigo-500 focus:shadow-md"
          />
          {errors.date && (
            <p className="text-red-500">{errors.date.message as string}</p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="mt-5 col-span-1 md:col-span-2 rounded-md bg-indigo-600 py-3 px-4 text-white font-semibold hover:bg-indigo-700 transition"
        >
          Create Slot
        </button>
      </form>
    </div>
  );
};

export default CreateSlots;
