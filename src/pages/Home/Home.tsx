import Banner from "./Banner/Banner";
import FeaturedRooms from "./FeaturedRoom/FeaturedRooms";
import ServiceSection from "./ServiceSection/ServiceSection";
import Testimonial from "./Testimonial/Testimonial";
import WhyChooseUs from "./WhyChooseUs/WhyChooseUs";
import WorkSection from "./WorkSection/WorkSection";

const Home = () => {
  return (
    <div>
      <Banner />
      <ServiceSection />
      <FeaturedRooms />
      <WhyChooseUs />
      <WorkSection />
      <Testimonial />
    </div>
  );
};

export default Home;
