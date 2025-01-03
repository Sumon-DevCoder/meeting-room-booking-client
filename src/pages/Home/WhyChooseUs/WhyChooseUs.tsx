const WhyChooseUs = () => {
  return (
    <div>
      <div className="m-auto dark:bg-gray-900 bg-slate-100">
        <section className="relative block px-6 py-10 md:py-10 md:px-10 duration-500">
          <div className="relative mx-auto max-w-7xl text-center">
            {/* Title */}
            <span className="text-gray-900 mb-2 dark:text-gray-300 font-oswald flex items-center justify-center font-medium uppercase tracking-wider">
              Why Choose Us
            </span>

            <h2 className="block w-full bg-clip-text font-bold text-3xl sm:text-4xl dark:text-gray-300 transition-colors duration-500">
              Seamless Meeting Room Booking Experience
            </h2>

            <p className="mx-auto my-4 w-full max-w-xl bg-transparent text-center font-medium leading-relaxed tracking-wide text-gray-600 dark:text-gray-300 transition-colors duration-500">
              Our platform is designed to provide an intuitive experience for
              users booking meeting rooms, ensuring convenience and efficiency.
            </p>
          </div>

          <div className="relative mx-auto max-w-7xl z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 pt-14">
            {/* User-Friendly Design Card */}
            <div className="rounded-md bg-white dark:bg-neutral-800/50 p-8 text-center hover:shadow-2xl transition duration-500 transform hover:scale-105 dark:hover:scale-105 dark:hover:shadow-xl">
              <div
                className="button-text mx-auto flex h-12 w-12 items-center justify-center rounded-md border"
                style={{
                  backgroundImage:
                    "linear-gradient(rgb(80, 70, 229) 0%, rgb(43, 49, 203) 100%)",
                  borderColor: "rgb(93, 79, 240)",
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="icon icon-tabler icon-tabler-color-swatch text-white dark:text-gray-300"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                  <path d="M19 3h-4a2 2 0 0 0 -2 2v12a4 4 0 0 0 8 0v-12a2 2 0 0 0 -2 -2"></path>
                  <path d="M13 7.35l-2 -2a2 2 0 0 0 -2.828 0l-2.828 2.828a2 2 0 0 0 0 2.828l9 9"></path>
                  <path d="M7.3 13h-2.3a2 2 0 0 0 -2 2v4a2 2 0 0 0 2 2h12"></path>
                  <line x1="17" y1="17" x2="17" y2="17.01"></line>
                </svg>
              </div>
              <h3 className="mt-6 text-gray-700 dark:text-gray-200 text-lg font-semibold transition-colors duration-500">
                User-Friendly Design
              </h3>
              <p className="my-4 mb-0 font-normal leading-relaxed tracking-wide text-gray-600 dark:text-gray-300 transition-colors duration-500">
                Experience an easy-to-navigate interface that allows you to book
                meeting rooms quickly and efficiently.
              </p>
            </div>

            {/* Secure Processes Card */}
            <div className="rounded-md bg-white dark:bg-neutral-800/50 p-8 text-center shadow-lg hover:shadow-2xl transition duration-500 transform hover:scale-105 dark:hover:scale-105 dark:hover:shadow-xl">
              <div
                className="button-text mx-auto flex h-12 w-12 items-center justify-center rounded-md border"
                style={{
                  backgroundImage:
                    "linear-gradient(rgb(80, 70, 229) 0%, rgb(43, 49, 203) 100%)",
                  borderColor: "rgb(93, 79, 240)",
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="icon icon-tabler icon-tabler-bolt text-white dark:text-gray-300"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                  <polyline points="13 3 13 10 19 10 11 21 11 14 5 14 13 3"></polyline>
                </svg>
              </div>
              <h3 className="mt-6 text-gray-700 dark:text-gray-200 text-lg font-semibold transition-colors duration-500">
                Secure Processes
              </h3>
              <p className="my-4 mb-0 font-normal leading-relaxed tracking-wide text-gray-600 dark:text-gray-300 transition-colors duration-500">
                Rest assured that your booking information is protected with
                industry-standard security measures.
              </p>
            </div>

            {/* Robust Management Tools Card */}
            <div className="rounded-md bg-white dark:bg-neutral-800/50 p-8 text-center shadow-lg hover:shadow-2xl transition duration-500 transform hover:scale-105 dark:hover:scale-105 dark:hover:shadow-xl">
              <div
                className="button-text mx-auto flex h-12 w-12 items-center justify-center rounded-md border"
                style={{
                  backgroundImage:
                    "linear-gradient(rgb(80, 70, 229) 0%, rgb(43, 49, 203) 100%)",
                  borderColor: "rgb(93, 79, 240)",
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="icon icon-tabler icon-tabler-tools text-white dark:text-gray-300"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                  <path d="M3 21h4l13 -13a1.5 1.5 0 0 0 -4 -4l-13 13v4"></path>
                  <line x1="14.5" y1="5.5" x2="18.5" y2="9.5"></line>
                  <polyline points="12 8 7 3 3 7 8 12"></polyline>
                  <line x1="7" y1="8" x2="5.5" y2="9.5"></line>
                  <polyline points="16 12 21 17 17 21 12 16"></polyline>
                  <line x1="16" y1="17" x2="14.5" y2="18.5"></line>
                </svg>
              </div>
              <h3 className="mt-6 text-gray-700 dark:text-gray-200 text-lg font-semibold transition-colors duration-500">
                Robust Management Tools
              </h3>
              <p className="my-4 mb-0 font-normal leading-relaxed tracking-wide text-gray-600 dark:text-gray-300 transition-colors duration-500">
                Our platform equips administrators with powerful tools for
                efficient management of bookings and resources.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default WhyChooseUs;
