import {
  useDeletebookingByIdMutation,
  useGetAllbookingQuery,
  useUpdatebookingByIdMutation,
} from "@/redux/features/booking/bookingApi";
import Loading from "@/components/Loading/Loading";
import { TBooking } from "@/types/booking.types";
import { format } from "date-fns";
import Swal from "sweetalert2";
import { toast } from "sonner";
import { TError } from "@/types";

const BookingList = () => {
  const { data: bookingData, isLoading: isBookingLoading } =
    useGetAllbookingQuery({});
  const [updatebookingById] = useUpdatebookingByIdMutation();
  const [deletebookingById] = useDeletebookingByIdMutation();

  const bookings = bookingData?.data?.result || [];

  console.log(bookings);

  if (isBookingLoading) {
    return <Loading />;
  }

  // Date and time formatting
  const formatDateTime = (dateString: string, timeString: string) => {
    const date = new Date(dateString);
    return `${date.toLocaleDateString()} ${format(
      new Date(`${date.toISOString().split("T")[0]}T${timeString}`),
      "hh:mm a"
    )}`;
  };

  // Handle booking status update
  const handleStatusChange = async (booking: TBooking, status: string) => {
    try {
      await updatebookingById({ id: booking._id, status }).unwrap();
      alert(`Booking has been ${status}`);
    } catch (error) {
      console.error("Failed to update booking status:", error);
    }
  };

  // Handle booking deletion
  const handleDeleteboking = async (booking: TBooking) => {
    Swal.fire({
      title: "Confirm Deletion",
      text: `Are you sure you want to delete the room "${
        booking?.room?.name as string
      }"?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Delete",
      cancelButtonText: "Cancel",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const toastId = toast.loading("Deleting Booking...");

        try {
          const res = await deletebookingById(booking?._id).unwrap();

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
            "An error occurred while deleting the room. Please try again.";

          toast.error(serverMsgErr, {
            id: toastId,
            duration: 3000,
          });
        }
      }
    });
  };

  return (
    <table className="min-w-full divide-y divide-gray-200 overflow-x-auto">
      <thead className="bg-gray-50 ">
        <tr className="">
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
            Room Name
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
            User Name
          </th>
          <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase text-center">
            Date & Time
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
            Status
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
            Actions
          </th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {bookings.map((booking: TBooking) => (
          <tr key={booking._id}>
            <td className="px-6 py-4 whitespace-nowrap">{booking.room.name}</td>
            <td className="px-6 py-4 whitespace-nowrap">{booking.user.name}</td>
            <td className="px-6 py-4 whitespace-nowrap">
              {formatDateTime(booking.date, booking.slots[0]?.startTime)} -{" "}
              {formatDateTime(booking.date, booking.slots[0]?.endTime)}
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
                  className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-3 rounded"
                >
                  Reject
                </button>
              )}
              <button
                onClick={() => handleDeleteboking(booking)}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 ml-2 rounded"
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

export default BookingList;
