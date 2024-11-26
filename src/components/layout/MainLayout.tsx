import { Layout, Button, Input } from "antd"; // Import necessary components from Ant Design
import Sidebar from "./Sidebar"; // Assuming you have this component for your sidebar
import { Outlet, Link } from "react-router-dom"; // Import Outlet and Link for routing
import { SetStateAction, useState } from "react"; // Import useState for state management
import { Content } from "antd/es/layout/layout"; // Content component from Ant Design
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import { SearchOutlined } from "@ant-design/icons"; // Import icons
import DropdownProfile from "../DropdownProfile/DropdownProfile";
import useDarkMode from "@/hoooks/useDarkMode";

const MainLayout = () => {
  const [collapsed, setCollapsed] = useState(false); // State for sidebar collapsed status
  const [searchQuery, setSearchQuery] = useState(""); // State for search input
  const [isDarkMode, toggleDarkMode] = useDarkMode();

  // Function to handle search input
  const handleSearch = (e: { target: { value: SetStateAction<string> } }) => {
    setSearchQuery(e.target.value); // Update search query state
    // Add your search logic here
  };

  return (
    <Layout className="min-h-screen">
      <Sidebar collapsed={collapsed} />
      <Layout>
        {/* header */}
        <div
          className="sticky top-0 z-10 bg-gradient-to-r from-indigo-900 bg-[#262626]"
          style={{ padding: 0 }}
        >
          <div className="flex justify-between items-center ">
            <Button
              type="text"
              className=""
              icon={
                collapsed ? (
                  <AiOutlineArrowRight className="text-lg text-white" />
                ) : (
                  <AiOutlineArrowLeft className="text-lg text-white" />
                )
              }
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

              <div className="flex items-center mx-4 hidden md:block">
                <Input
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={handleSearch}
                  prefix={<SearchOutlined />}
                  style={{ width: 200 }}
                />
              </div>

              <button
                onClick={toggleDarkMode}
                className={`p-2 rounded-full transition-all duration-300 ${
                  isDarkMode ? " hover:bg-slate-700" : " hover:bg-gray-800"
                }`}
              >
                {!isDarkMode ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6 text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path>
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6 text-gray-300"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                      fillRule="evenodd"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                )}
              </button>
              <div className="mr-5">
                <DropdownProfile />
              </div>
            </div>
          </div>
        </div>

        <Content className="">
          <div className="min-h-screen bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-600">
            <Outlet />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
