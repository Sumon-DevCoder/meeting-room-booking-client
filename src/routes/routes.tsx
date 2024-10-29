import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Login from "@/pages/Login/Login";
import Register from "@/pages/Register/Register";
import NotFound from "@/pages/Shared/NotFound/NotFound";
import AboutUs from "@/pages/About/About";
import Home from "@/pages/Home/Home";
import ContactUs from "@/pages/ContactUs/ContactUs";
import MeetingRoom from "@/pages/MeetingRoom/MeetingRoom";
import MeetingRoomDetails from "@/pages/MeetingRoom/MeetingRoomDetails";
import MainLayout from "@/components/layout/MainLayout";
import routesGenerator from "@/utils/routesGenerator";
import { adminPaths } from "./admin.routes";
import { userPaths } from "./user.routes";
import ProtectedRoute from "@/components/layout/ProtectedRoute";
import BookingRoom from "@/pages/BookingRoom/BookingRoom";
import CheckOutPayment from "@/pages/CheckOutPayment/CheckOutPayment";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/about-us",
        element: <AboutUs />,
      },
      {
        path: "/contact-us",
        element: <ContactUs />,
      },
      {
        path: "/meeting-rooms",
        element: <MeetingRoom />,
      },
      {
        path: "/meeting-rooms-details/:id",
        element: (
          <ProtectedRoute>
            <MeetingRoomDetails />
          </ProtectedRoute>
        ),
      },
      {
        path: "/bookings/:id",
        element: (
          <ProtectedRoute>
            <BookingRoom />
          </ProtectedRoute>
        ),
      },
      {
        path: "/checkout-payment",
        element: (
          <ProtectedRoute>
            <CheckOutPayment />
          </ProtectedRoute>
        ),
      },
    ],
  },
  {
    path: "/admin",
    element: (
      <ProtectedRoute>
        <MainLayout />
      </ProtectedRoute>
    ),
    children: routesGenerator(adminPaths),
  },
  {
    path: "/user",
    element: (
      <ProtectedRoute>
        <MainLayout />
      </ProtectedRoute>
    ),
    children: routesGenerator(userPaths),
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;
