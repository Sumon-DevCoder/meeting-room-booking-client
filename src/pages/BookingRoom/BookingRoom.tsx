/* eslint-disable @typescript-eslint/no-explicit-any */
import CheckUserInfo from "@/components/CheckUserRole/CheckUserInfo";
import Loading from "@/components/Loading/Loading";
import { useGetSlotByRoomQuery } from "@/redux/features/slot/slotApi";
import { useGetUsersQuery } from "@/redux/features/user/userApi";
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

const BookingRoom = ({ roomId }: { roomId: string }) => {
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
  const { user } = CheckUserInfo();
  const { data: slotData, isLoading: isSlotLoading } =
    useGetSlotByRoomQuery(roomId);
  const { data: usersData, isLoading: isUserLoading } = useGetUsersQuery({});
  const users = usersData?.data?.result || [];
  const slots = slotData?.data || [];

  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  if (isUserLoading || isSlotLoading) {
    return <Loading />;
  }

  const verifiedUser = user
    ? users?.find((u: { email: any }) => u.email === user.email)
    : null;

  console.log(error);

  const onSubmit = async () => {
    const selectedSlots = watch("timeSlots");

    try {
      const bookingInfo = {
        room: roomId,
        email: user?.email,
        user: verifiedUser?._id,
        date: selectedDate ? format(selectedDate, "yyyy-MM-dd") : null,
        slots: selectedSlots,
      };

      console.log("bookingInfo", bookingInfo);

      const res = await createbooking(bookingInfo).unwrap();
      if (res) {
        reset();
        navigate("/user/my-bookings");

        return <p>Booking Room Successfully</p>;
      }
    } catch (err) {
      const serverMsgErr =
        (err as TError)?.data?.message || "Something went wrong";
      setError(serverMsgErr);
    }
  };

  const formatTimeWithAMPM = (timeString: string) => {
    const today = new Date();
    const fullDateTimeString = `${
      today.toISOString().split("T")[0]
    }T${timeString}`;
    const date = new Date(fullDateTimeString);
    return format(date, "hh:mm a");
  };

  return (
    <div>
      {slots?.length === 0 ? (
        <div className="flex flex-col items-center text-center">
          <p className="text-red-400 font-semibold mb-2 text-lg">
            Sorry, there are no available time slots for this room
          </p>
          <p className="text-gray-600">
            Please choose a different date or check back later for availability.
          </p>
          <div className="modal-action -mt-1">
            <button
              className="text-gray-500 hover:text-gray-700 transition duration-200"
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
        <div className="max-w-lg mx-auto p-8 bg-white rounded-lg shadow-lg">
          <div>
            <div className="flex justify-between items-center mb-4">
              <h1 className="text-2xl font-bold text-gray-800">
                Book Your Room
              </h1>
              <div className="modal-action -mt-1">
                <button
                  className="text-gray-500 hover:text-gray-700 transition duration-200"
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
            <p className="mb-6 text-gray-600">
              Choose a date and select from available time slots to book your
              room.
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label className="block font-bold text-md text-gray-700 mb-2">
                Available Time Slots
              </label>
              {errors.timeSlots && (
                <p className="text-red-500 mb-2">
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
                      className="mr-3 accent-indigo-600"
                    />
                    <label
                      htmlFor={`slot-${slot._id}`}
                      className="text-gray-700"
                    >
                      {formatTimeWithAMPM(slot.startTime)} -{" "}
                      {formatTimeWithAMPM(slot.endTime)}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <label className="block font-bold text-md  text-gray-700 mb-2">
                Select Date
              </label>
              <DatePicker
                selected={selectedDate}
                onChange={(date) => setSelectedDate(date)}
                dateFormat="MMMM d, yyyy"
                className={`w-full p-2 border ${
                  errors.date ? "border-red-500" : "border-gray-300"
                } rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400`}
                placeholderText="Click to select a date"
                isClearable
              />
              {errors.date && (
                <p className="text-red-500">Please select a date.</p>
              )}
            </div>
            {error && <p className="text-red-500">Please Select Date</p>}
            <button
              type="submit"
              className="w-full py-3 px-6 bg-indigo-600 text-white font-semibold rounded-lg transition duration-300 hover:bg-indigo-700 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
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
