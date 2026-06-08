# AURA Wellness Spa — upgraded pack

React/Vite spa landing page with a sharper editorial redesign, Lenis inertia scrolling, hidden scrollbar, treatment filters, favorites, premium private-suite section and animated reveal effects.

## Run locally

```bash
npm install
npm run dev
```

## Deploy on Vercel

Upload/replace these files in your GitHub repo:

- `src/App.jsx`
- `src/App.css`
- `src/main.jsx`
- `public/assets/*.svg`
- `index.html`
- `package.json`
- `.gitignore`
- `README.md`

Do **not** upload `node_modules`. Vercel installs dependencies from `package.json` automatically.

## What changed

- Lenis now imports from the installed package: `import Lenis from 'lenis'`
- Stronger luxury/editorial visual direction
- Smooth momentum scroll and smooth anchor navigation
- Hidden right scrollbar
- Searchable/filterable treatment catalogue
- Favorite buttons on treatment cards
- Uses your uploaded SVG treatment icons from `public/assets`
- Cleaner mobile navigation
- Better CTA/booking section
