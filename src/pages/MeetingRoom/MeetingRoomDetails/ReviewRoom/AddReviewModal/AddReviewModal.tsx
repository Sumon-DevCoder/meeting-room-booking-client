/* eslint-disable @typescript-eslint/no-explicit-any */
import useCurrentUserInfoData from "@/hoooks/useCurrentUserInfoData";
import { useCreateReviewMutation } from "@/redux/features/review/reviewApi";
import { useState } from "react";
import { toast } from "sonner";
import Loading from "../../../../../components/Loading/Loading";
import { FieldValues, useForm } from "react-hook-form";

const AddReviewModal = ({ roomId }: { roomId: string }) => {
  const [createReview] = useCreateReviewMutation();
  const { user, isUserLoading } = useCurrentUserInfoData();
  const [rating, setRating] = useState(5);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  // loading
  if (isUserLoading) {
    return <Loading />;
  }

  // submit form
  const handleReviewSubmit = async (data: FieldValues) => {
    const reviewData = {
      userName: user?.name,
      userImg: user?.img,
      roomId,
      rating: rating || 5,
      review: data?.review,
    };

    console.log(reviewData);

    try {
      const res = await createReview(reviewData).unwrap();

      if (res) {
        // Close the modal after review is successfully submitted
        const modal = document.getElementById(
          "my_modal_2"
        ) as HTMLDialogElement;
        modal?.close();

        toast.success("Review submitted successfully!");
        console.log("Review submitted:", res);

        // reset
        reset();
      }
    } catch (err: any) {
      const modal = document.getElementById("my_modal_2") as HTMLDialogElement;
      modal?.close();
      toast.error(err?.data?.message);
    }
  };

  return (
    <div className="max-w-full mx-auto p-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
      <div>
        <div>
          {/* content */}
          <h2 className="text-xl font-bold text-gray-800 dark:text-white">
            Rate Your Experience
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-400">
            How would you rate your experience?
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit(handleReviewSubmit)} className="space-y-6">
        {/* rating */}
        <div className="rating rating-md pb-3">
          {[1, 2, 3, 4, 5].map((star) => (
            <input
              key={star}
              type="radio"
              name="rating"
              className="mask mask-star-2 bg-orange-400"
              onChange={() => setRating(star)}
              checked={rating === star}
            />
          ))}
        </div>

        {/* review text area */}
        <textarea
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400 dark:focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
          rows={4}
          placeholder="Write your review here..."
          {...register("review", { required: "Please write a review." })}
        />
        {errors.review && (
          <span className="text-red-400">
            {errors.review.message as string}
          </span>
        )}

        <div className="space-x-5">
          <button
            type="submit"
            className="mt-4 w-full py-2 px-4 bg-green-500 text-white font-semibold rounded-md hover:bg-green-600 transition duration-300"
          >
            Submit
          </button>
        </div>
      </form>
      <button
        className="mt-4 py-2 w-full px-4 bg-red-500 text-white font-semibold rounded-md hover:bg-green-600 transition duration-300"
        onClick={() =>
          (document.getElementById("my_modal_2") as HTMLDialogElement).close()
        }
      >
        Close
      </button>
    </div>
  );
};

export default AddReviewModal;
