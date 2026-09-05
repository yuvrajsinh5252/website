import { isRouteErrorResponse, useRouteError } from 'react-router'
import { routes } from '@/config/site.config'
import { Button, Container, Icon } from '@/components/ui'

/** Rendered when a route throws — keeps the app from blanking out. */
export default function ErrorPage() {
  const error = useRouteError()

  const title = isRouteErrorResponse(error)
    ? `${error.status} ${error.statusText}`
    : 'Something went wrong'

  const detail =
    error instanceof Error
      ? error.message
      : 'An unexpected error occurred while rendering this page.'

  return (
    <Container className="flex min-h-[70svh] flex-col items-center justify-center gap-6 text-center">
      <h1 className="text-3xl font-bold sm:text-4xl">{title}</h1>
      <p className="max-w-md">{detail}</p>

      <Button to={routes.home} leadingIcon={<Icon name="arrowLeft" />}>
        Back home
      </Button>
    </Container>
  )
}
