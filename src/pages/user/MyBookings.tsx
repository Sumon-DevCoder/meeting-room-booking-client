/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {
  useGetbookingByUserQuery,
  useDeletebookingByIdMutation,
} from "@/redux/features/booking/bookingApi";
import { useCreateorderMutation } from "@/redux/features/order/orderApi";
import Swal from "sweetalert2";
import { toast } from "sonner";
import { useEffect } from "react";
import CheckUserInfo from "@/components/CheckUserRole/CheckUserInfo";
import useCurrentUserData from "@/hoooks/useCurrentData";
import Loading from "@/components/Loading/Loading";
import { TError } from "@/types";
import { TBooking } from "@/types/booking.types";
import { format } from "date-fns";

const MyBooking = () => {
  const { user } = CheckUserInfo();

  // import current user info data
  const { currentUserInfo, isUserLoading } = useCurrentUserData();

  // import getBooking by user
  const {
    data: bookingData,
    refetch,
    isLoading,
  } = useGetbookingByUserQuery(user?.email);

  // import create order mutation
  const [createOrder] = useCreateorderMutation();

  // delete order mutation
  const [deletebookingById] = useDeletebookingByIdMutation();
  const bookingItems = bookingData?.data || [];

  // setup refetch
  useEffect(() => {
    refetch();
  }, [refetch]);

  // setup loading
  if (isUserLoading || isLoading) {
    return <Loading />;
  }

  // console.log for checking
  console.log("bookingData", bookingData);
  console.log("currentUserInfo", currentUserInfo);

  // create order
  const handleOrder = async () => {
    const paymentInfo = {
      user: {
        name: currentUserInfo?.name,
        email: currentUserInfo?.email,
        phone: currentUserInfo?.phone,
        address: currentUserInfo?.address,
      },
      bookings: bookingItems,
    };

    try {
      const res = await createOrder(paymentInfo).unwrap();
      if (res.success) {
        console.log(res);
        window.location.href = res.data.payment_url;
      } else {
        console.error("Payment initiation failed:", res.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // delete booking item
  const handleDeleteBooking = (bookingId: string) => {
    // setup sweet alert
    Swal.fire({
      title: "Confirm Deletion",
      text: `Are you sure you want to delete this booking?`,
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
          const res = await deletebookingById(bookingId).unwrap();

          // if success
          if (res && res.message) {
            toast.success(res.message, { id: toastId, duration: 3000 });
            refetch();
          } else {
            toast.error("Unexpected response received.", {
              id: toastId,
              duration: 3000,
            });
          }
          // if fail
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

  const calculateSubtotal = () => {
    return bookingItems.reduce(
      (
        total: any,
        item: {
          [x: string]: any;
          price: any;
        }
      ) => total + item.totalAmount,
      0
    );
  };

  const calculateTotal = () => {
    const subtotal = calculateSubtotal();
    const serviceFee = 15; // Example service fee
    const total = subtotal + serviceFee;
    return total;
  };

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

  return (
    <div className="p-5 space-y-6 md:space-y-0 flex justify-center items-center lg:items-start  flex-col lg:justify-between   lg:flex-row gap-y-5 justify-items-center md:space-x-6">
      {/* Left side: Booking Items */}
      <div className="flex-1">
        <h2 className="text-center text-black mb-4 text-xl font-bold">
          My Bookings
        </h2>
        <table className="min-w-full divide-y divide-gray-200 overflow-x-auto">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Room Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                UserName
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date & Time
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {bookingItems?.map((booking: TBooking) => (
              <tr key={booking?._id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {booking.room.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {booking.user.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {formatDateTime(booking?.date)}
                  {/* {booking?.date} */}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {booking.isConfirmed}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button
                    className="text-red-500 hover:text-red-700 btn btn-sm"
                    onClick={() => handleDeleteBooking(booking._id)}
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Right side: Booking Summary */}
      <div className="w-full md:w-1/3 bg-white p-6 rounded-lg shadow">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">
          Booking Summary
        </h3>
        <div className="mb-4">
          <p className="text-gray-600">
            Subtotal: ${calculateSubtotal().toFixed(2)}
          </p>
          <p className="text-gray-600">Service Fee: $15.00</p>
        </div>
        <div className="border-t border-gray-300 my-4"></div>
        <div className="mb-4">
          <p className="text-lg font-semibold text-gray-800">
            Total: ${calculateTotal().toFixed(2)}
          </p>
        </div>
        <button
          className="w-full bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600"
          onClick={handleOrder}
        >
          Proceed to Payment
        </button>
      </div>
    </div>
  );
};

export default MyBooking;
