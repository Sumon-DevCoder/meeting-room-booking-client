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

  return (
    // <div className="dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden font-roboto transition duration-500 hover:shadow-2xl transform">
    //   <img src={img} alt={room.name} className="w-full h-48 object-cover" />
    //   <div className="p-6">
    //     <h3 className="text-xl font-semibold text-blue-700 dark:text-blue-400">
    //       {name}
    //     </h3>
    //     <p className="text-gray-500 mt-2 dark:text-gray-300">
    //       Capacity: <span className="font-medium">{capacity}</span>
    //     </p>
    //     <p className="text-gray-900 font-bold text-lg mt-2 dark:text-gray-100">
    //       ${pricePerSlot} per slot
    //     </p>

    //     {/* Button partition */}
    //     <div className="flex flex-col md:flex-row justify-between items-center mt-5 gap-4">
    //       {/* Book Now Button */}
    //       <button
    //         className="w-full p-2 bg-blue-600 text-white font-medium rounded-md transition-all duration-300 hover:-translate-y-1 hover:bg-blue-700 hover:shadow-md dark:bg-blue-700 dark:hover:bg-blue-800"
    //         onClick={handleBookNowClick}
    //       >
    //         Book Now
    //       </button>
    //       <dialog id="my_modal_1" className="modal">
    //         <div className="">
    //           <div className="py-4">
    //             <BookingRoom roomId={_id} />
    //           </div>
    //         </div>
    //       </dialog>
    //       <Link
    //         className="w-full p-2 bg-blue-600 text-white font-medium rounded-md text-center transition-transform duration-300 transform hover:-translate-y-1 hover:bg-blue-700 hover:shadow-md dark:bg-blue-700 dark:hover:bg-blue-800"
    //         to={`/meeting-rooms-details/${_id}`}
    //       >
    //         Details
    //       </Link>
    //     </div>
    //   </div>
    // </div>
    <div className="dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden font-roboto transition duration-500 transform">
      <img src={img} alt={room.name} className="w-full h-48 object-cover" />
      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300">
          {name}
        </h3>
        <p className="text-gray-700 mt-2 dark:text-gray-300">
          Capacity:{" "}
          <span className="text-[#1145B6] font-semibold dark:text-[#9FBAF4]">
            {capacity}
          </span>
        </p>
        <p className="text-md  mt-2 dark:text-blue-500">
          <span className="text-gray-700 dark:text-gray-300">Per Slot :</span>{" "}
          <span className="text-[#1145B6] dark:text-[#9FBAF4] font-semibold">
            ${pricePerSlot}
          </span>
        </p>

        {/* Button partition */}
        <div className="flex flex-col md:flex-row justify-between items-center mt-5 gap-4">
          {/* Book Now Button */}
          <button
            className="w-full px-2 py-1.5 dark:py-2 hover:py-2 hover:border-none dark:bg-gray-600 dark:text-gray-200 bg-gray-300 border-2 dark:border-none border-gray-300 text-gray-800 font-medium rounded-md text-center transition-all duration-300 relative overflow-hidden group"
            onClick={handleBookNowClick}
          >
            <span className="absolute inset-0 w-full h-full  bg-blue-500 transform scale-x-0 group-hover:scale-x-100 transition-all duration-700 origin-left"></span>
            <span className="relative z-10">Book Now</span>
          </button>
          <dialog id="my_modal_1" className="modal">
            <div className="">
              <div className="py-4">
                <BookingRoom roomId={_id} />
              </div>
            </div>
          </dialog>

          {/* Details Button */}
          <Link
            className="w-full px-2 py-1.5 dark:py-1.5 hover:py-2 hover:border-none dark:bg-gray-800 dark:text-gray-200 dark:border-gray-600 bg-gray-100 border-2  border-gray-300 text-gray-800 font-medium rounded-md text-center transition-all duration-300 relative overflow-hidden group"
            to={`/meeting-rooms-details/${_id}`}
          >
            <span className="absolute inset-0 w-full h-full  bg-blue-500 transform scale-x-0 group-hover:scale-x-100 transition-all duration-700 origin-left"></span>
            <span className="relative z-10">Details</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RoomCard;
