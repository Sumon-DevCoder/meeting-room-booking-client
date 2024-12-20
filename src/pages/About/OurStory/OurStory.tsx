import { FaRocket, FaUsers, FaLock, FaRegThumbsUp } from "react-icons/fa";

const OurStory = () => {
  return (
    <div>
      <section className="py-12 px-6 bg-gray-100 dark:bg-gray-800 rounded-lg">
        <div className="max-w-4xl mx-auto text-center font-roboto font-medium text-slate-600 dark:text-slate-300">
          <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
            🚀 Our Story
          </h2>
          <p className="text-lg mb-4 text-gray-700 dark:text-gray-200">
            At Meeting Room Booking, we began our journey with a simple mission:
            to simplify the process of booking meeting rooms for co-working
            spaces. Recognizing the challenges faced by users in finding
            suitable venues, we set out to create a platform that streamlines
            this experience.{" "}
            <FaRocket className="inline-block ml-2 text-gray-600 dark:text-gray-300" />
          </p>
          <p className="text-lg mb-4 text-gray-700 dark:text-gray-200">
            Over the years, we have evolved from a basic booking system to a
            comprehensive platform that not only allows users to book rooms but
            also provides insights into availability, pricing, and amenities.
            Our commitment to user satisfaction has driven us to continuously
            refine our features based on feedback.{" "}
            <FaUsers className="inline-block ml-2 text-gray-600 dark:text-gray-300" />
          </p>
          <p className="text-lg mb-4 text-gray-700 dark:text-gray-200">
            As we grew, so did our understanding of what our users needed. We've
            expanded our offerings to include integrations with calendars,
            support for diverse payment methods, and a focus on security to
            ensure a seamless experience.{" "}
            <FaLock className="inline-block ml-2 text-gray-600 dark:text-gray-300" />
          </p>
          <p className="text-lg mb-4 text-gray-700 dark:text-gray-200">
            Today, Meeting Room Booking is proud to be a trusted partner for
            co-working spaces, helping them maximize their potential and
            providing users with a reliable solution for their booking needs.
            Our story is one of innovation, dedication, and a commitment to
            excellence, and we're excited to see where it takes us next.{" "}
            <FaRegThumbsUp className="inline-block ml-2 text-gray-600 dark:text-gray-300" />
          </p>
        </div>
      </section>
    </div>
  );
};

export default OurStory;
