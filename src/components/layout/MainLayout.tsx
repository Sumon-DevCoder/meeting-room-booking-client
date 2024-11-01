import { Layout, theme, Button, Input, Badge } from "antd"; // Import necessary components from Ant Design
import Sidebar from "./Sidebar"; // Assuming you have this component for your sidebar
import { Outlet, Link } from "react-router-dom"; // Import Outlet and Link for routing
import { SetStateAction, useState } from "react"; // Import useState for state management
import { Content } from "antd/es/layout/layout"; // Content component from Ant Design
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  BellOutlined,
  SearchOutlined,
} from "@ant-design/icons"; // Import icons
import DropdownProfile from "../DropdownProfile/DropdownProfile";

const MainLayout = () => {
  const [collapsed, setCollapsed] = useState(false); // State for sidebar collapsed status
  const [searchQuery, setSearchQuery] = useState(""); // State for search input
  const notifications = []; // Mock notifications array

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  // Function to handle search input
  const handleSearch = (e: { target: { value: SetStateAction<string> } }) => {
    setSearchQuery(e.target.value); // Update search query state
    // Add your search logic here
  };

  return (
    <Layout className="min-h-screen">
      <Sidebar collapsed={collapsed} />
      <Layout>
        <Layout.Header
          className="sticky top-0 z-10 bg-slate-400"
          style={{ padding: 0 }}
        >
          <div className="flex justify-between items-center">
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{
                fontSize: "16px",
                width: 64,
                height: 64,
              }}
            />
            <div className="flex items-center gap-2 ">
              <Link
                to="/"
                className="bg-blue-600 btn border-none btn-sm hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded transition duration-300"
              >
                Home
              </Link>

              {/* Search Bar */}
              <div className="flex items-center mx-4 hidden md:block">
                <Input
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={handleSearch}
                  prefix={<SearchOutlined />}
                  style={{ width: 200 }}
                />
              </div>

              {/* Notifications */}
              <Badge count={notifications.length}>
                <Button
                  type="text"
                  icon={<BellOutlined />}
                  onClick={() => console.log("View Notifications")} // Replace with your logic to show notifications
                />
              </Badge>

              <div className="mr-4">
                <DropdownProfile />
              </div>
            </div>
          </div>
        </Layout.Header>

        <Content style={{ margin: "10px 10px 0" }}>
          <div
            className="min-h-screen bg-slate-200 md:p-6"
            style={{
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <Outlet /> {/* Render the matched child route */}
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
