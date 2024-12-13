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
          `border-slate-200 ${
            isActive
              ? "border-b-2 border-b-[#1054AD] text-[#1054AD] dark:text-[#6AA4F1] dark:border-b-[#6AA4F1] font-medium"
              : "dark:text-slate-100 text-black border-b-2 border-b-slate-800 dark:border-b-slate-100"
          } transition-all duration-300 ease-in-out hover:text-[#1054AD] hover:border-b-[#1054AD]`
        }
      >
        <li>Home</li>
      </NavLink>
      <NavLink
        to="/meeting-rooms"
        className={({ isActive }) =>
          `border-slate-200 ${
            isActive
              ? "border-b-2 border-b-[#1054AD] text-[#1054AD] dark:text-[#6AA4F1] dark:border-b-[#6AA4F1] font-medium"
              : "dark:text-slate-100 text-black border-b-2 border-b-slate-800 dark:border-b-slate-100"
          } transition-all duration-300 ease-in-out hover:text-[#1054AD] hover:border-b-[#1054AD]`
        }
      >
        <li>Rooms</li>
      </NavLink>
      <NavLink
        to="/about-us"
        className={({ isActive }) =>
          `border-slate-200 ${
            isActive
              ? "border-b-2 border-b-[#1054AD] text-[#1054AD] dark:text-[#6AA4F1] dark:border-b-[#6AA4F1] font-medium"
              : "dark:text-slate-100 text-black border-b-2 border-b-slate-800 dark:border-b-slate-100"
          } transition-all duration-300 ease-in-out hover:text-[#1054AD] hover:border-b-[#1054AD]`
        }
      >
        <li>About</li>
      </NavLink>
      <NavLink
        to="/contact-us"
        className={({ isActive }) =>
          `border-slate-200 ${
            isActive
              ? "border-b-2 border-b-[#1054AD] text-[#1054AD] dark:text-[#6AA4F1] dark:border-b-[#6AA4F1] font-medium"
              : "dark:text-slate-100 text-black border-b-2 border-b-slate-800 dark:border-b-slate-100"
          } transition-all duration-300 ease-in-out hover:text-[#1054AD] hover:border-b-[#1054AD]`
        }
      >
        <li>Contact</li>
      </NavLink>
      {user?.role === "admin" && (
        <NavLink
          to="/admin/dashboard"
          className={({ isActive }) =>
            `border-slate-200 ${
              isActive
                ? "border-b-2 border-b-[#1054AD] text-[#1054AD] dark:text-[#6AA4F1] dark:border-b-[#6AA4F1] font-medium"
                : "dark:text-slate-100 text-black border-b-2 border-b-slate-800 dark:border-b-slate-100"
            } transition-all duration-300 ease-in-out hover:text-[#1054AD] hover:border-b-[#1054AD]`
          }
        >
          <li>Dashboard</li>
        </NavLink>
      )}
      {user?.role === "user" && (
        <NavLink
          to="/user/dashboard"
          className={({ isActive }) =>
            `border-slate-200 ${
              isActive
                ? "border-b-2 border-b-[#1054AD] text-[#1054AD] dark:text-[#6AA4F1] dark:border-b-[#6AA4F1] font-medium"
                : "dark:text-slate-100 text-black border-b-2 border-b-slate-800 dark:border-b-slate-100"
            } transition-all duration-300 ease-in-out hover:text-[#1054AD] hover:border-b-[#1054AD]`
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
