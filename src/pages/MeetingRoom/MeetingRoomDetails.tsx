// import { useParams, useNavigate } from "react-router-dom";
// import { useGetSingleRoomQuery } from "@/redux/features/room/roomApi";
// import Loading from "@/components/Loading/Loading";
// import { toast } from "sonner";

// const MeetingRoomDetails = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();

//   const { data: room, isLoading, isError } = useGetSingleRoomQuery(id);

//   if (isLoading) {
//     return <Loading />;
//   }

//   if (isError) {
//     return toast.error(isError);
//   }

//   const handleBookNow = () => {
//     navigate(`/booking/${id}`);
//   };

//   return (
//     <section className="container mx-auto py-8">
//       <h1 className="text-3xl font-bold text-center mb-6">{room.name}</h1>
//       <div className="flex flex-col md:flex-row">
//         <div className="md:w-1/2">
//           <div className="carousel">
//             {room.images.map((image, index) => (
//               <img
//                 key={index}
//                 src={image}
//                 alt={room.name}
//                 className="w-full h-64 object-cover mb-4 rounded-lg"
//               />
//             ))}
//           </div>
//         </div>
//         <div className="md:w-1/2 md:pl-8">
//           <h2 className="text-xl font-semibold">Room No: {room.roomNo}</h2>
//           <h2 className="text-xl font-semibold">Floor No: {room.floorNo}</h2>
//           <h2 className="text-xl font-semibold">Capacity: {room.capacity}</h2>
//           <h2 className="text-xl font-semibold">
//             Price Per Slot: ${room.pricePerSlot}
//           </h2>
//           <h2 className="text-xl font-semibold">Amenities:</h2>
//           <ul className="list-disc pl-5 mb-4">
//             {room.amenities.map((amenity, index) => (
//               <li key={index}>{amenity}</li>
//             ))}
//           </ul>
//           <button
//             onClick={handleBookNow}
//             className="mt-4 p-2 bg-blue-500 text-white rounded-md transition duration-200 ease-in-out hover:bg-blue-600"
//           >
//             Book Now
//           </button>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default MeetingRoomDetails;

const MeetingRoomDetails = () => {
  return <div></div>;
};

export default MeetingRoomDetails;
