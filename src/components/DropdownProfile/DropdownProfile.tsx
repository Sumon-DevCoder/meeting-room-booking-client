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
import { logout } from "@/redux/features/auth/authSlice";
import { useAppDispatch } from "@/redux/hooks";
import PrimaryButton from "../PrimaryButton/PrimaryButton";
import { Link } from "react-router-dom";

// Import icons from react-icons
import { FaUserCircle } from "react-icons/fa";
import { MdDashboard, MdLogout } from "react-icons/md";
import { BsCalendar2Check } from "react-icons/bs";
import { motion } from "framer-motion";
import useCurrentUserInfoData from "@/hoooks/useCurrentUserInfoData";
import Loading from "../Loading/Loading";

const DropdownProfile = () => {
  const dispatch = useAppDispatch();
  const { user, isUserLoading } = useCurrentUserInfoData();

  // is user loading
  if (isUserLoading) {
    return <Loading />;
  }

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
      {user ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <div className="avatar">
                <div className="w-10 rounded-full">
                  {user?.img ? (
                    <img src={user?.img} alt="User Avatar" />
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
            <DropdownMenuContent className="bg-gradient-to-r from-slate-500 via-slate-500  text-white rounded-lg shadow-lg p-4">
              <DropdownMenuLabel>
                <Link to={"/user/dashboard"}>
                  <FaUserCircle className="inline mr-2" /> {user?.name}
                </Link>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              {user?.role === "admin" ? (
                <DropdownMenuItem>
                  <Link to="/admin/dashboard">
                    <MdDashboard className="inline mr-2" /> Dashboard
                  </Link>
                </DropdownMenuItem>
              ) : (
                <DropdownMenuItem>
                  <Link to={"/user/my-bookings"}>
                    <BsCalendar2Check className="inline mr-2" /> My Bookings
                  </Link>
                </DropdownMenuItem>
              )}
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="cursor-pointer"
                onClick={handleLogout}
              >
                <MdLogout className="inline mr-2" /> Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </motion.div>
        </DropdownMenu>
      ) : (
        <PrimaryButton path={"/login"} name="Login" />
      )}
    </div>
  );
};

export default DropdownProfile;
