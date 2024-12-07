import { motion } from "framer-motion";
import MeetTheTeam from "./MeetTheTeam/MeetTheTeam";
import OurStory from "./OurStory/OurStory";
import OurMission from "./OurMission/OurMission";

const AboutUs = () => {
  return (
    <div className="max-w-full mx-auto px-4 py-10 bg-gradient-to-r dark:from-slate-900 dark:to-slate-700">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="mb-10 text-center"
      >
        <OurMission />
      </motion.div>

      {/* Meet the Team Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <MeetTheTeam />
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="mt-10 text-center"
      >
        <OurStory />
      </motion.div>
    </div>
  );
};

export default AboutUs;
