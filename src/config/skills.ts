import { IconType } from "react-icons";
import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiJavascript,
  SiTailwindcss,
  SiNodedotjs,
  SiPython,
  SiDocker,
  SiPostgresql,
  SiMongodb,
  SiGit,
  SiLinux,
  SiCplusplus,
  SiRust,
  SiApachespark,
} from "react-icons/si";
import { FaJava, FaRobot, FaProjectDiagram, FaMicrosoft } from "react-icons/fa";
import { VscAzure } from "react-icons/vsc";

export type Skill = {
  name: string;
  color: string;
  border: string;
  url: string;
  icon?: IconType;
};

export const SKILLS: Skill[] = [
  {
    name: "React",
    color: "from-blue-500/10 to-cyan-500/50",
    border: "border-blue-400/60",
    url: "https://react.dev/",
    icon: SiReact,
  },
  {
    name: "Next.js",
    color: "from-gray-500/10 to-slate-500/50",
    border: "border-gray-400/60",
    url: "https://nextjs.org/",
    icon: SiNextdotjs,
  },
  {
    name: "TypeScript",
    color: "from-blue-600/10 to-indigo-500/50",
    border: "border-blue-500/60",
    url: "https://www.typescriptlang.org/",
    icon: SiTypescript,
  },
  {
    name: "JavaScript",
    color: "from-yellow-500/10 to-amber-500/50",
    border: "border-yellow-400/60",
    url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
    icon: SiJavascript,
  },
  {
    name: "Tailwind CSS",
    color: "from-teal-500/10 to-cyan-500/50",
    border: "border-teal-400/60",
    url: "https://tailwindcss.com/",
    icon: SiTailwindcss,
  },
  {
    name: "Node.js",
    color: "from-green-600/10 to-emerald-500/50",
    border: "border-green-400/60",
    url: "https://nodejs.org/",
    icon: SiNodedotjs,
  },
  {
    name: "Python",
    color: "from-yellow-600/10 to-blue-500/50",
    border: "border-yellow-500/60",
    url: "https://www.python.org/",
    icon: SiPython,
  },
  {
    name: "Docker",
    color: "from-blue-500/10 to-sky-500/50",
    border: "border-blue-400/60",
    url: "https://www.docker.com/",
    icon: SiDocker,
  },
  {
    name: "LangGraph",
    color: "from-purple-500/10 to-pink-500/50",
    border: "border-purple-400/60",
    url: "https://langchain-ai.github.io/langgraph/",
    icon: FaProjectDiagram,
  },
  {
    name: "PostgreSQL",
    color: "from-blue-700/10 to-indigo-600/50",
    border: "border-blue-600/60",
    url: "https://www.postgresql.org/",
    icon: SiPostgresql,
  },
  {
    name: "MongoDB",
    color: "from-green-700/10 to-emerald-600/50",
    border: "border-green-500/60",
    url: "https://www.mongodb.com/",
    icon: SiMongodb,
  },
  {
    name: "Git",
    color: "from-orange-600/10 to-red-500/50",
    border: "border-orange-400/60",
    url: "https://git-scm.com/",
    icon: SiGit,
  },
  {
    name: "Linux",
    color: "from-yellow-500/10 to-orange-500/50",
    border: "border-yellow-400/60",
    url: "https://www.linux.org/",
    icon: SiLinux,
  },
  {
    name: "C++",
    color: "from-blue-600/10 to-purple-600/50",
    border: "border-blue-500/60",
    url: "https://isocpp.org/",
    icon: SiCplusplus,
  },
  {
    name: "Rust",
    color: "from-orange-700/10 to-red-600/50",
    border: "border-orange-500/60",
    url: "https://www.rust-lang.org/",
    icon: SiRust,
  },
  {
    name: "Java",
    color: "from-red-600/10 to-orange-600/50",
    border: "border-red-500/60",
    url: "https://www.java.com/",
    icon: FaJava,
  },
  {
    name: "DSPy",
    color: "from-orange-500/10 to-yellow-500/50",
    border: "border-orange-400/60",
    url: "https://dspy.ai/",
    icon: FaRobot,
  },
  {
    name: "Microsoft Azure",
    color: "from-blue-600/10 to-blue-400/50",
    border: "border-blue-500/60",
    url: "https://azure.microsoft.com/",
    icon: VscAzure,
  },
  {
    name: "Microsoft Fabric",
    color: "from-cyan-600/10 to-blue-500/50",
    border: "border-cyan-500/60",
    url: "https://www.microsoft.com/en-us/microsoft-fabric",
    icon: FaMicrosoft,
  },
  {
    name: "PySpark",
    color: "from-orange-600/10 to-yellow-500/50",
    border: "border-orange-500/60",
    url: "https://spark.apache.org/docs/latest/api/python/",
    icon: SiApachespark,
  },
];
