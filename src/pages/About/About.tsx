import { motion } from "framer-motion";
import MeetTheTeam from "./MeetTheTeam/MeetTheTeam";
import OurStory from "./OurStory/OurStory";

const teamMembers = [
  {
    id: 1,
    name: "John Doe",
    role: "Project Manager",
    image:
      "https://images.unsplash.com/photo-1618977278253-f2c8b9f5c03b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg",
    bio: "John has over 10 years of experience in project management and ensures everything runs smoothly.",
  },
  {
    id: 2,
    name: "Jane Smith",
    role: "Team Lead",
    image:
      "https://images.unsplash.com/photo-1599061672931-018ef837c7c5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg",
    bio: "Jane leads our team with creativity and passion for design.",
  },
  {
    id: 3,
    name: "Michael Brown",
    role: "UX Designer",
    image:
      "https://images.unsplash.com/photo-1597612928872-29837e26f0c8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg",
    bio: "Michael specializes in user experience design, making our products user-friendly.",
  },
];

const AboutUs = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      {/* Our Mission Section */}
      {/* <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="mb-10 text-center"
      >
        <h2 className="text-4xl font-bold mb-4">Our Mission</h2>
        <p className="text-lg">
          Our mission is to provide seamless and efficient meeting room booking
          solutions that enhance collaboration and productivity.
        </p>
      </motion.div> */}

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

      {/* Meet the Team Section */}
      {/* <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <h2 className="text-4xl font-bold text-center mb-10">Meet the Team</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {teamMembers.map((member) => (
            <div key={member.id} className="bg-white shadow-lg rounded-lg p-4">
              <img
                src={member.image}
                alt={member.name}
                className="w-full h-48 object-cover rounded-t-lg"
              />
              <h3 className="text-xl font-semibold mt-4">{member.name}</h3>
              <h4 className="text-gray-600">{member.role}</h4>
              <p className="mt-2">{member.bio}</p>
            </div>
          ))}
        </div>
      </motion.div> */}

      <MeetTheTeam />
      <OurStory />

      {/* Our Story Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="mt-10 text-center"
      >
        <h2 className="text-4xl font-bold mb-4">Our Story</h2>
        <p className="text-lg">
          RoomEase started with a vision to simplify the meeting scheduling
          process. Over the years, we have evolved to meet the changing needs of
          our clients.
        </p>
      </motion.div>
    </div>
  );
};

export default AboutUs;
