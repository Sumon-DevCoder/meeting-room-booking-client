import { useState, useEffect, useRef } from "react";
import { useAppSelector } from "@/redux/hooks";
import { currentUser } from "@/redux/features/auth/authSlice";
import PrimaryButton from "../PrimaryButton/PrimaryButton";
import { Link } from "react-router-dom";

// Import icons from react-icons
import { FaUserCircle } from "react-icons/fa";
import { MdDashboard, MdLogout } from "react-icons/md";
import { BsCalendar2Check } from "react-icons/bs";
import useCurrentUserInfoData from "@/hoooks/useCurrentUserInfoData";
import useHandleLogout from "@/hoooks/useHandleLogout";

const DropdownProfile = () => {
  const { user } = useCurrentUserInfoData(); // Fetch user data
  const stateUser = useAppSelector(currentUser); // Get user from redux store
  const handleLogout = useHandleLogout();

  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // State to track dropdown visibility
  const dropdownRef = useRef<HTMLDivElement | null>(null); // Ref for the dropdown container

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev); // Toggle dropdown visibility
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false); // Close dropdown if clicked outside
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Fallback to Redux state user if user from hook is not available
  const currentUserData = user || stateUser;

  return (
    <div className="relative">
      {currentUserData ? (
        <div className="relative">
          {/* Avatar image */}
          <div
            className="avatar w-10 h-10 rounded-full cursor-pointer"
            onClick={toggleDropdown} // Toggle dropdown visibility
          >
            {currentUserData.img ? (
              <img
                src={currentUserData.img}
                alt="User Avatar"
                className="rounded-full"
              />
            ) : (
              <img
                src="https://i.ibb.co/j8KxL3f/blank-profile-picture-973460-640.png"
                alt="Default Avatar"
                className="rounded-full"
              />
            )}
          </div>

          {/* Dropdown Menu */}
          <div
            ref={dropdownRef}
            className={`absolute -right-4 bg-white border rounded-lg shadow-lg w-48 dark:bg-gray-800 dark:border-gray-600 transition-all duration-300 ease-in-out ${
              isDropdownOpen ? "block" : "hidden"
            }`}
          >
            <div>
              <Link
                to="/user/profile"
                className="block p-2 border-b-2 hover:rounded-md dark:border-gray-700 hover:bg-gray-300 dark:hover:bg-blue-700 focus:outline-none transition duration-200 ease-in-out dark:text-white"
              >
                <FaUserCircle className="inline mr-2" /> {currentUserData.name}
              </Link>
              {currentUserData.role === "admin" ? (
                <Link
                  to="/admin/dashboard"
                  className="block hover:bg-gray-300 p-2 border-b-2 hover:rounded-md dark:border-gray-700 dark:hover:bg-blue-700 focus:outline-none transition duration-200 ease-in-out dark:text-white"
                >
                  <MdDashboard className="inline mr-2" /> Dashboard
                </Link>
              ) : (
                <Link
                  to="/user/my-bookings"
                  className="block hover:bg-gray-300 p-2 border-b-2 dark:border-gray-700 hover:rounded-md dark:hover:bg-blue-700 focus:outline-none transition duration-200 ease-in-out dark:text-white"
                >
                  <BsCalendar2Check className="inline mr-2" /> My Bookings
                </Link>
              )}
              <Link
                to="/login"
                className="block hover:bg-gray-300 p-2 rounded-md dark:hover:bg-blue-700 focus:outline-none transition duration-200 ease-in-out dark:text-white"
                onClick={handleLogout}
              >
                <MdLogout className="inline mr-2" /> Logout
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <PrimaryButton path="/login" name="Login" />
      )}
    </div>
  );
};

export default DropdownProfile;
