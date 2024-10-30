const AdminDashboard = () => {
  return (
    <div>
      <div className="container mx-auto p-6">
        {/* Title */}
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          Dashboard Overview
        </h1>

        {/* Grid of Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition duration-300">
            <h2 className="text-xl font-semibold text-gray-700 mb-2">
              Total Rooms
            </h2>
            <p className="text-3xl font-bold text-blue-600">25</p>
            <p className="text-sm text-gray-500 mt-2">↑ 5% from last month</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition duration-300">
            <h2 className="text-xl font-semibold text-gray-700 mb-2">
              Total Bookings
            </h2>
            <p className="text-3xl font-bold text-green-600">150</p>
            <p className="text-sm text-gray-500 mt-2">↑ 10% from last month</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition duration-300">
            <h2 className="text-xl font-semibold text-gray-700 mb-2">
              Active Users
            </h2>
            <p className="text-3xl font-bold text-purple-600">400</p>
            <p className="text-sm text-gray-500 mt-2">↓ 15 from last month</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition duration-300">
            <h2 className="text-xl font-semibold text-gray-700 mb-2">
              Pending Bookings
            </h2>
            <p className="text-3xl font-bold text-orange-600">45</p>
            <p className="text-sm text-gray-500 mt-2">↑ 20% from last month</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
