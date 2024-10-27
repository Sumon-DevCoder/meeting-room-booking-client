import MyBookings from "@/pages/user/MyBookings";
import UserDashboard from "@/pages/user/UserDashboard";
import UserProfile from "@/pages/user/UserProfile";

export const userPaths = [
  {
    name: "Dashboard",
    path: "dashboard",
    element: <UserDashboard />,
  },
  {
    name: "Profile",
    path: "profile",
    element: <UserProfile />,
  },
  {
    name: "My Bookings",
    path: "my-bookings",
    element: <MyBookings />,
  },
];
