/* eslint-disable @typescript-eslint/no-explicit-any */
import Loading from "@/components/Loading/Loading";
import { useGetSingleRoomQuery } from "@/redux/features/room/roomApi";
import { useParams } from "react-router-dom";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import BookingRoom from "../BookingRoom/BookingRoom";

const MeetingRoomDetails = () => {
  const { id } = useParams();
  const { data, isLoading } = useGetSingleRoomQuery(id);
  const room = data?.data;

  // isLoaing
  if (isLoading) {
    return <Loading />;
  }

  // if room not found
  if (!room) {
    return (
      <p className="text-center mt-10 text-red-400 text-xl font-semibold">
        Room details not found
      </p>
    );
  }

  // dectruting room
  const { name, capacity, pricePerSlot, img, roomNo, floorNo, amenities, _id } =
    room;

  return (
    <div className="bg-white  max-w-screen-lg m-auto shadow-lg rounded-lg overflow-hidden font-roboto hover:shadow-2xl transform">
      <div className="p-4 ">
        {/* Swiper Image Slider Section */}
        <Swiper
          modules={[Pagination]}
          pagination={{ clickable: true }}
          className="h-72 w-full"
        >
          {img.map((imageSrc: any) => (
            <SwiperSlide key={room?._id}>
              <img
                src={imageSrc}
                alt="room img"
                className="object-cover h-72 w-full rounded-md"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Details Section */}
      <div className="p-6 flex justify-between">
        {/* Left Section */}
        <div className="space-y-2">
          <h3 className="text-2xl font-semibold text-indigo-700 mb-2">
            {name}
          </h3>
          <div className="text-gray-500 space-y-1">
            <p>
              Room No.: <span className="font-medium">{roomNo}</span>
            </p>
            <p>
              Floor No.: <span className="font-medium">{floorNo}</span>
            </p>
            <p>
              Capacity: <span className="font-medium">{capacity}</span>
            </p>
          </div>
        </div>

        {/* Right Section */}
        <div className="text-right">
          <p className="text-gray-900 font-bold text-lg mb-2 text-start">
            ${pricePerSlot} per slot
          </p>
          <div>
            <p className="text-gray-700 text-start font-bold text-lg">
              Amenities:
            </p>
            <ul className="text-start list-disc pl-5 text-gray-600">
              {amenities.map((amenity: any) => (
                <li key={room?._id}>{amenity}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="flex justify-center mb-4 px-4">
        <button
          className="mt-5 w-full py-3 px-6 bg-indigo-600 text-white font-semibold rounded-md transition duration-300 hover:bg-indigo-700 hover:shadow-md"
          onClick={() => document.getElementById("my_modal_1").showModal()}
        >
          Book Now
        </button>
        <dialog id="my_modal_1" className="modal">
          <div className="modal-box">
            <div className="py-4">
              <BookingRoom roomId={_id} />
            </div>
            <div className="modal-action">
              <form method="dialog">
                <div className="flex justify-center items-center ">
                  <button className="btn">Close</button>
                </div>
              </form>
            </div>
          </div>
        </dialog>
      </div>
    </div>
  );
};

export default MeetingRoomDetails;
