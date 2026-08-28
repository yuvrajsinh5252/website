import { FaExternalLinkAlt } from "react-icons/fa";
import { SiGithub } from "react-icons/si";
import { ColorSwingBox } from "@/components/effects/color-swing-box";
import { DoodleIconLink } from "@/components/ui/doodle-icon";
import { PROJECTS } from "@/config/project";

type Project = (typeof PROJECTS)[number];

export function ProjectsList({ projects }: { projects: typeof PROJECTS }) {
  if (projects.length === 0) {
    return (
      <div className="text-center py-16 sm:py-20 animate-fade-up">
        <p className="text-gray-400 text-base sm:text-lg">
          No projects yet. Check back soon!
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 animate-fade-in">
      {projects.map((project) => (
        <ProjectCard key={project.title} project={project} />
      ))}
    </div>
  );
}

export function ProjectCard({ project }: { project: Project }) {
  return (
    <div className="h-full animate-fade-up">
      <ColorSwingBox className="p-4 sm:p-5 h-full">
        <div className="flex flex-col h-full gap-3">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-base sm:text-lg font-semibold text-white leading-tight">
                {project.link ? (
                  // The stretched pseudo-element makes the whole card clickable from one link.
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="after:absolute after:inset-0"
                  >
                    {project.title}
                  </a>
                ) : (
                  project.title
                )}
              </h2>
              {project.year && (
                <p className="text-[11px] sm:text-xs text-gray-400 mt-0.5">
                  {project.year}
                </p>
              )}
            </div>
            <div className="relative z-20 flex items-center gap-2.5">
              {project.link && (
                <DoodleIconLink
                  href={project.link}
                  icon={FaExternalLinkAlt}
                  label={`Open ${project.title}`}
                  color="blue"
                  className="text-[9px]"
                />
              )}
              <DoodleIconLink
                href={project.githubLink}
                icon={SiGithub}
                label={`${project.title} source on GitHub`}
                color="red"
                className="text-[9px]"
              />
            </div>
          </div>

          <p className="text-gray-300/90 text-sm leading-relaxed line-clamp-2">
            {project.description}
          </p>

          <ul className="mt-auto flex flex-nowrap gap-2 overflow-x-auto scroll-smooth list-none p-0">
            {project.tag.map((tag: string) => (
              <li
                key={`${project.title}-tag-${tag}`}
                className="px-2.5 py-1 text-xs font-medium text-white/90 bg-blue-500/10 border border-blue-400/20 rounded-md whitespace-nowrap shrink-0"
              >
                {tag}
              </li>
            ))}
          </ul>
        </div>
      </ColorSwingBox>
    </div>
  );
}
