"use client";

import { motion } from "motion/react";
import { SquareArrowOutUpRight } from "lucide-react";
import Link from "next/link";
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
      className="min-h-screen flex flex-col justify-center px-4 py-24"
      id="projects"
    >
      <div className="max-w-4xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Featured Projects
          </h2>
          <div className="w-16 h-0.5 bg-gray-600 mx-auto mb-4"></div>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            A selection of projects showcasing my skills in web development and
            software engineering.
          </p>
        </motion.div>

        {/* Projects list */}
        <div className="space-y-8">
          {featuredProjects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{
                delay: 0.2 + index * 0.1,
                duration: 0.6,
                ease: "easeOut",
              }}
              className="group"
            >
              <div className="p-6 rounded-lg bg-white/[0.02] border border-white/10 hover:border-white/20 transition-colors duration-300">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  {/* Project info */}
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-white mb-2">
                      {project.title}
                    </h3>
                    <p className="text-gray-300 mb-4 leading-relaxed">
                      {project.description}
                    </p>

                    {/* Tech stack */}
                    <div className="flex flex-wrap gap-2">
                      {project.tag.slice(0, 4).map((tech, i) => (
                        <span
                          key={i}
                          className="px-3 py-1 text-sm text-gray-400 bg-white/[0.05] rounded-md border border-white/10"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.tag.length > 4 && (
                        <span className="px-3 py-1 text-sm text-gray-500 bg-white/[0.05] rounded-md border border-white/10">
                          +{project.tag.length - 4} more
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Action buttons */}
                  <div className="flex gap-3 md:flex-col md:items-end">
                    {project.link && (
                      <Link
                        href={project.link}
                        target="_blank"
                        className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-blue-400 hover:text-blue-300 border border-blue-400/20 hover:border-blue-400/40 rounded-md transition-colors duration-300"
                      >
                        <SquareArrowOutUpRight size={16} />
                        <span>Demo</span>
                      </Link>
                    )}
                    <Link
                      href={project.githubLink}
                      target="_blank"
                      className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-400 hover:text-gray-300 border border-gray-600/20 hover:border-gray-600/40 rounded-md transition-colors duration-300"
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

        {/* View all projects link */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="text-center mt-12"
        >
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 font-medium transition-colors duration-300"
          >
            <span>View all projects</span>
            <SquareArrowOutUpRight size={16} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
