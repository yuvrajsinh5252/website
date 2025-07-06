import { IoIosArrowForward } from "react-icons/io";
import { FaCode, FaLightbulb, FaMicrochip } from "react-icons/fa6";
import { motion, Variants } from "framer-motion";
import { MagicLink } from "../effects/magiclink";

export function Intro({
  activeSection,
  fadeIn,
}: {
  activeSection: string;
  fadeIn: any;
}) {
  const container: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.1,
      },
    },
  };

  const item: Variants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.3,
        ease: "easeOut",
      },
    },
  };

  return (
    <motion.div
      {...fadeIn}
      variants={container}
      viewport={{ once: true }}
      initial="hidden"
      animate={activeSection === "introduction" ? "visible" : "hidden"}
      className="max-w-6xl mx-auto relative"
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-20 sm:top-36 left-20 sm:left-36 w-24 h-24 sm:w-40 sm:h-40 rounded-full bg-purple-400/60 blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 0.7, 0.5],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
      </div>

      <motion.h1
        className="flex flex-col sm:flex-row gap-2 items-start sm:items-center text-3xl sm:text-4xl md:text-5xl font-bold mb-8 sm:mb-10 md:mb-16"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <motion.div
          animate={{ x: [10, 0], opacity: [0, 1] }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="hidden sm:block"
        >
          <IoIosArrowForward className="text-3xl sm:text-4xl md:text-5xl text-blue-400" />
        </motion.div>
        <span className="text-center sm:text-left w-full sm:w-auto">
          About Me
        </span>
      </motion.h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10">
        <motion.div
          className="hidden md:flex md:col-span-1 justify-center items-center relative"
          variants={item}
        >
          <div className="relative w-full h-full min-h-[300px] flex items-center justify-center">
            <motion.div className="relative z-10 flex flex-col items-center gap-6 sm:gap-8">
              <motion.div
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg"
                whileHover={{ rotate: 5, scale: 1.05 }}
              >
                <FaCode className="text-3xl sm:text-4xl text-white" />
              </motion.div>

              <motion.div
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center shadow-lg"
                whileHover={{ rotate: -5, scale: 1.05 }}
              >
                <FaMicrochip className="text-3xl sm:text-4xl text-white" />
              </motion.div>

              <motion.div
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-green-500 to-blue-600 flex items-center justify-center shadow-lg"
                whileHover={{ rotate: 5, scale: 1.05 }}
              >
                <FaLightbulb className="text-3xl sm:text-4xl text-white" />
              </motion.div>
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          variants={container}
          className="space-y-5 sm:space-y-6 md:space-y-8 md:col-span-2"
        >
          <motion.div
            variants={item}
            whileHover={{ x: 10 }}
            className="flex items-start space-x-3 sm:space-x-4 bg-gradient-to-r from-blue-900/20 to-transparent p-4 sm:p-5 rounded-lg border-l-2 border-blue-400 shadow-md"
          >
            <p className="text-sm sm:text-base md:text-lg leading-relaxed">
              Hey, I&apos;m Yuvrajsinh! I&apos;m a 3rd-year Computer Science
              B.Tech student at{" "}
              <MagicLink href="https://nirmauni.ac.in/">
                Nirma University
              </MagicLink>{" "}
              with a minor in Cyber Physical Systems. I&apos;m passionate about
              creating innovative solutions that make a difference.
            </p>
          </motion.div>

          <motion.div
            variants={item}
            whileHover={{ x: 10 }}
            className="flex items-start space-x-3 sm:space-x-4 bg-gradient-to-r from-purple-900/20 to-transparent p-4 sm:p-5 rounded-lg border-l-2 border-purple-400 shadow-md"
          >
            <p className="text-sm sm:text-base md:text-lg leading-relaxed">
              Besides software development, I enjoy designing PCB circuits and
              modeling larger systems. Check out my projects{" "}
              <MagicLink href="https://www.youtube.com/@yuvrajsinh472/videos">
                @Yuvrajsinh
              </MagicLink>
              . I love blending software and hardware to bring ideas to life.
            </p>
          </motion.div>

          <motion.div
            variants={item}
            whileHover={{ x: 10 }}
            className="flex items-start space-x-3 sm:space-x-4 bg-gradient-to-r from-green-900/20 to-transparent p-4 sm:p-5 rounded-lg border-l-2 border-green-400 shadow-md"
          >
            <p className="text-sm sm:text-base md:text-lg leading-relaxed">
              In my free time, I participate in hackathons, enhance my coding
              skills, and stay updated with industry trends. I believe in
              lifelong learning and embracing new challenges.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
}
