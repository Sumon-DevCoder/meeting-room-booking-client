const WorkSection = () => {
  return (
    <div className="max-w-screen-xl m-auto">
      <section
        id="works"
        className="relative bg-slate-600 rounded-lg py-10 sm:py-16 lg:py-16 my-20"
      >
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-4xl text-white font-extrabold mx-auto md:text-3xl lg:text-4xl">
              How It Works
            </h2>
            <p className="max-w-2xl mx-auto mt-4 text-base text-gray-400 leading-relaxed md:text-2xl">
              Follow these simple steps to book your meeting room.
            </p>
          </div>
          <div className="relative mt-12 lg:mt-20">
            <div className="absolute inset-x-0 hidden xl:px-44 top-2 md:block md:px-20 lg:px-28">
              <img
                alt=""
                loading="lazy"
                width="1000"
                height="500"
                decoding="async"
                data-nimg="1"
                className="w-full"
                style={{ color: "transparent" }}
                src="https://cdn.rareblocks.xyz/collection/celebration/images/steps/2/curved-dotted-line.svg"
              />
            </div>
            <div className="relative grid grid-cols-1 text-center gap-y-12 md:grid-cols-3 gap-x-12">
              <div>
                <div className="flex items-center justify-center w-16 h-16 mx-auto bg-white border-2 border-gray-200 rounded-full shadow">
                  {/* Replace with an icon/illustration for this step */}
                  <span className="text-xl font-semibold text-gray-700">1</span>
                </div>
                <h3 className="mt-6 text-xl text-white font-semibold leading-tight md:mt-10">
                  Select a Room
                </h3>
                <p className="mt-4 text-base text-gray-400 md:text-lg">
                  Choose the perfect room that fits your needs and capacity.
                </p>
              </div>
              <div>
                <div className="flex items-center justify-center w-16 h-16 mx-auto bg-white border-2 border-gray-200 rounded-full shadow">
                  {/* Replace with an icon/illustration for this step */}
                  <span className="text-xl font-semibold text-gray-700">2</span>
                </div>
                <h3 className="mt-6 text-xl text-white font-semibold leading-tight md:mt-10">
                  Choose Date & Time
                </h3>
                <p className="mt-4 text-base text-gray-400 md:text-lg">
                  Select your desired date and time for the booking.
                </p>
              </div>
              <div>
                <div className="flex items-center justify-center w-16 h-16 mx-auto bg-white border-2 border-gray-200 rounded-full shadow">
                  {/* Replace with an icon/illustration for this step */}
                  <span className="text-xl font-semibold text-gray-700">3</span>
                </div>
                <h3 className="mt-6 text-xl text-white font-semibold leading-tight md:mt-10">
                  Confirm Booking
                </h3>
                <p className="mt-4 text-base text-gray-400 md:text-lg">
                  Review your selection and confirm your booking to finalize.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div
          className="absolute inset-0 m-auto max-w-xs h-[357px] blur-[118px] sm:max-w-md md:max-w-lg"
          style={{
            background:
              "radial-gradient(1.89deg, rgba(34, 78, 95, 0.4) -1000%, rgba(191, 227, 205, 0.26) 1500.74%, rgba(34, 140, 165, 0.41) 56.49%, rgba(28, 47, 99, 0.11) 1150.91%)",
          }}
        />
      </section>
    </div>
  );
};

export default WorkSection;