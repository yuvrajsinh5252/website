"use client";

import { FaExternalLinkAlt } from "react-icons/fa";
import Link from "next/link";
import { IoIosArrowForward } from "react-icons/io";
import { SiGithub } from "react-icons/si";
import { PROJECTS } from "@/config/project";
import { ColorSwingBox } from "@/components/effects/color-swing-box";
import { motion } from "framer-motion";

const headerVariants = {
  hidden: {
    opacity: 0,
    y: -30,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.2,
    },
  },
};

const projectCardVariants = {
  hidden: {
    opacity: 0,
    y: 50,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.2,
    },
  },
};

export default function Home() {
  return (
    <div className="min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8 pt-32 sm:pt-36 md:pt-44 pb-16 sm:pb-20">
        <motion.div
          className="mb-12 sm:mb-14 md:mb-16"
          variants={headerVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
            <motion.div
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              transition={{ duration: 0.2, delay: 0.2 }}
            >
              <IoIosArrowForward className="text-2xl sm:text-3xl md:text-4xl text-blue-400" />
            </motion.div>
            <motion.h1
              className="text-3xl sm:text-4xl md:text-5xl font-bold text-white"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.2, delay: 0.4 }}
            >
              Projects
            </motion.h1>
          </div>
          <motion.p
            className="text-gray-400 text-base sm:text-lg max-w-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.6 }}
          >
            A collection of projects I&apos;ve built, exploring different
            technologies and solving real-world problems.
          </motion.p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8"
          variants={headerVariants}
          initial="hidden"
          animate="visible"
        >
          {PROJECTS.map((project, index) => (
            <motion.div
              key={index}
              variants={projectCardVariants}
              whileHover={{
                scale: 1.02,
                transition: { duration: 0.2 },
              }}
              whileTap={{ scale: 0.98 }}
            >
              <ColorSwingBox>
                <div className="flex flex-col h-full">
                  <div className="flex flex-col sm:flex-row justify-between items-start mb-4 gap-3">
                    <div className="flex-1">
                      <motion.h2
                        className="text-lg sm:text-xl font-bold text-white group-hover:text-blue-300 transition-colors duration-150 mb-2 leading-tight"
                        whileHover={{ x: 5 }}
                        transition={{ duration: 0.2 }}
                      >
                        {project.title}
                      </motion.h2>
                      {project.year && (
                        <motion.p
                          className="text-sm text-gray-500 font-medium"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.2 }}
                        >
                          {project.year}
                        </motion.p>
                      )}
                    </div>
                    <div className="flex gap-2 sm:gap-3 flex-shrink-0 w-full sm:w-auto">
                      {project.link && (
                        <div className="flex-1 sm:flex-initial">
                          <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <Link
                              href={project.link}
                              target="_blank"
                              rel="noreferrer"
                              className="flex items-center justify-center gap-1.5 px-3 py-1.5 text-xs font-medium text-blue-400 hover:text-blue-300 bg-blue-400/10 hover:bg-blue-400/20 border border-blue-400/20 hover:border-blue-400/40 rounded-lg transition-all duration-150 w-full sm:w-auto"
                            >
                              <FaExternalLinkAlt size={12} />
                              <span>Live</span>
                            </Link>
                          </motion.div>
                        </div>
                      )}
                      <div className="flex-1 sm:flex-initial">
                        <motion.div
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Link
                            href={project.githubLink}
                            target="_blank"
                            rel="noreferrer"
                            className="flex items-center justify-center gap-1.5 px-3 py-1.5 text-xs font-medium text-gray-400 hover:text-gray-300 bg-gray-400/10 hover:bg-gray-400/20 border border-gray-600/20 hover:border-gray-600/40 rounded-lg transition-all duration-150 w-full sm:w-auto"
                          >
                            <SiGithub size={12} />
                            <span>Code</span>
                          </Link>
                        </motion.div>
                      </div>
                    </div>
                  </div>

                  <motion.p
                    className="text-gray-400 text-sm leading-relaxed mb-6 flex-grow"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    {project.description}
                  </motion.p>

                  <motion.div
                    className="flex flex-wrap gap-2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3, staggerChildren: 0.1 }}
                  >
                    {project.tag.map((tag, idx) => (
                      <motion.span
                        key={idx}
                        className="px-2.5 py-1 text-xs font-medium text-gray-200 bg-gray-800/60 backdrop-blur-sm hover:bg-gray-700/80 rounded-md border border-gray-600/40 hover:border-blue-400/50"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.4 + idx * 0.1 }}
                        whileHover={{ scale: 1.05 }}
                      >
                        {tag}
                      </motion.span>
                    ))}
                  </motion.div>
                </div>
              </ColorSwingBox>
            </motion.div>
          ))}
        </motion.div>

        {PROJECTS.length === 0 && (
          <motion.div
            className="text-center py-16 sm:py-20"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-gray-400 text-base sm:text-lg">
              No projects yet. Check back soon!
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
