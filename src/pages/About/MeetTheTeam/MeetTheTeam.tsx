import { TTeamMember } from "@/types/testimonial.types";
import { useEffect, useState } from "react";

const MeetTheTeam = () => {
  const [teamMembers, setTeamMembers] = useState([]);

  useEffect(() => {
    fetch("/teamMembers.json")
      .then((res) => res.json())
      .then((data) => setTeamMembers(data));
  }, []);

  return (
    <section className="bg-gray-300 dark:bg-gray-800 py-12 my-10 rounded-lg">
      <div className="container mx-auto text-center">
        <h2 className="text-4xl font-bold text-gray-800 dark:text-white mb-8">
          Meet the Team
        </h2>
        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 mx-auto px-10">
          {teamMembers.map((member: TTeamMember) => (
            <div
              key={member.id}
              className="bg-white dark:bg-gray-700 rounded-lg shadow-md p-6 transition duration-500 hover:scale-110 space-y-2"
            >
              <img
                src={member.image}
                alt={`${member.name}'s photo`}
                className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
              />
              <h3 className="text-xl font-semibold text-gray-700 dark:text-white font-oswald">
                {member.name}
              </h3>
              <p className="text-gray-500 dark:text-gray-400 mb-2">
                {member.designation}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MeetTheTeam;
