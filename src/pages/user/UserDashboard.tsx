import CheckUserInfo from "@/components/CheckUserRole/CheckUserInfo";
import Loading from "@/components/Loading/Loading";
import useCurrentUserData from "@/hoooks/useCurrentData";
import { useGetbookingByUserQuery } from "@/redux/features/booking/bookingApi";
import { useGetRoomsQuery } from "@/redux/features/room/roomApi";
import { TBooking } from "@/types/booking.types";
import { Link } from "react-router-dom";

const UserDashboard = () => {
  const { currentUserInfo, isUserLoading } = useCurrentUserData();
  const { data: rooms, isLoading: isRoomLoading } = useGetRoomsQuery({});
  const { user } = CheckUserInfo();
  const { data: userBookings, isLoading: isBookingLoading } =
    useGetbookingByUserQuery(user?.email);

  if (isUserLoading || isRoomLoading || isBookingLoading) {
    return <Loading />;
  }

  console.log(userBookings);

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
      <div className="bg-green-100 p-4 rounded-lg mb-6">
        <h2 className="text-xl font-semibold text-gray-700">
          Welcome, {currentUserInfo.name || "User"}
        </h2>
        <p className="text-gray-600">
          Here’s a quick overview of your dashboard.
        </p>
      </div>

      {/* Title */}
      <h1 className="text-3xl font-bold text-gray-800 mb-6">User Dashboard</h1>

      {/* Grid of Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        {/* Total Rooms Available */}
        <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition duration-300">
          <h2 className="text-xl font-semibold text-gray-700 mb-2">
            Total Rooms Available
          </h2>
          <p className="text-3xl font-bold text-blue-600 ">
            {rooms?.data?.result?.length}
          </p>
        </div>
        {/* Total Bookings */}
        <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition duration-300">
          <h2 className="text-xl font-semibold text-gray-700 mb-2">
            Total Bookings
          </h2>
          <p className="text-3xl font-bold text-green-600">
            {bookingData.length}
          </p>
        </div>
        {/* Pending Bookings */}
        <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition duration-300">
          <h2 className="text-xl font-semibold text-gray-700 mb-2">
            Pending Bookings
          </h2>
          <p className="text-3xl font-bold text-orange-600">
            {pendingBooking.length}
          </p>
        </div>
        {/* Total Payments Made */}
        <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition duration-300">
          <h2 className="text-xl font-semibold text-gray-700 mb-2">
            Total Payments Made
          </h2>
          <p className="text-3xl font-bold text-purple-600">
            ${totalPayments.toFixed(2)}
          </p>
        </div>
      </div>

      {/* Recent Bookings Section */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
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
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">
          Upcoming Bookings
        </h2>
        {bookingData.length > 0 ? (
          <ul className="space-y-4">
            {bookingData
              .filter(
                (booking: TBooking) => new Date(booking.date) > new Date()
              )
              .slice(0, 5) // Display only the next 5 upcoming bookings
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
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
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
