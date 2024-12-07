/* eslint-disable @typescript-eslint/no-unsafe-function-type */
import { TRoom } from "@/types/room.types";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useCurrentUserInfo from "@/hoooks/useCurrentUserInfo";
import BookingRoom from "@/pages/BookingRoom/BookingRoom";

const RoomCard = ({ room }: { room: TRoom }) => {
  const { name, capacity, pricePerSlot, img, _id } = room;
  const { email } = useCurrentUserInfo();
  const navigate = useNavigate();
  const location = useLocation();

  // Login check function
  const handleLoginCheck = (callback: Function) => {
    if (!email) {
      Swal.fire({
        title: "Login Required",
        text: "You need to be logged in to perform this action. Would you like to log in now?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Login",
        cancelButtonText: "Not Now",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/login", { state: { from: location.pathname } });
        } else {
          // Cancel action if user does not want to log in
          return;
        }
      });
    } else {
      callback(); // If user is logged in, proceed with the action
    }
  };

  // Handle book now button click
  const handleBookNowClick = () => {
    handleLoginCheck(() => {
      (document.getElementById("my_modal_1") as HTMLDialogElement).showModal();
    });
  };

  // Handle details button click
  const handleDetailsClick = () => {
    handleLoginCheck(() => {
      navigate(`/meeting-rooms-details/${_id}`);
    });
  };

  return (
    <div>
      <div className="dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden font-roboto transition duration-500 hover:shadow-2xl transform">
        <img src={img} alt={room.name} className="w-full h-48 object-cover" />
        <div className="p-6">
          <h3
            data-aos="fade-right"
            className="text-xl font-semibold text-indigo-700 dark:text-indigo-400"
          >
            {name}
          </h3>
          <p
            data-aos="fade-right"
            className="text-gray-500 mt-2 dark:text-gray-300"
          >
            Capacity: <span className="font-medium">{capacity}</span>
          </p>
          <p
            data-aos="fade-right"
            className="text-gray-900 font-bold text-lg mt-2 dark:text-gray-100"
          >
            ${pricePerSlot} per slot
          </p>

          {/* Button partition */}
          <div className="flex flex-col md:flex-row justify-between items-center mt-5 gap-4">
            {/* Book Now Button */}
            <button
              data-aos="zoom-in"
              className="w-full p-2 bg-indigo-600 text-white font-semibold rounded-md transition duration-300 hover:bg-indigo-700 hover:shadow-md dark:bg-indigo-700 dark:hover:bg-indigo-800"
              onClick={handleBookNowClick}
            >
              Book Now
            </button>

            <dialog id="my_modal_1" className="modal">
              <div className="">
                <div className="py-4">
                  <BookingRoom roomId={_id} />
                </div>
              </div>
            </dialog>

            {/* See Details Button */}
            <Link
              data-aos="zoom-in"
              onClick={handleDetailsClick}
              className="w-full p-2 bg-indigo-600 text-white font-semibold rounded-md text-center transition duration-300 hover:bg-indigo-700 hover:shadow-md dark:bg-indigo-700 dark:hover:bg-indigo-800"
              to="#"
            >
              Details
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomCard;
