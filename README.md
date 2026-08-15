# Dylan Peacock — Portfolio

A personal portfolio site built with React + Vite. No UI framework — hand-written CSS with a small design token system in `src/index.css`.

## Run locally

```bash
npm install
npm run dev
```

## Build for production

```bash
npm run build
```
Outputs static files to `dist/` — deploy that folder to Vercel, Netlify, GitHub Pages, or any static host.

## Structure

```
src/
  components/   # Hero, About, Flagship, OtherWork, Skills, Contact, Nav
  index.css     # design tokens (colours, type, spacing)
  App.jsx
```

## Editing content

All copy lives directly in the component files (e.g. `src/components/Flagship.jsx` for the two deep-dive projects, `src/components/OtherWork.jsx` for the smaller project grid). No CMS or data file — just edit the arrays at the top of each component.
