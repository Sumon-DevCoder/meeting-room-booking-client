import React from "react";

const OurMission = () => {
  return (
    <div>
      <div className="p-4 text-gray-600">
        <h1 className="mb-8 text-center text-3xl font-bold text-indigo-900">
          Our Mission | What We Do:
        </h1>

        <ul className="grid place-content-center sm:grid-cols-2 gap-8">
          <li className="flex hover:text-white transition-colors duration-300">
            <div className="px-4 text-5xl font-extralight text-indigo-700">
              01.
            </div>
            <div>
              <div className="text-xl font-bold text-indigo-800">
                User Experience
              </div>
              <p className="max-w-xs py-2 text-sm text-indigo-900">
                We prioritize a seamless and intuitive experience for users
                booking meeting rooms, ensuring they can easily navigate and
                find what they need.
              </p>
            </div>
          </li>
          <li className="flex hover:text-white transition-colors duration-300">
            <div className="px-4 text-5xl font-extralight text-indigo-700">
              02.
            </div>
            <div>
              <div className="text-xl font-bold text-indigo-800">
                Secure Booking
              </div>
              <p className="max-w-xs py-2 text-sm text-indigo-900">
                Our platform emphasizes secure booking processes, protecting
                users' information while providing peace of mind during
                transactions.
              </p>
            </div>
          </li>
          <li className="flex hover:text-white transition-colors duration-300">
            <div className="px-4 text-5xl font-extralight text-indigo-700">
              03.
            </div>
            <div>
              <div className="text-xl font-bold text-indigo-800">
                Robust Management
              </div>
              <p className="max-w-xs py-2 text-sm text-indigo-900">
                We equip administrators with robust management tools that allow
                for efficient scheduling, tracking, and maintenance of meeting
                room resources.
              </p>
            </div>
          </li>
          <li className="flex hover:text-white transition-colors duration-300">
            <div className="px-4 text-5xl font-extralight text-indigo-700">
              04.
            </div>
            <div>
              <div className="text-xl font-bold text-indigo-800">
                User-Centric Design
              </div>
              <p className="max-w-xs py-2 text-sm text-indigo-900">
                Our user-centric design ensures that all interfaces are
                intuitive, making it easy for users of all backgrounds to
                navigate the booking system.
              </p>
            </div>
          </li>
          <li className="flex hover:text-white transition-colors duration-300">
            <div className="px-4 text-5xl font-extralight text-indigo-700">
              05.
            </div>
            <div>
              <div className="text-xl font-bold text-indigo-800">
                Continuous Improvement
              </div>
              <p className="max-w-xs py-2 text-sm text-indigo-900">
                We are committed to continuously improving our platform based on
                user feedback and emerging technologies to enhance the overall
                booking experience.
              </p>
            </div>
          </li>
          <li className="flex hover:text-white transition-colors duration-300">
            <div className="px-4 text-5xl font-extralight text-indigo-700">
              06.
            </div>
            <div>
              <div className="text-xl font-bold text-indigo-800">
                Customer Support
              </div>
              <p className="max-w-xs py-2 text-sm text-indigo-900">
                Our dedicated customer support team is always ready to assist
                users with their inquiries and provide a swift resolution to any
                issues.
              </p>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default OurMission;