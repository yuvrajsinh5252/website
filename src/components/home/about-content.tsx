import Link from "next/link";
import { PROJECTS } from "@/config/project";
import { AboutInteractive } from "./about-interactive";

const workExperience = [
  {
    title: "Full-Stack Developer Intern",
    company: "Factly Media & Research",
    companyUrl: "https://factlymedia.com",
    location: "Remote",
    dates: "Feb 2025 - Present",
    logo: "https://factlymedia.com/factlyIcon.png",
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

export function AboutContent() {
  const featuredProjects = PROJECTS.slice(0, 1);

  return (
    <section
      className="min-h-screen flex flex-col justify-center px-4 sm:px-6 md:px-8 py-12 sm:py-16 relative"
      id="about"
    >
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-3">
            About Me
          </h2>
        </div>

        <div className="mb-12 sm:mb-16">
          <div className="space-y-5 text-gray-300 text-base sm:text-lg leading-relaxed max-w-4xl">
            <p>
              Hi! I&apos;m a Software Developer. What started as curiosity
              became a passion for building web apps that solve real problems.
              Open source contributions and{" "}
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

        <AboutInteractive
          workExperience={workExperience}
          education={education}
        />

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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <svg
                className="w-5 h-5 text-cyan-300"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
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

          <div>
            <div className="flex items-center gap-3 mb-4">
              <svg
                className="w-5 h-5 text-purple-300"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.905 1.38l-3.736 9.281a1 1 0 01-1.852 0L5.095 8.38A1 1 0 016 7h4V2a1 1 0 011.3-.954z"
                  clipRule="evenodd"
                />
              </svg>
              <h3 className="text-xl font-semibold text-white">
                Featured Project
              </h3>
            </div>
            {featuredProjects.map((project, index) => (
              <div key={index} className="group relative">
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
                          className="p-1.5 text-blue-400 hover:text-blue-300 bg-blue-400/10 hover:bg-blue-400/20 rounded-lg border border-blue-400/20 transition-all"
                        >
                          <svg
                            className="w-3 h-3"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                            />
                          </svg>
                        </Link>
                      )}
                      <a
                        href={project.githubLink}
                        target="_blank"
                        rel="noreferrer"
                        className="p-1.5 text-gray-300 hover:text-white bg-gray-400/10 hover:bg-gray-400/20 rounded-lg border border-gray-400/20 transition-all"
                        aria-label="View source on GitHub"
                      >
                        <svg
                          className="w-3 h-3"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            fillRule="evenodd"
                            d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482C19.138 20.197 22 16.442 22 12.017 22 6.484 17.522 2 12 2z"
                            clipRule="evenodd"
                          />
                        </svg>
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
