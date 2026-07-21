# Makewell Agri Equipments

Responsive marketing website for **Makewell Agri Equipments** — a forged agricultural hand-tools manufacturer and global exporter based in Himatnagar, Gujarat, India (shovels, axes, mattocks, hoes, spades).

**Live site:** https://vyom1912.github.io/Makewell-Agri-Equipments/

Built with React 19 + Vite, client-side routed with React Router, deployed to GitHub Pages.

---

## Project structure

```
Makewell-Agri-Equipments/
├── public/                 # Static assets copied as-is to the build output
│   ├── favicon.svg
│   └── icons.svg           # Shared SVG icon sprite
├── src/
│   ├── components/         # Reusable UI building blocks (used across pages)
│   │   ├── ArrowIcon.jsx
│   │   ├── CtaStrip.jsx
│   │   ├── Footer.jsx
│   │   ├── Navbar.jsx
│   │   ├── PageHero.jsx
│   │   ├── SectionHead.jsx
│   │   └── Testimonials.jsx
│   ├── hooks/               # Custom React hooks
│   │   ├── useProcessSteps.js
│   │   └── useReveal.js     # Scroll-reveal animation via IntersectionObserver
│   ├── pages/                # One file per route
│   │   ├── Home.jsx
│   │   ├── About.jsx
│   │   ├── Products.jsx
│   │   ├── Company.jsx
│   │   ├── Export.jsx
│   │   ├── Contact.jsx
│   │   └── NotFound.jsx
│   ├── App.jsx               # Router, layout shell, toast + back-to-top state
│   ├── main.jsx               # React entry point
│   └── index.css               # Global styles (design tokens, reset, layout, components)
├── index.html                   # Vite HTML entry
├── vite.config.js                 # Vite config (GitHub Pages base path, SPA fallback)
├── package.json
└── .github/workflows/deploy.yml     # CI: auto-builds and deploys to GitHub Pages on push
```

### Routes

| Path        | Page            |
| ----------- | --------------- |
| `/`         | Home            |
| `/about`    | About           |
| `/products` | Products        |
| `/company`  | Company         |
| `/export`   | Export          |
| `/contact`  | Contact         |
| `*`         | 404 / Not Found |

---

## Getting started

```bash
npm install
npm run dev       # local dev server with hot reload
```

### Build

```bash
npm run build      # outputs production build to dist/
npm run preview    # preview the production build locally
```

### Lint

```bash
npm run lint
```

---

## Deployment (GitHub Pages)

This repo deploys to GitHub Pages from the `Makewell-Agri-Equipments` repository under the
`/Makewell-Agri-Equipments/` base path (already set in `vite.config.js`).

**Automatic (recommended):** every push to `main` triggers `.github/workflows/deploy.yml`,
which builds the app and publishes `dist/` to GitHub Pages automatically. No manual steps needed.

> One-time setup: in the GitHub repo, go to **Settings → Pages → Build and deployment → Source**
> and select **GitHub Actions**.

**Manual (fallback):** you can still deploy directly from your machine at any time:

```bash
npm run build
npm run deploy    # publishes dist/ to the gh-pages branch via the gh-pages package
```

---

## Tech stack

- [React 19](https://react.dev/)
- [React Router 7](https://reactrouter.com/)
- [Vite](https://vite.dev/)
- [oxlint](https://oxc.rs/) for linting
- [gh-pages](https://www.npmjs.com/package/gh-pages) for manual deploys
