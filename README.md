# RMTT website

## Requirements

- Node.js 22.12 or later (required by Vite 8)
- npm

## Install and run

```sh
npm ci
npm run dev
```

Open the local address printed by Vite.

## Production build

```sh
npm run build
npm run preview
```

The build checks TypeScript and writes the static site to `dist/`. Preview serves that production output locally.

## Static hosting

Upload the contents of `dist/` to your static host. The site uses hash-based navigation, so server-side route rewrites are not required. No backend is required.

## Checks

```sh
npm run lint
bun test src/lib/siteConfig.test.js
```

The contact-details test requires Bun.
