import PrimaryButton from "@/components/PrimaryButton/PrimaryButton";

const FailPayment = () => {
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
              d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 18a1.5 1.5 0 110-3 1.5 1.5 0 010 3zm1-9h-2V5h2v4z"
            />
          </svg>
          <div className="text-center">
            <h3 className="text-2xl font-semibold text-gray-900">
              Payment Failed
            </h3>
            <p className="text-gray-600 my-2">
              Unfortunately, your payment could not be processed. Please try
              again.
            </p>
            <p>If you need assistance, feel free to contact support.</p>
            <div className="mt-6 flex justify-center gap-5">
              <PrimaryButton path="/user/my-bookings" name="Retry Payment" />
              <PrimaryButton path="/" name="Go Home" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FailPayment;
