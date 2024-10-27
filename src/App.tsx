import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./pages/Shared/Navbar/Navbar";
import Footer from "./pages/Shared/Footer/Footer";

const App = () => {
  const location = useLocation();
  const hideLayout = ["/login", "/register"];

  return (
    <div className="font-poppins flex flex-col min-h-screen">
      {!hideLayout.includes(location?.pathname) && <Navbar />}
      <main className="flex-grow">
        <Outlet />
      </main>
      {!hideLayout.includes(location?.pathname) && <Footer />}
    </div>
  );
};

export default App;
