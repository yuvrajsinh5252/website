"use client";

import dynamic from "next/dynamic";
import ContactUs from "@/components/contact";
const MagicLink = dynamic(() => import("@/components/ui/magicLink"), {
  ssr: false,
});
import MaxWidthWrapper from "@/components/ui/MaxWidthWrapper";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { FaCode, FaMicrochip, FaTerminal } from "react-icons/fa";
import { IoIosArrowForward } from "react-icons/io";

export default function Home() {
  const [activeSection, setActiveSection] = useState<string>("introduction");
  const [sections, setSections] = useState<HTMLElement[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  useEffect(() => {
    const sectionElements = Array.from(
      document.querySelectorAll("section")
    ) as HTMLElement[];
    setSections(sectionElements);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
            const index = sectionElements.findIndex(
              (el) => el.id === entry.target.id
            );
            setCurrentIndex(index);
          }
        });
      },
      {
        threshold: 0.5,
      }
    );

    sectionElements.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const scrollToSection = (index: number) => {
    if (index >= 0 && index < sections.length) {
      sections[index].scrollIntoView({ behavior: "smooth" });
      setCurrentIndex(index);
    }
  };

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

  const slideIn = {
    initial: { opacity: 0, x: -20 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 0.5, ease: "easeOut" },
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
      <nav className="fixed right-8 top-1/2 transform -translate-y-1/2 z-50 hidden lg:block">
        <motion.div
          className="space-y-4"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
        >
          {["introduction", "skills", "contact"].map((section, index) => (
            <motion.div
              key={section}
              className={`h-3 w-3 rounded-full cursor-pointer transition-all duration-300 ${
                activeSection === section ? "bg-white scale-125" : "bg-gray-600"
              }`}
              onClick={() => scrollToSection(index)}
              whileHover={{ scale: 1.2 }}
            />
          ))}
        </motion.div>
      </nav>

      <section
        className="min-h-screen flex flex-col justify-center pt-28 sm:pt-44 relative"
        id="introduction"
      >
        <motion.div
          {...fadeIn}
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0 },
          }}
          initial="hidden"
          animate={activeSection === "introduction" ? "visible" : "hidden"}
          className="space-y-8 sm:space-y-12 relative"
        >
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
      </section>

      <section
        className="min-h-screen flex flex-col max-sm:pt-20 justify-center relative"
        id="skills"
      >
        <motion.div
          {...fadeIn}
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0 },
          }}
          initial="hidden"
          animate={activeSection === "skills" ? "visible" : "hidden"}
        >
          <h2 className="text-3xl sm:text-4xl font-semibold text-center mb-12 sm:mb-16 bg-clip-text bg-gradient-to-r from-white to-gray-400">
            Skills & Expertise
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
            {skills.map((skill, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={
                  activeSection === "skills"
                    ? { opacity: 1, y: 0 }
                    : { opacity: 0, y: 20 }
                }
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
      </section>

      <section
        className="min-h-screen flex flex-col justify-center relative"
        id="contact"
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={
            activeSection === "contact" ? { opacity: 1 } : { opacity: 0 }
          }
          transition={{ duration: 0.5 }}
        >
          <ContactUs />
        </motion.div>
      </section>
    </MaxWidthWrapper>
  );
}
