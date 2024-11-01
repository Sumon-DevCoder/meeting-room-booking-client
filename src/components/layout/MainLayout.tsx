import { Button, Layout, theme } from "antd";
import Sidebar from "./Sidebar";
import { Link, Outlet } from "react-router-dom";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { useState } from "react";
import DropdownProfile from "../DropdownProfile/DropdownProfile";

const { Header, Content } = Layout;

const MainLayout = () => {
  const [collapsed, setCollapsed] = useState(false);

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout className="min-h-screen ">
      <Sidebar collapsed={collapsed} />
      <Layout>
        <Header
          className="sticky top-0 z-10"
          style={{ padding: 0, background: colorBgContainer }}
        >
          <div className="flex justify-between items-center  ">
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
            <button>
              <Link
                to={"/"}
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded transition duration-300"
              >
                Home
              </Link>
            </button>{" "}
            *
            <div className="">
              <DropdownProfile />
            </div>
          </div>
        </Header>
        <Content style={{ margin: "10px 10px 0" }}>
          <div
            className="min-h-screen  bg-slate-200 md:p-6"
            style={{
              // padding: 24,
              // background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <Outlet />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
