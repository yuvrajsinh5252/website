"use client";

import { motion } from "motion/react";
import { SquareArrowOutUpRight } from "lucide-react";
import Link from "next/link";
import { IoIosArrowForward } from "react-icons/io";
import { SiGithub } from "react-icons/si";
import { PROJECTS } from "@/data/project";
import { useInView } from "motion/react";
import { useRef } from "react";

export function ProjectsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  // Get featured projects (first 3 projects)
  const featuredProjects = PROJECTS.slice(0, 3);

  return (
    <section
      ref={ref}
      className="min-h-screen flex flex-col justify-center px-4 py-16"
      id="projects"
    >
      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-2 text-4xl sm:text-5xl font-bold mb-12"
        >
          <IoIosArrowForward className="text-3xl max-sm:hidden sm:text-4xl text-blue-500/80" />
          <span className="text-gray-300 transition-all">
            Featured Projects
          </span>
        </motion.h2>

        <div className="grid gap-8 md:gap-10">
          {featuredProjects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{
                delay: 0.1 * (index + 1),
                duration: 0.4,
                ease: "easeOut",
              }}
              whileHover={{ y: -4 }}
              className="group relative w-full"
            >
              <div
                className={`
                  relative overflow-hidden rounded-2xl
                  h-full p-6
                  bg-white/[0.04]
                  backdrop-blur-lg border
                  border-white/10
                  transition-all
                  group-hover:border-white/20
                  group-hover:shadow-xl
                  group-hover:shadow-blue-500/20
                `}
              >
                <div className="flex flex-col sm:flex-row gap-6">
                  <div className="flex-1">
                    <h3 className="text-xl sm:text-2xl font-semibold mb-3 text-white">
                      {project.title}
                    </h3>
                    <p className="text-gray-300 mb-4 leading-relaxed">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tag.slice(0, 4).map((tech, i) => (
                        <span
                          key={i}
                          className="px-3 py-1 text-xs rounded-full
                            backdrop-blur-sm bg-white/10
                            border border-white/10
                            text-gray-300"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.tag.length > 4 && (
                        <span
                          className="px-3 py-1 text-xs rounded-full
                          backdrop-blur-sm bg-white/10
                          border border-white/10
                          text-gray-300"
                        >
                          +{project.tag.length - 4} more
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-row sm:flex-col gap-3 justify-start sm:justify-center">
                    {project.link && (
                      <Link
                        href={project.link}
                        target="_blank"
                        className="flex items-center gap-2 px-4 py-2 rounded-lg
                          bg-blue-500/10 hover:bg-blue-500/20
                          border border-blue-500/20 hover:border-blue-500/30
                          text-blue-400
                          transition-all duration-200 text-sm font-medium"
                      >
                        <SquareArrowOutUpRight size={16} />
                        <span>Live Demo</span>
                      </Link>
                    )}
                    <Link
                      href={project.githubLink}
                      target="_blank"
                      className="flex items-center gap-2 px-4 py-2 rounded-lg
                        bg-gray-500/10 hover:bg-gray-500/20
                        border border-gray-500/20 hover:border-gray-500/30
                        text-gray-400
                        transition-all duration-200 text-sm font-medium"
                    >
                      <SiGithub size={16} />
                      <span>Code</span>
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ delay: 0.5, duration: 0.4 }}
          className="text-center mt-12"
        >
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg
              bg-gradient-to-r from-blue-500 to-purple-600
              hover:from-blue-600 hover:to-purple-700
              text-white font-medium
              transition-all duration-200
              hover:scale-105 hover:shadow-lg"
          >
            <span>View All Projects</span>
            <SquareArrowOutUpRight size={18} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
