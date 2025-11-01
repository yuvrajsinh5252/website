"use client";

import { useRef, useState } from "react";
import {
  FaExternalLinkAlt,
  FaGraduationCap,
  FaCode,
  FaRocket,
  FaBriefcase,
  FaChevronDown,
  FaChevronUp,
} from "react-icons/fa";
import { SiGithub } from "react-icons/si";
import Link from "next/link";
import Image from "next/image";
import { PROJECTS } from "@/config/project";
import { ColorSwingBox } from "@/components/effects/color-swing-box";
import { motion } from "framer-motion";

export function AboutSection() {
  const ref = useRef(null);
  const [expandedWork, setExpandedWork] = useState(false);
  const [expandedEducation, setExpandedEducation] = useState(false);

  const featuredProjects = PROJECTS.slice(0, 1);

  const workExperience = [
    {
      title: "Full-Stack Developer Intern",
      company: "Factly Media & Research",
      companyUrl: "https://factly.in",
      location: "Remote",
      dates: "Feb 2025 - Present",
      logo: "https://factly.in/wp-content/uploads//2015/04/factly-red-logo-white-bg.png",
    },
  ];

  const education = [
    {
      institution: "Nirma University",
      institutionUrl: "https://nirmauni.ac.in/",
      degree: "B.Tech in Computer Science & Engineering",
      location: "Ahmedabad, Gujarat",
      dates: "Sep 2022 - Present",
      status: "Current",
      logo: "https://upload.wikimedia.org/wikipedia/en/8/83/Nirma_University_Logo.png",
    },
    {
      institution: "Gyanmanjari Vidhyapith",
      institutionUrl: "https://gyanmanjarividyapith.edu.in/",
      degree: "Higher Secondary",
      location: "Bhavnagar, Gujarat",
      dates: "2020 - 2022",
      status: "Completed",
      logo: "https://yt3.googleusercontent.com/ytc/AIdro_nzbr0KcId58B5Pzdf3PEo8OKJ3lIpxZcLae6oqj3qBjg=s900-c-k-c0x00ffffff-no-rj",
    },
  ];

  const skills = [
    {
      name: "React",
      color: "from-blue-500/10 to-cyan-500/10",
      border: "border-blue-400/20",
      url: "https://react.dev/",
    },
    {
      name: "Next.js",
      color: "from-gray-500/10 to-slate-500/10",
      border: "border-gray-400/20",
      url: "https://nextjs.org/",
    },
    {
      name: "TypeScript",
      color: "from-blue-600/10 to-indigo-500/10",
      border: "border-blue-500/20",
      url: "https://www.typescriptlang.org/",
    },
    {
      name: "JavaScript",
      color: "from-yellow-500/10 to-amber-500/10",
      border: "border-yellow-400/20",
      url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
    },
    {
      name: "Tailwind CSS",
      color: "from-teal-500/10 to-cyan-500/10",
      border: "border-teal-400/20",
      url: "https://tailwindcss.com/",
    },
    {
      name: "Node.js",
      color: "from-green-600/10 to-emerald-500/10",
      border: "border-green-400/20",
      url: "https://nodejs.org/",
    },
    {
      name: "Python",
      color: "from-yellow-600/10 to-blue-500/10",
      border: "border-yellow-500/20",
      url: "https://www.python.org/",
    },
    {
      name: "LangGraph",
      color: "from-purple-500/10 to-pink-500/10",
      border: "border-purple-400/20",
      url: "https://langchain-ai.github.io/langgraph/",
    },
    {
      name: "PostgreSQL",
      color: "from-blue-700/10 to-indigo-600/10",
      border: "border-blue-600/20",
      url: "https://www.postgresql.org/",
    },
    {
      name: "MongoDB",
      color: "from-green-700/10 to-emerald-600/10",
      border: "border-green-500/20",
      url: "https://www.mongodb.com/",
    },
    {
      name: "Docker",
      color: "from-blue-500/10 to-sky-500/10",
      border: "border-blue-400/20",
      url: "https://www.docker.com/",
    },
    {
      name: "Git",
      color: "from-orange-600/10 to-red-500/10",
      border: "border-orange-400/20",
      url: "https://git-scm.com/",
    },
    {
      name: "Linux",
      color: "from-yellow-500/10 to-orange-500/10",
      border: "border-yellow-400/20",
      url: "https://www.linux.org/",
    },
    {
      name: "C++",
      color: "from-blue-600/10 to-purple-600/10",
      border: "border-blue-500/20",
      url: "https://isocpp.org/",
    },
    {
      name: "Rust",
      color: "from-orange-700/10 to-red-600/10",
      border: "border-orange-500/20",
      url: "https://www.rust-lang.org/",
    },
    {
      name: "Java",
      color: "from-red-600/10 to-orange-600/10",
      border: "border-red-500/20",
      url: "https://www.java.com/",
    },
    {
      name: "Go",
      color: "from-cyan-600/10 to-blue-600/10",
      border: "border-cyan-500/20",
      url: "https://go.dev/",
    },
  ];

  return (
    <section
      ref={ref}
      className="min-h-screen flex flex-col justify-center px-4 sm:px-6 md:px-8 py-12 sm:py-16 relative"
      id="about"
    >
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Minimal Header */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-3">
            About Me
          </h2>
        </div>

        {/* My Journey - No Box */}
        <div className="mb-12 sm:mb-16">
          <h3 className="text-xl sm:text-2xl font-semibold text-white mb-6">
            My Journey
          </h3>
          <div className="space-y-5 text-gray-300 text-base sm:text-lg leading-relaxed max-w-4xl">
            <p>
              Hi! I&apos;m a Computer Science student at{" "}
              <a
                href="https://nirmauni.ac.in/"
                target="_blank"
                rel="noreferrer"
                className="text-blue-400 font-medium hover:text-blue-300 transition-colors inline-flex items-center gap-1"
              >
                Nirma University
                <FaExternalLinkAlt className="text-xs" />
              </a>
              . What started as curiosity became a passion for building web apps
              that solve real problems. Open source contributions and{" "}
              <Link
                href="/posts/hacknuthon-5.0"
                className="text-blue-400 font-medium hover:text-blue-300 transition-colors"
              >
                hackathons
              </Link>{" "}
              keep me thriving in collaborative environments.
            </p>

            <p>
              Recently, I&apos;ve shifted to AI agents and multi-agent systems,
              building tools for dynamic data exploration using LangChain and
              LangGraph. It&apos;s rewarding to apply my web development
              experience toward creating smarter, more flexible systems.
            </p>
          </div>
        </div>

        {/* Experience and Education - Side by Side */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          {/* Work Experience */}
          <div className="flex flex-col items-center">
            <div className="w-full max-w-lg">
              <div className="flex items-center justify-center gap-2 mb-4">
                <FaBriefcase className="text-blue-400 text-base" />
                <h3 className="text-lg font-semibold text-white">
                  Work Experience
                </h3>
              </div>
              <div className="space-y-3">
                {workExperience
                  .slice(0, expandedWork ? workExperience.length : 1)
                  .map((work, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-3 transition-all"
                    >
                      <div className="relative w-10 h-10 flex-shrink-0 rounded-lg overflow-hidden">
                        {work.logo ? (
                          <Image
                            src={work.logo}
                            alt={work.company}
                            fill
                            className="object-contain"
                            unoptimized
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-blue-400 text-xs font-semibold">
                            {work.company.charAt(0)}
                          </div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1 flex-wrap">
                          <h4 className="text-sm font-semibold text-white">
                            {work.title}
                          </h4>
                          <span className="px-1.5 py-0.5 text-[10px] font-medium text-blue-200 bg-blue-500/20 rounded-full">
                            {work.location}
                          </span>
                        </div>
                        <a
                          href={work.companyUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="text-blue-400 hover:text-blue-300 text-xs transition-colors inline-flex items-center gap-1 mb-1"
                        >
                          {work.company}
                          <FaExternalLinkAlt className="text-[9px]" />
                        </a>
                        <p className="text-gray-500 text-[10px]">
                          {work.dates}
                        </p>
                      </div>
                    </div>
                  ))}
                {workExperience.length > 1 && (
                  <button
                    onClick={() => setExpandedWork(!expandedWork)}
                    className="w-full flex items-center justify-center gap-2 py-2 text-xs text-gray-400 hover:text-blue-400 transition-colors"
                  >
                    {expandedWork ? (
                      <>
                        <FaChevronUp className="text-[10px]" />
                        <span>Show Less</span>
                      </>
                    ) : (
                      <>
                        <FaChevronDown className="text-[10px]" />
                        <span>Show {workExperience.length - 1} More</span>
                      </>
                    )}
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Education */}
          <div className="flex flex-col items-center">
            <div className="w-full max-w-lg">
              <div className="flex items-center justify-center gap-2 mb-4">
                <FaGraduationCap className="text-purple-400 text-base" />
                <h3 className="text-lg font-semibold text-white">Education</h3>
              </div>
              <div className="space-y-3">
                {education
                  .slice(0, expandedEducation ? education.length : 1)
                  .map((edu, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-3 transition-all"
                    >
                      <div className="relative w-10 h-10 flex-shrink-0 rounded-lg overflow-hidden">
                        {edu.logo ? (
                          <Image
                            src={edu.logo}
                            alt={edu.institution}
                            fill
                            className="object-contain"
                            unoptimized
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-purple-400 text-xs font-semibold">
                            {edu.institution.charAt(0)}
                          </div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1 flex-wrap">
                          <a
                            href={edu.institutionUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="text-sm font-semibold text-white hover:text-purple-300 transition-colors inline-flex items-center gap-1"
                          >
                            {edu.institution}
                            <FaExternalLinkAlt className="text-[9px]" />
                          </a>
                          <span
                            className={`px-1.5 py-0.5 text-[10px] font-medium rounded-full ${
                              edu.status === "Current"
                                ? "text-green-200 bg-green-500/20"
                                : "text-blue-200 bg-blue-500/20"
                            }`}
                          >
                            {edu.status}
                          </span>
                        </div>
                        <p className="text-gray-400 text-xs">{edu.degree}</p>
                        <p className="text-gray-400 text-xs">{edu.location}</p>
                        <p className="text-gray-500 text-[10px] mt-0.5">
                          {edu.dates}
                        </p>
                      </div>
                    </div>
                  ))}
                {education.length > 1 && (
                  <button
                    onClick={() => setExpandedEducation(!expandedEducation)}
                    className="w-full flex items-center justify-center gap-2 py-2 text-xs text-gray-400 hover:text-purple-400 transition-colors"
                  >
                    {expandedEducation ? (
                      <>
                        <FaChevronUp className="text-[10px]" />
                        <span>Show Less</span>
                      </>
                    ) : (
                      <>
                        <FaChevronDown className="text-[10px]" />
                        <span>Show {education.length - 1} More</span>
                      </>
                    )}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* What I Do - Compact */}
        <div className="mb-12 sm:mb-16">
          <h3 className="text-xl sm:text-2xl font-semibold text-white mb-6">
            What I Do
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              {
                title: "Full-Stack Development",
                desc: "Building scalable web applications with React, Next.js, TypeScript, and robust backend systems.",
              },
              {
                title: "AI & Multi-Agent Systems",
                desc: "Designing intelligent multi-agent systems using LangChain, LangGraph, and LangSmith for data exploration.",
              },
              {
                title: "System Architecture",
                desc: "Engineering efficient data processing pipelines, real-time systems, and secure code execution environments.",
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="backdrop-blur-sm bg-white/5 rounded-xl p-5 border border-white/10 hover:border-white/20 transition-all duration-300"
              >
                <h4 className="text-base font-semibold text-white mb-2">
                  {item.title}
                </h4>
                <p className="text-gray-300 text-sm leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Tech Stack and Featured Project - Side by Side */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Tech Stack */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <FaCode className="text-cyan-300 text-xl" />
              <h3 className="text-xl sm:text-2xl font-semibold text-white">
                Tech Stack
              </h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill) => (
                <a
                  key={skill.name}
                  href={skill.url}
                  target="_blank"
                  rel="noreferrer"
                  className={`px-3 py-1.5 bg-gradient-to-r ${skill.color} backdrop-blur-sm border ${skill.border} rounded-lg text-white/90 hover:text-white transition-all duration-200 text-xs font-medium`}
                >
                  {skill.name}
                </a>
              ))}
            </div>
          </div>

          {/* Featured Project */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <FaRocket className="text-purple-300 text-lg" />
              <h3 className="text-xl font-semibold text-white">
                Featured Project
              </h3>
            </div>
            {featuredProjects.map((project, index) => (
              <div
                key={index}
                className="group relative"
                onClick={() => {
                  if (project.link)
                    window.open(project.link, "_blank", "noopener,noreferrer");
                }}
              >
                <div className="backdrop-blur-sm bg-white/5 rounded-xl p-4 border border-white/10 hover:border-white/20 transition-all duration-300">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="text-base font-semibold text-white">
                      {project.title}
                    </h4>
                    <div className="flex gap-1.5">
                      {project.link && (
                        <Link
                          href={project.link}
                          target="_blank"
                          onClick={(e) => e.stopPropagation()}
                          className="p-1.5 text-blue-400 hover:text-blue-300 bg-blue-400/10 hover:bg-blue-400/20 rounded-lg border border-blue-400/20 transition-all"
                        >
                          <FaExternalLinkAlt size={11} />
                        </Link>
                      )}
                      <a
                        href={project.githubLink}
                        target="_blank"
                        rel="noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="p-1.5 text-gray-300 hover:text-white bg-gray-400/10 hover:bg-gray-400/20 rounded-lg border border-gray-400/20 transition-all"
                        aria-label="View source on GitHub"
                      >
                        <SiGithub size={11} />
                      </a>
                    </div>
                  </div>
                  <p className="text-gray-300 text-xs leading-relaxed mb-2.5 line-clamp-2">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {project.tag.slice(0, 4).map((tech, i) => (
                      <span
                        key={i}
                        className="px-2 py-0.5 text-xs font-medium text-white/90 bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-400/20 rounded"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.tag.length > 4 && (
                      <span className="px-2 py-0.5 text-xs font-medium text-gray-400 bg-white/5 border border-white/10 rounded">
                        +{project.tag.length - 4}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
            <div className="mt-3">
              <Link
                href="/projects"
                className="text-blue-400 hover:text-blue-300 font-medium text-xs transition-colors inline-flex items-center gap-1"
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
