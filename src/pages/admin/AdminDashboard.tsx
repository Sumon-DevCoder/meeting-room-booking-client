import AdminDashboardChart from "@/components/AdminDashboardChart/AdminDashboardChart";
import Loading from "@/components/Loading/Loading";
import useCurrentUserData from "@/hoooks/useCurrentUserInfoData";
import { useGetAllbookingQuery } from "@/redux/features/booking/bookingApi";
import { useGetRoomsQuery } from "@/redux/features/room/roomApi";
import { useGetUsersQuery } from "@/redux/features/user/userApi";
import { TBooking } from "@/types/booking.types";
import { Fade, Slide, Zoom } from "react-awesome-reveal";

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
      {/* Welcome Message */}
      <Fade>
        <div className="bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 text-white p-4 rounded-lg mb-6 shadow-lg">
          <h2 className="text-xl font-semibold">
            Welcome, {user?.name || "Admin"} (Admin)
          </h2>
          <p>Here’s a quick overview of your dashboard.</p>
        </div>
      </Fade>

      {/* Title */}
      <Slide direction="up">
        <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 mb-6 animate-gradient">
          Admin Dashboard
        </h1>
      </Slide>

      {/* Grid of Statistics Cards */}
      <Zoom>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <Fade>
            {/* Total Rooms */}
            <div className="bg-gradient-to-br from-green-300 to-green-500 text-white dark:from-green-600 dark:to-green-800 rounded-lg shadow-md p-6 hover:shadow-lg transition duration-300">
              <h2 className="text-xl font-semibold mb-2">Total Rooms</h2>
              <p className="text-3xl font-bold">{data?.data?.result?.length}</p>
              <p className="text-sm mt-2">↑ 5% from last month</p>
            </div>
          </Fade>
          <Fade>
            {/* Total Bookings */}
            <div className="bg-gradient-to-br from-blue-300 to-blue-500 text-white dark:from-blue-600 dark:to-blue-800 rounded-lg shadow-md p-6 hover:shadow-lg transition duration-300">
              <h2 className="text-xl font-semibold mb-2">Total Bookings</h2>
              <p className="text-3xl font-bold">{bookingData?.length}</p>
              <p className="text-sm mt-2">↑ 10% from last month</p>
            </div>
          </Fade>
          <Fade>
            {/* Active Users */}
            <div className="bg-gradient-to-br from-purple-300 to-purple-500 text-white dark:from-purple-600 dark:to-purple-800 rounded-lg shadow-md p-6 hover:shadow-lg transition duration-300">
              <h2 className="text-xl font-semibold mb-2">Active Users</h2>
              <p className="text-3xl font-bold">
                {usersData?.data?.result?.length}
              </p>
              <p className="text-sm mt-2">↓ 15 from last month</p>
            </div>
          </Fade>
          <Fade>
            {/* Pending Bookings */}
            <div className="bg-gradient-to-br from-yellow-300 to-yellow-500 text-white dark:from-yellow-600 dark:to-yellow-800 rounded-lg shadow-md p-6 hover:shadow-lg transition duration-300">
              <h2 className="text-xl font-semibold mb-2">Pending Bookings</h2>
              <p className="text-3xl font-bold">{pendingBooking?.length}</p>
              <p className="text-sm mt-2">↑ 20% from last month</p>
            </div>
          </Fade>
        </div>
      </Zoom>

      {/* Chart Section */}
      <div className="bg-gray-100 dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-4">
          Bookings Overview
        </h2>
        <AdminDashboardChart data={chartData} />
      </div>

      {/* Overall Progress Section */}
      <div className="bg-gray-100 dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-4 text-center sm:text-left">
          Overall Progress
        </h2>
        <div className="flex flex-col space-y-6">
          {/* Total Rooms Booked */}
          <Fade>
            <div className="flex flex-wrap justify-between items-center gap-2">
              <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Total Rooms Booked
              </span>
              <span className="text-sm font-semibold text-gray-800 dark:text-gray-200">
                {bookingData?.length} / {data?.data?.result?.length}
              </span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 h-4 rounded">
              <div
                className="bg-blue-600 dark:bg-blue-400 h-full rounded max-w-screen-lg"
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
            <div className="flex flex-wrap justify-between items-center gap-2">
              <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
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
