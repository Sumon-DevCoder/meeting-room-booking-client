/* eslint-disable @typescript-eslint/no-explicit-any */
import Loading from "@/components/Loading/Loading";
import CheckUserInfo from "@/components/CheckUserRole/CheckUserInfo";
import { useGetbookingByUserQuery } from "@/redux/features/booking/bookingApi";
import { TBooking } from "@/types/booking.types";
import { format } from "date-fns";
import { Link } from "react-router-dom";

const MyBookings = () => {
  const { user } = CheckUserInfo();
  const { data, isLoading } = useGetbookingByUserQuery(user?.email);

  // Display loading spinner if data is loading
  if (isLoading) {
    return <Loading />;
  }

  const bookings = data?.data || [];

  // Time format function
  const formatTimeWithAMPM = (timeString: string) => {
    const today = new Date();
    const fullDateTimeString = `${
      today.toISOString().split("T")[0]
    }T${timeString}`;
    const date = new Date(fullDateTimeString);
    return format(date, "hh:mm a");
  };

  return (
    <>
      <table className="min-w-full divide-y divide-gray-200 overflow-x-auto">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Room Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Date
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Time
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Payment
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {bookings.map((booking: TBooking) => (
            <tr key={booking._id}>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-gray-900">
                  {booking.room.name as string}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-500">
                  {new Date(booking.date).toLocaleDateString()}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-500">
                  {[
                    formatTimeWithAMPM(booking.slots[0]?.startTime as string),
                    formatTimeWithAMPM(booking.slots[0]?.endTime as string),
                  ].join(", ")}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div
                  className={`text-sm font-medium ${
                    booking.isConfirmed === "confirmed"
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {booking.isConfirmed}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <Link to={"/checkout-payment"}>
                  <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded">
                    Pay
                  </button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default MyBookings;
