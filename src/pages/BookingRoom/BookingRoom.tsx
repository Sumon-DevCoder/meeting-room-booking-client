/* eslint-disable @typescript-eslint/no-explicit-any */
import Loading from "@/components/Loading/Loading";
import { useGetSlotByRoomQuery } from "@/redux/features/slot/slotApi";
import { TSlots } from "@/types/slots.types";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import { useForm } from "react-hook-form";
import { format } from "date-fns";
import { useState } from "react";
import { useCreatebookingMutation } from "@/redux/features/booking/bookingApi";
import { useNavigate } from "react-router-dom";
import { TError } from "@/types";
import { IoIosCloseCircle } from "react-icons/io";
import { toast } from "sonner";
import useCurrentUserInfoData from "@/hoooks/useCurrentUserInfoData";

const BookingRoom = ({ roomId }: { roomId: string | undefined }) => {
  const [error, setError] = useState("");
  const [createbooking] = useCreatebookingMutation();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();
  const { user, isUserLoading } = useCurrentUserInfoData();
  const { data: slotData, isLoading: isSlotLoading } =
    useGetSlotByRoomQuery(roomId);
  const slots = slotData?.data || [];

  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  if (isUserLoading || isSlotLoading) {
    return <Loading />;
  }

  const onSubmit = async () => {
    const selectedSlots = watch("timeSlots");
    const slotValue = Array.isArray(selectedSlots)
      ? selectedSlots
      : [selectedSlots];

    try {
      const bookingInfo = {
        room: roomId,
        email: user?.email,
        user: user?._id,
        date: selectedDate ? format(selectedDate, "yyyy-MM-dd") : null,
        slots: slotValue,
      };

      console.log("bookingInfo", bookingInfo);

      const res = await createbooking(bookingInfo).unwrap();
      if (res) {
        reset();
        toast.success("booking successful");
        navigate("/user/my-bookings");
      }
    } catch (err) {
      const serverMsgErr =
        (err as TError)?.data?.message || "Something went wrong";
      setError(serverMsgErr);
    }
  };

  const formatTimeWithAMPM = (timeString: string) => {
    const today = new Date();

    // Validate time string format
    if (!timeString || !/^\d{2}:\d{2}$/.test(timeString)) {
      throw new Error("Invalid time string format. Expected HH:mm");
    }

    // Construct a full datetime string using today's date and the time string
    const fullDateTimeString = `${
      today.toISOString().split("T")[0]
    }T${timeString}`;
    const date = new Date(fullDateTimeString); // This will parse the time correctly

    // Check if the date is invalid
    if (isNaN(date.getTime())) {
      throw new Error("Invalid time string");
    }

    return format(date, "hh:mm a");
  };

  return (
    <div className="">
      {slots?.length === 0 ? (
        <div className="flex flex-col items-center text-center bg-white dark:bg-slate-500 p-5 rounded-lg">
          <p className="text-red-400 dark:text-red-300 font-semibold mb-2 text-lg">
            Sorry, there are no available time slots for this room
          </p>
          <p className="text-gray-600 dark:text-white pb-5">
            Please choose a different date or check back later for availability.
          </p>
          <div className="modal-action -mt-1">
            <button
              className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition duration-200"
              onClick={() =>
                (
                  document.getElementById("my_modal_1") as HTMLDialogElement
                ).close()
              }
            >
              <IoIosCloseCircle className="text-4xl" />
            </button>
          </div>
        </div>
      ) : (
        <div className="max-w-lg mx-auto p-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
          <div>
            <div className="flex justify-between items-center mb-4">
              <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
                Book Your Room
              </h1>
              <div className="modal-action -mt-1">
                <button
                  className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition duration-200"
                  onClick={() =>
                    (
                      document.getElementById("my_modal_1") as HTMLDialogElement
                    ).close()
                  }
                >
                  <IoIosCloseCircle className="text-2xl" />
                </button>
              </div>
            </div>
            <p className="mb-6 text-gray-600 dark:text-gray-400">
              Choose a date and select from available time slots to book your
              room.
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label className="block font-bold text-md text-gray-700 dark:text-gray-300 mb-2">
                Available Time Slots
              </label>
              {errors.timeSlots && (
                <p className="text-red-500 dark:text-red-400 mb-2">
                  Please select at least one time slot.
                </p>
              )}
              <div className="space-y-2">
                {slots?.map((slot: TSlots) => (
                  <div key={slot._id} className="flex items-center">
                    <input
                      type="checkbox"
                      id={`slot-${slot._id}`}
                      value={slot._id}
                      {...register("timeSlots", {
                        validate: (value) => value.length > 0,
                      })}
                      className="mr-3 accent-indigo-600 dark:accent-indigo-500"
                    />
                    <label
                      htmlFor={`slot-${slot._id}`}
                      className="text-gray-700 dark:text-gray-300"
                    >
                      {formatTimeWithAMPM(slot?.startTime)} -{" "}
                      {formatTimeWithAMPM(slot?.endTime)}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <label className="block font-bold text-md text-gray-700 dark:text-gray-300 mb-2">
                Select Date
              </label>
              <DatePicker
                selected={selectedDate}
                onChange={(date) => setSelectedDate(date)}
                dateFormat="MMMM d, yyyy"
                className={`w-full p-2 border ${
                  errors.date
                    ? "border-red-500 dark:border-red-400"
                    : "border-gray-300 dark:border-gray-600"
                } rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400 dark:focus:ring-indigo-500`}
                placeholderText="Click to select a date"
                isClearable
              />
              {errors.date && (
                <p className="text-red-500 dark:text-red-400">
                  Please select a date.
                </p>
              )}
            </div>
            {error && (
              <p className="text-red-500 dark:text-red-400">
                Please Select Date
              </p>
            )}
            <button
              type="submit"
              className="w-full py-3 px-6 bg-indigo-600 dark:bg-indigo-500 text-white font-semibold rounded-lg transition duration-300 hover:bg-indigo-700 dark:hover:bg-indigo-600 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 dark:focus:ring-indigo-500"
            >
              Book Now
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default BookingRoom;
