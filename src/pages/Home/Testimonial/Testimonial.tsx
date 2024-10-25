const testimonials = [
  {
    name: "Alice Johnson",
    role: "Marketing Manager",
    picture: "https://randomuser.me/api/portraits/women/1.jpg",
    testimonial:
      "RoomEase made booking meeting rooms incredibly easy and efficient!",
  },
  {
    name: "Bob Smith",
    role: "Product Owner",
    picture: "https://randomuser.me/api/portraits/men/2.jpg",
    testimonial:
      "A seamless booking experience. I highly recommend this platform!",
  },
  {
    name: "Charlie Brown",
    role: "Software Engineer",
    picture: "https://randomuser.me/api/portraits/men/3.jpg",
    testimonial: "Secure transactions and user-friendly interface!",
  },
];

const Testimonial = () => {
  return (
    <div>
      <div className="container mx-auto p-5 hidden">
        {/* Why Choose Us Section */}

        {/* How It Works Section */}

        {/* Customer Testimonials Section */}
        <section className="my-10">
          <h2 className="text-2xl font-bold text-center mb-4">
            Customer Testimonials
          </h2>
          <div className="carousel carousel-center space-x-4">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="carousel-item max-w-xs border rounded-lg p-4 shadow-md"
              >
                <img
                  src={testimonial.picture}
                  alt={testimonial.name}
                  className="w-16 h-16 rounded-full mb-2"
                />
                <h3 className="font-semibold">{testimonial.name}</h3>
                <p className="text-sm text-gray-500">{testimonial.role}</p>
                <p className="mt-2">"{testimonial.testimonial}"</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Testimonial;
