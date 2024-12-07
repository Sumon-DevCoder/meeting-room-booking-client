import { TReview } from "@/types/review.types";

const ReviewCard = ({ review }: { review: TReview }) => {
  return (
    <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-2">
        {/* User Info */}
        <div className="flex items-center">
          <img
            className="h-12 w-12 rounded-full"
            src={review?.userImg}
            alt="User Avatar"
          />
          <div className="ml-4">
            <p className="text-white font-semibold text-md">
              {review?.userName}
            </p>
          </div>
        </div>
      </div>

      {/* Review Content */}
      <div className="p-6">
        {/* Rating */}
        <div className="flex items-center mb-4">
          {[...Array(5)].map((_, index) => (
            <svg
              key={index}
              xmlns="http://www.w3.org/2000/svg"
              className={`w-6 h-6 ${
                index < review?.rating ? "text-yellow-500" : "text-gray-300"
              }`}
              fill={index < review?.rating ? "currentColor" : "none"}
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                d="M12 17.75l-6.172 3.245l1.179 -6.873l-5 -4.867l6.9 -1l3.086 -6.253l3.086 6.253l6.9 1l-5 4.867l1.179 6.873z"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
              />
            </svg>
          ))}
        </div>

        {/* Review Text */}
        <p className="text-gray-700 text-md leading-relaxed">
          {review?.review}
        </p>
      </div>
    </div>
  );
};

export default ReviewCard;
