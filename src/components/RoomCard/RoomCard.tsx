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

  const handleDetailsClick = () => {
    if (!email) {
      Swal.fire({
        title: "Login Required",
        text: "You need to be logged in to view the room details. Would you like to log in now?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Login",
        cancelButtonText: "Not Now",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/login", { state: { from: location.pathname } });
        }
      });
    }
  };

  return (
    <div>
      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden font-roboto transition duration-500 hover:shadow-2xl transform">
        <img src={img} alt={room.name} className="w-full h-48 object-cover" />
        <div className="p-6">
          <h3 className="text-xl font-semibold text-indigo-700 dark:text-indigo-400">
            {name}
          </h3>
          <p className="text-gray-500 mt-2 dark:text-gray-300">
            Capacity: <span className="font-medium">{capacity}</span>
          </p>
          <p className="text-gray-900 font-bold text-lg mt-2 dark:text-gray-100">
            ${pricePerSlot} per slot
          </p>

          {/* button partition */}
          <div className="flex flex-col md:flex-row justify-between items-center mt-5 gap-4">
            {/* Book Now Button */}
            <button
              className="w-full p-2 bg-indigo-600 text-white font-semibold rounded-md transition duration-300 hover:bg-indigo-700 hover:shadow-md dark:bg-indigo-700 dark:hover:bg-indigo-800"
              onClick={() =>
                (
                  document.getElementById("my_modal_1") as HTMLDialogElement
                ).showModal()
              }
            >
              Book Now
            </button>

            <dialog id="my_modal_1" className="modal">
              <div className="modal-box">
                <div className="py-4">
                  <BookingRoom roomId={_id} />
                </div>
              </div>
            </dialog>

            {/* See Details Button */}
            <Link
              onClick={handleDetailsClick}
              className="w-full p-2 bg-indigo-600 text-white font-semibold rounded-md text-center transition duration-300 hover:bg-indigo-700 hover:shadow-md dark:bg-indigo-700 dark:hover:bg-indigo-800"
              to={email ? `/meeting-rooms-details/${_id}` : "#"}
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
