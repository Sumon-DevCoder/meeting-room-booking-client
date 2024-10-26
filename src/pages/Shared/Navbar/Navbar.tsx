/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link, NavLink } from "react-router-dom";
import PrimaryButton from "@/components/PrimaryButton/PrimaryButton";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { currentUser, logout } from "@/redux/features/auth/authSlice";
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

const Navbar = () => {
  const user = useAppSelector(currentUser);
  const dispatch = useAppDispatch();

  console.log(user);

  const handleLogout = async () => {
    try {
      await dispatch(logout());
      toast.success("Logout Successful");
    } catch (err: any) {
      toast.error("Logout Failed. Please try again.");
    }
  };

  const navLinks = (
    <>
      <NavLink to="/">
        <li className="border-2 border-indigo-500 p-2 rounded-lg">Home</li>
      </NavLink>
      <NavLink to="/meeting-rooms">
        <li className="border-2 border-indigo-500 p-2 rounded-lg">
          Meeting Rooms
        </li>
      </NavLink>
      <NavLink to="/about-us">
        <li className="border-2 border-indigo-500 p-2 rounded-lg">About Us</li>
      </NavLink>
      <NavLink to="/contact-us">
        <li className="border-2 border-indigo-500 p-2 rounded-lg">
          Contact Us
        </li>
      </NavLink>
    </>
  );

  return (
    <div>
      <div className="navbar bg-white shadow-lg px-5">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              {navLinks}
            </ul>
          </div>
          <Link
            to={`/`}
            className="btn btn-ghost text-xl bg-gradient-to-r from-indigo-500"
          >
            Meeting Room Booking
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 space-x-3 font-semibold text-base">
            {navLinks}
          </ul>
        </div>
        <div className="navbar-end">
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
                <DropdownMenuItem>MyBookings</DropdownMenuItem>
                <DropdownMenuItem>
                  <button onClick={handleLogout}>Logout</button>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <PrimaryButton path={"/login"} name="Login" />
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
