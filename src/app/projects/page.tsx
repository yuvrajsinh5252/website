import { PROJECTS } from "@/config/project";
import PageHeader from "@/components/ui/page-header";
import { createSEO } from "@/lib/seo";
import { siteConfig } from "@/config/site";
import { ProjectsList } from "@/components/ui/project-card";

export const metadata = createSEO({
  title: "Projects",
  description: "My Projects that showcase my work and skills.",
  canonical: `${siteConfig.url}/projects`,
});

export default function Projects() {
  return (
    <div className="min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8 pt-32 sm:pt-36 md:pt-44 pb-16 sm:pb-20">
        <PageHeader
          title="Projects"
          description="Projects exploring different technologies and solving real-world problems."
        />
        <ProjectsList projects={PROJECTS} />
      </div>
    </div>
  );
}
