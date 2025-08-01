import { Metadata } from "next";
import ProjectsPage from "@/components/projects/projects-page";

export const metadata: Metadata = {
  title: "Yuvrajsinh Gohil Projects",
  description: "Projects portfolio by Yuvrajsinh Gohil - web development, full-stack applications, and software engineering projects.",
  keywords: ["Yuvrajsinh Gohil projects", "Yuvrajsinh Gohil portfolio", "web development projects", "software engineer projects"],
};

export default function Projects() {
  return <ProjectsPage />;
}