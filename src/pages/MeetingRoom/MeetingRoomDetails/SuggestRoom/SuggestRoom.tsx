import Loading from "@/components/Loading/Loading";
import RoomCard from "@/components/RoomCard/RoomCard";
import { useGetRoomsQuery } from "@/redux/features/room/roomApi";
import { TRoom } from "@/types/room.types";

// Swiper Imports
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Navigation } from "swiper/modules";

const SuggestRoom = () => {
  const { data, isLoading } = useGetRoomsQuery({});

  if (isLoading) {
    return <Loading />;
  }

  const { data: rooms } = data || [];

  return (
    <div className="py-10 bg-slate-100 dark:bg-slate-900 m-auto px-20 mt-14">
      <h2 className="text-2xl md:text-3xl font-bold mb-8 text-start text-gray-900 dark:text-white divider">
        You might also like
      </h2>

      {rooms?.result?.length ? (
        <div className="relative">
          {/* Custom Navigation Arrows */}
          <div className="custom-prev  absolute top-1/2 left-0 transform -translate-y-1/2 cursor-pointer z-10 bg-gray-300 dark:bg-gray-700 p-2 rounded-full hover:bg-gray-400 dark:hover:bg-gray-600">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-gray-800 dark:text-gray-200"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </div>
          <div className="custom-next absolute top-1/2 right-0 transform -translate-y-1/2 cursor-pointer z-10 bg-gray-300 dark:bg-gray-700 p-2 rounded-full hover:bg-gray-400 dark:hover:bg-gray-600">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-gray-800 dark:text-gray-200"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </div>

          {/* Swiper Slider */}
          <Swiper
            modules={[Navigation]}
            navigation={{
              prevEl: ".custom-prev",
              nextEl: ".custom-next",
            }}
            spaceBetween={20}
            slidesPerView={1}
            breakpoints={{
              640: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            className="mySwiper px-12 lg:px-20"
          >
            {rooms.result.map((room: TRoom) => (
              <SwiperSlide key={room?._id}>
                <RoomCard room={room} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      ) : (
        <div className="flex justify-center items-center h-10">
          <p className="text-center text-gray-600 dark:text-gray-300 font-semibold text-lg">
            No rooms available at the moment. Please check back later.
          </p>
        </div>
      )}
    </div>
  );
};

export default SuggestRoom;
