import { IoIosArrowForward } from "react-icons/io";
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
      className="space-y-8 sm:space-y-12 px-16 max-sm:px-0"
    >
      <motion.h1
        className="flex gap-2 items-center text-4xl sm:text-5xl font-bold"
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

      <motion.div
        variants={container}
        className="space-y-6 sm:space-y-8 mx-auto"
      >
        <motion.div
          variants={item}
          whileHover={{ x: 10 }}
          className="text-base sm:text-lg"
        >
          Hey, I&apos;m Yuvrajsinh! I&apos;m a 3rd-year Computer Science B.Tech
          student at{" "}
          <MagicLink href="https://nirmauni.ac.in/">Nirma University</MagicLink>{" "}
          with a minor in Cyber Physical Systems. I&apos;m passionate about
          creating innovative solutions that make a difference.
        </motion.div>
        <motion.div
          variants={item}
          whileHover={{ x: 10 }}
          className="text-base sm:text-lg"
        >
          Besides software development, I enjoy designing PCB circuits and
          modeling larger systems. Check out my projects{" "}
          <MagicLink href="https://www.youtube.com/@yuvrajsinh472/videos">
            @Yuvrajsinh
          </MagicLink>
          . I love blending software and hardware to bring ideas to life.
        </motion.div>
        <motion.div
          variants={item}
          whileHover={{ x: 10 }}
          className="text-base sm:text-lg"
        >
          In my free time, I participate in hackathons, enhance my coding
          skills, and stay updated with industry trends. I believe in lifelong
          learning and embracing new challenges.
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
