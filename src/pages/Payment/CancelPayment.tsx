import PrimaryButton from "@/components/PrimaryButton/PrimaryButton";

const CancelPayment = () => {
  return (
    <div>
      <div className="bg-gray-100 h-screen flex items-center justify-center px-10 md:px-0">
        <div className="bg-white p-6 lg:-mt-32 rounded-lg shadow-md">
          <svg
            viewBox="0 0 24 24"
            className="text-red-600 w-16 h-16 mx-auto my-6"
          >
            <path
              fill="currentColor"
              d="M12,0A12,12,0,1,0,24,12,12.014,12.014,0,0,0,12,0Zm0,5a1,1,0,0,1,1,1v5h5a1,1,0,0,1,0,2H13v5a1,1,0,0,1-2,0V13H6a1,1,0,0,1,0-2h5V6A1,1,0,0,1,12,5Z"
            />
          </svg>
          <div className="text-center">
            <h3 className="text-2xl font-semibold text-gray-900">
              Payment Cancelled
            </h3>
            <p className="text-gray-600 my-2">
              Your payment was not completed. You can try again or contact
              support.
            </p>
            <p>We're here to help!</p>
            <div className="mt-6 flex justify-center gap-5">
              <PrimaryButton path="/user/my-bookings" name="Try Again" />
              <PrimaryButton path="/" name="Go Home" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CancelPayment;
