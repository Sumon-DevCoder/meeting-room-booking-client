import AdminDashboard from "@/pages/admin/AdminDashboard";
import BookingListTable from "@/pages/admin/BookingManagement/BookingListTable";
import CreateAdmin from "@/pages/admin/CreateAdmin";
import CreateRoom from "@/pages/admin/RoomManagement/CreateRoom";
import RoomListTable from "@/pages/admin/RoomManagement/RoomListTable";
import UpdateRoom from "@/pages/admin/RoomManagement/UpdateRoom";
import CreateSlots from "@/pages/admin/SlotsMangement/CreateSlots";
import SlotsListTable from "@/pages/admin/SlotsMangement/SlotsListTable";

export const adminPaths = [
  {
    name: "Dashboard",
    path: "dashboard",
    element: <AdminDashboard />,
  },
  {
    name: "User Management",
    children: [
      {
        name: "Create Admin",
        path: "create-admin",
        element: <CreateAdmin />,
      },
      {
        path: "rooms/:id",
        element: <UpdateRoom />,
      },
    ],
  },
  {
    name: "Room Management",
    children: [
      {
        name: "Create Room",
        path: "create-room",
        element: <CreateRoom />,
      },
      {
        name: "Rooms List",
        path: "rooms-list",
        element: <RoomListTable />,
      },
    ],
  },
  {
    name: "Slots Management",
    children: [
      {
        name: "Create Slots",
        path: "create-Slots",
        element: <CreateSlots />,
      },
      {
        name: "Slots List",
        path: "Slots-list",
        element: <SlotsListTable />,
      },
    ],
  },
  {
    name: "Bookings Management",
    children: [
      {
        name: "Bookings List",
        path: "Bookings-list",
        element: <BookingListTable />,
      },
    ],
  },
];
