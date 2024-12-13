import Loading from "@/components/Loading/Loading";
import { useGetReviewByRoomQuery } from "@/redux/features/review/reviewApi";

// Swiper Imports
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Navigation } from "swiper/modules";
import ReviewCard from "./ReviewCard/ReviewCard";
import { TReview } from "@/types/review.types";
import AddReviewModal from "../AddReviewModal/AddReviewModal";

const ReviewSection = ({ roomId }: { roomId: string }) => {
  const { data, isLoading } = useGetReviewByRoomQuery(roomId);

  if (isLoading) {
    return <Loading />;
  }

  const reviews = data?.data || [];

  return (
    <div className="bg-gray-100 dark:bg-gray-900 m-auto px-20 mt-16">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4">
          Guests who stayed here loved it!
        </h2>
        <button
          className="bg-blue-500 dark:bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-600 dark:hover:bg-blue-700 transition duration-300"
          onClick={() =>
            (
              document.getElementById("my_modal_2") as HTMLDialogElement
            ).showModal()
          }
        >
          Write Review
        </button>
        <dialog id="my_modal_2" className="modal">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg">
            <AddReviewModal roomId={roomId} />
          </div>
        </dialog>
      </div>
      {reviews?.length ? (
        <div className="relative">
          {/* Custom Navigation Arrows */}
          <div className="custom-prev absolute top-1/2 left-0 transform -translate-y-1/2 cursor-pointer z-10 bg-gray-300 dark:bg-gray-700 p-2 rounded-full hover:bg-gray-400 dark:hover:bg-gray-600">
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
            {reviews?.map((review: TReview) => (
              <SwiperSlide key={review?._id}>
                <ReviewCard review={review} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      ) : (
        <div className="flex justify-center items-center h-10">
          <p className="text-center text-gray-600 dark:text-gray-400 font-semibold text-lg">
            No review available at the moment.
          </p>
        </div>
      )}
    </div>
  );
};

export default ReviewSection;
