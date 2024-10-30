import PrimaryButton from "@/components/PrimaryButton/PrimaryButton";
import meetingRoomImg from "../../../assets/modern_workspace_banner.jpg";

const Banner = () => {
  return (
    <div
      className="relative h-96 bg-cover bg-center"
      style={{ backgroundImage: `url(${meetingRoomImg})` }}
    >
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="relative flex flex-col items-center justify-center h-full text-white text-center p-4">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Book Your Ideal Meeting Room with Ease
        </h1>
        <p className="text-lg md:text-xl mb-6">
          Efficient, hassle-free room booking for all your meeting needs.
        </p>
        <PrimaryButton path="/meeting-rooms" name="Book Now" />
      </div>
    </div>
  );
};

export default Banner;
