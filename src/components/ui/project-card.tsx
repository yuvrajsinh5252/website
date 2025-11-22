"use client";

import { FaExternalLinkAlt } from "react-icons/fa";
import Link from "next/link";
import { SiGithub } from "react-icons/si";
import { ColorSwingBox } from "@/components/effects/color-swing-box";
import { PROJECTS } from "@/config/project";
import { motion } from "framer-motion";

type Project = (typeof PROJECTS)[number];

const headerVariants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.2,
    },
  },
};

const sectionVariants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.2,
    },
  },
};

export function ProjectsList({ projects }: { projects: typeof PROJECTS }) {
  return (
    <motion.div
      className="space-y-16 sm:space-y-20"
      variants={headerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div variants={sectionVariants}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
          {projects.map((project) => (
            <ProjectCard key={project.title} project={project} />
          ))}
        </div>
      </motion.div>

      {projects.length === 0 && (
        <motion.div
          className="text-center py-16 sm:py-20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
        >
          <p className="text-gray-400 text-base sm:text-lg">
            No projects yet. Check back soon!
          </p>
        </motion.div>
      )}
    </motion.div>
  );
}

export function ProjectCard({ project }: { project: Project }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`${project.link ? "cursor-pointer" : ""} h-full`}
      role={project.link ? "link" : undefined}
      tabIndex={project.link ? 0 : -1}
      onClick={() => {
        if (project.link)
          window.open(project.link, "_blank", "noopener,noreferrer");
      }}
      onKeyDown={(e) => {
        if (project.link && (e.key === "Enter" || e.key === " ")) {
          e.preventDefault();
          window.open(project.link, "_blank", "noopener,noreferrer");
        }
      }}
    >
      <ColorSwingBox className="p-4 sm:p-5 h-full">
        <div className="flex flex-col h-full gap-3">
          <div className="flex items-start justify-between">
            <div>
              <motion.h2
                className="text-base sm:text-lg font-semibold text-white leading-tight"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                {project.title}
              </motion.h2>
              {project.year && (
                <motion.p
                  className="text-[11px] sm:text-xs text-gray-400 mt-0.5"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  {project.year}
                </motion.p>
              )}
            </div>
            <motion.div
              className="flex items-center gap-2.5"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              {project.link && (
                <Link
                  href={project.link}
                  target="_blank"
                  rel="noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="text-blue-400 hover:text-blue-300 transition-colors"
                  aria-label={`Open ${project.title}`}
                >
                  <FaExternalLinkAlt size={16} />
                </Link>
              )}
              <a
                href={project.githubLink}
                target="_blank"
                rel="noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="text-gray-300 hover:text-white transition-colors"
                aria-label={`View ${project.title} on GitHub`}
              >
                <SiGithub size={16} />
              </a>
            </motion.div>
          </div>

          <motion.p
            className="text-gray-300/90 text-sm leading-relaxed line-clamp-2"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            {project.description}
          </motion.p>

          <motion.div
            className="mt-auto flex flex-nowrap gap-2 overflow-x-auto scroll-smooth"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            {project.tag.map((tag: string, i: number) => (
              <span
                key={`${project.title}-tag-${i}-${tag}`}
                className="px-2.5 py-1 text-xs font-medium text-white/90 bg-blue-500/10 border border-blue-400/20 rounded-md hover:border-blue-400/30 hover:bg-blue-500/15 transition-all duration-200 whitespace-nowrap flex-shrink-0"
              >
                {tag}
              </span>
            ))}
          </motion.div>
        </div>
      </ColorSwingBox>
    </motion.div>
  );
}
