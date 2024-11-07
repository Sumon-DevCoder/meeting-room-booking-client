import AdminDashboardChart from "@/components/AdminDashboardChart/AdminDashboardChart";
import Loading from "@/components/Loading/Loading";
import useCurrentUserData from "@/hoooks/useCurrentData";
import { useGetAllbookingQuery } from "@/redux/features/booking/bookingApi";
import { useGetRoomsQuery } from "@/redux/features/room/roomApi";
import { useGetUsersQuery } from "@/redux/features/user/userApi";
import { TBooking } from "@/types/booking.types";

const AdminDashboard = () => {
  const { currentUserInfo, isUserLoading } = useCurrentUserData();
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

  //   Sample data for the chart (you might want to replace this with actual data)
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
      <div className="bg-blue-100 p-4 rounded-lg mb-6">
        <h2 className="text-xl font-semibold text-gray-700">
          Welcome, {currentUserInfo?.name || "Admin"} (Admin)
        </h2>
        <p className="text-gray-600">
          Here’s a quick overview of your dashboard.
        </p>
      </div>

      {/* Title */}
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Admin Dashboard</h1>

      {/* Grid of Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        {/* Total Rooms */}
        <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition duration-300">
          <h2 className="text-xl font-semibold text-gray-700 mb-2">
            Total Rooms
          </h2>
          <p className="text-3xl font-bold text-blue-600 ">
            {data?.data?.result?.length}
          </p>
          <p className="text-sm text-gray-500 mt-2">↑ 5% from last month</p>
        </div>
        {/* Total Bookings */}
        <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition duration-300">
          <h2 className="text-xl font-semibold text-gray-700 mb-2">
            Total Bookings
          </h2>
          <p className="text-3xl font-bold text-green-600">
            {bookingData?.length}
          </p>
          <p className="text-sm text-gray-500 mt-2">↑ 10% from last month</p>
        </div>
        {/* Active Users */}
        <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition duration-300">
          <h2 className="text-xl font-semibold text-gray-700 mb-2">
            Active Users
          </h2>
          <p className="text-3xl font-bold text-purple-600">
            {usersData?.data?.result?.length}
          </p>
          <p className="text-sm text-gray-500 mt-2">↓ 15 from last month</p>
        </div>
        {/* Pending Bookings */}
        <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition duration-300">
          <h2 className="text-xl font-semibold text-gray-700 mb-2">
            Pending Bookings
          </h2>
          <p className="text-3xl font-bold text-orange-600">
            {pendingBooking?.length}
          </p>
          <p className="text-sm text-gray-500 mt-2">↑ 20% from last month</p>
        </div>
      </div>

      {/* Chart Section */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">
          Bookings Overview
        </h2>
        <AdminDashboardChart data={chartData} />
      </div>

      {/* Overall Progress Section */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">
          Overall Progress
        </h2>
        <div className="flex flex-col space-y-4">
          <div className="flex justify-between">
            <span>Total Rooms Booked</span>
            <span>
              {bookingData?.data?.result?.length} / {data?.data?.result?.length}
            </span>
          </div>
          <div className="bg-gray-200 h-4 rounded">
            <div
              className="bg-blue-600 h-full rounded"
              style={{
                width: `${
                  (bookingData?.data?.result?.length /
                    data?.data?.result?.length || 0) * 100
                }%`,
              }}
            ></div>
          </div>
          <div className="flex justify-between">
            <span>Active Users</span>
            <span>{usersData?.data?.result?.length}</span>
          </div>
          <div className="bg-gray-200 h-4 rounded">
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
