"use client";

import { motion } from "motion/react";
import { SquareArrowOutUpRight } from "lucide-react";
import Link from "next/link";
import { IoIosArrowForward } from "react-icons/io";
import { SiGithub } from "react-icons/si";
import { PROJECTS } from "@/data/project";

export default function Home() {
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
              transition={{
                delay: 0.1,
                duration: 0.4,
                ease: "easeOut",
              }}
              whileHover={{ y: -4 }}
              className="group relative w-full"
            >
              <div
                className={`
                  relative overflow-hidden rounded-2xl
                  h-full
                  dark:bg-white/[0.04] bg-gray-400/10
                  backdrop-blur-lg
                  dark:border-white/10 border-gray-200
                  transition-all
                  dark:group-hover:border-white/20 group-hover:border-gray-300
                  group-hover:shadow-xl
                  dark:group-hover:shadow-blue-500/20 group-hover:shadow-gray-200/50
                  after:absolute after:inset-0
                  after:bg-gradient-to-r
                  after:from-transparent
                  dark:after:via-white/10 after:via-gray-100/50
                  after:to-transparent
                  after:animate-shimmer
                `}
              >
                <div className="p-5 sm:p-7 relative flex flex-col h-full">
                  <div className="flex justify-between items-start">
                    <div className="space-y-2">
                      <h2 className="text-2xl font-bold dark:group-hover:text-blue-50 group-hover:text-blue-700 transition-colors">
                        {project.title}
                      </h2>
                      {project.year && (
                        <p className="text-sm dark:text-gray-400 text-gray-700 transition-colors dark:group-hover:text-gray-300 group-hover:text-gray-900">
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
                  <p className="text-sm dark:text-gray-400 text-gray-600 transition-colors leading-relaxed flex-grow mt-4 dark:group-hover:text-gray-300 group-hover:text-gray-900">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mt-4">
                    {project.tag.map((tag, idx) => (
                      <div
                        key={idx}
                        className="inline-flex items-center gap-1.5 rounded-full
                        dark:bg-blue-500/10 bg-blue-50 px-2.5 py-1
                        text-xs font-medium
                        dark:text-blue-400 text-blue-600 transition-colors
                        dark:group-hover:bg-blue-500/20 group-hover:bg-blue-100
                        dark:group-hover:text-blue-300 group-hover:text-blue-700"
                      >
                        {tag}
                      </div>
                    ))}
                  </div>
                </div>

                <div
                  className="absolute inset-0 rounded-2xl opacity-0
                  dark:group-hover:opacity-20 group-hover:opacity-10 transition-opacity duration-300
                  dark:bg-gradient-to-br dark:from-blue-400 dark:via-blue-500 dark:to-purple-600
                  bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700 -z-10"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
