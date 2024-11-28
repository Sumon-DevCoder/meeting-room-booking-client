/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Menu } from "antd";
import Sider from "antd/es/layout/Sider";
import sidebarItemsGenerator from "../../utils/sidebarItemsGenerator";
import { adminPaths } from "../../routes/admin.routes";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { currentUser, logout } from "@/redux/features/auth/authSlice";
import { userPaths } from "@/routes/user.routes";
import { Link } from "react-router-dom";
import { MdLogout } from "react-icons/md";
import { IoHomeSharp } from "react-icons/io5";
import { TbBuildingWarehouse } from "react-icons/tb";
import { toast } from "sonner";

const userRole = {
  ADMIN: "admin",
  USER: "user",
};

const Sidebar = ({ collapsed }: { collapsed: boolean }) => {
  const user = useAppSelector(currentUser);
  const role = user?.role;
  const dispatch = useAppDispatch();

  const handleLogout = async () => {
    try {
      dispatch(logout());
      toast.success("Logout Successful");
    } catch (err: any) {
      toast.error("Logout Failed. Please try again.");
    }
  };

  let sidebarItems;

  switch (role) {
    case userRole.ADMIN:
      sidebarItems = sidebarItemsGenerator(adminPaths, userRole.ADMIN);
      break;
    case userRole.USER:
      sidebarItems = sidebarItemsGenerator(userPaths, userRole.USER);
      break;
  }

  console.log("sidebarItems", sidebarItems);

  // Add common sections
  const commonItems = [
    {
      key: "home",
      label: (
        <Link
          to="/"
          className="text-slate-200 hover:text-indigo-300 flex  items-center"
        >
          <IoHomeSharp className="mr-2" /> Home
        </Link>
      ),
    },
    {
      key: "Rooms",
      label: (
        <Link
          to="/meeting-rooms"
          className="text-slate-200 hover:text-indigo-300 flex  items-center"
        >
          <TbBuildingWarehouse className="mr-2" /> Rooms
        </Link>
      ),
    },
    {
      key: "Logout",
      label: (
        <Link
          to={"/"}
          onClick={handleLogout}
          className="text-slate-200 hover:text-indigo-300 flex  items-center text-md"
        >
          <MdLogout className="inline mr-2" /> Logout
        </Link>
      ),
    },
  ];

  return (
    <Sider
      trigger={null}
      collapsible
      collapsed={collapsed}
      breakpoint="lg"
      collapsedWidth="0"
      className="bg-gradient-to-b from-indigo-900 to-indigo-700 text-slate-200"
    >
      <Link to="/">
        <div className="border-b-2 border-indigo-600 text-center font-bold p-2 text-lg bg-indigo-800 hover:bg-indigo-700 rounded-md">
          MR Booking
        </div>
      </Link>
      <Menu
        className="sticky top-0 text-slate-200"
        theme="dark"
        mode="inline"
        defaultSelectedKeys={["home"]}
        style={{
          backgroundColor: "transparent", // Transparent to let Tailwind gradients show
        }}
      >
        {/* Render role-specific items */}
        {sidebarItems?.map((item) => (
          <Menu.Item key={item.key}>{item.label}</Menu.Item>
        ))}

        {/* Divider with spacing */}
        <div style={{ margin: "16px 0" }}>
          <Menu.Divider
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.2)",
            }}
          />
        </div>

        {/* Render common items */}
        <div className="ml-5">
          {commonItems.map((item) => (
            <Menu.Item key={item.key}>{item.label}</Menu.Item>
          ))}
        </div>
      </Menu>
    </Sider>
  );
};

export default Sidebar;
