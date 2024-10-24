import AdminDashboard from "@/pages/admin/AdminDashboard";
import CreateAdmin from "@/pages/admin/CreateAdmin";

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
    ],
  },
];
