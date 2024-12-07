import { useEffect, useState } from "react";
import "aos/dist/aos.css";
import { Tilt } from "react-tilt";

type TService = {
  id: number;
  title: string;
  description: string;
};

const ServiceSection = () => {
  const [services, setServices] = useState<TService[]>([]);

  useEffect(() => {
    // Fetching data from local services.json
    fetch("/services.json")
      .then((res) => res.json())
      .then((data) => setServices(data));
  }, []);

  const defaultOptions = {
    reverse: false, // reverse the tilt direction
    max: 35, // max tilt rotation (degrees)
    perspective: 1000, // Transform perspective, the lower the more extreme the tilt gets.
    scale: 1.05, // Slight scale-up effect on tilt
    speed: 1000, // Speed of the enter/exit transition
    transition: true, // Set a transition on enter/exit.
    axis: null, // What axis should be disabled. Can be X or Y.
    reset: true, // If the tilt effect has to be reset on exit.
    easing: "cubic-bezier(.03,.98,.52,.99)", // Easing on enter/exit.
  };

  return (
    <section className="py-12 bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
      <div className="container mx-auto text-center">
        <h2
          className="text-2xl md:text-3xl font-bold mb-8 text-gray-900 dark:text-gray-100"
          data-aos="fade-left"
        >
          Our Highlighted Services
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 justify-items-center md:px-20 lg:px-10 items-center">
          {services.map((service: TService, index: number) => (
            <Tilt
              options={defaultOptions}
              style={{ height: 250, width: 250 }}
              key={service?.id}
              className="bg-white bg-gradient-to-r from-blue-500 dark:from-slate-800 dark:to-slate-700 rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300"
              data-aos="fade-up"
              data-aos-delay={`${index * 100}`}
            >
              <h3
                data-aos="fade-right"
                className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200"
              >
                {service.title}
              </h3>
              <p
                data-aos="fade-right"
                className="text-gray-600 dark:text-gray-400 text-sm md:text-base"
              >
                {service.description}
              </p>
            </Tilt>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServiceSection;
