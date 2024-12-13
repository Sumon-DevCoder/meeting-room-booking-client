import { TReview } from "@/types/review.types";

const ReviewCard = ({ review }: { review: TReview }) => {
  return (
    <div className="max-w-md mx-auto bg-gray-100 dark:bg-gray-900 rounded-md shadow-md p-4 border-2 dark:border-gray-800">
      {/* User Info */}
      <div className="flex items-center mb-4">
        <img
          className="h-10 w-10 rounded-full object-cover"
          src={review?.userImg}
          alt="User Avatar"
        />
        <div className="ml-3">
          <p className="text-gray-900 dark:text-gray-100 font-medium text-lg">
            {review?.userName}
          </p>
        </div>
      </div>

      {/* Review Content */}
      <div>
        {/* Rating */}
        <div className="flex items-center mb-3">
          {[...Array(5)].map((_, index) => (
            <svg
              key={index}
              xmlns="http://www.w3.org/2000/svg"
              className={`w-5 h-5 ${
                index < review?.rating
                  ? "text-yellow-500"
                  : "text-gray-300 dark:text-gray-600"
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
        <p className="text-gray-800 dark:text-gray-300 text-sm">
          {review?.review}
        </p>
      </div>
    </div>
  );
};

export default ReviewCard;
