/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import {
  useGetbookingByUserQuery,
  useDeletebookingByIdMutation,
} from "@/redux/features/booking/bookingApi";
import { useCreateorderMutation } from "@/redux/features/order/orderApi";
import Swal from "sweetalert2";
import { toast } from "sonner";
import { useEffect } from "react";
import Loading from "@/components/Loading/Loading";
import { TError } from "@/types";
import { TBooking } from "@/types/booking.types";
import { format } from "date-fns";
import useCurrentUserInfoData from "@/hoooks/useCurrentUserInfoData";
import AOS from "aos";
import "aos/dist/aos.css";

const MyBooking = () => {
  const { user, isUserLoading } = useCurrentUserInfoData();

  const {
    data: bookingData,
    refetch,
    isLoading,
  } = useGetbookingByUserQuery(user?.email, { skip: !user?.email });

  const [createOrder] = useCreateorderMutation();
  const [deletebookingById] = useDeletebookingByIdMutation();

  const bookingItems = bookingData?.data || [];

  useEffect(() => {
    AOS.init({ duration: 800, easing: "ease-in-out", once: true });
    if (user?.email) {
      refetch();
    }
  }, [user?.email, refetch]);

  if (isUserLoading || isLoading) {
    return <Loading />;
  }

  const handleOrder = async () => {
    const paymentInfo = {
      user: {
        name: user?.name,
        email: user?.email,
        phone: user?.phone,
        address: user?.address,
      },
      bookings: bookingItems,
    };

    try {
      const res = await createOrder(paymentInfo).unwrap();
      if (res.success) {
        window.location.href = res.data.payment_url;
      } else {
        toast.error("Payment initiation failed.");
      }
    } catch (error) {
      console.error("Order creation error:", error);
      toast.error("Failed to create the order. Please try again.");
    }
  };

  const handleDeleteBooking = (bookingId: string) => {
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
          if (res && res.message) {
            toast.success(res.message, { id: toastId });
            refetch();
          } else {
            toast.error("Unexpected response received.", { id: toastId });
          }
        } catch (err) {
          const serverMsgErr =
            (err as TError)?.data?.message ||
            "An error occurred while deleting the booking. Please try again.";
          toast.error(serverMsgErr, { id: toastId });
        }
      }
    });
  };

  const calculateSubtotal = () => {
    return bookingItems.reduce(
      (total: any, item: { totalAmount: any }) => total + item.totalAmount,
      0
    );
  };

  const calculateTotal = () => {
    const subtotal = calculateSubtotal();
    const serviceFee = 15;
    return subtotal + serviceFee;
  };

  const formatDateTime = (dateTimeString: string) => {
    try {
      const date = new Date(dateTimeString);
      if (isNaN(date.getTime())) throw new Error("Invalid date format");
      const formattedDate = format(date, "yyyy-MM-dd");
      const formattedTime = format(date, "hh:mm a");
      return `${formattedDate} at ${formattedTime}`;
    } catch (error) {
      console.error("Date formatting error:", error);
      return "Invalid date";
    }
  };

  return (
    <div className="p-5 flex flex-col lg:flex-row gap-y-5 gap-x-3">
      {/* Left Side: Booking Items */}
      <div className="flex-1 ">
        <h2 className="text-center text-black dark:text-white mb-4 text-2xl font-bold">
          My Bookings
        </h2>
        {bookingItems.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:bg-gray-800 bg-gradient-to-r from-blue-100 to-purple-200 rounded-lg shadow-md">
              <thead className="bg-gradient-to-r from-purple-300 to-blue-300 dark:from-gray-400 dark:to-gray-300">
                <tr>
                  <th
                    className="px-6 py-3 text-left text-xs font-medium text-gray-800 uppercase"
                    data-aos="fade-down"
                  >
                    Room Name
                  </th>
                  <th
                    className="px-6 py-3 text-left text-xs font-medium text-gray-800 uppercase"
                    data-aos="fade-down"
                  >
                    User Name
                  </th>
                  <th
                    className="px-6 py-3 text-left text-xs font-medium text-gray-800 uppercase hidden md:block"
                    data-aos="fade-down"
                  >
                    Date & Time
                  </th>
                  <th
                    className="px-6 py-3 text-left text-xs font-medium text-gray-800 uppercase"
                    data-aos="fade-down"
                  >
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200">
                {bookingItems.map((booking: TBooking) => (
                  <tr
                    key={booking?._id}
                    className={`transition duration-200 text-black dark:text-white`}
                  >
                    <td className="px-6 py-4 text-sm font-medium text-black dark:text-white">
                      {booking?.room?.name}
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-black dark:text-white">
                      {booking?.user?.name}
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-black dark:text-white hidden md:block">
                      {formatDateTime(booking?.date)}
                    </td>
                    <td className="px-6 py-4">
                      <button
                        className="text-red-500 hover:text-red-700 btn btn-sm transition duration-200 transform hover:scale-105"
                        onClick={() => handleDeleteBooking(booking?._id)}
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p
            className="text-center text-black dark:text-white animate-fade-in"
            data-aos="fade-up"
          >
            No items available.
          </p>
        )}
      </div>

      {/* Right Side: Booking Summary */}
      <div className="w-full md:w-1/3 bg-slate-100 dark:bg-slate-800 p-6 rounded-lg shadow-lg">
        <h3 className="text-lg font-bold text-gray-800 dark:text-gray-200 mb-3">
          Booking Summary
        </h3>
        <div className="mb-3">
          <p className="text-gray-700 dark:text-gray-300">
            Subtotal: ${calculateSubtotal().toFixed(2)}
          </p>
          <p className="text-gray-700 dark:text-gray-300">
            Service Fee: $15.00
          </p>
        </div>
        <div className="border-t border-gray-300 dark:border-gray-700 my-3"></div>
        <div className="mb-3">
          <p className="text-lg font-bold text-gray-800 dark:text-gray-200">
            Total: ${calculateTotal().toFixed(2)}
          </p>
        </div>
        <button
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 transition duration-200"
          onClick={handleOrder}
        >
          Proceed to Payment
        </button>
      </div>
    </div>
  );
};

export default MyBooking;
