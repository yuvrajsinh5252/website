"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { SquareArrowOutUpRight } from "lucide-react";
import Link from "next/link";
import { IoIosArrowForward } from "react-icons/io";
import { SiGithub } from "react-icons/si";
import { PROJECTS } from "@/data/project";

export default function Home() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const handleMouseEnter = (index: number) => {
    setHoveredIndex(index);
  };

  const handleMouseLeave = () => {
    setHoveredIndex(null);
  };

  return (
    <div className="flex flex-col items-center h-screen no-scrollbar overflow-scroll">
      <div className="flex flex-col max-sm:items-center max-w-screen-lg gap-10 mt-44 pb-10">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-2 sm:text-5xl text-4xl font-bold pl-2"
        >
          <IoIosArrowForward className="text-3xl max-sm:hidden sm:text-4xl text-blue-500/80" />
          <span className="text-foreground dark:text-gray-300 transition-all">
            Projects
          </span>
        </motion.h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full px-4">
          {PROJECTS.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.1, delay: index * 0.1 }}
              className="group h-full relative overflow-hidden rounded-lg"
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={handleMouseLeave}
            >
              <div className="h-full p-5 rounded-lg dark:bg-gray-800/50 bg-gray-500/20 backdrop-blur-md transition-colors duration-100">
                <div
                  key={hoveredIndex === index ? "wave-active" : "wave-inactive"}
                  className={`absolute inset-0 pointer-events-none ${
                    hoveredIndex === index ? "animate-wave" : ""
                  }`}
                />
                <div className="flex flex-col h-full gap-5 relative">
                  <div className="flex justify-between items-start">
                    <div className="space-y-2">
                      <h2 className="text-2xl font-bold dark:group-hover:text-blue-400 group-hover:text-blue-600/80">
                        {project.title}
                      </h2>
                      {project.year && (
                        <p className="text-sm dark:text-gray-400 text-gray-700 transition-colors">
                          {project.year}
                        </p>
                      )}
                    </div>
                    <div className="flex gap-3">
                      {project.link && (
                        <Link
                          href={project.link}
                          target="_blank"
                          rel="noreferrer"
                          className="dark:hover:text-blue-400 hover:text-blue-600"
                        >
                          <SquareArrowOutUpRight className="transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                        </Link>
                      )}
                      <Link
                        href={project.githubLink}
                        target="_blank"
                        rel="noreferrer"
                        className="dark:hover:text-blue-400 hover:text-blue-600"
                      >
                        <SiGithub size={24} />
                      </Link>
                    </div>
                  </div>
                  <p className="text-sm dark:text-gray-400 text-foreground transition-colors leading-relaxed flex-grow">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.tag.map((tag, idx) => (
                      <div
                        key={idx}
                        className="px-3 py-1 text-xs rounded-full bg-blue-500/10 dark:text-blue-400 text-blue-600 border border-blue-500/20"
                      >
                        {tag}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
