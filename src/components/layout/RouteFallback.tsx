import { Container } from '@/components/ui'

/** Shown while a lazily-loaded route chunk is fetched. */
export function RouteFallback() {
  return (
    <Container className="flex min-h-[60svh] items-center justify-center">
      <span className="sr-only">Loading</span>
      <span
        aria-hidden="true"
        className="size-8 animate-spin rounded-full border-2 border-border border-t-accent"
      />
    </Container>
  )
}
