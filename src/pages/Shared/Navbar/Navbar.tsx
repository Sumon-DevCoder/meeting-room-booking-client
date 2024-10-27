/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link, NavLink } from "react-router-dom";
import DropdownProfile from "@/components/DropdownProfile/DropdownProfile";
import CheckUserInfo from "@/components/CheckUserRole/CheckUserInfo";

const Navbar = () => {
  const { isAdmin, isVerifiedUser } = CheckUserInfo();

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
      {/* navigate(`/${user?.role}/dashboard`); */}
      {isAdmin && (
        <NavLink to={`/admin/dashboard`}>
          <li className="border-2 border-indigo-500 p-2 rounded-lg">
            Dashboard
          </li>
        </NavLink>
      )}
      {isVerifiedUser && (
        <NavLink to={`/user/dashboard`}>
          <li className="border-2 border-indigo-500 p-2 rounded-lg">
            Dashboard
          </li>
        </NavLink>
      )}
    </>
  );

  return (
    <div>
      <div className="navbar bg-white shadow-lg px-5 sticky top-0 z-50">
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
          <DropdownProfile />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
