import { routes } from '@/config/site.config'
import { useDocumentMeta } from '@/hooks/useDocumentMeta'
import { Button, Container, Icon } from '@/components/ui'

export default function NotFoundPage() {
  useDocumentMeta('Lost in space')

  return (
    <Container className="flex min-h-[80svh] flex-col items-center justify-center gap-6 text-center">
      <p className="eyebrow">Signal lost</p>

      <p className="font-display gradient-text text-7xl font-extrabold sm:text-9xl">404</p>

      <div className="flex flex-col gap-2">
        <h1 className="font-display text-2xl font-bold tracking-tight sm:text-3xl">
          Nothing at these coordinates
        </h1>
        <p className="text-muted">The link may be broken, or the page may have moved.</p>
      </div>

      <div className="mt-2 flex flex-wrap justify-center gap-3">
        <Button to={routes.home} leadingIcon={<Icon name="arrowLeft" />}>
          Back home
        </Button>
        <Button to={routes.projects} variant="secondary">
          Browse projects
        </Button>
      </div>
    </Container>
  )
}
