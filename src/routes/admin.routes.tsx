import AdminDashboard from "@/pages/admin/AdminDashboard";
import BookingListTable from "@/pages/admin/BookingManagement/BookingListTable";
import CreateAdmin from "@/pages/admin/CreateAdmin";
import CreateRoom from "@/pages/admin/RoomManagement/CreateRoom";
import RoomListTable from "@/pages/admin/RoomManagement/RoomListTable";
// import UpdateRoom from "@/pages/admin/RoomManagement/UpdateRoom";
import SelectRoomSlots from "@/pages/admin/SlotsMangement/SelectRoomSlots";
import SlotsListTable from "@/pages/admin/SlotsMangement/SlotsListTable";
// import UpdateSlots from "@/pages/admin/SlotsMangement/UpdateSlots";

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
        name: "Manage User",
        path: "create-admin",
        element: <CreateAdmin />,
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
      // {
      //   name: "Update Room",
      //   path: "rooms/:id",
      //   element: <UpdateRoom />,
      // },
    ],
  },
  {
    name: "Slots Management",
    children: [
      {
        name: "Create Slots",
        path: "create-Slots",
        element: <SelectRoomSlots />,
      },
      {
        name: "Slots List",
        path: "Slots-list",
        element: <SlotsListTable />,
      },
      // {
      //   name: "Update Slots",
      //   path: "slots/:id",
      //   element: <UpdateSlots />,
      // },
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
