import OrderManagement from "@/pages/OrderHistory/OrderHistory";
import MyBookings from "@/pages/user/MyBookings";
import UserProfile from "@/pages/user/UserProfile";

export const userPaths = [
  {
    name: "Profile",
    path: "dashboard",
    element: <UserProfile />,
  },
  {
    name: "My Bookings",
    path: "my-bookings",
    element: <MyBookings />,
  },
  {
    name: "Order History",
    path: "order-history",
    element: <OrderManagement />,
  },
];
