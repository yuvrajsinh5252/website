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
  url: string;
  icon?: IconType;
};

export const SKILLS: Skill[] = [
  { name: "React", url: "https://react.dev/", icon: SiReact },
  { name: "Next.js", url: "https://nextjs.org/", icon: SiNextdotjs },
  {
    name: "TypeScript",
    url: "https://www.typescriptlang.org/",
    icon: SiTypescript,
  },
  {
    name: "JavaScript",
    url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
    icon: SiJavascript,
  },
  {
    name: "Tailwind CSS",
    url: "https://tailwindcss.com/",
    icon: SiTailwindcss,
  },
  { name: "Node.js", url: "https://nodejs.org/", icon: SiNodedotjs },
  { name: "Python", url: "https://www.python.org/", icon: SiPython },
  { name: "Docker", url: "https://www.docker.com/", icon: SiDocker },
  {
    name: "LangGraph",
    url: "https://langchain-ai.github.io/langgraph/",
    icon: FaProjectDiagram,
  },
  {
    name: "PostgreSQL",
    url: "https://www.postgresql.org/",
    icon: SiPostgresql,
  },
  { name: "MongoDB", url: "https://www.mongodb.com/", icon: SiMongodb },
  { name: "Git", url: "https://git-scm.com/", icon: SiGit },
  { name: "Linux", url: "https://www.linux.org/", icon: SiLinux },
  { name: "C++", url: "https://isocpp.org/", icon: SiCplusplus },
  { name: "Rust", url: "https://www.rust-lang.org/", icon: SiRust },
  { name: "Java", url: "https://www.java.com/", icon: FaJava },
  { name: "DSPy", url: "https://dspy.ai/", icon: FaRobot },
  {
    name: "Microsoft Azure",
    url: "https://azure.microsoft.com/",
    icon: VscAzure,
  },
  {
    name: "Microsoft Fabric",
    url: "https://www.microsoft.com/en-us/microsoft-fabric",
    icon: FaMicrosoft,
  },
  {
    name: "PySpark",
    url: "https://spark.apache.org/docs/latest/api/python/",
    icon: SiApachespark,
  },
];
