import Loading from "@/components/Loading/Loading";
import useCurrentUserInfoData from "@/hoooks/useCurrentUserInfoData";
import { useGetbookingByUserQuery } from "@/redux/features/booking/bookingApi";
import { TBooking } from "@/types/booking.types";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const UserDashboard = () => {
  const { user, isUserLoading } = useCurrentUserInfoData();
  const { data: userBookings, isLoading: isBookingLoading } =
    useGetbookingByUserQuery(user?.email);

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
    });
  }, []);

  if (isBookingLoading || isUserLoading) {
    return <Loading />;
  }

  const bookingData = userBookings?.data || [];
  const pendingBooking = bookingData.filter(
    (booking: TBooking) => booking?.isConfirmed === "unconfirmed"
  );

  const totalPayments = bookingData.reduce((acc: number, item: TBooking) => {
    return acc + (item.totalAmount || 0);
  }, 0);

  return (
    <div className="user-dashboard container mx-auto p-6">
      {/* Welcome Message */}
      <div
        className="bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 text-white p-4 rounded-lg mb-6 shadow-lg"
        data-aos="fade-down"
      >
        <h2 className="text-xl font-semibold gradient-text">
          Welcome, {user?.name || "User"}
        </h2>
        <p className="text-white">Here’s a quick overview of your dashboard.</p>
      </div>

      {/* Title */}
      <h1
        className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 mb-6 animate-gradient"
        data-aos="fade-up"
      >
        User Dashboard
      </h1>

      {/* Grid of Statistics Cards */}
      <div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6"
        data-aos="zoom-in"
      >
        {/* Total Rooms Available */}
        <div className="bg-gradient-to-br from-green-300 to-green-500 rounded-lg shadow-md p-6 hover:shadow-lg transition duration-300">
          <h2 className="text-xl font-semibold text-white mb-2">
            Total Rooms Available
          </h2>
          <p className="text-3xl font-bold text-white">
            {/* {rooms?.data?.result?.length} */}
          </p>
        </div>
        {/* Total Bookings */}
        <div className="bg-gradient-to-br from-blue-300 to-blue-500 rounded-lg shadow-md p-6 hover:shadow-lg transition duration-300">
          <h2 className="text-xl font-semibold text-white mb-2">
            Total Bookings
          </h2>
          <p className="text-3xl font-bold text-white">{bookingData.length}</p>
        </div>
        {/* Pending Bookings */}
        <div className="bg-gradient-to-br from-yellow-300 to-yellow-500 rounded-lg shadow-md p-6 hover:shadow-lg transition duration-300">
          <h2 className="text-xl font-semibold text-white mb-2">
            Pending Bookings
          </h2>
          <p className="text-3xl font-bold text-white">
            {pendingBooking.length}
          </p>
        </div>
        {/* Total Payments Made */}
        <div className="bg-gradient-to-br from-purple-300 to-purple-500 rounded-lg shadow-md p-6 hover:shadow-lg transition duration-300">
          <h2 className="text-xl font-semibold text-white mb-2">
            Total Payments Made
          </h2>
          <p className="text-3xl font-bold text-white">
            ${totalPayments.toFixed(2)}
          </p>
        </div>
      </div>

      {/* Recent Bookings Section */}
      <div
        className="bg-gradient-to-r from-gray-200 via-gray-300 to-gray-400 rounded-lg shadow-md p-6 mb-6"
        data-aos="fade-right"
      >
        <h2 className="text-xl font-semibold text-gray-700 mb-4">
          Recent Bookings
        </h2>
        {bookingData.length > 0 ? (
          <ul className="space-y-4">
            {bookingData.slice(-5).map((booking: TBooking) => (
              <li key={booking?._id} className="flex justify-between">
                <span>{booking?.room?.name}</span>
                <span className="text-gray-500">
                  {new Date(booking.date).toLocaleDateString()} -{" "}
                  {booking.isConfirmed === "confirmed"
                    ? "Confirmed"
                    : "Pending"}
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-600">No recent bookings found.</p>
        )}
      </div>

      {/* Upcoming Bookings Section */}
      <div
        className="bg-gradient-to-r from-gray-200 via-gray-300 to-gray-400 rounded-lg shadow-md p-6 mb-6"
        data-aos="fade-left"
      >
        <h2 className="text-xl font-semibold text-gray-700 mb-4">
          Upcoming Bookings
        </h2>
        {bookingData.length > 0 ? (
          <ul className="space-y-4">
            {bookingData
              .filter(
                (booking: TBooking) => new Date(booking.date) > new Date()
              )
              .slice(0, 5)
              .map((booking: TBooking) => (
                <li key={booking?._id} className="flex justify-between">
                  <span>{booking?.room?.name}</span>
                  <span className="text-gray-500">
                    {new Date(booking.date).toLocaleDateString()} -{" "}
                    {booking.isConfirmed === "confirmed"
                      ? "Confirmed"
                      : "Pending"}
                  </span>
                </li>
              ))}
          </ul>
        ) : (
          <p className="text-gray-600">No upcoming bookings found.</p>
        )}
      </div>

      {/* Quick Access Links Section */}
      <div
        className="bg-gradient-to-r from-gray-200 via-gray-300 to-gray-400 rounded-lg shadow-md p-6 mb-6"
        data-aos="fade-up"
      >
        <h2 className="text-xl font-semibold text-gray-700 mb-4">
          Quick Access
        </h2>
        <ul className="space-y-2">
          <li>
            <Link
              to={"/user/my-bookings"}
              className="text-blue-500 hover:underline"
            >
              View Booking History
            </Link>
          </li>
          <li>
            <Link
              to={"/meeting-rooms"}
              className="text-blue-500 hover:underline"
            >
              Book a Room
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default UserDashboard;
