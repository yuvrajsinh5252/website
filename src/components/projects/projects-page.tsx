"use client";

import { FaExternalLinkAlt } from "react-icons/fa";
import Link from "next/link";
import { IoIosArrowForward } from "react-icons/io";
import { SiGithub } from "react-icons/si";
import { PROJECTS } from "@/config/project";
import { ColorSwingBox } from "@/components/effects/color-swing-box";
import { LazyMotion, domAnimation, m } from "framer-motion";

const headerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.1 },
  },
};

const projectCardVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.1 },
  },
};

export default function ProjectsPage() {
  return (
    <div className="min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8 pt-32 sm:pt-36 md:pt-44 pb-16 sm:pb-20">
        <LazyMotion features={domAnimation}>
          <m.div
            className="mb-12 sm:mb-14 md:mb-16"
            variants={headerVariants}
            initial="hidden"
            animate="visible"
          >
            <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
              <div>
                <IoIosArrowForward className="text-2xl sm:text-3xl md:text-4xl text-blue-400" />
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white">
                Projects
              </h1>
            </div>
            <p className="text-gray-400 text-base sm:text-lg max-w-2xl">
              A collection of projects I&apos;ve built, exploring different
              technologies and solving real-world problems.
            </p>
          </m.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
            {PROJECTS.map((project, index) => (
              <m.div
                key={project.title}
                variants={projectCardVariants}
                initial="hidden"
                animate="visible"
                transition={{ delay: index * 0.02 }}
                className="will-change-auto h-full"
                style={{
                  contentVisibility: "auto",
                  containIntrinsicSize: "260px",
                }}
              >
                <div
                  className={`${
                    PROJECTS[index].link ? "cursor-pointer" : ""
                  } h-full`}
                  role={PROJECTS[index].link ? "link" : undefined}
                  tabIndex={PROJECTS[index].link ? 0 : -1}
                  onClick={() => {
                    const href = PROJECTS[index].link;
                    if (href)
                      window.open(href, "_blank", "noopener,noreferrer");
                  }}
                  onKeyDown={(e) => {
                    const href = PROJECTS[index].link;
                    if (href && (e.key === "Enter" || e.key === " ")) {
                      e.preventDefault();
                      window.open(href, "_blank", "noopener,noreferrer");
                    }
                  }}
                >
                  <ColorSwingBox className="p-4 sm:p-5 h-full">
                    <div className="flex flex-col h-full gap-3">
                      <div className="flex items-start justify-between">
                        <div>
                          <h2 className="text-base sm:text-lg font-semibold text-white leading-tight">
                            {project.title}
                          </h2>
                          {project.year && (
                            <p className="text-[11px] sm:text-xs text-gray-400 mt-0.5">
                              {project.year}
                            </p>
                          )}
                        </div>
                        <div className="flex items-center gap-1.5">
                          {project.link && (
                            <Link
                              href={project.link}
                              target="_blank"
                              rel="noreferrer"
                              onClick={(e) => e.stopPropagation()}
                              className="p-1.5 rounded-full bg-white/5 border border-white/10 text-gray-300 hover:bg-white/10 hover:text-white transition-colors hover:shadow-[0_0_20px_rgba(59,130,246,0.25)]"
                              aria-label={`Open ${project.title}`}
                            >
                              <FaExternalLinkAlt size={14} />
                            </Link>
                          )}
                          <a
                            href={project.githubLink}
                            target="_blank"
                            rel="noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="p-1.5 rounded-full bg-white/5 border border-white/10 text-gray-300 hover:bg-white/10 hover:text-white transition-colors hover:shadow-[0_0_20px_rgba(255,255,255,0.15)]"
                            aria-label={`View ${project.title} on GitHub`}
                          >
                            <SiGithub size={14} />
                          </a>
                        </div>
                      </div>

                      <p className="text-gray-300/90 text-sm leading-relaxed line-clamp-2">
                        {project.description}
                      </p>

                      <div className="mt-auto flex flex-wrap gap-2">
                        {project.tag.slice(0, 4).map((tag) => (
                          <span
                            key={tag}
                            className="px-2.5 py-1 text-xs font-medium text-white/90 bg-blue-500/10 border border-blue-400/20 rounded-md hover:border-blue-400/30 hover:bg-blue-500/15 transition-all duration-200"
                          >
                            {tag}
                          </span>
                        ))}
                        {project.tag.length > 4 && (
                          <span className="px-2.5 py-1 text-xs font-medium text-gray-400 bg-white/5 border border-white/10 rounded-md">
                            +{project.tag.length - 4}
                          </span>
                        )}
                      </div>
                    </div>
                  </ColorSwingBox>
                </div>
              </m.div>
            ))}
          </div>

          {PROJECTS.length === 0 && (
            <m.div
              className="text-center py-16 sm:py-20"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
            >
              <p className="text-gray-400 text-base sm:text-lg">
                No projects yet. Check back soon!
              </p>
            </m.div>
          )}
        </LazyMotion>
      </div>
    </div>
  );
}
