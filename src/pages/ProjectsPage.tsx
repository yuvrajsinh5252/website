import { projects } from '@/data'
import { useDocumentMeta } from '@/hooks/useDocumentMeta'
import { Container, SectionHeading } from '@/components/ui'
import { ProjectList } from '@/components/common'

export default function ProjectsPage() {
  useDocumentMeta(
    'Projects',
    'Projects exploring different technologies and solving real-world problems.',
  )

  return (
    <div className="pt-header">
      <Container width="editorial" className="py-20 sm:py-28">
        <SectionHeading
          as="h1"
          title="Projects"
          description="Side projects, tools I needed and built, and a few things I made just to find out how they worked."
          className="mb-14 sm:mb-16"
        />

        <ProjectList projects={projects} />
      </Container>
    </div>
  )
}
