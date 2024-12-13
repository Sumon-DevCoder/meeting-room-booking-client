import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Login from "@/pages/Login/Login";
import Register from "@/pages/Register/Register";
import NotFound from "@/pages/Shared/NotFound/NotFound";
import AboutUs from "@/pages/About/About";
import Home from "@/pages/Home/Home";
import ContactUs from "@/pages/ContactUs/ContactUs";
import MeetingRoom from "@/pages/MeetingRoom/MeetingRoom";
import MeetingRoomDetails from "@/pages/MeetingRoom/MeetingRoomDetails/MeetingRoomDetails";
import MainLayout from "@/components/layout/MainLayout";
import routesGenerator from "@/utils/routesGenerator";
import { adminPaths } from "./admin.routes";
import { userPaths } from "./user.routes";
import ProtectedRoute from "@/components/layout/ProtectedRoute";
import SuccessPayment from "@/pages/Payment/SuccessPayment";
import FailPayment from "@/pages/Payment/FailPayment";
import CancelPayment from "@/pages/Payment/CancelPayment";
import BookingRoom from "@/pages/BookingRoom/BookingRoom";
import UpdateRoom from "@/pages/admin/RoomManagement/UpdateRoom";
import UpdateSlots from "@/pages/admin/SlotsMangement/UpdateSlots";

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
        element: <MeetingRoomDetails />,
      },
      {
        path: "/admin/rooms/:id",
        element: (
          <ProtectedRoute allowedRoles={["admin"]}>
            <UpdateRoom />
          </ProtectedRoute>
        ),
      },
      {
        path: "/admin/slots/:id",
        element: (
          <ProtectedRoute allowedRoles={["admin"]}>
            <UpdateSlots />
          </ProtectedRoute>
        ),
      },
      {
        path: "/bookings",
        element: (
          <ProtectedRoute allowedRoles={["user", "admin"]}>
            <BookingRoom roomId={""} />
          </ProtectedRoute>
        ),
      },
      {
        path: "/payment-success",
        element: (
          <ProtectedRoute allowedRoles={["user", "admin"]}>
            <SuccessPayment />
          </ProtectedRoute>
        ),
      },
      {
        path: "/payment-fail",
        element: (
          <ProtectedRoute allowedRoles={["user", "admin"]}>
            <FailPayment />
          </ProtectedRoute>
        ),
      },
      {
        path: "/payment-cancel",
        element: (
          <ProtectedRoute allowedRoles={["user", "admin"]}>
            <CancelPayment />
          </ProtectedRoute>
        ),
      },
    ],
  },
  {
    path: "/admin",
    element: (
      <ProtectedRoute allowedRoles={["admin"]}>
        <MainLayout />
      </ProtectedRoute>
    ),
    children: routesGenerator(adminPaths),
  },
  {
    path: "/user",
    element: (
      <ProtectedRoute allowedRoles={["user", "admin"]}>
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
