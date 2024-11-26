import Loading from "@/components/Loading/Loading";
import useCurrentUserInfoData from "@/hoooks/useCurrentUserInfoData";
import { useGetbookingByUserQuery } from "@/redux/features/booking/bookingApi";
import { TBooking } from "@/types/booking.types";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";

const UserProfile = () => {
  const { user, isUserLoading } = useCurrentUserInfoData();
  const { data: userBookings, isLoading: isBookingLoading } =
    useGetbookingByUserQuery(user?.email);

  // Initialize AOS once
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
    AOS.refresh();
  }, []);

  if (isUserLoading || isBookingLoading) {
    return <Loading />;
  }

  const bookingData = userBookings?.data || [];
  const pendingBooking = bookingData.filter(
    (booking: TBooking) => booking?.isConfirmed === "unconfirmed"
  );

  const totalPayments = bookingData.reduce(
    (acc: number, item: TBooking) => acc + (item.totalAmount || 0),
    0
  );

  return (
    <div>
      <div className="bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-600 animate-gradient-xy w-full p-4 sm:p-6 lg:p-8 transition-transform duration-300">
        <div className="flex flex-col lg:flex-row justify-between items-center lg:items-start">
          {/* Profile Section */}
          <div className="text-center lg:text-left">
            <div
              className="w-32 h-32 rounded-full overflow-hidden border-4 border-blue-600 transition-transform duration-300 hover:rotate-6 hover:scale-110 mx-auto lg:mx-0"
              data-aos="zoom-in"
            >
              <img
                src={user?.img || "/default-profile.png"}
                alt="User Profile"
                className="object-cover w-full h-full"
              />
            </div>
            <div className="mt-4 text-white">
              <h1
                className="text-2xl sm:text-3xl font-bold"
                data-aos="fade-left"
              >
                {user?.name || "N/A"}
              </h1>
              <p
                className="text-sm sm:text-lg"
                data-aos="fade-left"
                data-aos-delay="200"
              >
                {user?.email || "N/A"}
              </p>
              <p
                className="text-sm mt-1"
                data-aos="fade-left"
                data-aos-delay="400"
              >
                Role: {user?.role === "user" ? "USER" : "Admin"}
              </p>
            </div>
          </div>

          {/* Dashboard Section */}
          <div
            className="user-dashboard w-full lg:w-2/3 mt-6 lg:mt-0 lg:ml-8"
            data-aos="fade-up"
          >
            {/* Title */}
            <h1
              className="text-2xl sm:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 mb-6 animate-gradient text-center lg:text-left"
              data-aos="fade-up"
            >
              User Profile Dashboard
            </h1>

            {/* User Details Section */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Contact Info Card */}
              <div
                className="bg-white/80 backdrop-blur-sm p-4 rounded-lg shadow-sm transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl hover:bg-blue-50"
                data-aos="fade-up"
              >
                <h3 className="text-lg font-semibold text-blue-600 mb-2">
                  Contact Information
                </h3>
                <p className="text-gray-700">
                  <span className="font-bold">Phone:</span>{" "}
                  {user?.phone || "N/A"}
                </p>
                <p className="text-gray-700">
                  <span className="font-bold">Email:</span>{" "}
                  {user?.email || "N/A"}
                </p>
                <p className="text-gray-700">
                  <span className="font-bold">Address:</span>{" "}
                  {user?.address || "N/A"}
                </p>
              </div>

              {/* Additional Info Card */}
              <div
                className="bg-white/80 backdrop-blur-sm p-4 rounded-lg shadow-sm transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl hover:bg-blue-50"
                data-aos="fade-up"
              >
                <h3 className="text-lg font-semibold text-blue-600 mb-2">
                  Additional Information
                </h3>
                <p className="text-gray-700">
                  <span className="font-bold">Role:</span>{" "}
                  {user?.role === "user" ? "USER" : "Admin"}
                </p>
                <p className="text-gray-700">
                  <span className="font-bold">Joined On:</span>{" "}
                  {user?.joinDate || "N/A"}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-6">
          <div className="bg-gradient-to-br from-green-300 to-green-500 rounded-lg shadow-md p-6 hover:shadow-lg transition duration-300">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-2">
              User Status
            </h2>
            <p className="text-2xl sm:text-3xl font-bold text-white">
              {user?.status || "Active"}
            </p>
          </div>
          <div className="bg-gradient-to-br from-blue-300 to-blue-500 rounded-lg shadow-md p-6 hover:shadow-lg transition duration-300">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-2">
              Total Bookings
            </h2>
            <p className="text-2xl sm:text-3xl font-bold text-white">
              {bookingData.length}
            </p>
          </div>
          <div className="bg-gradient-to-br from-yellow-300 to-yellow-500 rounded-lg shadow-md p-6 hover:shadow-lg transition duration-300">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-2">
              Pending Bookings
            </h2>
            <p className="text-2xl sm:text-3xl font-bold text-white">
              {pendingBooking.length}
            </p>
          </div>
          <div className="bg-gradient-to-br from-purple-300 to-purple-500 rounded-lg shadow-md p-6 hover:shadow-lg transition duration-300">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-2">
              Total Payments Made
            </h2>
            <p className="text-2xl sm:text-3xl font-bold text-white">
              ${totalPayments.toFixed(2)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
