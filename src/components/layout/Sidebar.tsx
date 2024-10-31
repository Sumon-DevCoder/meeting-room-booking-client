import { Menu } from "antd";
import Sider from "antd/es/layout/Sider";
import sidebarItemsGenerator from "../../utils/sidebarItemsGenerator";
import { adminPaths } from "../../routes/admin.routes";
import { useAppSelector } from "@/redux/hooks";
import { currentUser } from "@/redux/features/auth/authSlice";
import { userPaths } from "@/routes/user.routes";

const userRole = {
  ADMIN: "admin",
  USER: "user",
};

const Sidebar = ({ collapsed }: { collapsed: boolean }) => {
  const user = useAppSelector(currentUser);
  const role = user?.role;

  let sidebarItems;

  switch (role) {
    case userRole.ADMIN:
      sidebarItems = sidebarItemsGenerator(adminPaths, userRole.ADMIN);
      break;
    case userRole.USER:
      sidebarItems = sidebarItemsGenerator(userPaths, userRole.USER);
      break;
    default:
      break;
  }

  return (
    <Sider
      trigger={null}
      collapsible
      collapsed={collapsed}
      breakpoint="lg"
      collapsedWidth="0"
      onCollapse={(collapsed, type) => {
        console.log(collapsed, type);
      }}
    >
      <div className="demo-logo-vertical border-2 border-indigo-400 rounded-md text-center text-slate-200 font-bold p-2">
        MR Booking
      </div>
      <Menu
        className="sticky top-0"
        theme="dark"
        mode="inline"
        defaultSelectedKeys={["4"]}
        items={sidebarItems}
      />
    </Sider>
  );
};

export default Sidebar;
