import { fileURLToPath, URL } from 'node:url'
import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { posts } from './src/data/posts.ts'
import { projects } from './src/data/projects.ts'
import { siteConfig } from './src/config/site.config.ts'

/**
 * Emits `sitemap.xml` from the content itself.
 *
 * Generated rather than checked in so it cannot drift: adding a project or a
 * post puts it in the sitemap on the next build. The data modules import only
 * types, so they load here without pulling any browser code into the config.
 */
function sitemap(): Plugin {
  return {
    name: 'sitemap',
    apply: 'build',
    generateBundle() {
      const entries: { path: string; lastmod?: string }[] = [
        { path: '/' },
        { path: '/experience' },
        { path: '/projects' },
        { path: '/posts' },
        ...projects.map((project) => ({
          path: `/projects/${project.slug}`,
          lastmod: project.createdAt,
        })),
        ...posts.map((post) => ({
          path: `/posts/${post.slug}`,
          lastmod: post.date,
        })),
      ]

      const urls = entries
        .map(({ path, lastmod }) => {
          const loc = new URL(path, siteConfig.url).href
          const stamp = lastmod ? `\n    <lastmod>${lastmod}</lastmod>` : ''
          return `  <url>\n    <loc>${loc}</loc>${stamp}\n  </url>`
        })
        .join('\n')

      this.emitFile({
        type: 'asset',
        fileName: 'sitemap.xml',
        source: `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
      })
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), sitemap()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  build: {
    target: 'es2023',
  },
})
