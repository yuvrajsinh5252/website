"use client";

import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Variants } from "framer-motion";
import Image from "next/image";
import { PROJECTS } from "@/config/project";
import {
  WORK_EXPERIENCE,
  EDUCATION,
  WHAT_I_DO,
  type WorkExperienceItem,
  type EducationItem,
} from "@/config/about";
import { SKILLS } from "@/config/skills";
import {
  FaExternalLinkAlt,
  FaCode,
  FaChevronDown,
  FaChevronUp,
  FaGithub,
} from "react-icons/fa";

const itemVariants: Variants = {
  hidden: { opacity: 0, scale: 1.15, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      type: "spring" as const,
      stiffness: 100,
      damping: 15,
      mass: 0.8,
    },
  },
};

export function AboutContent() {
  const featuredProjects = PROJECTS.slice(0, 1);

  return (
    <section
      className="min-h-screen flex flex-col justify-center px-4 sm:px-6 md:px-8 py-12 sm:py-16 relative"
      id="about"
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          className="text-center mb-12 sm:mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={itemVariants}
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-3">
            About Me
          </h2>
        </motion.div>

        <motion.div
          className="mb-12 sm:mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={itemVariants}
        >
          <div className="space-y-5 text-gray-300 text-base sm:text-lg leading-relaxed max-w-4xl">
            <p>
              Hi I&apos;m a Software Developer. What started as curiosity became
              a passion for building web apps that solve real problems. Open
              source contributions and{" "}
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
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={itemVariants}
        >
          <AboutInteractive
            workExperience={WORK_EXPERIENCE}
            education={EDUCATION}
          />
        </motion.div>

        <motion.div
          className="mb-12 sm:mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={itemVariants}
        >
          <h3 className="text-xl sm:text-2xl font-semibold text-white mb-6">
            What I Do
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {WHAT_I_DO.map((item, idx) => (
              <div
                key={idx}
                className="backdrop-blur-sm bg-white/5 rounded-xl p-5 border border-white/10 hover:border-white/20 transition-[border-color] duration-300"
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
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={itemVariants}
          >
            <div className="flex items-center gap-3 mb-6">
              <FaCode className="w-5 h-5 text-cyan-300" />
              <h3 className="text-xl sm:text-2xl font-semibold text-white">
                Tech Stack
              </h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {SKILLS.map((skill) => (
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
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={itemVariants}
          >
            <div className="flex items-center gap-3 mb-4">
              <FaExternalLinkAlt className="w-4 h-4 text-purple-300" />
              <h3 className="text-xl sm:text-2xl font-semibold text-white">
                Featured Project
              </h3>
            </div>
            {featuredProjects.map((project, index) => (
              <div key={index} className="group relative">
                <div className="backdrop-blur-sm bg-white/5 rounded-xl p-4 border border-white/10 hover:border-white/20 transition-[border-color] duration-300">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="text-base font-semibold text-white">
                      {project.title}
                    </h4>
                    <div className="flex gap-2.5">
                      {project.link && (
                        <Link
                          href={project.link}
                          target="_blank"
                          className="text-blue-400 hover:text-blue-300 transition-colors"
                        >
                          <FaExternalLinkAlt className="w-4 h-4" />
                        </Link>
                      )}
                      <a
                        href={project.githubLink}
                        target="_blank"
                        rel="noreferrer"
                        className="text-gray-300 hover:text-white transition-colors"
                        aria-label="View source on GitHub"
                      >
                        <FaGithub className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                  <p className="text-gray-300 text-xs leading-relaxed mb-2.5 line-clamp-2">
                    {project.description}
                  </p>
                  <div className="flex flex-nowrap gap-2 overflow-x-auto scroll-smooth">
                    {project.tag.map((tech, i) => (
                      <span
                        key={`${project.title}-tag-${i}-${tech}`}
                        className="px-2.5 py-1 text-xs font-medium text-white/90 bg-blue-500/10 border border-blue-400/20 rounded-md hover:border-blue-400/30 hover:bg-blue-500/15 transition-all duration-200 whitespace-nowrap flex-shrink-0"
                      >
                        {tech}
                      </span>
                    ))}
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
          </motion.div>
        </div>
      </div>
    </section>
  );
}

type AboutInteractiveProps = {
  workExperience: WorkExperienceItem[];
  education: EducationItem[];
};

function AboutInteractive({
  workExperience,
  education,
}: AboutInteractiveProps) {
  const [expandedWork, setExpandedWork] = useState(false);
  const [expandedEducation, setExpandedEducation] = useState(false);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
      <div className="flex flex-col items-center">
        <div className="w-full max-w-lg">
          <h3 className="text-lg font-semibold mb-4 text-white">
            Work Experience
          </h3>
          <div className="space-y-3">
            {workExperience.slice(0, 1).map((work, index) => (
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
                    <h4 className="text-base font-semibold text-white">
                      {work.title}
                    </h4>
                    <span className="px-1.5 py-0.5 text-xs font-medium text-blue-200 bg-blue-500/20 rounded-full">
                      {work.location}
                    </span>
                  </div>
                  <a
                    href={work.companyUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-blue-400 hover:text-blue-300 text-sm transition-colors inline-flex items-center gap-1 mb-1"
                  >
                    {work.company}
                    <FaExternalLinkAlt className="text-[10px]" />
                  </a>
                  <p className="text-gray-500 text-xs">{work.dates}</p>
                </div>
              </div>
            ))}
            <AnimatePresence>
              {expandedWork &&
                workExperience.slice(1).map((work, index) => (
                  <motion.div
                    key={`work-${index}`}
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="flex items-start gap-3 pt-3">
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
                          <h4 className="text-base font-semibold text-white">
                            {work.title}
                          </h4>
                          <span className="px-1.5 py-0.5 text-xs font-medium text-blue-200 bg-blue-500/20 rounded-full">
                            {work.location}
                          </span>
                        </div>
                        <a
                          href={work.companyUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="text-blue-400 hover:text-blue-300 text-sm transition-colors inline-flex items-center gap-1 mb-1"
                        >
                          {work.company}
                          <FaExternalLinkAlt className="text-[10px]" />
                        </a>
                        <p className="text-gray-500 text-xs">{work.dates}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
            </AnimatePresence>
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

      <div className="flex flex-col items-center">
        <div className="w-full max-w-lg">
          <h3 className="text-lg font-semibold mb-4 text-white">Education</h3>
          <div className="space-y-3">
            {education.slice(0, 1).map((edu, index) => (
              <div
                key={index}
                className="flex items-start gap-3 transition-all"
              >
                <div className="relative w-10 h-10 flex-shrink-0 rounded-lg overflow-hidden">
                  {edu.logo ? (
                    <Image
                      src={edu.logo}
                      alt={edu.institution || edu.degree}
                      fill
                      className="object-contain"
                      unoptimized
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-purple-400 text-xs font-semibold">
                      {edu.institution
                        ? edu.institution.charAt(0)
                        : edu.degree.charAt(0)}
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    {edu.institution ? (
                      <a
                        href={edu.institutionUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-base font-semibold text-white hover:text-purple-300 transition-colors inline-flex items-center gap-1"
                      >
                        {edu.institution}
                        <FaExternalLinkAlt className="text-[10px]" />
                      </a>
                    ) : (
                      <span className="text-base font-semibold text-white">
                        {edu.degree}
                      </span>
                    )}
                    <span
                      className={`px-1.5 py-0.5 text-xs font-medium rounded-full ${
                        edu.status === "Current"
                          ? "text-green-200 bg-green-500/20"
                          : "text-blue-200 bg-blue-500/20"
                      }`}
                    >
                      {edu.status}
                    </span>
                  </div>
                  {edu.institution && (
                    <p className="text-gray-400 text-sm">{edu.degree}</p>
                  )}
                  <p className="text-gray-400 text-sm">{edu.location}</p>
                  <p className="text-gray-500 text-xs mt-0.5">{edu.dates}</p>
                </div>
              </div>
            ))}
            <AnimatePresence>
              {expandedEducation &&
                education.slice(1).map((edu, index) => (
                  <motion.div
                    key={`edu-${index}`}
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="flex items-start gap-3 pt-3">
                      <div className="relative w-10 h-10 flex-shrink-0 rounded-lg overflow-hidden">
                        {edu.logo ? (
                          <Image
                            src={edu.logo}
                            alt={edu.institution || edu.degree}
                            fill
                            className="object-contain"
                            unoptimized
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-purple-400 text-xs font-semibold">
                            {edu.institution
                              ? edu.institution.charAt(0)
                              : edu.degree.charAt(0)}
                          </div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1 flex-wrap">
                          {edu.institution ? (
                            <a
                              href={edu.institutionUrl}
                              target="_blank"
                              rel="noreferrer"
                              className="text-base font-semibold text-white hover:text-purple-300 transition-colors inline-flex items-center gap-1"
                            >
                              {edu.institution}
                              <FaExternalLinkAlt className="text-[10px]" />
                            </a>
                          ) : (
                            <span className="text-base font-semibold text-white">
                              {edu.degree}
                            </span>
                          )}
                          <span
                            className={`px-1.5 py-0.5 text-xs font-medium rounded-full ${
                              edu.status === "Current"
                                ? "text-green-200 bg-green-500/20"
                                : "text-blue-200 bg-blue-500/20"
                            }`}
                          >
                            {edu.status}
                          </span>
                        </div>
                        {edu.institution && (
                          <p className="text-gray-400 text-sm">{edu.degree}</p>
                        )}
                        <p className="text-gray-400 text-sm">{edu.location}</p>
                        <p className="text-gray-500 text-xs mt-0.5">
                          {edu.dates}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
            </AnimatePresence>
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
  );
}
