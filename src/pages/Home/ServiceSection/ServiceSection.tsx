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
    scale: 1.1, // 2 = 200%, 1.5 = 150%, etc..
    speed: 1000, // Speed of the enter/exit transition
    transition: true, // Set a transition on enter/exit.
    axis: null, // What axis should be disabled. Can be X or Y.
    reset: true, // If the tilt effect has to be reset on exit.
    easing: "cubic-bezier(.03,.98,.52,.99)", // Easing on enter/exit.
  };

  return (
    <section className="py-12 bg-gray-100">
      <div className="container mx-auto text-center">
        <h2
          className="text-3xl font-bold mb-8"
          data-aos="fade-up" // AOS animation for heading
        >
          Our Highlighted Services
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service: TService, index: number) => (
            <Tilt
              options={defaultOptions}
              style={{ height: 250, width: 250 }}
              key={service?.id}
              className="bg-white rounded-lg shadow-lg p-6"
              data-aos="fade-up"
              data-aos-delay={`${index * 100}`} // Delay for staggered animation effect
            >
              <h3 className="text-xl font-semibold mb-4">{service.title}</h3>
              <p className="text-gray-600">{service.description}</p>
            </Tilt>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServiceSection;
