import React, { useEffect } from "react";
import Loading from "@/components/Loading/Loading";
import useCurrentUserInfoData from "@/hoooks/useCurrentUserInfoData";
import AOS from "aos";
import "aos/dist/aos.css"; // Import AOS styles

const UserProfile = () => {
  const { user, isUserLoading } = useCurrentUserInfoData();

  // Initialize AOS
  useEffect(() => {
    AOS.init({ duration: 1000 }); // Set the animation duration
    AOS.refresh(); // Refresh AOS when component updates
  }, []);

  if (isUserLoading) {
    return <Loading />;
  }

  return (
    <div className="bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-600 animate-gradient-xy shadow-lg rounded-lg w-full p-4 transition-transform duration-300">
      {/* Profile Header */}
      <div
        className="flex items-center gap-6 mb-8 border-b pb-6"
        data-aos="fade-up"
      >
        <div
          className="w-32 h-32 rounded-full overflow-hidden border-4 border-blue-600 transition-transform duration-300 hover:rotate-6 hover:scale-110 transform"
          data-aos="zoom-in"
        >
          <img
            src={user?.img || "/default-profile.png"}
            alt="User Profile"
            className="object-cover w-full h-full"
          />
        </div>
        <div className="flex-grow text-white">
          <h1 className="text-3xl font-bold" data-aos="fade-left">
            {user?.name || "N/A"}
          </h1>
          <p className="text-lg" data-aos="fade-left" data-aos-delay="200">
            {user?.email || "N/A"}
          </p>
          <p className="text-sm mt-1" data-aos="fade-left" data-aos-delay="400">
            Role: {user?.role === "user" ? "USER" : "Admin"}
          </p>
        </div>
      </div>

      {/* User Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div
          className="bg-white/80 backdrop-blur-sm p-4 rounded-lg shadow-sm transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl hover:bg-blue-50"
          data-aos="fade-up"
        >
          <h3
            className="text-lg font-semibold text-blue-600 mb-2"
            data-aos="slide-right"
          >
            Contact Information
          </h3>
          <p
            className="text-gray-700"
            data-aos="fade-left"
            data-aos-delay="100"
          >
            <span className="font-bold">Phone:</span> {user?.phone || "N/A"}
          </p>
          <p
            className="text-gray-700"
            data-aos="fade-left"
            data-aos-delay="200"
          >
            <span className="font-bold">Email:</span> {user?.email || "N/A"}
          </p>
          <p
            className="text-gray-700"
            data-aos="fade-left"
            data-aos-delay="300"
          >
            <span className="font-bold">Address:</span> {user?.address || "N/A"}
          </p>
        </div>
        <div
          className="bg-white/80 backdrop-blur-sm p-4 rounded-lg shadow-sm transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl hover:bg-blue-50"
          data-aos="fade-up"
        >
          <h3
            className="text-lg font-semibold text-blue-600 mb-2"
            data-aos="slide-right"
          >
            Additional Information
          </h3>
          <p
            className="text-gray-700"
            data-aos="fade-left"
            data-aos-delay="100"
          >
            <span className="font-bold">Role:</span>{" "}
            {user?.role === "user" ? "USER" : "Admin"}
          </p>
          <p
            className="text-gray-700"
            data-aos="fade-left"
            data-aos-delay="200"
          >
            <span className="font-bold">Joined On:</span>{" "}
            {user?.joinDate || "N/A"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
