import { PROJECTS } from "@/config/project";
import PageHeader from "@/components/ui/page-header";
import { ProjectsList } from "@/components/project/project-card";
import { Seo } from "@/lib/seo";
import { siteConfig } from "@/config/site";

export function ProjectsPage() {
  return (
    <div className="min-h-screen">
      <Seo
        title="Projects"
        description="My projects that showcase my work and skills."
        canonical={`${siteConfig.url}/projects`}
      />
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
