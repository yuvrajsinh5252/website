import { RouterProvider } from 'react-router'
import { AppProviders } from '@/providers/AppProviders'
import { router } from '@/routes/router'

export default function App() {
  return (
    <AppProviders>
      <RouterProvider router={router} />
    </AppProviders>
  )
}
