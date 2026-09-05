import { profile, projects } from '@/data'
import { useDocumentMeta } from '@/hooks/useDocumentMeta'
import { Container, Icon, SectionHeading } from '@/components/ui'
import { ProjectList } from '@/components/common'

export default function ProjectsPage() {
  useDocumentMeta(
    'Projects',
    'Projects exploring different technologies and solving real-world problems.',
  )

  const github = profile.socials.find((s) => s.id === 'github')

  return (
    <div className="pt-header">
      <Container width="editorial" className="py-20 sm:py-28">
        <SectionHeading
          as="h1"
          title="Projects"
          description="Some of the things I've built, exploring different technologies and solving real-world problems."
          className="mb-14 sm:mb-16"
        />

        <ProjectList projects={projects} />

        {github && (
          <div className="mt-12 flex justify-start">
            <a
              href={github.href}
              target="_blank"
              rel="noreferrer noopener"
              className="focus-ring group inline-flex items-center gap-2 font-medium text-accent transition-colors duration-200 hocus:text-heading"
            >
              <Icon name="github" size={16} />
              <span>More on GitHub</span>
              <Icon
                name="arrowUpRight"
                size={14}
                className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </a>
          </div>
        )}
      </Container>
    </div>
  )
}
