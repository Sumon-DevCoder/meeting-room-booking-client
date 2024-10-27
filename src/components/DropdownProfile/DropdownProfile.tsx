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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "sonner";
import { logout } from "@/redux/features/auth/authSlice";
import { useAppDispatch } from "@/redux/hooks";
import PrimaryButton from "../PrimaryButton/PrimaryButton";
import CheckUserInfo from "../CheckUserRole/CheckUserInfo";
import { Link } from "react-router-dom";

const DropdownProfile = () => {
  const { user, isAdmin } = CheckUserInfo();
  const dispatch = useAppDispatch();

  const handleLogout = async () => {
    try {
      await dispatch(logout());
      toast.success("Logout Successful");
    } catch (err: any) {
      toast.error("Logout Failed. Please try again.");
    }
  };

  return (
    <div>
      {user ? (
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {isAdmin ? (
              <>
                <DropdownMenuItem>
                  <Link to="/admin/dashboard">
                    <button>Dashboard</button>
                  </Link>
                </DropdownMenuItem>
              </>
            ) : (
              <DropdownMenuItem>
                <button>My Bookings</button>
              </DropdownMenuItem>
            )}
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <button onClick={handleLogout}>Logout</button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <PrimaryButton path={"/login"} name="Login" />
      )}
    </div>
  );
};

export default DropdownProfile;