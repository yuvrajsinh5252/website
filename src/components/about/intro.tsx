import { IoIosArrowForward } from "react-icons/io";
import { motion } from "framer-motion";
import { MagicLink } from "../effects/magiclink";

export function Intro({
  activeSection,
  fadeIn,
}: {
  activeSection: string;
  fadeIn: any;
}) {
  return (
    <motion.div
      {...fadeIn}
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
      }}
      viewport={{ once: true }}
      initial="hidden"
      animate={activeSection === "introduction" ? "visible" : "hidden"}
      className="space-y-8 sm:space-y-12"
    >
      <h1 className="flex gap-2 items-center text-4xl sm:text-5xl font-bold">
        <IoIosArrowForward className="text-4xl text-blue-400 sm:text-5xl max-sm:hidden" />
        <span className="max-sm:mx-auto">About Me</span>
      </h1>
      <div className="space-y-6 sm:space-y-8 mx-auto">
        <div className="text-base sm:text-lg">
          Hey, I&apos;m Yuvrajsinh! I&apos;m a 3rd-year Computer Science B.Tech
          student at{" "}
          <MagicLink href="https://nirmauni.ac.in/">Nirma University</MagicLink>{" "}
          with a minor in Cyber Physical Systems. I&apos;m passionate about
          creating innovative solutions that make a difference.
        </div>
        <div className="text-base sm:text-lg">
          Besides software development, I enjoy designing PCB circuits and
          modeling larger systems. Check out my projects{" "}
          <MagicLink href="https://www.youtube.com/@yuvrajsinh472/videos">
            @Yuvrajsinh
          </MagicLink>
          . I love blending software and hardware to bring ideas to life.
        </div>
        <div className="text-base sm:text-lg">
          In my free time, I participate in hackathons, enhance my coding
          skills, and stay updated with industry trends. I believe in lifelong
          learning and embracing new challenges.
        </div>
      </div>
    </motion.div>
  );
}
