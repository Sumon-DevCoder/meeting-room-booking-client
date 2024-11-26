/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import DropdownProfile from "@/components/DropdownProfile/DropdownProfile";
import useCurrentUserInfo from "@/hoooks/useCurrentUserInfo";
import { RxDropdownMenu } from "react-icons/rx";
import useDarkMode from "@/hoooks/useDarkMode";

const Navbar = () => {
  const { role, email } = useCurrentUserInfo();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkMode, toggleDarkMode] = useDarkMode();

  const handleToggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navLinks = (
    <>
      <NavLink
        to="/"
        className={({ isActive }) =>
          ` border-slate-200 ${
            isActive
              ? "border-b-2 border-b-blue-400 text-blue-400 font-medium"
              : "  text-slate-100 border-b-2 border-b-slate-100"
          }`
        }
      >
        <li>Home</li>
      </NavLink>
      <NavLink
        to="/meeting-rooms"
        className={({ isActive }) =>
          ` border-slate-200 ${
            isActive
              ? "border-b-2 border-b-blue-400 text-blue-400 font-medium"
              : "  text-slate-100 border-b-2 border-b-slate-100"
          }`
        }
      >
        <li>Rooms</li>
      </NavLink>
      <NavLink
        to="/about-us"
        className={({ isActive }) =>
          ` border-slate-200 ${
            isActive
              ? "border-b-2 border-b-blue-400 text-blue-400 font-medium"
              : " text-slate-100 border-b-2 border-b-slate-100"
          }`
        }
      >
        <li>About</li>
      </NavLink>
      <NavLink
        to="/contact-us"
        className={({ isActive }) =>
          ` border-slate-200 ${
            isActive
              ? "border-b-2 border-b-blue-400 text-blue-400 font-medium"
              : "  text-slate-100 border-b-2 border-b-slate-100"
          }`
        }
      >
        <li>Contact</li>
      </NavLink>
      {role === "admin" && (
        <NavLink
          to="/admin/dashboard"
          className={({ isActive }) =>
            ` border-slate-200 ${
              isActive
                ? " border-b-2 border-b-blue-400 text-blue-400 font-medium"
                : "  text-slate-100 border-b-2 border-b-slate-100"
            }`
          }
        >
          <li>Dashboard</li>
        </NavLink>
      )}
      {role === "user" && (
        <NavLink
          to="/user/dashboard"
          className={({ isActive }) =>
            ` border-slate-200 ${
              isActive
                ? " text-white border-b-2"
                : "text-slate-100 border-b-2 border-b-slate-100"
            }`
          }
        >
          <li>Dashboard</li>
        </NavLink>
      )}
    </>
  );

  return (
    <div className="sticky top-0 z-50">
      <div className="navbar bg-gradient-to-r from-gray-800 to-gray-900 shadow-lg px-5 dark:bg-gradient-to-r dark:from-gray-800 dark:to-gray-900">
        <div className="navbar-start">
          <div className="dropdown">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost lg:hidden"
              onClick={handleToggleMenu}
            >
              {isMenuOpen ? (
                // Close Icon
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                // Menu Icon
                <RxDropdownMenu className="text-white text-2xl -ml-2 " />
              )}
            </div>
            {isMenuOpen && (
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-slate-700   z-[1] mt-3 w-32 p-3 space-y-2 shadow gap-1"
              >
                {navLinks}
              </ul>
            )}
          </div>
          <Link
            to={`/`}
            className="btn btn-ghost text-[19px] md:text-xl bg-gradient-to-r from-blue-800 text-slate-200 font-medium"
          >
            Meeting Room Booking
          </Link>
        </div>
        {/* lg device navbar */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 space-x-5 space-y- font-normal  text-base">
            {navLinks}
          </ul>
        </div>
        <div className="navbar-end cursor-pointer gap-2">
          <div>
            <button
              onClick={toggleDarkMode}
              className={`p-2 rounded-full transition-all duration-300 ${
                isDarkMode ? " hover:bg-slate-700" : " hover:bg-gray-800"
              }`}
            >
              {!isDarkMode ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6 text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path>
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6 text-gray-300"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                    fillRule="evenodd"
                    clipRule="evenodd"
                  ></path>
                </svg>
              )}
            </button>
          </div>
          <div>
            {email ? (
              <DropdownProfile />
            ) : (
              <NavLink className="btn btn-primary btn-sm" to={"/login"}>
                Login
              </NavLink>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
