"use client";

import { motion } from "motion/react";
import { useInView } from "motion/react";
import { useRef } from "react";
import {
  SquareArrowOutUpRight,
  MapPin,
  GraduationCap,
  Code,
  GitBranch,
  Cpu,
} from "lucide-react";
import { SiGithub } from "react-icons/si";
import Link from "next/link";
import { PROJECTS } from "@/data/project";

export function AboutSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  // Get featured projects (first 3 projects)
  const featuredProjects = PROJECTS.slice(0, 3);

  return (
    <section
      ref={ref}
      className="min-h-screen flex flex-col justify-center px-4 py-24"
      id="about"
    >
      <div className="max-w-4xl mx-auto space-y-16">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            About Me
          </h2>
          <div className="w-16 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto"></div>
        </motion.div>

        {/* About content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          className="space-y-12"
        >
          {/* Text and Skills */}
          <div className="grid md:grid-cols-2 gap-12 items-start">
            {/* Text content */}
            <div className="space-y-6">
              {/* Personal intro with visual elements */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-gray-400 text-sm">
                  <GraduationCap size={16} />
                  <span>Computer Science Student</span>
                </div>

                <div className="flex items-start gap-3">
                  <Code
                    size={20}
                    className="text-blue-400 mt-1 flex-shrink-0"
                  />
                  <p className="text-gray-300 text-lg leading-relaxed text-balance">
                    I'm a Computer Science student at{" "}
                    <Link
                      href="https://nirmauni.ac.in/"
                      target="_blank"
                      className="text-blue-400 hover:text-blue-300 transition-colors duration-300 underline decoration-blue-400/30 underline-offset-2 hover:decoration-blue-400/60"
                    >
                      Nirma University
                    </Link>{" "}
                    who loves creating beautiful and functional web
                    applications. I specialize in modern JavaScript frameworks
                    and enjoy building intuitive user experiences. I focus on
                    full-stack web development and AI agents, working with
                    React, Next.js, and LangGraph to build intelligent
                    applications. Secured{" "}
                    <Link
                      href="/blog/hacknuthon-5.0"
                      className="text-blue-400 hover:text-blue-300 transition-colors duration-300 underline decoration-blue-400/30 underline-offset-2 hover:decoration-blue-400/60"
                    >
                      2nd place at HackNUthon 5.0
                    </Link>{" "}
                    by developing innovative solutions.
                  </p>
                </div>

                <div className="flex items-start gap-3">
                  <GitBranch
                    size={20}
                    className="text-green-400 mt-1 flex-shrink-0"
                  />
                  <p className="text-gray-300 text-lg leading-relaxed text-balance">
                    I'm passionate about the open-source ecosystem and actively
                    contribute to projects that align with my interests. I love
                    experimenting with new frameworks and building side projects
                    that solve interesting problems or improve developer
                    workflows.
                  </p>
                </div>
              </div>
            </div>

            {/* Skills and Projects section */}
            <div className="space-y-8">
              {/* Skills section */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={
                  isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }
                }
                transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
                className="space-y-4"
              >
                <div className="flex items-center gap-3">
                  <h3 className="text-white font-semibold text-lg">
                    Technical Skills
                  </h3>
                  <div className="flex-1 h-0.5 bg-gradient-to-r from-gray-600 to-transparent"></div>
                </div>

                <div className="space-y-4">
                  {/* Frontend & Frameworks */}
                  <div className="space-y-2">
                    <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                      Frontend & Frameworks
                    </h4>
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
                            delay: 0.4 + index * 0.05,
                            duration: 0.3,
                            ease: "easeOut",
                          }}
                          className={`px-3 py-1.5 text-sm text-white bg-gradient-to-r ${skill.color} rounded-lg ${skill.border} border backdrop-blur-sm hover:shadow-lg hover:shadow-blue-500/10 transition-all duration-300 hover:scale-105`}
                        >
                          {skill.name}
                        </motion.span>
                      ))}
                    </div>
                  </div>

                  {/* Backend & AI */}
                  <div className="space-y-2">
                    <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                      Backend & AI
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {[
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
                            delay: 0.5 + index * 0.05,
                            duration: 0.3,
                            ease: "easeOut",
                          }}
                          className={`px-3 py-1.5 text-sm text-white bg-gradient-to-r ${skill.color} rounded-lg ${skill.border} border backdrop-blur-sm hover:shadow-lg hover:shadow-purple-500/10 transition-all duration-300 hover:scale-105`}
                        >
                          {skill.name}
                        </motion.span>
                      ))}
                    </div>
                  </div>

                  {/* Tools & Others */}
                  <div className="space-y-2">
                    <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                      Tools & Others
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {[
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
                            delay: 0.6 + index * 0.05,
                            duration: 0.3,
                            ease: "easeOut",
                          }}
                          className={`px-3 py-1.5 text-sm text-white bg-gradient-to-r ${skill.color} rounded-lg ${skill.border} border backdrop-blur-sm hover:shadow-lg hover:shadow-orange-500/10 transition-all duration-300 hover:scale-105`}
                        >
                          {skill.name}
                        </motion.span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Featured Projects section */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={
                  isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }
                }
                transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
                className="space-y-4"
              >
                <div className="flex items-center gap-3">
                  <h3 className="text-white font-semibold text-lg">
                    Featured Projects
                  </h3>
                  <div className="flex-1 h-0.5 bg-gradient-to-r from-gray-600 to-transparent"></div>
                </div>

                <div className="space-y-3">
                  {featuredProjects.slice(0, 2).map((project, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: 20 }}
                      animate={
                        isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }
                      }
                      transition={{
                        delay: 0.5 + index * 0.1,
                        duration: 0.6,
                        ease: "easeOut",
                      }}
                      className="group relative p-4 rounded-xl bg-gradient-to-br from-white/[0.02] to-white/[0.05] border border-white/10 hover:border-white/20 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10"
                    >
                      <div className="absolute top-3 right-3 flex gap-2">
                        {project.link && (
                          <Link
                            href={project.link}
                            target="_blank"
                            className="flex items-center gap-1 px-2 py-1 text-xs font-medium text-blue-400 hover:text-blue-300 bg-blue-400/10 hover:bg-blue-400/20 border border-blue-400/20 hover:border-blue-400/40 rounded-md transition-all duration-300"
                          >
                            <SquareArrowOutUpRight size={10} />
                            <span>Live</span>
                          </Link>
                        )}
                        <Link
                          href={project.githubLink}
                          target="_blank"
                          className="flex items-center gap-1 px-2 py-1 text-xs font-medium text-gray-400 hover:text-gray-300 bg-gray-400/10 hover:bg-gray-400/20 border border-gray-600/20 hover:border-gray-600/40 rounded-md transition-all duration-300"
                        >
                          <SiGithub size={10} />
                          <span>Code</span>
                        </Link>
                      </div>

                      <div className="space-y-3 pr-16">
                        {/* Project header */}
                        <div>
                          <h4 className="text-base font-semibold text-white mb-2 group-hover:text-blue-400 transition-colors duration-300">
                            {project.title}
                          </h4>
                          <p className="text-gray-400 text-sm leading-relaxed">
                            {project.description.length > 85
                              ? `${project.description.substring(0, 85)}...`
                              : project.description}
                          </p>
                        </div>

                        {/* Tech stack */}
                        <div className="flex flex-wrap gap-1.5">
                          {project.tag.slice(0, 3).map((tech, i) => (
                            <span
                              key={i}
                              className="px-2 py-1 text-xs text-gray-300 bg-white/[0.08] rounded-md border border-white/10 hover:border-white/20 transition-colors duration-300"
                            >
                              {tech}
                            </span>
                          ))}
                          {project.tag.length > 3 && (
                            <span className="px-2 py-1 text-xs text-gray-500 bg-white/[0.05] rounded-md border border-white/10">
                              +{project.tag.length - 3} more
                            </span>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* View all projects link */}
                <div className="pt-3">
                  <Link
                    href="/projects"
                    className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 text-sm font-medium transition-colors duration-300 group"
                  >
                    <span>Explore all projects</span>
                    <SquareArrowOutUpRight
                      size={14}
                      className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300"
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
