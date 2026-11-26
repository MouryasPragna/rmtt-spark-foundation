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

Upload the contents of `dist/` to your static host. No backend is required.

The build writes one pre-rendered HTML file per page (`dist/about.html`, `dist/products/pcd.html`, …), so each URL is a real path that search engines can index. The host must serve `/about` from `about.html` (Cloudflare Pages, Netlify and GitHub Pages do this by default) and use `404.html` for unknown URLs. Old `/#/` links are redirected to the real path in the browser.

`dist/_headers` carries the security headers (Content-Security-Policy, Permissions-Policy, HSTS and others) for hosts that read it, such as Cloudflare Pages and Netlify. On a host that ignores it, set the same headers in the host's configuration or put Cloudflare in front of the site. Check the live site at securityheaders.com after deploying.

Set `VITE_SITE_URL` to the public domain before building so canonical URLs, the sitemap, robots.txt and structured data use it. To serve from a sub-path (for example a GitHub Pages project site), also set `VITE_BASE=/repo-name/`.

## Checks

```sh
npm run lint
bun test src/lib/siteConfig.test.js
```

The contact-details test requires Bun.
