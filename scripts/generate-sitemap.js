// Regenerates public/sitemap.xml from the routes defined in src/App.jsx and
// the project slugs in src/data/projects.js. Run automatically as a prebuild
// step (see package.json) so the sitemap can't drift from the real routes.
//
// projects.js imports image/video assets directly, which only resolve inside
// Vite's module graph — so rather than importing it as a module here, we
// just read the file as text and pull out the slugs.

import { readFileSync, writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import path from 'node:path'

const rootDir = path.dirname(path.dirname(fileURLToPath(import.meta.url)))
const SITE_URL = 'https://dypeacock.github.io'

const projectsSource = readFileSync(
  path.join(rootDir, 'src/data/projects.js'),
  'utf-8'
)
const slugs = [...projectsSource.matchAll(/slug:\s*'([^']+)'/g)].map(
  (match) => match[1]
)

if (slugs.length === 0) {
  throw new Error('generate-sitemap: found no project slugs, aborting')
}

const staticRoutes = ['/', '/work']
const projectRoutes = slugs.map((slug) => `/work/${slug}`)
const routes = [...staticRoutes, ...projectRoutes]

const lastmod = new Date().toISOString().slice(0, 10)

const urlEntries = routes
  .map(
    (route) => `  <url>
    <loc>${SITE_URL}${route}</loc>
    <lastmod>${lastmod}</lastmod>
  </url>`
  )
  .join('\n')

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlEntries}
</urlset>
`

writeFileSync(path.join(rootDir, 'public/sitemap.xml'), sitemap)
console.log(`generate-sitemap: wrote ${routes.length} URLs to public/sitemap.xml`)
