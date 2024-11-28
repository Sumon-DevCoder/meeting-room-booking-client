import { TTestimonial } from "@/types/testimonial.types";
import { useEffect, useState } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";

const Testimonial = () => {
  const [testimonials, setTestimonials] = useState<TTestimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/testimonials.json")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.json();
      })
      .then((data) => {
        setTestimonials(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
        setError("Failed to load testimonials.");
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="bg-gray-200 dark:bg-gray-900 p-10 dark:text-white  m-auto py-24">
      <div className="flex justify-center">
        <h2 className="text-3xl font-bold text-center mb-4 border-b-2 border-gray-300 pb-2 inline-block">
          What Our Clients Say
        </h2>
      </div>
      <div className="lg:px-64">
        <Carousel>
          {testimonials.map((testimonial) => {
            return (
              <div key={testimonial?.id} className="flex flex-col items-center">
                <div className="avatar">
                  <div className="w-24 rounded-full">
                    <img
                      src={testimonial?.image}
                      alt={`${testimonial?.name}'s testimonial`}
                    />
                  </div>
                </div>
                <h3 className="text-lg font-semibold pt-2">
                  {testimonial?.name}
                </h3>
                <p className="text-sm text-gray-500">{testimonial?.role}</p>
                <p className="mt-2 text-center px-20">
                  {testimonial?.testimonial}
                </p>
              </div>
            );
          })}
        </Carousel>
      </div>
    </div>
  );
};

export default Testimonial;
