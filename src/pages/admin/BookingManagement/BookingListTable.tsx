import {
  useDeletebookingByIdMutation,
  useGetAllbookingQuery,
} from "@/redux/features/booking/bookingApi";
import Loading from "@/components/Loading/Loading";
import { TBooking } from "@/types/booking.types";
import { format } from "date-fns";
import Swal from "sweetalert2";
import { toast } from "sonner";
import { TError } from "@/types";
import axiosInstance from "@/config/axiosInstance";

const BookingList = () => {
  const {
    data: bookingData,
    isLoading: isBookingLoading,
    refetch,
  } = useGetAllbookingQuery({});
  const [deleteBookingById] = useDeletebookingByIdMutation();

  const bookings = bookingData?.data?.result || [];

  if (isBookingLoading) {
    return <Loading />;
  }

  console.log(bookings);

  // Time format
  const formatDateTime = (dateTimeString: string) => {
    try {
      // Create a Date object from the provided string
      const date = new Date(dateTimeString);

      // Validate the date
      if (isNaN(date.getTime())) {
        throw new Error("Invalid date format");
      }

      // Format the date and time separately
      const formattedDate = format(date, "yyyy-MM-dd"); // Adjust format as needed
      const formattedTime = format(date, "hh:mm a"); // Format time as AM/PM

      return `${formattedDate} at ${formattedTime}`;
    } catch (error) {
      console.error(
        "Date and time formatting error:",
        error,
        "Original dateTimeString:",
        dateTimeString
      );
      return "Invalid date";
    }
  };

  // Handle booking status update
  const handleStatusChange = async (booking: TBooking, status: string) => {
    try {
      const res = await axiosInstance.put(`/bookings/${booking?._id}`, {
        isConfirmed: status,
      });
      console.log("res", res);
      toast.success(`booking updated successful`);
      refetch();
    } catch (error) {
      console.error("Failed to update booking status:", error);
      const errorMsg =
        (error as TError)?.data?.message ||
        "Failed to update booking status. Please try again.";
      toast.error(errorMsg);
    }
  };

  // Handle booking deletion
  const handleDeleteBooking = async (booking: TBooking) => {
    Swal.fire({
      title: "Confirm Deletion",
      text: `Are you sure you want to delete the booking for room "${booking?.room?.name}"?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Delete",
      cancelButtonText: "Cancel",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const toastId = toast.loading("Deleting booking...");

        try {
          const response = await deleteBookingById(booking._id).unwrap();
          if (response?.message) {
            toast.success(response.message, { id: toastId });
          } else {
            toast.error("Unexpected response received.", { id: toastId });
          }
        } catch (err) {
          const serverErrorMsg =
            (err as TError)?.data?.message ||
            "An error occurred while deleting the booking. Please try again.";
          toast.error(serverErrorMsg, { id: toastId });
        }
      }
    });
  };

  return (
    <div className="p-4">
      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700 overflow-x-auto">
        <thead className="bg-gray-50 dark:bg-gray-800">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">
              Room Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">
              User Name
            </th>
            <th className="px-6 py-3 text-xs font-medium text-gray-500 dark:text-gray-300 uppercase text-center">
              Date & Time
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">
              Status
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
          {bookings.map((booking: TBooking) => (
            <tr key={booking?._id}>
              <td className="px-6 py-4 whitespace-nowrap text-gray-900 dark:text-gray-100">
                {booking.room?.name}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-gray-900 dark:text-gray-100">
                {booking.user?.name}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-gray-500 dark:text-gray-400">
                {formatDateTime(booking?.date)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <span
                  className={
                    booking.isConfirmed === "confirmed"
                      ? "text-green-600"
                      : "text-red-600"
                  }
                >
                  {booking.isConfirmed}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {booking.isConfirmed === "unconfirmed" ? (
                  <button
                    onClick={() => handleStatusChange(booking, "confirmed")}
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-3 rounded"
                  >
                    Approve
                  </button>
                ) : (
                  <button
                    onClick={() => handleStatusChange(booking, "unconfirmed")}
                    className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-5 rounded"
                  >
                    Reject
                  </button>
                )}
                <button
                  onClick={() => handleDeleteBooking(booking)}
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 ml-2 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BookingList;
