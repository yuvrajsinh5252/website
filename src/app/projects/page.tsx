import ProjectsPage from "@/components/projects/projects-page";
import { createSEO } from "@/lib/seo";

export const metadata = createSEO({
  title: "Projects",
  description: "My Projects that showcase my work and skills.",
});

export default function Projects() {
  return <ProjectsPage />;
}
