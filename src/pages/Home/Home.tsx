import Footer from "../Shared/Footer/Footer";
import Banner from "./Banner/Banner";
import FeaturedRooms from "./FeaturedRoom/FeaturedRooms";
import ServiceSection from "./ServiceSection/ServiceSection";

const Home = () => {
  return (
    <div>
      <Banner />
      <ServiceSection />
      <FeaturedRooms />
      <Footer />
    </div>
  );
};

export default Home;
