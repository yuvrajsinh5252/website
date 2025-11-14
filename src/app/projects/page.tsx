import { PROJECTS } from "@/config/project";
import PageHeader from "@/components/ui/page-header";
import { createSEO } from "@/lib/seo";
import { ProjectCard } from "@/components/ui/project-card";

export const metadata = createSEO({
  title: "Projects",
  description: "My Projects that showcase my work and skills.",
});

export default function Projects() {
  return (
    <div className="min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8 pt-32 sm:pt-36 md:pt-44 pb-16 sm:pb-20">
        <PageHeader
          title="Projects"
          description="Projects exploring different technologies and solving real-world problems."
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
          {PROJECTS.map((project) => (
            <ProjectCard key={project.title} project={project} />
          ))}
        </div>

        {PROJECTS.length === 0 && (
          <div className="text-center py-16 sm:py-20">
            <p className="text-gray-400 text-base sm:text-lg">
              No projects yet. Check back soon!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
