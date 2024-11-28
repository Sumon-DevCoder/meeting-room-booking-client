/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";
import { currentUser, logout } from "@/redux/features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import PrimaryButton from "../PrimaryButton/PrimaryButton";
import { Link } from "react-router-dom";

// Import icons from react-icons
import { FaUserCircle } from "react-icons/fa";
import { MdDashboard, MdLogout } from "react-icons/md";
import { BsCalendar2Check } from "react-icons/bs";
import { motion } from "framer-motion";
import useCurrentUserInfoData from "@/hoooks/useCurrentUserInfoData";

const DropdownProfile = () => {
  const dispatch = useAppDispatch();
  const { user } = useCurrentUserInfoData(); // Fetch user data
  const stateUser = useAppSelector(currentUser); // Get user from redux store

  // Fallback to Redux state user if user from hook is not available
  const currentUserData = user || stateUser;

  const handleLogout = async () => {
    try {
      dispatch(logout());
      toast.success("Logout Successful");
    } catch (err: any) {
      toast.error("Logout Failed. Please try again.");
    }
  };

  return (
    <div>
      {currentUserData ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <div className="avatar">
                <div className="w-10 rounded-full">
                  {currentUserData.img ? (
                    <img src={currentUserData.img} alt="User Avatar" />
                  ) : (
                    <img
                      src="https://i.ibb.co/j8KxL3f/blank-profile-picture-973460-640.png"
                      alt="Default Avatar"
                    />
                  )}
                </div>
              </div>
            </motion.div>
          </DropdownMenuTrigger>
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <DropdownMenuContent className="bg-gradient-to-r from-slate-500 via-slate-500 text-white rounded-lg shadow-lg p-3 mr-6">
              <DropdownMenuLabel>
                <Link
                  to="/user/dashboard"
                  className="hover:text-blue-400 hover:underline"
                >
                  <FaUserCircle className="inline mr-2" />{" "}
                  {currentUserData.name}
                </Link>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              {currentUserData.role === "admin" ? (
                <DropdownMenuItem>
                  <Link
                    to="/admin/dashboard"
                    className="hover:text-blue-400 hover:underline"
                  >
                    <MdDashboard className="inline mr-2" /> Dashboard
                  </Link>
                </DropdownMenuItem>
              ) : (
                <DropdownMenuItem>
                  <Link
                    to="/user/my-bookings"
                    className="hover:text-blue-400 hover:underline"
                  >
                    <BsCalendar2Check className="inline mr-2" /> My Bookings
                  </Link>
                </DropdownMenuItem>
              )}
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="cursor-pointer hover:text-blue-400 hover:underline"
                onClick={handleLogout}
              >
                <MdLogout className="inline mr-2" /> Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </motion.div>
        </DropdownMenu>
      ) : (
        <PrimaryButton path="/login" name="Login" />
      )}
    </div>
  );
};

export default DropdownProfile;
