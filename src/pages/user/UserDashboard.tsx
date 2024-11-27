import { Layout } from "antd";
import useCurrentUserInfoData from "@/hoooks/useCurrentUserInfoData";

const { Header, Content, Footer } = Layout;

const UserDashboard = () => {
  const { user } = useCurrentUserInfoData();
  const userName = user?.name || "User";

  return (
    <Layout style={{ minHeight: "100vh" }}>
      {/* Main Layout */}
      <Layout className="bg-gray-100">
        {/* Header */}
        <Header
          className="bg-white shadow-md px-4 flex items-center justify-between"
          style={{ position: "sticky", top: 0, zIndex: 1000 }}
        >
          <h1 className="text-xl font-bold text-indigo-700">
            Welcome, {userName}!
          </h1>
        </Header>

        {/* Content */}
        <Content
          style={{
            margin: "16px",
            padding: "24px",
            background: "#fff",
            borderRadius: "8px",
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
          }}
        >
          <h2 className="text-2xl font-semibold mb-4">User Dashboard</h2>
          <p className="text-gray-600">
            This is your personal dashboard. Here, you can manage your
            activities, view updates, and explore available features.
          </p>

          {/* Example Widgets or Future Components */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Placeholder cards */}
            <div className="bg-indigo-100 p-4 rounded-lg shadow-md">
              <h3 className="text-lg font-bold text-indigo-800">Widget 1</h3>
              <p className="text-indigo-700">
                This could display your recent activities or updates.
              </p>
            </div>
            <div className="bg-indigo-100 p-4 rounded-lg shadow-md">
              <h3 className="text-lg font-bold text-indigo-800">Widget 2</h3>
              <p className="text-indigo-700">
                Add more features or statistics here.
              </p>
            </div>
            <div className="bg-indigo-100 p-4 rounded-lg shadow-md">
              <h3 className="text-lg font-bold text-indigo-800">Widget 3</h3>
              <p className="text-indigo-700">
                Explore other useful components for users.
              </p>
            </div>
          </div>
        </Content>

        {/* Footer */}
        <Footer
          style={{
            textAlign: "center",
            backgroundColor: "#f0f2f5",
            marginTop: "16px",
            padding: "12px 50px",
          }}
        >
          MR Booking ©2024 | Powered by Your Team
        </Footer>
      </Layout>
    </Layout>
  );
};

export default UserDashboard;
