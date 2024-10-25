import Footer from "../Shared/Footer/Footer";
import Banner from "./Banner/Banner";
import FeaturedRooms from "./FeaturedRoom/FeaturedRooms";
import ServiceSection from "./ServiceSection/ServiceSection";
import Testimonial from "./Testimonial/Testimonial";
import WhyChooseUs from "./WhyChooseUs/WhyChooseUs";

const Home = () => {
  return (
    <div>
      <Banner />
      <ServiceSection />
      <FeaturedRooms />
      <WhyChooseUs />
      <Testimonial />
      <Footer />
    </div>
  );
};

export default Home;
