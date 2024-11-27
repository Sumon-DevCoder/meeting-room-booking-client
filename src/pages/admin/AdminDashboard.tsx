import AdminDashboardChart from "@/components/AdminDashboardChart/AdminDashboardChart";
import Loading from "@/components/Loading/Loading";
import useCurrentUserData from "@/hoooks/useCurrentUserInfoData";
import { useGetAllbookingQuery } from "@/redux/features/booking/bookingApi";
import { useGetRoomsQuery } from "@/redux/features/room/roomApi";
import { useGetUsersQuery } from "@/redux/features/user/userApi";
import { TBooking } from "@/types/booking.types";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const AdminDashboard = () => {
  const { user, isUserLoading } = useCurrentUserData();
  const { data, isLoading: isRoomLoading } = useGetRoomsQuery({});
  const { data: bookings, isLoading: isBookingLoading } = useGetAllbookingQuery(
    {}
  );
  const { data: usersData, isLoading: isUsersLoading } = useGetUsersQuery({});

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
    });
  }, []);

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
    <div className="admin-dashboard container mx-auto p-6">
      {/* Welcome Message */}
      <div
        className="bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 text-white p-4 rounded-lg mb-6 shadow-lg"
        data-aos="fade-down"
      >
        <h2 className="text-xl font-semibold">
          Welcome, {user?.name || "Admin"} (Admin)
        </h2>
        <p>Here’s a quick overview of your dashboard.</p>
      </div>

      {/* Title */}
      <h1
        className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 mb-6 animate-gradient"
        data-aos="fade-up"
      >
        Admin Dashboard
      </h1>

      {/* Grid of Statistics Cards */}
      <div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6"
        data-aos="zoom-in"
      >
        {/* Total Rooms */}
        <div className="bg-gradient-to-br from-green-300 to-green-500 text-white rounded-lg shadow-md p-6 hover:shadow-lg transition duration-300">
          <h2 className="text-xl font-semibold mb-2">Total Rooms</h2>
          <p className="text-3xl font-bold">{data?.data?.result?.length}</p>
          <p className="text-sm mt-2">↑ 5% from last month</p>
        </div>
        {/* Total Bookings */}
        <div className="bg-gradient-to-br from-blue-300 to-blue-500 text-white rounded-lg shadow-md p-6 hover:shadow-lg transition duration-300">
          <h2 className="text-xl font-semibold mb-2">Total Bookings</h2>
          <p className="text-3xl font-bold">{bookingData?.length}</p>
          <p className="text-sm mt-2">↑ 10% from last month</p>
        </div>
        {/* Active Users */}
        <div className="bg-gradient-to-br from-purple-300 to-purple-500 text-white rounded-lg shadow-md p-6 hover:shadow-lg transition duration-300">
          <h2 className="text-xl font-semibold mb-2">Active Users</h2>
          <p className="text-3xl font-bold">
            {usersData?.data?.result?.length}
          </p>
          <p className="text-sm mt-2">↓ 15 from last month</p>
        </div>
        {/* Pending Bookings */}
        <div className="bg-gradient-to-br from-yellow-300 to-yellow-500 text-white rounded-lg shadow-md p-6 hover:shadow-lg transition duration-300">
          <h2 className="text-xl font-semibold mb-2">Pending Bookings</h2>
          <p className="text-3xl font-bold">{pendingBooking?.length}</p>
          <p className="text-sm mt-2">↑ 20% from last month</p>
        </div>
      </div>

      {/* Chart Section */}
      <div
        className="bg-gradient-to-r from-gray-100 via-gray-200 to-gray-300 rounded-lg shadow-md p-6 mb-6"
        data-aos="fade-right"
      >
        <h2 className="text-xl font-semibold text-gray-700 mb-4">
          Bookings Overview
        </h2>
        <AdminDashboardChart data={chartData} />
      </div>

      {/* Overall Progress Section */}
      <div
        className="bg-gradient-to-r from-gray-100 via-gray-200 to-gray-300 rounded-lg shadow-md p-6 mb-6"
        data-aos="fade-left"
      >
        <h2 className="text-xl font-semibold text-gray-700 mb-4 text-center sm:text-left">
          Overall Progress
        </h2>
        <div className="flex flex-col space-y-6">
          {/* Total Rooms Booked */}
          <div className="flex flex-wrap justify-between items-center gap-2">
            <span className="text-sm font-medium text-gray-600">
              Total Rooms Booked
            </span>
            <span className="text-sm font-semibold text-gray-800">
              {bookingData?.length} / {data?.data?.result?.length}
            </span>
          </div>
          <div className="w-full bg-gray-200 h-4 rounded">
            <div
              className="bg-blue-600 h-full rounded max-w-screen-lg"
              style={{
                width: `${
                  ((bookingData?.length || 0) /
                    (data?.data?.result?.length || 1)) *
                  100
                }%`,
              }}
            ></div>
          </div>

          {/* Active Users */}
          <div className="flex flex-wrap justify-between items-center gap-2">
            <span className="text-sm font-medium text-gray-600">
              Active Users
            </span>
            <span className="text-sm font-semibold text-gray-800">
              {usersData?.data?.result?.length}
            </span>
          </div>
          <div className="w-full bg-gray-200 h-4 rounded">
            <div
              className="bg-purple-600 h-full rounded"
              style={{
                width: `${(usersData?.data?.result?.length / 100 || 0) * 100}%`,
              }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
