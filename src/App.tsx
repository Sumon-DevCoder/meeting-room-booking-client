import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./pages/Shared/Navbar/Navbar";
import Footer from "./pages/Shared/Footer/Footer";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const App = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000, // Animation duration (in ms)
      easing: "ease-in-out", // Easing function
      once: true, // Animates only once when scrolled into view
    });
  }, []);

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
