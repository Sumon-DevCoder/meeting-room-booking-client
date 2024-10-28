import { TRoom } from "@/types/room.types";
import { Link, useLocation, useNavigate } from "react-router-dom";
import CheckUserInfo from "../CheckUserRole/CheckUserInfo";
import Swal from "sweetalert2";

const RoomCard = ({ room }: { room: TRoom }) => {
  const { name, capacity, pricePerSlot, img, _id } = room;
  const { user } = CheckUserInfo();
  const navigate = useNavigate();
  const location = useLocation();

  const handleDetailsClick = () => {
    if (!user) {
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
      <div className="bg-white shadow-lg rounded-lg overflow-hidden font-roboto transition duration-500 hover:scale-105 hover:shadow-2xl transform">
        <img src={img} alt={room.name} className="w-full h-48 object-cover" />
        <div className="p-6">
          <h3 className="text-xl font-semibold text-indigo-700">{name}</h3>
          <p className="text-gray-500 mt-2">
            Capacity: <span className="font-medium">{capacity}</span>
          </p>
          <p className="text-gray-900 font-bold text-lg mt-2">
            ${pricePerSlot} per slot
          </p>

          <div className="flex justify-center mt-5">
            <Link
              onClick={handleDetailsClick}
              className="inline-block text-center w-full py-3 px-6 bg-indigo-600 text-white font-semibold rounded-md transition duration-300 hover:bg-indigo-700 hover:shadow-md"
              to={user ? `/meeting-rooms-details/${_id}` : "#"}
            >
              See Details
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomCard;
