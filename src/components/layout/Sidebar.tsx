/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Menu } from "antd";
import Sider from "antd/es/layout/Sider";
import sidebarItemsGenerator from "../../utils/sidebarItemsGenerator";
import { adminPaths } from "../../routes/admin.routes";
import { userPaths } from "@/routes/user.routes";
import { Link } from "react-router-dom";
import { MdLogout } from "react-icons/md";
import { IoHomeSharp } from "react-icons/io5";
import { TbBuildingWarehouse } from "react-icons/tb";
import useCurrentUserInfo from "@/hoooks/useCurrentUserInfo";
import useHandleLogout from "@/hoooks/useHandleLogout";

const userRole = {
  ADMIN: "admin",
  USER: "user",
};

const Sidebar = ({ collapsed }: { collapsed: boolean }) => {
  const { role } = useCurrentUserInfo();
  const handleLogout = useHandleLogout();

  let sidebarItems;

  switch (role) {
    case userRole.ADMIN:
      sidebarItems = sidebarItemsGenerator(adminPaths, userRole.ADMIN);
      break;
    case userRole.USER:
      sidebarItems = sidebarItemsGenerator(userPaths, userRole.USER);
      break;
  }

  // Add common sections
  const commonItems = [
    {
      key: "home",
      label: (
        <Link
          to="/"
          className="text-slate-200 hover:text-indigo-300 flex items-center p-2 rounded-md transition-all duration-300"
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
          className="text-slate-200 hover:text-indigo-300 flex items-center p-2 rounded-md transition-all duration-300"
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
          className="text-slate-200 hover:text-indigo-300 flex items-center p-2 rounded-md transition-all duration-300 text-md"
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
      // className="bg-gradient-to-b from-indigo-900 to-indigo-700 text-slate-200"
    >
      {/* booking logo */}
      <Link to="/">
        <div className="border-b-2 text-slate-200 border-indigo-600 text-center font-bold p-2 text-lg bg-indigo-800 hover:bg-indigo-700 transition-all">
          MR Booking
        </div>
      </Link>
      <Menu
        className="sticky top-0"
        theme="dark"
        mode="inline"
        defaultSelectedKeys={["home"]}
        style={{
          backgroundColor: "",
        }}
      >
        {/* Render role-specific items */}
        {sidebarItems?.map((item) =>
          item.children ? (
            <Menu.SubMenu
              key={item.key}
              title={
                <span className="flex items-center text-slate-200 p-2 hover:bg-indigo-600 hover:text-white transition-all duration-300">
                  {item.label}
                </span>
              }
              className="text-slate-200"
            >
              {item.children.map((child) => (
                <Menu.Item
                  key={child.key}
                  className="text-slate-200 hover:bg-blue-600 hover:text-white p-2 transition-all duration-300"
                >
                  {child.label}
                </Menu.Item>
              ))}
            </Menu.SubMenu>
          ) : (
            <Menu.Item
              key={item.key}
              className="text-slate-200 hover:bg-indigo-600 hover:text-white p-2 transition-all duration-300"
            >
              {item.label}
            </Menu.Item>
          )
        )}

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
            <Menu.Item
              key={item.key}
              className="text-slate-200 hover:bg-indigo-600 hover:text-white p-2 transition-all duration-300"
            >
              {item.label}
            </Menu.Item>
          ))}
        </div>
      </Menu>
    </Sider>
  );
};

export default Sidebar;
