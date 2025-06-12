"use client";

import { motion } from "motion/react";
import { MonitorCog } from "lucide-react";
import {
  FaCode,
  FaTerminal,
  FaLightbulb,
  FaDatabase,
  FaCloud,
} from "react-icons/fa";
import { useInView } from "motion/react";
import { useRef } from "react";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  viewport: { once: true },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

export function SkillsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const skills = [
    {
      icon: <FaCode />,
      title: "Frontend",
      tags: ["React", "Next.js", "TypeScript", "TailwindCSS"],
      color: "from-cyan-400 to-blue-500",
      shadowColor: "cyan",
    },
    {
      icon: <FaDatabase />,
      title: "Backend",
      tags: ["Node.js", "ElysiaJS", "Trpc", "PostgreSQL", "MongoDB"],
      color: "from-green-400 to-emerald-500",
      shadowColor: "green",
    },
    {
      icon: <FaTerminal />,
      title: "Programming Languages",
      tags: ["TypeScript", "C++", "Python", "Rust", "Go", "Java"],
      color: "from-purple-400 to-indigo-500",
      shadowColor: "purple",
    },
    {
      icon: <MonitorCog />,
      title: "Tools",
      tags: ["Git", "VS Code", "Linux", "Docker", "Shell"],
      color: "from-amber-400 to-orange-500",
      shadowColor: "amber",
    },
    {
      icon: <FaLightbulb />,
      title: "Interests",
      tags: ["Webdev", "Automation", "SystemDesign"],
      color: "from-violet-400 to-fuchsia-500",
      shadowColor: "violet",
    },
    {
      icon: <FaCloud />,
      title: "IoT & Embedded",
      tags: ["Arduino", "Raspberry Pi", "ESP32"],
      color: "from-blue-400 to-sky-500",
      shadowColor: "blue",
    },
  ];

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.8, ease: "easeOut" },
  };

  return (
    <section
      ref={ref}
      className="min-h-screen flex flex-col justify-center px-4 py-16"
      id="skills"
    >
      <motion.div
        {...fadeIn}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="max-w-7xl mx-auto py-16"
      >
        <motion.h2
          {...fadeInUp}
          className="text-4xl font-bold text-center mb-16 tracking-tight"
        >
          Technical Proficiencies
        </motion.h2>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          viewport={{ once: true }}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.1 },
            },
          }}
        >
          {skills.map((skill, index) => (
            <motion.div
              key={index}
              viewport={{ once: true }}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
              whileHover={{ y: -5 }}
              className={`
                relative p-6 rounded-xl
                bg-gray-600/20 backdrop-blur-sm
                border border-white/10
                group
                hover:shadow-lg
              `}
            >
              <div
                className={`
                absolute inset-0 rounded-xl opacity-0
                group-hover:opacity-20 transition-opacity duration-500
                bg-gradient-to-r ${skill.color}
                blur-xl
              `}
              />

              <div className="relative z-10">
                <div className="flex justify-between items-center">
                  <h3
                    className={`
                    text-xl font-semibold mb-2
                    bg-gradient-to-r ${skill.color}
                    bg-clip-text text-transparent
                  `}
                  >
                    {skill.title}
                  </h3>
                  <div
                    className={`
                  min-w-12 h-12 flex items-center justify-center
                  rounded-lg text-2xl text-white
                  bg-gradient-to-r ${skill.color}
                  group-hover:scale-110 transition-transform
                `}
                  >
                    {skill.icon}
                  </div>
                </div>
                <div>
                  <div className="flex flex-wrap gap-2">
                    {skill.tags.map((tag, i) => (
                      <span
                        key={i}
                        className={`
                          px-3 py-1 text-xs rounded-full
                          backdrop-blur-sm bg-gray-400/10
                          border border-white/10
                        `}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
