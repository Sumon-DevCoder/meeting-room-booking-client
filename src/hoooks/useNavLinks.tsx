import { currentUser } from "@/redux/features/auth/authSlice";
import { useAppSelector } from "@/redux/hooks";
import { NavLink } from "react-router-dom";

const useNavLinks = () => {
  const user = useAppSelector(currentUser);

  const navLinks = (
    <>
      <NavLink
        to="/"
        className={({ isActive }) =>
          ` border-slate-200 ${
            isActive
              ? "border-b-2 border-b-blue-400 text-blue-400 font-medium"
              : "  dark:text-slate-100 text-black  border-b-2 border-b-slate-800  dark:border-b-slate-100"
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
              : "  dark:text-slate-100 text-black  border-b-2 border-b-slate-800  dark:border-b-slate-100"
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
              : " dark:text-slate-100 text-black  border-b-2 border-b-slate-800  dark:border-b-slate-100"
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
              : "  dark:text-slate-100 text-black  border-b-2 border-b-slate-800  dark:border-b-slate-100"
          }`
        }
      >
        <li>Contact</li>
      </NavLink>
      {user?.role === "admin" && (
        <NavLink
          to="/admin/dashboard"
          className={({ isActive }) =>
            ` border-slate-200 ${
              isActive
                ? " border-b-2 border-b-blue-400 text-blue-400 font-medium"
                : "  dark:text-slate-100 text-black  border-b-2 border-b-slate-800  dark:border-b-slate-100"
            }`
          }
        >
          <li>Dashboard</li>
        </NavLink>
      )}
      {user?.role === "user" && (
        <NavLink
          to="/user/dashboard"
          className={({ isActive }) =>
            ` border-slate-200 ${
              isActive
                ? " text-white border-b-2"
                : "dark:text-slate-100 text-black  border-b-2 border-b-slate-800  dark:border-b-slate-100"
            }`
          }
        >
          <li>Dashboard</li>
        </NavLink>
      )}
    </>
  );

  return navLinks;
};

export default useNavLinks;
