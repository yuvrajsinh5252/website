import { IoIosArrowForward } from "react-icons/io";
import { FaCode, FaLightbulb, FaMicrochip } from "react-icons/fa6";
import { motion } from "motion/react";
import { MagicLink } from "../effects/magiclink";

export function Intro({
  activeSection,
  fadeIn,
}: {
  activeSection: string;
  fadeIn: any;
}) {
  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.1,
      },
    },
  };

  const item = {
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
          className="absolute top-36 left-36 w-40 h-40 rounded-full bg-purple-400/60 blur-3xl"
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
        {/* <motion.div
          className="absolute bottom-20 right-10 w-40 h-40 rounded-full bg-blue-500/40 blur-3xl"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.4, 0.6, 0.4],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        /> */}
      </div>

      <motion.h1
        className="flex gap-2 items-center text-4xl sm:text-5xl font-bold mb-10 sm:mb-16"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <motion.div
          animate={{ x: [10, 0], opacity: [0, 1] }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <IoIosArrowForward className="text-4xl text-blue-400 sm:text-5xl max-sm:hidden" />
        </motion.div>
        <span className="max-sm:mx-auto">About Me</span>
      </motion.h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        <motion.div
          className="hidden md:flex md:col-span-1 justify-center items-center relative"
          variants={item}
        >
          <div className="relative w-full h-full min-h-[300px] flex items-center justify-center">
            <motion.div className="relative z-10 flex flex-col items-center gap-8">
              <motion.div
                className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg"
                whileHover={{ rotate: 5, scale: 1.05 }}
              >
                <FaCode className="text-4xl text-white" />
              </motion.div>

              <motion.div
                className="w-20 h-20 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center shadow-lg"
                whileHover={{ rotate: -5, scale: 1.05 }}
              >
                <FaMicrochip className="text-4xl text-white" />
              </motion.div>

              <motion.div
                className="w-20 h-20 rounded-2xl bg-gradient-to-br from-green-500 to-blue-600 flex items-center justify-center shadow-lg"
                whileHover={{ rotate: 5, scale: 1.05 }}
              >
                <FaLightbulb className="text-4xl text-white" />
              </motion.div>
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          variants={container}
          className="space-y-6 sm:space-y-8 md:col-span-2"
        >
          <motion.div
            variants={item}
            whileHover={{ x: 10 }}
            className="flex items-start space-x-4 bg-gradient-to-r from-blue-900/20 to-transparent p-5 rounded-lg border-l-2 border-blue-400 shadow-md"
          >
            <p className="text-base sm:text-lg">
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
            className="flex items-start space-x-4 bg-gradient-to-r from-purple-900/20 to-transparent p-5 rounded-lg border-l-2 border-purple-400 shadow-md"
          >
            <p className="text-base sm:text-lg">
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
            className="flex items-start space-x-4 bg-gradient-to-r from-green-900/20 to-transparent p-5 rounded-lg border-l-2 border-green-400 shadow-md"
          >
            <p className="text-base sm:text-lg">
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
