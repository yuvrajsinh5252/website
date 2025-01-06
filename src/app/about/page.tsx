"use client";

import dynamic from "next/dynamic";
import ContactUs from "@/components/contact";
const MagicLink = dynamic(() => import("@/components/magicLink"), {
  ssr: false,
});
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { FaArrowDown } from "react-icons/fa6";
import { FaCode, FaMicrochip, FaTerminal } from "react-icons/fa";

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
    transition: { duration: 0.6 },
  };

  const skills = [
    {
      icon: <FaCode className="text-3xl" />,
      title: "Software Development",
      description:
        "Proficient in Full-stack development with React, Next.js, Node.js",
    },
    {
      icon: <FaMicrochip className="text-3xl" />,
      title: "PCB Design",
      description: "Experience in designing and implementing PCB circuits",
    },
    {
      icon: (
        <div className="flex justify-center">
          <FaTerminal className="text-3xl" />
        </div>
      ),
      title: "Programming Languages",
      description: "Experienced in TypeScript, Python, and C++",
    },
  ];

  return (
    <MaxWidthWrapper className="max-w-screen-lg max-sm:px-4">
      <section
        className="min-h-screen flex flex-col justify-center pt-44 py-16"
        id="one"
      >
        <motion.div {...fadeIn} className="space-y-12">
          <h1 className="text-5xl font-bold">About Me</h1>
          <div className="space-y-6 mx-auto">
            <p className="text-lg">
              Hey, I&apos;m Yuvrajsinh! I&apos;m a 3rd-year Computer Science
              B.Tech student at{" "}
              <MagicLink href="https://nirmauni.ac.in/">
                Nirma University
              </MagicLink>{" "}
              with a minor in Cyber Physical Systems. I&apos;m passionate about
              creating innovative solutions that make a difference.
            </p>
            <p className="text-lg">
              Besides software development, I enjoy designing PCB circuits and
              modeling larger systems. Check out my projects{" "}
              <MagicLink href="https://www.youtube.com/@yuvrajsinh472/videos">
                @Yuvrajsinh
              </MagicLink>
              . I love blending software and hardware to bring ideas to life.
            </p>
            <p className="text-lg">
              In my free time, I participate in hackathons, enhance my coding
              skills, and stay updated with industry trends. I believe in
              lifelong learning and embracing new challenges.
            </p>
          </div>

          <div className="mt-20">
            <h2 className="text-3xl font-semibold text-center mb-10">
              Skills & Expertise
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {skills.map((skill, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2 }}
                  className="p-6 rounded-lg border border-gray-700 hover:border-gray-500 transition-colors"
                >
                  <div className="flex flex-col items-center text-center space-y-4">
                    {skill.icon}
                    <h3 className="text-xl font-semibold">{skill.title}</h3>
                    <p className="text-gray-400">{skill.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {currentIndex + 1 < sections.length && (
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="flex justify-center mt-10"
          >
            <FaArrowDown
              onClick={handleArrowDownClick}
              className="cursor-pointer text-4xl rounded-full bg-white p-2 text-black"
            />
          </motion.div>
        )}
      </section>

      <section id="two">
        <ContactUs />
      </section>
    </MaxWidthWrapper>
  );
}
