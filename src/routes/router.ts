import { createBrowserRouter, type RouteObject } from 'react-router'
import { RootLayout, RouteFallback } from '@/components/layout'
import HomePage from '@/pages/HomePage'
import ErrorPage from '@/pages/ErrorPage'

/**
 * Development routes for logo lab testing and experimentation.
 */
const devRoutes: RouteObject[] =
  (import.meta.env.VITE_DEV_TOOLS !== undefined
    ? import.meta.env.VITE_DEV_TOOLS === 'true'
    : import.meta.env.DEV)
    ? [
        {
          path: 'logo-lab',
          lazy: async () => ({
            Component: (await import('@/pages/LogoLabPage')).default,
          }),
        },
      ]
    : []


/**
 * Route table.
 *
 * The landing page ships in the main bundle; every other route is code-split
 * via `lazy` so the first paint stays small.
 */
export const router = createBrowserRouter([
  {
    path: '/',
    Component: RootLayout,
    ErrorBoundary: ErrorPage,
    HydrateFallback: RouteFallback,
    children: [
      { index: true, Component: HomePage },
      {
        path: 'experience',
        lazy: async () => ({
          Component: (await import('@/pages/ExperiencePage')).default,
        }),
      },
      {
        path: 'projects',
        lazy: async () => ({
          Component: (await import('@/pages/ProjectsPage')).default,
        }),
      },
      {
        path: 'projects/:slug',
        lazy: async () => ({
          Component: (await import('@/pages/ProjectDetailPage')).default,
        }),
      },
      {
        path: 'posts',
        lazy: async () => ({
          Component: (await import('@/pages/PostsPage')).default,
        }),
      },
      {
        path: 'posts/:slug',
        lazy: async () => ({
          Component: (await import('@/pages/PostDetailPage')).default,
        }),
      },
      ...devRoutes,
      {
        path: '*',
        lazy: async () => ({
          Component: (await import('@/pages/NotFoundPage')).default,
        }),
      },
    ],
  },
])
