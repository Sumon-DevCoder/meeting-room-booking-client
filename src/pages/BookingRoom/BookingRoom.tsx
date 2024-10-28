/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/rules-of-hooks */
import CheckUserInfo from "@/components/CheckUserRole/CheckUserInfo";
import Loading from "@/components/Loading/Loading";
import { useGetSlotsQuery } from "@/redux/features/slot/slotApi";
import { useGetUsersQuery } from "@/redux/features/user/userApi";
import { TSlots } from "@/types/slots.types";
import "react-datepicker/dist/react-datepicker.css";
import { FieldValues, useForm } from "react-hook-form";

const BookingRoom = ({ roomId }: { roomId: string }) => {
  const { register, handleSubmit } = useForm();
  const { user } = CheckUserInfo();
  const { data: slotData, isLoading: isSlotLoading } = useGetSlotsQuery({});
  const { data: usersData, isLoading: isUserLoading } = useGetUsersQuery({});
  const users = usersData?.data?.result || [];
  const slots = slotData?.data?.result || [];

  if (isUserLoading || isSlotLoading) {
    return <Loading />;
  }

  console.log(slots);

  // Filter verified user
  const verifiedUser = user
    ? users?.find((u: { email: any }) => u.email === user.email)
    : null;

  // onsubmit
  const onSubmit = (data: FieldValues) => {
    const bookingInfo = {
      room: roomId,
      user: verifiedUser?._id,
      //   date: selectedDate,
      //   timeSlot: formData.timeSlot,
    };
    console.log("Booking Info:", bookingInfo, data);
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-center text-gray-800">
        Book Your Room
      </h1>
      <p className="mt-2 text-gray-600 text-center">
        Please select a date and time slot to book your room.
      </p>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* <div>
          <label className="block text-sm font-medium text-gray-700">
            Select Date:
          </label>
          <DatePicker
            selected={selectedDate}
            onChange={handleDateChange}
            dateFormat="MMMM d, yyyy"
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-indigo-200"
            placeholderText="Select a date"
          />
        </div> */}

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Available Time Slots:
          </label>
          <select
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-indigo-200"
            {...register("timeSlot", { required: true })} // Add validation for required
          >
            <option value="">Select a time slot</option>
            {slots.map((slot: TSlots) => (
              <option key={slot?._id} value={slot.startTime}>
                {slot.startTime} - {slot.endTime}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          className="w-full mt-5 py-3 px-6 bg-indigo-600 text-white font-semibold rounded-md transition duration-300 hover:bg-indigo-700 hover:shadow-md"
        >
          Book Now
        </button>
      </form>
    </div>
  );
};

export default BookingRoom;
