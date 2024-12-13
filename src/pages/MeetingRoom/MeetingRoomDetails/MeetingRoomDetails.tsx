/* eslint-disable @typescript-eslint/no-explicit-any */
import Loading from "@/components/Loading/Loading";
import { useGetSingleRoomQuery } from "@/redux/features/room/roomApi";
import { useParams } from "react-router-dom";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import BookingRoom from "../../BookingRoom/BookingRoom";
import {
  ReactElement,
  JSXElementConstructor,
  ReactNode,
  ReactPortal,
  Key,
} from "react";
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
  } = room;

  return (
    <div className="bg-slate-100 dark:bg-gray-900">
      {/* details card */}
      <div className=" m-auto overflow-hidden font-roboto  transform pt-10 px-10">
        {/* Card Container */}
        <div className="flex flex-col md:flex-row">
          {/* Left Side: Image Section */}
          <div className="md:w-1/2">
            <Swiper
              modules={[Pagination]}
              pagination={{ clickable: true }}
              className="h-64 md:h-full w-full"
            >
              {img.length > 0 ? (
                img.map((imageSrc: string, index: number) => (
                  <SwiperSlide key={index}>
                    <img
                      src={imageSrc}
                      alt="room img"
                      className="object-cover max-h-96 w-full rounded-md"
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
          <div className="md:w-1/2 p-6 flex flex-col justify-between">
            {/* Details Section */}
            <div>
              <h3 className="text-2xl font-semibold text-indigo-700 dark:text-indigo-300">
                {name}
              </h3>
              <div className="text-gray-500 dark:text-gray-300 space-y-2">
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

              {/* Amenities */}
              <div className="mt-4">
                <p className="text-gray-700 dark:text-gray-300 font-bold">
                  Amenities:
                </p>
                <ul className="list-disc pl-5 text-gray-600 dark:text-gray-400">
                  {amenities.length > 0 ? (
                    amenities.map(
                      (
                        amenity:
                          | string
                          | number
                          | boolean
                          | ReactElement<
                              any,
                              string | JSXElementConstructor<any>
                            >
                          | Iterable<ReactNode>
                          | ReactPortal
                          | null
                          | undefined,
                        index: Key | null | undefined
                      ) => <li key={index}>{amenity}</li>
                    )
                  ) : (
                    <li>No amenities available</li>
                  )}
                </ul>
              </div>
            </div>

            {/* Price and Booking Button */}
            <div className="mt-6">
              <p className="text-gray-900 dark:text-gray-100 font-bold text-xl mb-4">
                ${pricePerSlot} per slot
              </p>
              <button
                className="w-full py-3 px-6 bg-indigo-600 dark:bg-indigo-700 text-white dark:text-gray-200 font-semibold rounded-md transition duration-300 hover:bg-indigo-700 hover:shadow-md"
                onClick={() =>
                  (
                    document.getElementById("my_modal_1") as HTMLDialogElement
                  ).showModal()
                }
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
            </div>
          </div>
        </div>
      </div>

      {/* suggest product */}
      <div>
        <ReviewSection roomId={_id} />
        <SuggestRoom />
      </div>
    </div>
  );
};

export default MeetingRoomDetails;
