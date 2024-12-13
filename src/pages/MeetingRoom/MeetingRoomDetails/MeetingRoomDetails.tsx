/* eslint-disable @typescript-eslint/no-explicit-any */
import Loading from "@/components/Loading/Loading";
import { useGetSingleRoomQuery } from "@/redux/features/room/roomApi";
import { useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import BookingRoom from "../../BookingRoom/BookingRoom";
import SuggestRoom from "./SuggestRoom/SuggestRoom";
import ReviewSection from "./ReviewRoom/ReviewSection/ReviewSection";

const MeetingRoomDetails = () => {
  const { id } = useParams();
  const { data, isLoading } = useGetSingleRoomQuery(id); // get single room
  const room = data?.data;

  // isLoading
  if (isLoading) {
    return <Loading />;
  }

  // If room not found
  if (!room) {
    return (
      <p className="text-center mt-10 text-red-400 text-xl font-semibold">
        Room details not found
      </p>
    );
  }

  // Destructuring room properties
  const {
    name,
    capacity,
    pricePerSlot,
    img = [],
    roomNo,
    floorNo,
    amenities = [],
    _id,
    description,
  } = room;

  return (
    <div className="bg-slate-100 dark:bg-gray-900 py-10">
      {/* details card */}
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Card Container */}
        <div className="flex flex-col md:flex-row gap-10 md:gap-16">
          {/* Left Side: Image Section */}
          <div className="md:w-1/2">
            <Swiper
              modules={[Pagination]}
              pagination={{ clickable: true }}
              className="h-64 md:h-full w-full rounded-lg overflow-hidden"
            >
              {img.length > 0 ? (
                img.map((imageSrc: string, index: number) => (
                  <SwiperSlide key={index}>
                    <img
                      src={imageSrc}
                      alt="room img"
                      className="object-cover max-h-96 w-full rounded-lg shadow-lg"
                    />
                  </SwiperSlide>
                ))
              ) : (
                <p className="text-gray-700 dark:text-gray-300 p-4">
                  No images available
                </p>
              )}
            </Swiper>
          </div>

          {/* Right Side: Content Section */}
          <div className="md:w-1/2 flex flex-col">
            {/* Details Section */}
            <div>
              <h3 className="text-3xl font-semibold text-indigo-700 dark:text-indigo-300 mb-2">
                {name}
              </h3>

              <p className="text-md text-gray-600 dark:text-gray-400 mb-3">
                {description}
              </p>

              {/* Amenities */}
              <div className="">
                <p className="text-xl font-semibold text-gray-700 dark:text-gray-300">
                  Amenities:
                </p>
                <ul className="list-disc pl-6 text-gray-600 dark:text-gray-400 flex flex-wrap gap-8 mt-2">
                  {amenities.length > 0 ? (
                    amenities.map((amenity: any, index: any) => (
                      <li key={index} className="text-sm">
                        {amenity}
                      </li>
                    ))
                  ) : (
                    <li>No amenities available</li>
                  )}
                </ul>
              </div>

              {/* Room Info */}
              <div className="text-gray-500 dark:text-gray-300 flex flex-wrap gap-8 pt-5 ">
                <p className="text-md">
                  <span className="font-semibold">Price: </span>
                  <span className="font-medium">{pricePerSlot}$</span>
                </p>
                <p className="text-md">
                  <span className="font-semibold">Room No:</span>{" "}
                  <span className="font-medium">{roomNo}</span>
                </p>
                <p className="text-md">
                  <span className="font-semibold">Floor No:</span>{" "}
                  <span className="font-medium">{floorNo}</span>
                </p>
                <p className="text-md">
                  <span className="font-semibold">Capacity: </span>
                  <span className="font-medium">{capacity}</span>
                </p>
              </div>
            </div>

            {/* Price and Booking Button */}
            <div className="">
              {/* <p className="text-xl font-semibold text-gray-600 dark:text-indigo-300 mb-4">
                Price Per Slot:{" "}
                <span className="font-medium text-gray-500 dark:text-gray-300">
                  {pricePerSlot}$
                </span>
              </p> */}

              <button
                className="w-full mt-5 py-3 px-6 bg-indigo-600 dark:bg-indigo-700 text-white dark:text-gray-200 font-semibold rounded-md transition duration-300 hover:bg-indigo-700 hover:shadow-lg"
                onClick={() =>
                  (
                    document.getElementById("my_modal_1") as HTMLDialogElement
                  ).showModal()
                }
              >
                Book Now
              </button>

              <dialog id="my_modal_1" className="modal">
                <div className="modal-content py-4 px-6 rounded-lg">
                  <BookingRoom roomId={_id} />
                </div>
              </dialog>
            </div>
          </div>
        </div>
      </div>

      {/* Suggested Rooms and Reviews */}
      <div className="mt-12">
        <ReviewSection roomId={_id} />
        <SuggestRoom />
      </div>
    </div>
  );
};

export default MeetingRoomDetails;
