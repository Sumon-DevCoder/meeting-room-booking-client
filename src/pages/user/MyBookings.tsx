/* eslint-disable @typescript-eslint/no-explicit-any */
import Loading from "@/components/Loading/Loading";
import CheckUserInfo from "@/components/CheckUserRole/CheckUserInfo";
import { useGetbookingByUserQuery } from "@/redux/features/booking/bookingApi";
import { TBooking } from "@/types/booking.types";
import { format } from "date-fns";
import axios from "axios";
import { useGetPaymentByUserQuery } from "@/redux/features/payment/paymentApi";
import { v4 as uuidv4 } from "uuid";
import DataNotAvailable from "@/components/DataNotAvailable/DataNotAvailable";
import useCurrentUserData from "@/hoooks/useCurrentData";
import { TPayment } from "@/types/types.payment";

const MyBookings = () => {
  // import
  const { user } = CheckUserInfo();
  const { data, isLoading } = useGetbookingByUserQuery(user?.email);
  const { data: paymentData, isLoading: isPaymentLoading } =
    useGetPaymentByUserQuery(user?.email);
  const bookings = data?.data || [];
  const paymentDatas = paymentData?.data || [];
  const { currentUserInfo, isUserLoading } = useCurrentUserData();

  // loading
  if (isLoading || isPaymentLoading || isUserLoading) {
    return <Loading />;
  }

  if (bookings?.length === 0) {
    return (
      <DataNotAvailable
        path="/meeting-rooms"
        buttonName="Book Now"
        message="🚫 No bookings yet. 🌟 Find and book your perfect room!"
      />
    );
  }

  console.log(paymentData);

  const tran_id = uuidv4();

  // handle payment
  const handlePayment = async (booking: TBooking) => {
    const data = {
      amount: booking.totalAmount,
      currency: "BDT",
      order_id: booking?._id,
      cus_name: currentUserInfo?.name,
      cus_email: currentUserInfo?.email,
      tran_id,
      cus_phone: currentUserInfo?.phone,
    };

    console.log("data", data);

    try {
      const response = await axios.post(
        "http://localhost:5001/api/payment",
        data
      );

      console.log(response);

      const redirectUrl = response?.data?.paymentUrl;
      if (redirectUrl) {
        window.location.replace(redirectUrl);
      }

      if (response.data && response.data.gateway_page) {
        window.location.href = response.data.gateway_page; // Redirect to payment gateway

        console.log("jjj", response);
      }
    } catch (error) {
      console.error("Payment initiation failed:", error);
      //   dispatch(setPaymentStatus("failed"));
    }
  };

  // Time format function
  const formatTimeWithAMPM = (timeString: string) => {
    const today = new Date();
    const fullDateTimeString = `${
      today.toISOString().split("T")[0]
    }T${timeString}`;
    const date = new Date(fullDateTimeString);
    return format(date, "hh:mm a");
  };

  // Find payment status by booking ID
  const getPaymentStatus = (bookingId: string) => {
    const payment = paymentDatas?.find(
      (p: TPayment) => p.order_id === bookingId
    );
    return payment ? payment.status : "pending"; // Default to "pending" if no status is found
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
          {bookings?.map((booking: TBooking) => (
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
                    formatTimeWithAMPM(booking.slots[0]?.startTime),
                    formatTimeWithAMPM(booking.slots[0]?.endTime),
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
                {getPaymentStatus(booking._id) === "pending" ? (
                  <button
                    onClick={() => handlePayment(booking)}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded"
                  >
                    Pay
                  </button>
                ) : (
                  <span className="text-green-600 font-bold">Paid</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default MyBookings;
