import AdminDashboardChart from "@/components/AdminDashboardChart/AdminDashboardChart";
import Loading from "@/components/Loading/Loading";
import useCurrentUserData from "@/hoooks/useCurrentUserInfoData";
import { useGetAllbookingQuery } from "@/redux/features/booking/bookingApi";
import { useGetRoomsQuery } from "@/redux/features/room/roomApi";
import { useGetUsersQuery } from "@/redux/features/user/userApi";
import { TBooking } from "@/types/booking.types";
import { Fade, Slide, Zoom } from "react-awesome-reveal";
import { FaBed, FaCalendarCheck, FaUsers, FaClock } from "react-icons/fa";

const AdminDashboard = () => {
  const { user, isUserLoading } = useCurrentUserData();
  const { data, isLoading: isRoomLoading } = useGetRoomsQuery({});
  const { data: bookings, isLoading: isBookingLoading } = useGetAllbookingQuery(
    {}
  );
  const { data: usersData, isLoading: isUsersLoading } = useGetUsersQuery({});

  if (isUserLoading || isRoomLoading || isBookingLoading || isUsersLoading) {
    return <Loading />;
  }

  const bookingData = bookings?.data?.result;
  const pendingBooking = bookingData?.filter(
    (booking: TBooking) => booking?.isConfirmed === "unconfirmed"
  );

  const chartData = [
    { month: "Jan", bookings: 30 },
    { month: "Feb", bookings: 45 },
    { month: "Mar", bookings: 60 },
    { month: "Apr", bookings: 75 },
    { month: "May", bookings: 90 },
    { month: "Jun", bookings: 120 },
  ];

  return (
    <div className="admin-dashboard container mx-auto p-6 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-200">
      {/* Welcome Section */}
      <Fade>
        <div className="bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 text-white p-6 rounded-xl shadow-lg mb-8">
          <h2 className="text-2xl font-semibold">{`Welcome, ${
            user?.name || "Admin"
          }`}</h2>
          <p className="text-lg">Here’s a quick overview of your dashboard.</p>
        </div>
      </Fade>

      {/* Title Section */}
      <Slide direction="up">
        <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 mb-8">
          Admin Dashboard
        </h1>
      </Slide>

      {/* Stats Grid Section */}
      <Zoom>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Total Rooms */}
          <Fade>
            <div className="bg-gradient-to-br from-green-300 to-green-500 text-white rounded-lg shadow-lg p-6 flex justify-between items-center transition-transform transform hover:scale-105">
              <div>
                <h3 className="text-xl font-semibold">Total Rooms</h3>
                <p className="text-3xl font-bold">
                  {data?.data?.result?.length}
                </p>
                <p className="text-sm text-gray-300">↑ 5% from last month</p>
              </div>
              <FaBed className="text-4xl" />
            </div>
          </Fade>

          {/* Total Bookings */}
          <Fade>
            <div className="bg-gradient-to-br from-blue-300 to-blue-500 text-white rounded-lg shadow-lg p-6 flex justify-between items-center transition-transform transform hover:scale-105">
              <div>
                <h3 className="text-xl font-semibold">Total Bookings</h3>
                <p className="text-3xl font-bold">{bookingData?.length}</p>
                <p className="text-sm text-gray-300">↑ 10% from last month</p>
              </div>
              <FaCalendarCheck className="text-4xl" />
            </div>
          </Fade>

          {/* Active Users */}
          <Fade>
            <div className="bg-gradient-to-br from-purple-300 to-purple-500 text-white rounded-lg shadow-lg p-6 flex justify-between items-center transition-transform transform hover:scale-105">
              <div>
                <h3 className="text-xl font-semibold">Active Users</h3>
                <p className="text-3xl font-bold">
                  {usersData?.data?.result?.length}
                </p>
                <p className="text-sm text-gray-300">↓ 15 from last month</p>
              </div>
              <FaUsers className="text-4xl" />
            </div>
          </Fade>

          {/* Pending Bookings */}
          <Fade>
            <div className="bg-gradient-to-br from-yellow-300 to-yellow-500 text-white rounded-lg shadow-lg p-6 flex justify-between items-center transition-transform transform hover:scale-105">
              <div>
                <h3 className="text-xl font-semibold">Pending Bookings</h3>
                <p className="text-3xl font-bold">{pendingBooking?.length}</p>
                <p className="text-sm text-gray-300">↑ 20% from last month</p>
              </div>
              <FaClock className="text-4xl" />
            </div>
          </Fade>
        </div>
      </Zoom>

      {/* Chart Section */}
      <div className="bg-gray-100 dark:bg-gray-800 rounded-lg shadow-lg p-8 mb-8">
        <h3 className="text-2xl font-semibold text-gray-700 dark:text-gray-300 mb-4">
          Bookings Overview
        </h3>
        <AdminDashboardChart data={chartData} />
      </div>

      {/* Bookings Table Section */}
      <div className="bg-gray-100 dark:bg-gray-800 rounded-lg shadow-lg p-8 mb-8">
        <h3 className="text-2xl font-semibold text-gray-700 dark:text-gray-300 mb-4">
          Recent Bookings
        </h3>
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto text-sm">
            <thead>
              <tr className="bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300">
                <th className="px-4 py-2 text-left">Booking ID</th>
                <th className="px-4 py-2 text-left">User</th>
                <th className="px-4 py-2 text-left">Room</th>
                <th className="px-4 py-2 text-left">Date</th>
                <th className="px-4 py-2 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {bookingData?.map((booking: TBooking) => (
                <tr
                  key={booking._id}
                  className="border-b border-gray-300 dark:border-gray-600"
                >
                  <td className="px-4 py-2">{booking._id}</td>
                  <td className="px-4 py-2">{booking.user?.name}</td>
                  <td className="px-4 py-2">{booking.room?.name}</td>
                  <td className="px-4 py-2">
                    {new Date(booking.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-2">
                    {booking.isConfirmed === "unconfirmed"
                      ? "Pending"
                      : "Confirmed"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Overall Progress Section */}
      <div className="bg-gray-100 dark:bg-gray-800 rounded-lg shadow-lg p-8 mb-8">
        <h3 className="text-2xl font-semibold text-gray-700 dark:text-gray-300 mb-6 text-center sm:text-left">
          Overall Progress
        </h3>
        <div className="space-y-8">
          {/* Total Rooms Booked */}
          <Fade>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600 dark:text-gray-400">
                Total Rooms Booked
              </span>
              <span className="text-sm font-semibold text-gray-800 dark:text-gray-200">
                {bookingData?.length} / {data?.data?.result?.length}
              </span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 h-4 rounded">
              <div
                className="bg-blue-600 dark:bg-blue-400 h-full rounded"
                style={{
                  width: `${
                    ((bookingData?.length || 0) /
                      (data?.data?.result?.length || 1)) *
                    100
                  }%`,
                }}
              ></div>
            </div>
          </Fade>

          {/* Active Users */}
          <Fade>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600 dark:text-gray-400">
                Active Users
              </span>
              <span className="text-sm font-semibold text-gray-800 dark:text-gray-200">
                {usersData?.data?.result?.length}
              </span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 h-4 rounded">
              <div
                className="bg-purple-600 dark:bg-purple-400 h-full rounded"
                style={{
                  width: `${
                    (usersData?.data?.result?.length / 100 || 0) * 100
                  }%`,
                }}
              ></div>
            </div>
          </Fade>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
