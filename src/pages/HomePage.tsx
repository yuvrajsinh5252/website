import { siteConfig } from '@/config/site.config'
import { useDocumentMeta } from '@/hooks/useDocumentMeta'
import { About, Hero, Work } from '@/components/sections'

export default function HomePage() {
  useDocumentMeta(undefined, siteConfig.description)

  return (
    <>
      <Hero />
      <About />
      <Work />
    </>
  )
}
