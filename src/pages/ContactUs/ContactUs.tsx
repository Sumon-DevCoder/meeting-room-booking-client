import { motion } from "framer-motion";
import { toast } from "sonner";

const ContactUs = () => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const itemVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  const handleEmail = () => {
    toast.success("Success");
  };

  return (
    <div>
      <motion.section
        className="bg-blue-50 dark:bg-slate-800"
        id="contact"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        transition={{ duration: 0.5 }}
      >
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <div className="mb-4">
            <div className="mb-6 max-w-3xl text-center sm:text-center md:mx-auto md:mb-12">
              <motion.p
                className="text-base font-semibold uppercase tracking-wide text-blue-600 dark:text-blue-200"
                variants={itemVariants}
                transition={{ duration: 0.5 }}
              >
                Contact
              </motion.p>
              <motion.h2
                className="font-heading mb-4 font-bold tracking-tight text-gray-900 dark:text-white text-3xl sm:text-5xl"
                variants={itemVariants}
                transition={{ duration: 0.5 }}
              >
                Get in Touch
              </motion.h2>
              <motion.p
                className="mx-auto mt-4 max-w-3xl text-xl text-gray-600 dark:text-slate-400"
                variants={itemVariants}
                transition={{ duration: 0.5 }}
              >
                We’re here to help you streamline your booking process.
              </motion.p>
            </div>
          </div>
          <div className="flex items-stretch justify-center">
            <div className="grid md:grid-cols-2">
              <motion.div
                className="h-full pr-6"
                initial="hidden"
                animate="visible"
                variants={containerVariants}
                transition={{ duration: 0.5 }}
              >
                <motion.p
                  className="mt-3 mb-12 text-lg text-gray-600 dark:text-slate-400"
                  variants={itemVariants}
                  transition={{ duration: 0.5 }}
                >
                  Whether you have questions about our platform, need support
                  with bookings, or want to share feedback, we are eager to
                  assist you. Your experience is important to us, and we strive
                  to provide the best service possible.
                </motion.p>
                <ul className="mb-6 md:mb-0 space-y-3 text-white">
                  <motion.li
                    className="flex"
                    variants={itemVariants}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded bg-blue-900 text-gray-50">
                      {/* Address icon */}
                    </div>
                    <div className="ml-4 mb-4">
                      <h3 className="mb-2 text-lg font-medium leading-6 text-gray-900 dark:text-white">
                        Our Address
                      </h3>
                      <p className="text-gray-600 dark:text-slate-400">
                        1230 Maecenas Street Donec Road
                      </p>
                      <p className="text-gray-600 dark:text-slate-400">
                        New York, EEUU
                      </p>
                    </div>
                  </motion.li>
                  <motion.li
                    className="flex"
                    variants={itemVariants}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded bg-blue-900 text-gray-50">
                      {/* Contact icon */}
                    </div>
                    <div className="ml-4 mb-4">
                      <h3 className="mb-2 text-lg font-medium leading-6 text-gray-900 dark:text-white">
                        Contact
                      </h3>
                      <p className="text-gray-600 dark:text-slate-400">
                        Mobile: +1 (123) 456-7890
                      </p>
                      <p className="text-gray-600 dark:text-slate-400">
                        Mail: tailnext@gmail.com
                      </p>
                    </div>
                  </motion.li>
                  <motion.li
                    className="flex"
                    variants={itemVariants}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded bg-blue-900 text-gray-50">
                      {/* Working hours icon */}
                    </div>
                    <div className="ml-4 mb-4">
                      <h3 className="mb-2 text-lg font-medium leading-6 text-gray-900 dark:text-white">
                        Working Hours
                      </h3>
                      <p className="text-gray-600 dark:text-slate-400">
                        Monday - Friday: 08:00 - 17:00
                      </p>
                      <p className="text-gray-600 dark:text-slate-400">
                        Saturday &amp; Sunday: 08:00 - 12:00
                      </p>
                    </div>
                  </motion.li>
                </ul>
              </motion.div>
              <motion.div
                className="card h-fit max-w-6xl p-5 md:p-12"
                id="form"
                initial="hidden"
                animate="visible"
                variants={containerVariants}
                transition={{ duration: 0.5 }}
              >
                <h2 className="mb-4 text-2xl font-bold dark:text-white">
                  Ready to Get Started?
                </h2>
                <form id="contactForm">
                  <div className="mb-6">
                    <div className="mx-0 mb-1 sm:mb-4">
                      <div className="mx-0 mb-1 sm:mb-4">
                        <label
                          htmlFor="name"
                          className="pb-1 text-xs uppercase tracking-wider"
                        ></label>
                        <input
                          type="text"
                          id="name"
                          autoComplete="given-name"
                          placeholder="Your name"
                          className="mb-2 w-full rounded-md border border-gray-400 py-2 pl-2 pr-4 shadow-md dark:bg-slate-700 dark:border-slate-600 dark:text-white"
                          name="name"
                          required
                        />
                      </div>
                      <div className="mx-0 mb-1 sm:mb-4">
                        <label
                          htmlFor="email"
                          className="pb-1 text-xs uppercase tracking-wider"
                        ></label>
                        <input
                          type="email"
                          id="email"
                          autoComplete="email"
                          placeholder="Your email address"
                          className="mb-2 w-full rounded-md border border-gray-400 py-2 pl-2 pr-4 shadow-md dark:bg-slate-700 dark:border-slate-600 dark:text-white"
                          name="email"
                          required
                        />
                      </div>
                      <div className="mx-0 mb-1 sm:mb-4">
                        <label
                          htmlFor="text"
                          className="pb-1 text-xs uppercase tracking-wider"
                        ></label>
                        <input
                          type="text"
                          id="text"
                          autoComplete="email"
                          placeholder="Your Subject"
                          className="mb-2 w-full rounded-md border border-gray-400 py-2 pl-2 pr-4 shadow-md dark:bg-slate-700 dark:border-slate-600 dark:text-white"
                          name="text"
                          required
                        />
                      </div>
                    </div>
                    <div className="mx-0 mb-1 sm:mb-4">
                      <label
                        htmlFor="textarea"
                        className="pb-1 text-xs uppercase tracking-wider"
                      ></label>
                      <textarea
                        id="textarea"
                        name="textarea"
                        cols={30}
                        rows={5}
                        placeholder="Write your message..."
                        className="mb-2 w-full rounded-md border border-gray-400 py-2 pl-2 pr-4 shadow-md dark:bg-slate-700 dark:border-slate-600 dark:text-white"
                        required
                      ></textarea>
                    </div>
                  </div>
                  <div className="text-center">
                    <button
                      type="submit"
                      onClick={handleEmail}
                      className="w-full bg-blue-800 text-white px-6 py-3 font-xl rounded-md sm:mb-0 dark:bg-blue-600"
                    >
                      Send Message
                    </button>
                  </div>
                </form>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.section>
    </div>
  );
};

export default ContactUs;
