import "aos/dist/aos.css";
import { Tilt } from "react-tilt";
import {
  FaRegClock,
  FaCheckCircle,
  FaCalendarAlt,
  FaHeadset,
} from "react-icons/fa"; // Import specific icons

const ServiceSection = () => {
  const services = [
    {
      id: 1,
      title: "Real-Time Availability",
      description:
        "Check the availability of meeting rooms in real time, ensuring you never miss out on your ideal space.",
      icon: FaRegClock, // Using FontAwesome icon
    },
    {
      id: 2,
      title: "Instant Booking Confirmation",
      description:
        "Receive instant confirmation of your bookings, giving you peace of mind and a hassle-free experience.",
      icon: FaCheckCircle, // Using FontAwesome icon
    },
    {
      id: 3,
      title: "Flexible Scheduling",
      description:
        "Easily schedule your meetings with our flexible options, catering to all your needs.",
      icon: FaCalendarAlt, // Using FontAwesome icon
    },
    {
      id: 4,
      title: "24/7 Support",
      description:
        "Our support team is available 24/7 to assist you with any questions or issues.",
      icon: FaHeadset, // Using FontAwesome icon
    },
  ];

  const tiltOptions = {
    reverse: false,
    max: 35,
    perspective: 1000,
    scale: 1.05,
    speed: 1000,
    transition: true,
    axis: null,
    reset: true,
    easing: "cubic-bezier(.03,.98,.52,.99)",
  };

  return (
    <section className="py-8 bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
      <div className="container mx-auto text-center">
        <h2
          data-aos="zoom-in"
          data-aos-delay="400"
          className="text-2xl md:text-3xl font-bold mb-8 text-gray-900 dark:text-gray-100"
        >
          Our Highlighted Services
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 justify-items-center md:px-20 lg:px-10 items-center">
          {services.map((service) => {
            const Icon = service.icon;

            return (
              <Tilt
                options={tiltOptions}
                style={{ height: 250, width: 250 }}
                key={service.id}
                className="bg-white bg-gradient-to-r from-slate-100 dark:from-slate-800 dark:to-slate-700 rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300 flex flex-col items-center justify-center" // Centering the content
              >
                <div className="flex items-center justify-center mb-4">
                  <Icon
                    aria-label={service.title}
                    className="text-gray-800 dark:text-gray-200 text-4xl"
                  />
                </div>
                <h3
                  data-aos="fade-right"
                  data-aos-delay="400"
                  className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200"
                >
                  {service.title}
                </h3>
                <p
                  data-aos="fade-left"
                  data-aos-delay="400"
                  className="text-gray-600 dark:text-gray-400 text-sm md:text-base"
                >
                  {service.description}
                </p>
              </Tilt>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ServiceSection;
