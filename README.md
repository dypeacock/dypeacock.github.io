# Dylan Peacock — Portfolio

A personal portfolio site built with React + Vite + React Router. Hand-written CSS with a design token system in `src/index.css` (light and dark mode share the same token names, swapped via `[data-theme="dark"]`).

## Run locally

```bash
npm install
npm run dev
```

## Build for production

```bash
npm run build
```
Outputs static files to `dist/`. This repo is a GitHub Pages user site (`dypeacock.github.io`), so `main` should hold the built/deployed output — this `new-website` branch is the React source.

### Deploying to GitHub Pages

Because this is a client-side-routed SPA (React Router) on GitHub Pages, direct links to sub-pages like `/work/pose-estimation` need the `public/404.html` redirect trick already included here — GitHub Pages has no server-side rewrites, so a 404 is caught and bounced back to `index.html`, which restores the real URL before React Router mounts. No extra config needed, it's already wired up in `index.html` + `public/404.html`.

## Structure

```
src/
  components/     # Nav, Hero, About, Flagship, OtherWork, Skills, Contact — shared across pages
  pages/          # Home, ProjectDetail, NotFound — routed via react-router-dom
  data/projects.js  # single source of truth for flagship project content (cards + detail pages)
  context/ThemeContext.jsx  # dark mode state + localStorage persistence
  index.css       # design tokens (colours, type, spacing) for both themes
public/
  404.html        # GitHub Pages SPA routing workaround
  robots.txt
```

## Editing content

- Flagship project case studies (both the homepage cards and the `/work/:slug` detail pages) live in `src/data/projects.js` — edit the `brief` / `process` / `implementation` / `outcome` fields.
- Everything else (About copy, Other Work grid, Skills groups) lives directly in its component file under `src/components/`.
- The About section currently uses `src/assets/portrait.png` as a placeholder for both the hero avatar and the "polaroid" — swap in the scanned graduation photo when it's ready (same file, two places it's imported: `Hero.jsx` and `About.jsx`).

## Known follow-ups (not yet built)

- Hand-drawn nav mark / button elements — deferred, needs source art.
- Contact form as an alternative to `mailto:` — current approach uses a JS-assembled address plus a copy-to-clipboard button, which resists basic scraping without the complexity of a form backend. Revisit if spam becomes an actual problem.
- Sitemap.xml referenced in `robots.txt` isn't generated yet — worth adding once the `/work/:slug` routes are finalised.
