# AURA Thermal House — Vercel Lenis Build

Upload/replace these files in GitHub. Vercel will install dependencies automatically from `package.json` and deploy the site.

## Important

Do **not** upload `node_modules`. Do **not** upload `dist`.

## Files

- `src/App.jsx`
- `src/App.css`
- `src/main.jsx`
- `public/assets/*.svg`
- `index.html`
- `package.json`
- `.gitignore`

## Smooth Scroll

Lenis is imported from the npm package:

```js
import Lenis from 'lenis';
```

So it works on GitHub/Vercel builds without a CDN import.
