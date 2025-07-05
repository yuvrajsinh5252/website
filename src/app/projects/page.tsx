"use client";

import { motion } from "motion/react";
import { SquareArrowOutUpRight } from "lucide-react";
import Link from "next/link";
import { IoIosArrowForward } from "react-icons/io";
import { SiGithub } from "react-icons/si";
import { PROJECTS } from "@/data/project";
import { ColorSwingBox } from "@/components/effects/color-swing-box";

export default function Home() {
  return (
    <div className="min-h-screen">
      <div className="max-w-6xl mx-auto px-4 pt-44 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-16"
        >
          <div className="flex items-center gap-3 mb-4">
            <IoIosArrowForward className="text-3xl sm:text-4xl text-blue-400" />
            <h1 className="text-4xl sm:text-5xl font-bold text-white">
              Projects
            </h1>
          </div>
          <p className="text-gray-400 text-lg max-w-2xl">
            A collection of projects I've built, exploring different
            technologies and solving real-world problems.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {PROJECTS.map((project, index) => (
            <ColorSwingBox
              key={index}
              className="p-6 rounded-xl bg-gray-900/80 backdrop-blur-xl border border-gray-700/50 hover:border-blue-400/60 hover:bg-gray-800/90 transition-all duration-150 hover:shadow-2xl hover:shadow-blue-500/30 hover:backdrop-blur-2xl h-full relative overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: index * 0.1,
                duration: 0.6,
                ease: "easeOut",
              }}
            >
              {/* Subtle inner glow effect */}
              <div className="absolute inset-0 rounded-xl opacity-20 bg-gradient-to-br from-blue-500/10 via-transparent to-purple-500/10 pointer-events-none" />

              <div className="flex flex-col h-full relative z-10">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <h2 className="text-xl font-bold text-white group-hover:text-blue-300 transition-colors duration-150 mb-2">
                      {project.title}
                    </h2>
                    {project.year && (
                      <p className="text-sm text-gray-500 font-medium">
                        {project.year}
                      </p>
                    )}
                  </div>
                  <div className="flex gap-3 ml-4">
                    {project.link && (
                      <motion.div
                        whileHover={{ scale: 1.1, y: -2 }}
                        whileTap={{ scale: 0.9 }}
                        transition={{
                          type: "spring",
                          stiffness: 400,
                          damping: 25,
                        }}
                      >
                        <Link
                          href={project.link}
                          target="_blank"
                          rel="noreferrer"
                          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-blue-400 hover:text-blue-300 bg-blue-400/10 hover:bg-blue-400/20 border border-blue-400/20 hover:border-blue-400/40 rounded-lg transition-all duration-150"
                        >
                          <SquareArrowOutUpRight size={12} />
                          <span>Live</span>
                        </Link>
                      </motion.div>
                    )}
                    <motion.div
                      whileHover={{ scale: 1.1, y: -2 }}
                      whileTap={{ scale: 0.9 }}
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 25,
                      }}
                    >
                      <Link
                        href={project.githubLink}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-gray-400 hover:text-gray-300 bg-gray-400/10 hover:bg-gray-400/20 border border-gray-600/20 hover:border-gray-600/40 rounded-lg transition-all duration-150"
                      >
                        <SiGithub size={12} />
                        <span>Code</span>
                      </Link>
                    </motion.div>
                  </div>
                </div>

                <p className="text-gray-400 text-sm leading-relaxed mb-6 flex-grow">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {project.tag.map((tag, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 text-xs font-medium text-gray-200 bg-gray-800/60 backdrop-blur-sm hover:bg-gray-700/80 rounded-md border border-gray-600/40 hover:border-blue-400/50"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </ColorSwingBox>
          ))}
        </div>

        {PROJECTS.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-400 text-lg">
              No projects yet. Check back soon!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
