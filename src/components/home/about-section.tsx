"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import {
  FaExternalLinkAlt,
  FaGraduationCap,
  FaGitAlt,
  FaDesktop,
  FaCode,
} from "react-icons/fa";
import { SiGithub } from "react-icons/si";
import Link from "next/link";
import { PROJECTS } from "@/config/project";
import { ColorSwingBox } from "@/components/effects/color-swing-box";

export function AboutSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const featuredProjects = PROJECTS.slice(0, 2);

  return (
    <section
      ref={ref}
      className="min-h-screen flex flex-col justify-center px-4 sm:px-6 md:px-8 py-16 sm:py-20 md:py-24"
      id="about"
    >
      <div className="max-w-6xl mx-auto space-y-6 sm:space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="text-start"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 sm:mb-4">
            About Me
          </h2>
          <div className="w-12 sm:w-16 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500"></div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.4, delay: 0.1, ease: "easeOut" }}
          className="space-y-8 sm:space-y-10 md:space-y-12"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-start">
            <div className="space-y-6 sm:space-y-8">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={
                  isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }
                }
                transition={{ duration: 0.4, delay: 0.15, ease: "easeOut" }}
                className="space-y-4"
              >
                <div className="flex items-center gap-3 mb-4 sm:mb-6">
                  <FaGraduationCap
                    size={24}
                    className="text-blue-400 sm:text-[28px]"
                  />
                  <h3 className="text-white font-semibold text-lg sm:text-xl">
                    Education & Journey
                  </h3>
                </div>

                <p className="text-gray-200 text-base sm:text-lg leading-relaxed mb-4 sm:mb-6">
                  My journey into technology began with curiosity and has
                  evolved into a deep passion for creating meaningful digital
                  experiences. I&apos;ve discovered my love for hackathons and
                  collaborative projects, where I can work with brilliant minds
                  and constantly explore emerging technologies to build
                  solutions that solve real-world problems.
                </p>

                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 sm:p-4 rounded-lg bg-blue-400/5 backdrop-blur-sm border border-blue-400/10 hover:bg-blue-400/8 hover:backdrop-blur-md transition-all duration-200">
                    <div className="w-2 h-2 bg-blue-400 rounded-full flex-shrink-0"></div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-white font-medium text-sm">
                          Nirma University
                        </span>
                        <span className="text-blue-400 text-xs bg-blue-400/10 px-2 py-0.5 rounded-full">
                          Current
                        </span>
                      </div>
                      <p className="text-gray-400 text-xs">
                        B.Tech Computer Science • 2022 - 2026
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 sm:p-4 rounded-lg bg-green-400/5 backdrop-blur-sm border border-green-400/10 hover:bg-green-400/8 hover:backdrop-blur-md transition-all duration-200">
                    <div className="w-2 h-2 bg-green-400 rounded-full flex-shrink-0"></div>
                    <div className="flex-1 min-w-0">
                      <span className="text-white font-medium text-sm block">
                        Gyanmanjari Vidhyapith
                      </span>
                      <p className="text-gray-400 text-xs">
                        Higher Secondary Schooling • 2020 - 2022
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={
                  isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }
                }
                transition={{ duration: 0.4, delay: 0.2, ease: "easeOut" }}
                className="space-y-4"
              >
                <div className="flex items-center gap-3 mb-4 sm:mb-6">
                  <FaGitAlt
                    size={22}
                    className="text-green-400 sm:text-[25px]"
                  />
                  <h3 className="text-white font-semibold text-lg sm:text-xl">
                    Open Source & Innovation
                  </h3>
                </div>
                <p className="text-gray-300 text-base sm:text-lg leading-relaxed">
                  I&apos;m passionate about the open-source ecosystem and
                  actively contribute to projects that align with my interests.
                  I love experimenting with new frameworks and building side
                  projects that solve interesting problems or improve developer
                  workflows.
                </p>
              </motion.div>
            </div>

            <div className="space-y-6 sm:space-y-8">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={
                  isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }
                }
                transition={{ duration: 0.4, delay: 0.15, ease: "easeOut" }}
                className="space-y-4"
              >
                <div className="flex items-center gap-3">
                  <FaCode size={22} className="text-cyan-400 sm:text-[25px]" />
                  <h3 className="text-white font-semibold text-lg sm:text-xl">
                    Technical Skills
                  </h3>
                </div>

                <div className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    {[
                      {
                        name: "React",
                        color: "from-blue-500/20 to-blue-600/30",
                        border: "border-blue-500/30",
                      },
                      {
                        name: "Next.js",
                        color: "from-gray-500/20 to-gray-600/30",
                        border: "border-gray-500/30",
                      },
                      {
                        name: "TypeScript",
                        color: "from-blue-400/20 to-blue-500/30",
                        border: "border-blue-400/30",
                      },
                      {
                        name: "JavaScript",
                        color: "from-yellow-500/20 to-yellow-600/30",
                        border: "border-yellow-500/30",
                      },
                      {
                        name: "Tailwind CSS",
                        color: "from-teal-500/20 to-teal-600/30",
                        border: "border-teal-500/30",
                      },
                      {
                        name: "Node.js",
                        color: "from-green-500/20 to-green-600/30",
                        border: "border-green-500/30",
                      },
                      {
                        name: "Python",
                        color: "from-blue-500/20 to-yellow-500/30",
                        border: "border-blue-500/30",
                      },
                      {
                        name: "LangGraph",
                        color: "from-purple-500/20 to-purple-600/30",
                        border: "border-purple-500/30",
                      },
                      {
                        name: "PostgreSQL",
                        color: "from-blue-600/20 to-indigo-600/30",
                        border: "border-blue-600/30",
                      },
                      {
                        name: "MongoDB",
                        color: "from-green-600/20 to-green-700/30",
                        border: "border-green-600/30",
                      },
                      {
                        name: "Docker",
                        color: "from-blue-400/20 to-blue-500/30",
                        border: "border-blue-400/30",
                      },
                      {
                        name: "Git",
                        color: "from-orange-500/20 to-red-500/30",
                        border: "border-orange-500/30",
                      },
                      {
                        name: "Linux",
                        color: "from-yellow-500/20 to-orange-500/30",
                        border: "border-yellow-500/30",
                      },
                      {
                        name: "C++",
                        color: "from-blue-600/20 to-purple-600/30",
                        border: "border-blue-600/30",
                      },
                      {
                        name: "Rust",
                        color: "from-orange-600/20 to-red-600/30",
                        border: "border-orange-600/30",
                      },
                      {
                        name: "Java",
                        color: "from-red-500/20 to-orange-500/30",
                        border: "border-red-500/30",
                      },
                      {
                        name: "Go",
                        color: "from-cyan-500/20 to-blue-500/30",
                        border: "border-cyan-500/30",
                      },
                    ].map((skill, index) => (
                      <motion.span
                        key={skill.name}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={
                          isInView
                            ? { opacity: 1, scale: 1 }
                            : { opacity: 0, scale: 0.8 }
                        }
                        transition={{
                          delay: 0.4 + index * 0.03,
                          duration: 0.3,
                          ease: "easeOut",
                        }}
                        className={`px-2.5 py-1.5 text-xs sm:text-sm text-white bg-gradient-to-r ${skill.color} rounded-lg ${skill.border} border backdrop-blur-sm hover:shadow-lg hover:shadow-blue-500/10 transition-all duration-200 hover:scale-105`}
                      >
                        {skill.name}
                      </motion.span>
                    ))}
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={
                  isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }
                }
                transition={{ duration: 0.4, delay: 0.2, ease: "easeOut" }}
                className="space-y-4"
              >
                <div className="flex items-center gap-3 mb-4 sm:mb-6">
                  <FaDesktop
                    size={22}
                    className="text-purple-400 sm:text-[25px]"
                  />
                  <h3 className="text-white font-semibold text-lg sm:text-xl">
                    Featured Projects
                  </h3>
                </div>

                <div className="space-y-4">
                  {featuredProjects.map((project, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={
                        isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
                      }
                      transition={{
                        delay: 0.25 + index * 0.06,
                        duration: 0.4,
                        ease: "easeOut",
                      }}
                    >
                      <ColorSwingBox>
                        <div className="flex flex-col sm:flex-row items-start justify-between mb-3 gap-3">
                          <h4 className="text-base sm:text-lg font-semibold text-white group-hover:text-blue-400 transition-colors duration-200 leading-tight">
                            {project.title}
                          </h4>
                          <div className="flex gap-2 flex-shrink-0">
                            {project.link && (
                              <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={
                                  isInView
                                    ? { opacity: 1, scale: 1 }
                                    : { opacity: 0, scale: 0.8 }
                                }
                                transition={{
                                  type: "spring",
                                  stiffness: 400,
                                  damping: 18,
                                }}
                              >
                                <Link
                                  href={project.link}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="flex items-center justify-center gap-1.5 px-3 py-1.5 text-xs font-medium text-blue-400 hover:text-blue-300 bg-blue-400/10 hover:bg-blue-400/20 border border-blue-400/20 hover:border-blue-400/40 rounded-lg transition-all duration-150 w-full"
                                >
                                  <FaExternalLinkAlt size={12} />
                                  <span>Live Demo</span>
                                </Link>
                              </motion.div>
                            )}
                            <Link
                              href={project.githubLink}
                              target="_blank"
                              className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-gray-400 hover:text-gray-300 bg-gray-400/10 hover:bg-gray-400/20 border border-gray-600/20 hover:border-gray-600/40 rounded-lg transition-all duration-200 hover:scale-105"
                            >
                              <SiGithub size={12} />
                              <span>Code</span>
                            </Link>
                          </div>
                        </div>

                        <p className="text-gray-400 text-sm leading-relaxed mb-4 line-clamp-2 overflow-hidden relative z-10">
                          {project.description}
                        </p>

                        <div className="flex items-center gap-1.5 relative z-10 flex-wrap">
                          {project.tag.slice(0, 3).map((tech, i) => (
                            <span
                              key={i}
                              className="px-2 py-1 text-xs font-medium text-gray-200 bg-gray-800/60 backdrop-blur-sm hover:bg-gray-700/80 rounded-md border border-gray-600/40 hover:border-blue-400/50"
                            >
                              {tech}
                            </span>
                          ))}
                          {project.tag.length > 3 && (
                            <span className="px-2 py-1 text-xs font-medium text-gray-500 bg-white/[0.05] backdrop-blur-sm rounded-md border border-white/10">
                              +{project.tag.length - 3}
                            </span>
                          )}
                        </div>
                      </ColorSwingBox>
                    </motion.div>
                  ))}
                </div>

                <div className="pt-4">
                  <Link
                    href="/projects"
                    className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 text-sm font-medium transition-colors duration-200 group"
                  >
                    <span>Explore all projects</span>
                    <FaExternalLinkAlt
                      size={14}
                      className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200"
                    />
                  </Link>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
