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
    <Carousel className="hidden">
      {testimonials?.map((testimonial) => {
        return (
          <div key={testimonial?.id}>
            <img className="w-20 h-96" src={testimonial?.image} />
            <p className="legend">Legend 2</p>
          </div>
        );
      })}
    </Carousel>
  );
};

export default Testimonial;
