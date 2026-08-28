import { Link } from "react-router-dom";
import { lazy, Suspense, useState } from "react";
import { PROJECTS } from "@/config/project";
import {
  WORK_EXPERIENCE,
  EDUCATION,
  WHAT_I_DO,
  type WorkExperienceItem,
  type EducationItem,
} from "@/config/about";
import {
  FaExternalLinkAlt,
  FaCode,
  FaChevronDown,
  FaChevronUp,
  FaGithub,
} from "react-icons/fa";
import { MagicLink } from "@/components/effects/magiclink";
import { Reveal } from "@/components/ui/reveal";
import { Collapse } from "@/components/ui/collapse";
import { TimelineEntry, StatusPill } from "@/components/home/timeline-entry";

// Below the fold, so it loads lazily without blocking the hero.
const SkillsGrid = lazy(() =>
  import("@/components/effects/skills-grid").then((mod) => ({
    default: mod.SkillsGrid,
  }))
);

const ADDITIONAL_WORK = WORK_EXPERIENCE.slice(1);
const ADDITIONAL_EDUCATION = EDUCATION.slice(1);

export function AboutContent() {
  const featuredProjects = PROJECTS.slice(0, 1);

  return (
    <section
      className="min-h-screen flex flex-col justify-center px-4 sm:px-6 md:px-8 py-12 sm:py-16 relative"
      id="about"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 overflow-hidden pointer-events-none"
      >
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
        <Reveal className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-3">
            About Me
          </h2>
        </Reveal>

        <Reveal className="mb-12 sm:mb-16">
          <div className="space-y-5 text-gray-300 text-base sm:text-lg font-medium leading-relaxed max-w-4xl">
            <p>
              Hi I&apos;m a Software Developer. What started as curiosity became
              a passion for building web apps that solve real problems. Open
              source contributions and{" "}
              <MagicLink
                href="/posts/hacknuthon-5.0"
                className="font-medium transition-colors"
              >
                hackathons
              </MagicLink>{" "}
              keep me thriving in collaborative environments.
            </p>

            <p>
              Recently, I&apos;ve shifted to AI agents and multi-agent systems,
              building tools for dynamic data exploration using LangChain and
              LangGraph. It&apos;s rewarding to apply my web development
              experience toward creating smarter, more flexible systems.
            </p>
          </div>
        </Reveal>

        <Reveal>
          <AboutInteractive />
        </Reveal>

        <Reveal className="mb-12 sm:mb-16">
          <h3 className="text-2xl font-bold text-white mb-6">What I Do</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {WHAT_I_DO.map((item) => (
              <div
                key={item.title}
                className="bg-white/5 backdrop-blur-md rounded-xl p-5 border border-white/10 hover:border-white/20 transition-[border-color] duration-150"
              >
                <h4 className="text-base font-bold text-white mb-2">
                  {item.title}
                </h4>
                <p className="text-gray-300 text-sm font-medium leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Reveal>
            <div className="flex items-center gap-3 mb-4">
              <FaCode className="w-5 h-5 text-cyan-300" aria-hidden="true" />
              <h3 className="text-2xl font-bold text-white">Skills</h3>
            </div>
            <Suspense fallback={null}>
              <SkillsGrid />
            </Suspense>
          </Reveal>

          <Reveal>
            <div className="flex items-center gap-3 mb-4">
              <FaExternalLinkAlt
                className="w-4 h-4 text-purple-300"
                aria-hidden="true"
              />
              <h3 className="text-2xl font-bold text-white">Featured Project</h3>
            </div>
            {featuredProjects.map((project) => (
              <div key={project.title} className="group relative">
                <div className="bg-white/5 backdrop-blur-md rounded-xl p-4 border border-white/10 hover:border-white/20 transition-[border-color] duration-200">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="text-base font-bold text-white">
                      {project.title}
                    </h4>
                    <div className="flex gap-2.5">
                      {project.link && (
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noreferrer"
                          className="text-blue-400 hover:text-blue-300 transition-colors"
                          aria-label={`Open ${project.title} project`}
                        >
                          <FaExternalLinkAlt className="w-4 h-4" />
                        </a>
                      )}
                      <a
                        href={project.githubLink}
                        target="_blank"
                        rel="noreferrer"
                        className="text-gray-300 hover:text-white transition-colors"
                        aria-label={`${project.title} source on GitHub`}
                      >
                        <FaGithub className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                  <p className="text-gray-300 text-sm font-medium leading-relaxed mb-2.5 line-clamp-2">
                    {project.description}
                  </p>
                  <ul className="flex flex-nowrap gap-2 overflow-x-auto scroll-smooth">
                    {project.tag.map((tech) => (
                      <li
                        key={tech}
                        className="px-2.5 py-1 text-xs font-medium text-white/90 bg-blue-500/10 border border-blue-400/20 rounded-md whitespace-nowrap shrink-0"
                      >
                        {tech}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
            <div className="mt-3">
              <Link
                to="/projects"
                className="text-blue-400 hover:text-blue-300 font-medium text-sm transition-colors inline-flex items-center gap-1"
              >
                View All Projects →
              </Link>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function ShowMoreButton({
  expanded,
  count,
  onToggle,
}: {
  expanded: boolean;
  count: number;
  onToggle: () => void;
}) {
  const Icon = expanded ? FaChevronUp : FaChevronDown;

  return (
    <button
      type="button"
      onClick={onToggle}
      aria-expanded={expanded}
      className="w-full flex items-center justify-center gap-2 py-2 text-xs text-gray-400 hover:text-blue-400 transition-colors cursor-pointer"
    >
      <Icon className="text-[10px]" aria-hidden="true" />
      <span>{expanded ? "Show Less" : `Show ${count} More`}</span>
    </button>
  );
}

function WorkEntry({
  work,
  expandedCompany,
  onToggleRoles,
}: {
  work: WorkExperienceItem;
  expandedCompany: string | null;
  onToggleRoles: (company: string) => void;
}) {
  const isOpen = expandedCompany === work.company;
  const earlierRoles = work.roles.slice(1);

  return (
    <TimelineEntry
      logo={work.logo}
      fallbackLabel={work.company}
      alt={work.company}
    >
      <div className="flex items-center gap-2 flex-wrap">
        <h4 className="text-base font-bold text-white">
          {work.roles[0]?.title}
        </h4>
        <StatusPill>{work.location}</StatusPill>
      </div>
      <a
        href={work.companyUrl}
        target="_blank"
        rel="noreferrer"
        className="mt-1 text-blue-400 hover:text-blue-300 text-sm font-medium transition-colors inline-flex items-center gap-1"
      >
        {work.company}
        <FaExternalLinkAlt className="text-[10px]" aria-hidden="true" />
      </a>
      <p className="text-gray-400 text-xs font-medium mt-1">
        {work.roles[0]?.dates}
      </p>

      {earlierRoles.length > 0 && (
        <>
          <button
            type="button"
            onClick={() => onToggleRoles(work.company)}
            aria-expanded={isOpen}
            className="mt-3 inline-flex items-center gap-1.5 text-xs font-medium text-gray-400 transition-colors hover:text-blue-300"
          >
            <FaChevronDown
              className={`text-[10px] transition-transform duration-200 ${
                isOpen ? "rotate-180" : ""
              }`}
              aria-hidden="true"
            />
            {isOpen ? "Hide role history" : `Show ${earlierRoles.length} More`}
          </button>

          <Collapse open={isOpen}>
            <ul className="mt-3 ml-2 border-l border-blue-400/30 pl-4 pb-1 space-y-3">
              {earlierRoles.map((role) => (
                <li key={`${role.title}-${role.dates}`} className="relative">
                  <span
                    aria-hidden="true"
                    className="absolute -left-[21px] top-1.5 h-2.5 w-2.5 rounded-full border border-blue-300/70 bg-slate-900"
                  />
                  <h5 className="text-sm font-semibold text-gray-200">
                    {role.title}
                  </h5>
                  <p className="text-xs font-medium text-gray-400">
                    {role.dates}
                  </p>
                </li>
              ))}
            </ul>
          </Collapse>
        </>
      )}
    </TimelineEntry>
  );
}

function EducationEntry({ edu }: { edu: EducationItem }) {
  return (
    <TimelineEntry
      logo={edu.logo}
      fallbackLabel={edu.institution ?? edu.degree}
      alt={edu.institution || edu.degree}
    >
      <div className="flex items-center gap-2 mb-1 flex-wrap">
        {edu.institution ? (
          <a
            href={edu.institutionUrl}
            target="_blank"
            rel="noreferrer"
            className="text-base font-bold text-white hover:text-blue-300 transition-colors inline-flex items-center gap-1"
          >
            {edu.institution}
            <FaExternalLinkAlt className="text-[10px]" aria-hidden="true" />
          </a>
        ) : (
          <span className="text-base font-bold text-white">{edu.degree}</span>
        )}
        <StatusPill tone={edu.status === "Current" ? "green" : "blue"}>
          {edu.status}
        </StatusPill>
      </div>
      {edu.institution && (
        <p className="text-gray-400 text-sm font-medium">{edu.degree}</p>
      )}
      <p className="text-gray-400 text-sm font-medium">{edu.location}</p>
      <p className="text-gray-400 text-xs font-medium mt-0.5">{edu.dates}</p>
    </TimelineEntry>
  );
}

function AboutInteractive() {
  const [expandedWork, setExpandedWork] = useState(false);
  const [expandedEducation, setExpandedEducation] = useState(false);
  const [expandedCompany, setExpandedCompany] = useState<string | null>(null);

  const toggleRoles = (company: string) =>
    setExpandedCompany((current) => (current === company ? null : company));

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
      <div className="flex flex-col items-center">
        <div className="w-full max-w-lg">
          <h3 className="text-xl font-bold mb-4 text-white">Work Experience</h3>
          <div className="space-y-3">
            {WORK_EXPERIENCE.slice(0, 1).map((work) => (
              <WorkEntry
                key={work.company}
                work={work}
                expandedCompany={expandedCompany}
                onToggleRoles={toggleRoles}
              />
            ))}

            <Collapse open={expandedWork}>
              <div className="space-y-3 pt-3">
                {ADDITIONAL_WORK.map((work) => (
                  <WorkEntry
                    key={work.company}
                    work={work}
                    expandedCompany={expandedCompany}
                    onToggleRoles={toggleRoles}
                  />
                ))}
              </div>
            </Collapse>

            {ADDITIONAL_WORK.length > 0 && (
              <ShowMoreButton
                expanded={expandedWork}
                count={ADDITIONAL_WORK.length}
                onToggle={() => setExpandedWork((open) => !open)}
              />
            )}
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center">
        <div className="w-full max-w-lg">
          <h3 className="text-xl font-bold mb-4 text-white">Education</h3>
          <div className="space-y-3">
            {EDUCATION.slice(0, 1).map((edu) => (
              <EducationEntry key={edu.degree} edu={edu} />
            ))}

            <Collapse open={expandedEducation}>
              <div className="space-y-3 pt-3">
                {ADDITIONAL_EDUCATION.map((edu) => (
                  <EducationEntry key={edu.degree} edu={edu} />
                ))}
              </div>
            </Collapse>

            {ADDITIONAL_EDUCATION.length > 0 && (
              <ShowMoreButton
                expanded={expandedEducation}
                count={ADDITIONAL_EDUCATION.length}
                onToggle={() => setExpandedEducation((open) => !open)}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
