import PrimaryButton from "@/components/PrimaryButton/PrimaryButton";
import meetingRoomImg from "../../../assets/modern_workspace_banner.jpg";

const Banner = () => {
  return (
    <div
      className="relative md:h-[450px] bg-center"
      style={{ backgroundImage: `url(${meetingRoomImg})` }}
    >
      {/* Background overlay */}
      <div className="absolute inset-0 bg-black opacity-50"></div>

      {/* Animated content */}
      <div className="relative flex  flex-col items-center justify-center h-full text-white text-center p-4">
        <h1
          data-aos="fade-up"
          className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4"
        >
          Book Your Ideal Meeting Room with Ease
        </h1>

        <p
          data-aos="fade-up"
          data-aos-delay="200"
          className="text-md md:text-xl mb-6"
        >
          Efficient, hassle-free room booking for all your meeting needs
        </p>

        <div data-aos="zoom-in" data-aos-delay="400">
          <PrimaryButton path="/meeting-rooms" name="Book Now" />
        </div>
      </div>
    </div>
  );
};

export default Banner;
