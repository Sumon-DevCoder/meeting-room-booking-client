import PrimaryButton from "@/components/PrimaryButton/PrimaryButton";

const SuccessPayment = () => {
  return (
    <div>
      <div className="bg-gray-100 h-screen flex items-center justify-center px-10 md:px-0">
        <div className="bg-white  p-6 lg:-mt-32 rounded-lg shadow-md">
          <svg
            viewBox="0 0 24 24"
            className="text-green-600 w-16 h-16 mx-auto my-6"
          >
            <path
              fill="currentColor"
              d="M12,0A12,12,0,1,0,24,12,12.014,12.014,0,0,0,12,0Zm6.927,8.2-6.845,9.289a1.011,1.011,0,0,1-1.43.188L5.764,13.769a1,1,0,1,1,1.25-1.562l4.076,3.261,6.227-8.451A1,1,0,1,1,18.927,8.2Z"
            />
          </svg>
          <div className="text-center">
            <h3 className="text-2xl font-semibold text-gray-900">
              Payment Successful!
            </h3>
            <p className="text-gray-600 my-2">
              Thank you for completing your secure online payment.
            </p>
            <p>Have a great day!</p>
            <div className="mt-6 flex justify-center gap-5">
              <PrimaryButton
                path="/user/my-bookings"
                name="Check Status"
              ></PrimaryButton>

              <PrimaryButton path="/" name="Go Home"></PrimaryButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuccessPayment;
