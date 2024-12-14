import { currentUser } from "@/redux/features/auth/authSlice";
import { useAppSelector } from "@/redux/hooks";
import { NavLink } from "react-router-dom";

const useNavLinks = () => {
  const user = useAppSelector(currentUser);

  // const navLinks = (
  //   <>
  //     <NavLink
  //       to="/"
  //       className={({ isActive }) =>
  //         `border-slate-200 ${
  //           isActive
  //             ? "border-b-2 border-b-[#357fdf] text-[#357fdf] dark:text-[#6AA4F1] dark:border-b-[#6AA4F1] font-semibold"
  //             : "dark:text-slate-200 text-gray-700 border-b-2 border-b-slate-800 dark:border-b-slate-100 font-semibold font-semibold"
  //         } transition-all duration-300 ease-in-out hover:text-[#357fdf] hover:border-b-[#357fdf]`
  //       }
  //     >
  //       <li>Home</li>
  //     </NavLink>
  //     <NavLink
  //       to="/meeting-rooms"
  //       className={({ isActive }) =>
  //         `border-slate-200 ${
  //           isActive
  //             ? "border-b-2 border-b-[#357fdf] text-[#357fdf] dark:text-[#6AA4F1] dark:border-b-[#6AA4F1] font-semibold"
  //             : "dark:text-slate-200 text-gray-700 border-b-2 border-b-slate-800 dark:border-b-slate-100 font-semibold"
  //         } transition-all duration-300 ease-in-out hover:text-[#357fdf] hover:border-b-[#357fdf]`
  //       }
  //     >
  //       <li>Rooms</li>
  //     </NavLink>
  //     <NavLink
  //       to="/about-us"
  //       className={({ isActive }) =>
  //         `border-slate-200 ${
  //           isActive
  //             ? "border-b-2 border-b-[#357fdf] text-[#357fdf] dark:text-[#6AA4F1] dark:border-b-[#6AA4F1] font-semibold"
  //             : "dark:text-slate-200 text-gray-700 border-b-2 border-b-slate-800 dark:border-b-slate-100 font-semibold"
  //         } transition-all duration-300 ease-in-out hover:text-[#357fdf] hover:border-b-[#357fdf]`
  //       }
  //     >
  //       <li>About</li>
  //     </NavLink>
  //     <NavLink
  //       to="/contact-us"
  //       className={({ isActive }) =>
  //         `border-slate-200 ${
  //           isActive
  //             ? "border-b-2 border-b-[#357fdf] text-[#357fdf] dark:text-[#6AA4F1] dark:border-b-[#6AA4F1] font-semibold"
  //             : "dark:text-slate-200 text-gray-700 border-b-2 border-b-slate-800 dark:border-b-slate-100 font-semibold"
  //         } transition-all duration-300 ease-in-out hover:text-[#357fdf] hover:border-b-[#357fdf]`
  //       }
  //     >
  //       <li>Contact</li>
  //     </NavLink>
  //     {user?.role === "admin" && (
  //       <NavLink
  //         to="/admin/dashboard"
  //         className={({ isActive }) =>
  //           `border-slate-200 ${
  //             isActive
  //               ? "border-b-2 border-b-[#357fdf] text-[#357fdf] dark:text-[#6AA4F1] dark:border-b-[#6AA4F1] font-semibold"
  //               : "dark:text-slate-200 text-gray-700 border-b-2 border-b-slate-800 dark:border-b-slate-100 font-semibold"
  //           } transition-all duration-300 ease-in-out hover:text-[#357fdf] hover:border-b-[#357fdf]`
  //         }
  //       >
  //         <li>Dashboard</li>
  //       </NavLink>
  //     )}
  //     {user?.role === "user" && (
  //       <NavLink
  //         to="/user/dashboard"
  //         className={({ isActive }) =>
  //           `border-slate-200 ${
  //             isActive
  //               ? "border-b-2 border-b-[#357fdf] text-[#357fdf] dark:text-[#6AA4F1] dark:border-b-[#6AA4F1] font-semibold"
  //               : "dark:text-slate-200 text-gray-700 border-b-2 border-b-slate-800 dark:border-b-slate-100 font-semibold"
  //           } transition-all duration-300 ease-in-out hover:text-[#357fdf] hover:border-b-[#357fdf]`
  //         }
  //       >
  //         <li>Dashboard</li>
  //       </NavLink>
  //     )}
  //   </>
  // );

  const navLinks = (
    <>
      <NavLink
        to="/"
        className={({ isActive }) =>
          `${
            isActive
              ? "text-[#357fdf] dark:text-[#6AA4F1] font-semibold"
              : "dark:text-slate-300 text-gray-700 font-semibold"
          } transition-all duration-300 ease-in-out hover:text-[#357fdf] hover:scale-105`
        }
      >
        <li>Home</li>
      </NavLink>
      <NavLink
        to="/meeting-rooms"
        className={({ isActive }) =>
          `${
            isActive
              ? "text-[#357fdf] dark:text-[#6AA4F1] font-semibold"
              : "dark:text-slate-300 text-gray-700 font-semibold"
          } transition-all duration-300 ease-in-out hover:text-[#357fdf] hover:scale-105`
        }
      >
        <li>Rooms</li>
      </NavLink>
      <NavLink
        to="/about-us"
        className={({ isActive }) =>
          `${
            isActive
              ? "text-[#357fdf] dark:text-[#6AA4F1] font-semibold"
              : "dark:text-slate-300 text-gray-700 font-semibold"
          } transition-all duration-300 ease-in-out hover:text-[#357fdf] hover:scale-105`
        }
      >
        <li>About</li>
      </NavLink>
      <NavLink
        to="/contact-us"
        className={({ isActive }) =>
          `${
            isActive
              ? "text-[#357fdf] dark:text-[#6AA4F1] font-semibold"
              : "dark:text-slate-300 text-gray-700 font-semibold"
          } transition-all duration-300 ease-in-out hover:text-[#357fdf] hover:scale-105`
        }
      >
        <li>Contact</li>
      </NavLink>
      {user?.role === "admin" && (
        <NavLink
          to="/admin/dashboard"
          className={({ isActive }) =>
            `${
              isActive
                ? "text-[#357fdf] dark:text-[#6AA4F1] font-semibold"
                : "dark:text-slate-300 text-gray-700 font-semibold"
            } transition-all duration-300 ease-in-out hover:text-[#357fdf] hover:scale-105`
          }
        >
          <li>Dashboard</li>
        </NavLink>
      )}
      {user?.role === "user" && (
        <NavLink
          to="/user/dashboard"
          className={({ isActive }) =>
            `${
              isActive
                ? "text-[#357fdf] dark:text-[#6AA4F1] font-semibold"
                : "dark:text-slate-300 text-gray-700 font-semibold"
            } transition-all duration-300 ease-in-out hover:text-[#357fdf] hover:scale-105`
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
