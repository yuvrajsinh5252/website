"use client";

import dynamic from "next/dynamic";
import ContactUs from "@/components/contact";
const MagicLink = dynamic(() => import("@/components/ui/magicLink"), {
  ssr: false,
});
import MaxWidthWrapper from "@/components/ui/MaxWidthWrapper";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { FaArrowDown } from "react-icons/fa6";
import { FaCode, FaMicrochip, FaTerminal } from "react-icons/fa";
import { IoIosArrowForward } from "react-icons/io";

export default function Home() {
  const [sections, setSections] = useState<HTMLElement[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  useEffect(() => {
    const sectionElements = Array.from(
      document.querySelectorAll("section")
    ) as HTMLElement[];
    setSections(sectionElements);
  }, []);

  const scrollToSection = (index: number) => {
    if (index >= 0 && index < sections.length) {
      sections[index].scrollIntoView({ behavior: "smooth" });
      setCurrentIndex(index);
    }
  };

  useEffect(() => {
    if (sections.length > 0) {
      scrollToSection(currentIndex);
    }
  }, [sections, currentIndex]);

  const handleArrowDownClick = () => {
    if (currentIndex + 1 < sections.length) {
      scrollToSection(currentIndex + 1);
    }
  };

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, ease: "easeOut" },
  };

  const skills = [
    {
      icon: <FaCode className="text-4xl text-blue-400" />,
      title: "Software Development",
      description: "Full-stack development with React, Next.js, and Node.js",
    },
    {
      icon: <FaMicrochip className="text-4xl text-green-400" />,
      title: "PCB Design",
      description: "Designing and implementing PCB circuits",
    },
    {
      icon: <FaTerminal className="text-4xl text-purple-400" />,
      title: "Programming Languages",
      description: "TypeScript, Python, C, C++, Java, Rust, Go",
    },
  ];

  return (
    <MaxWidthWrapper className="max-w-screen-lg max-sm:px-4">
      <section
        className="min-h-screen flex flex-col justify-center pt-28 sm:pt-44 relative"
        id="introduction"
      >
        <motion.div {...fadeIn} className="space-y-8 sm:space-y-12 relative">
          <h1 className="flex gap-2 items-center text-5xl sm:text-6xl font-bold">
            <IoIosArrowForward className="text-4xl sm:text-5xl max-sm:hidden" />
            <span className="max-sm:mx-auto dark:bg-gradient-to-r from-gray-200 to-gray-400 bg-clip-text text-transparent bg-gray-700">
              About Me
            </span>
          </h1>
          <div className="space-y-6 sm:space-y-8 mx-auto">
            <p className="text-base sm:text-lg">
              Hey, I&apos;m Yuvrajsinh! I&apos;m a 3rd-year Computer Science
              B.Tech student at{" "}
              <MagicLink href="https://nirmauni.ac.in/">
                Nirma University
              </MagicLink>{" "}
              with a minor in Cyber Physical Systems. I&apos;m passionate about
              creating innovative solutions that make a difference.
            </p>
            <p className="text-base sm:text-lg">
              Besides software development, I enjoy designing PCB circuits and
              modeling larger systems. Check out my projects{" "}
              <MagicLink href="https://www.youtube.com/@yuvrajsinh472/videos">
                @Yuvrajsinh
              </MagicLink>
              . I love blending software and hardware to bring ideas to life.
            </p>
            <p className="text-base sm:text-lg">
              In my free time, I participate in hackathons, enhance my coding
              skills, and stay updated with industry trends. I believe in
              lifelong learning and embracing new challenges.
            </p>
          </div>
        </motion.div>

        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="flex justify-center mt-12 sm:mt-16"
        >
          <FaArrowDown
            onClick={() => scrollToSection(1)}
            className="cursor-pointer text-3xl sm:text-4xl rounded-full bg-white/10 backdrop-blur-sm p-3 text-white hover:bg-white/20 transition-colors"
          />
        </motion.div>
      </section>

      <section
        className="min-h-screen flex flex-col max-sm:pt-20 justify-center relative"
        id="skills"
      >
        <motion.div {...fadeIn}>
          <h2 className="text-3xl sm:text-4xl font-semibold text-center mb-12 sm:mb-16 bg-clip-text bg-gradient-to-r from-white to-gray-400">
            Skills & Expertise
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
            {skills.map((skill, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                className="p-6 sm:p-8 rounded-xl border border-gray-800 hover:border-gray-600 transition-all duration-300 backdrop-blur-sm bg-white/5 hover:bg-white/10 group"
              >
                <div className="flex flex-col items-center text-center space-y-4 sm:space-y-5">
                  <div className="transform group-hover:scale-110 transition-transform duration-300">
                    {skill.icon}
                  </div>
                  <h3 className="text-xl sm:text-2xl font-semibold">
                    {skill.title}
                  </h3>
                  <p className="text-base sm:text-lg">{skill.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="flex justify-center mt-12 sm:mt-16"
        >
          <FaArrowDown
            onClick={() => scrollToSection(2)}
            className="cursor-pointer text-3xl sm:text-4xl rounded-full bg-white/10 backdrop-blur-sm p-3 text-white hover:bg-white/20 transition-colors"
          />
        </motion.div>
      </section>

      <section
        className="min-h-screen flex flex-col justify-center relative"
        id="contact"
      >
        <ContactUs />
      </section>
    </MaxWidthWrapper>
  );
}
