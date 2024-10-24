import { Menu } from "antd";
import Sider from "antd/es/layout/Sider";
import sidebarItemsGenerator from "../../utils/sidebarItemsGenerator";
import { adminPaths } from "../../routes/admin.routes";
import { currentUser } from "../../redux/features/auth/authSlice";
import { useAppSelector } from "../../redux/hooks";

const userRole = {
  SUPER_ADMIN: "superAdmin",
  ADMIN: "admin",
};

const Sidebar = () => {
  const user = useAppSelector(currentUser);

  let sidebarItems;

  switch (user?.role) {
    case userRole.SUPER_ADMIN:
    case userRole.ADMIN:
      sidebarItems = sidebarItemsGenerator(adminPaths, userRole.ADMIN);
      break;
    default:
      break;
  }

  return (
    <Sider
      breakpoint="lg"
      collapsedWidth="0"
      // onBreakpoint={(broken) => {}}
      onCollapse={(collapsed, type) => {
        console.log(collapsed, type);
      }}
    >
      <div className="demo-logo-vertical text-center text-white font-bold p-2 ">
        Meeting Room Booking
      </div>
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={["4"]}
        items={sidebarItems}
      />
    </Sider>
  );
};

export default Sidebar;
