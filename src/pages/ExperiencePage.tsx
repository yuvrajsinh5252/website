import { useDocumentMeta } from '@/hooks/useDocumentMeta'
import { ExperienceTimeline } from '@/components/sections'

export default function ExperiencePage() {
  useDocumentMeta('Experience', "Roles and places I've built software.")

  return (
    <div className="pt-header">
      <ExperienceTimeline />
    </div>
  )
}
