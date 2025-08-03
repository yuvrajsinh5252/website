"use client";

import { useRef } from "react";
import {
  FaExternalLinkAlt,
  FaGraduationCap,
  FaCode,
  FaRocket,
  FaRoute,
} from "react-icons/fa";
import { SiGithub } from "react-icons/si";
import Link from "next/link";
import { PROJECTS } from "@/config/project";
import { ColorSwingBox } from "@/components/effects/color-swing-box";

export function AboutSection() {
  const ref = useRef(null);

  const featuredProjects = PROJECTS.slice(0, 1);

  const skills = [
    {
      name: "React",
      color: "from-blue-500/10 to-cyan-500/10",
      border: "border-blue-400/20",
    },
    {
      name: "Next.js",
      color: "from-gray-500/10 to-slate-500/10",
      border: "border-gray-400/20",
    },
    {
      name: "TypeScript",
      color: "from-blue-600/10 to-indigo-500/10",
      border: "border-blue-500/20",
    },
    {
      name: "JavaScript",
      color: "from-yellow-500/10 to-amber-500/10",
      border: "border-yellow-400/20",
    },
    {
      name: "Tailwind CSS",
      color: "from-teal-500/10 to-cyan-500/10",
      border: "border-teal-400/20",
    },
    {
      name: "Node.js",
      color: "from-green-600/10 to-emerald-500/10",
      border: "border-green-400/20",
    },
    {
      name: "Python",
      color: "from-yellow-600/10 to-blue-500/10",
      border: "border-yellow-500/20",
    },
    {
      name: "LangGraph",
      color: "from-purple-500/10 to-pink-500/10",
      border: "border-purple-400/20",
    },
    {
      name: "PostgreSQL",
      color: "from-blue-700/10 to-indigo-600/10",
      border: "border-blue-600/20",
    },
    {
      name: "MongoDB",
      color: "from-green-700/10 to-emerald-600/10",
      border: "border-green-500/20",
    },
    {
      name: "Docker",
      color: "from-blue-500/10 to-sky-500/10",
      border: "border-blue-400/20",
    },
    {
      name: "Git",
      color: "from-orange-600/10 to-red-500/10",
      border: "border-orange-400/20",
    },
    {
      name: "Linux",
      color: "from-yellow-500/10 to-orange-500/10",
      border: "border-yellow-400/20",
    },
    {
      name: "C++",
      color: "from-blue-600/10 to-purple-600/10",
      border: "border-blue-500/20",
    },
    {
      name: "Rust",
      color: "from-orange-700/10 to-red-600/10",
      border: "border-orange-500/20",
    },
    {
      name: "Java",
      color: "from-red-600/10 to-orange-600/10",
      border: "border-red-500/20",
    },
    {
      name: "Go",
      color: "from-cyan-600/10 to-blue-600/10",
      border: "border-cyan-500/20",
    },
  ];

  return (
    <section
      ref={ref}
      className="min-h-screen flex flex-col justify-center px-4 sm:px-6 md:px-8 py-12 sm:py-16 relative"
      id="about"
    >
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            About Me
          </h2>
          <div className="w-20 h-1 bg-white/20 mx-auto rounded-full"></div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-12">
          {/* Personal Story Card - Keep exactly as is */}
          <div className="lg:col-span-3">
            <div className="relative p-6 sm:p-8 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 overflow-hidden">
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-6">
                  <FaRoute className="text-2xl text-blue-400" />
                  <h3 className="text-2xl font-semibold text-white">
                    My Journey
                  </h3>
                </div>

                <p className="text-gray-300 text-base sm:text-lg leading-relaxed mb-4 sm:mb-6">
                  Hi! I&apos;m a Computer Science student at{" "}
                  <span className="text-blue-400 font-medium">
                    Nirma University
                  </span>
                  . What started as curiosity became a passion for building web
                  apps that solve real problems. Open source contributions and{" "}
                  <Link
                    href="/posts/hacknuthon-5.0"
                    className="text-gray-300 underline decoration-gray-500 underline-offset-2 hover:text-gray-100 hover:decoration-gray-400"
                  >
                    hackathons
                  </Link>{" "}
                  keep me thriving in collaborative environments.
                </p>

                <p className="text-gray-300 text-base sm:text-lg leading-relaxed">
                  Recently, I&apos;ve shifted to AI agents and multi-agent
                  systems, building tools for dynamic data exploration using
                  LangChain and LangGraph. It&apos;s rewarding to apply my web
                  development experience toward creating smarter, more flexible
                  systems.
                </p>
              </div>
            </div>
          </div>

          {/* Clean Education Section */}
          <div className="flex flex-col justify-center mt-6 lg:mt-0">
            <div className="space-y-8 sm:space-y-12">
              <div className="flex items-center gap-3">
                <FaGraduationCap className="text-white/60 text-lg sm:text-xl" />
                <h3 className="text-lg sm:text-xl font-semibold text-white">
                  Education
                </h3>
              </div>

              {/* Current Education */}
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <h4 className="text-white font-semibold text-base">
                    Nirma University
                  </h4>
                  <span className="text-blue-400 text-xs bg-blue-400/10 px-2 py-0.5 rounded-full">
                    Current
                  </span>
                </div>
                <p className="text-gray-400 text-sm">B.Tech Computer Science</p>
                <p className="text-gray-400 text-sm">2022 - 2026</p>
              </div>

              {/* Previous Education */}
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <h4 className="text-white font-semibold text-base">
                    Gyanmanjari Vidhyapith
                  </h4>
                  <span className="text-green-400 text-xs bg-green-400/10 px-2 py-0.5 rounded-full">
                    Completed
                  </span>
                </div>
                <p className="text-gray-400 text-sm">Higher Secondary</p>
                <p className="text-gray-400 text-sm">2020 - 2022</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tech Stack and Projects Side by Side */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 items-start">
          {/* Tech Stack Section */}
          <div className="flex flex-col">
            <div className="flex items-center gap-3 mb-4 sm:mb-6">
              <FaCode className="text-lg sm:text-xl text-cyan-400" />
              <h3 className="text-lg sm:text-xl font-semibold text-white">
                Tech Stack
              </h3>
            </div>

            <div className="flex flex-wrap gap-2">
              {skills.map((skill) => (
                <div
                  key={skill.name}
                  className={`px-3 py-1.5 bg-gradient-to-r ${skill.color} backdrop-blur-sm border ${skill.border} rounded-lg text-white text-xs font-medium cursor-pointer flex items-center justify-center`}
                >
                  {skill.name}
                </div>
              ))}
            </div>
          </div>

          {/* Featured Projects Section */}
          <div className="flex flex-col">
            <div className="flex items-center gap-3 mb-4 sm:mb-6">
              <FaRocket className="text-lg sm:text-xl text-purple-400" />
              <h3 className="text-lg sm:text-xl font-semibold text-white">
                Featured Projects
              </h3>
            </div>

            <div className="space-y-4">
              {featuredProjects.map((project, index) => (
                <div key={index} className="group relative">
                  <ColorSwingBox>
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="text-base font-semibold text-white">
                        {project.title}
                      </h4>
                      <div className="flex gap-1.5">
                        {project.link && (
                          <Link
                            href={project.link}
                            target="_blank"
                            className="p-1.5 text-blue-400 hover:text-blue-300 bg-blue-400/10 hover:bg-blue-400/20 rounded-md"
                          >
                            <FaExternalLinkAlt size={10} />
                          </Link>
                        )}
                        <Link
                          href={project.githubLink}
                          target="_blank"
                          className="p-1.5 text-gray-400 hover:text-gray-300 bg-gray-400/10 hover:bg-gray-400/20 rounded-md"
                        >
                          <SiGithub size={10} />
                        </Link>
                      </div>
                    </div>

                    <p className="text-gray-400 text-xs leading-relaxed mb-2 line-clamp-2">
                      {project.description}
                    </p>

                    <div className="flex flex-wrap gap-1">
                      {project.tag.slice(0, 4).map((tech, i) => (
                        <span
                          key={i}
                          className="px-2 py-0.5 text-xs text-gray-300 bg-gray-800/60 rounded border border-gray-600/40"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.tag.length > 4 && (
                        <span className="px-2 py-0.5 text-xs text-gray-400 bg-white/5 rounded border border-white/10">
                          +{project.tag.length - 4}
                        </span>
                      )}
                    </div>
                  </ColorSwingBox>
                </div>
              ))}
            </div>

            <div className="text-left pt-6">
              <Link
                href="/projects"
                className="text-blue-400 hover:text-blue-300 font-medium text-sm underline decoration-1 underline-offset-4 hover:decoration-2"
              >
                View All Projects →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
