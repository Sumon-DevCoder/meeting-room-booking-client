/* eslint-disable @typescript-eslint/no-explicit-any */
import Loading from "@/components/Loading/Loading";

import { TError } from "@/types";
import { TBooking } from "@/types/booking.types"; // Adjust this import based on your booking types
import { toast } from "sonner";
import Swal from "sweetalert2";

const BookingListTable = () => {
  const { data, isLoading } = useGetBookingsQuery({});
  const [deleteBooking] = useDeleteBookingByIdMutation();

  // Display loading spinner if data is loading
  if (isLoading) {
    return <Loading />;
  }

  const bookings = data?.data?.result || [];

  const handleBookingDelete = async (bookingId: string, roomName: string) => {
    Swal.fire({
      title: "Confirm Deletion",
      text: `Are you sure you want to delete the booking for "${roomName}"?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Delete",
      cancelButtonText: "Cancel",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const toastId = toast.loading("Deleting the booking...");

        try {
          const res = await deleteBooking(bookingId).unwrap();

          if (res && res.message) {
            toast.success(res.message, { id: toastId, duration: 3000 });
          } else {
            toast.error("Unexpected response received.", {
              id: toastId,
              duration: 3000,
            });
          }
        } catch (err) {
          const serverMsgErr =
            (err as TError)?.data?.message ||
            "An error occurred while deleting the booking. Please try again.";

          toast.error(serverMsgErr, {
            id: toastId,
            duration: 3000,
          });
        }
      }
    });
  };

  const handleBookingApproval = async (bookingId: string) => {
    // Implement the logic for approving bookings
    // You can call an API endpoint to update the booking status
    toast.success("Booking approved!", { duration: 3000 });
  };

  const handleBookingRejection = async (bookingId: string) => {
    // Implement the logic for rejecting bookings
    // You can call an API endpoint to update the booking status
    toast.success("Booking rejected!", { duration: 3000 });
  };

  return (
    <table className="min-w-full divide-y divide-gray-200 overflow-x-auto">
      <thead className="bg-gray-50">
        <tr>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Room Name
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            User Name
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Date & Time
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Status
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Actions
          </th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {bookings.map((booking: TBooking) => (
          <tr key={booking._id}>
            <td className="px-6 py-4 whitespace-nowrap">
              <div className="text-sm font-medium text-gray-900">
                {booking.roomName}
              </div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              <div className="text-sm text-gray-500">{booking.userName}</div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              <div className="text-sm text-gray-500">
                {new Date(booking.dateTime).toLocaleString()}
              </div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              <div className="text-sm text-gray-500">{booking.status}</div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
              <button
                onClick={() => handleBookingApproval(booking._id as string)}
                className="btn btn-sm mr-2 px-3 py-2 text-white bg-green-500 rounded-md hover:bg-green-600"
              >
                Approve
              </button>
              <button
                onClick={() => handleBookingRejection(booking._id as string)}
                className="btn btn-sm mr-2 px-3 py-2 text-white bg-yellow-500 rounded-md hover:bg-yellow-600"
              >
                Reject
              </button>
              <button
                onClick={() =>
                  handleBookingDelete(
                    booking._id as string,
                    booking.roomName as string
                  )
                }
                className="btn btn-sm px-3 py-2 text-white bg-red-500 rounded-md hover:bg-red-600"
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default BookingListTable;
