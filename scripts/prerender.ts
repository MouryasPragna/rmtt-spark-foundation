// Writes one complete HTML file per public page into dist/ so crawlers and first visits get real
// content, the right title, description and canonical URL, and LocalBusiness structured data.
// Runs after `vite build` and `vite build --ssr`; see the "build" script in package.json.
import { readFileSync, writeFileSync, mkdirSync, rmSync, readdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const dist = join(root, 'dist');
const ssrEntry = join(root, 'dist-ssr', 'entry-server.js');
const { render, getRouteMeta, canonicalUrl, localBusinessJsonLd, publicRoutes, SITE_NAME } = await import(pathToFileURL(ssrEntry).href);

const builtTemplate = readFileSync(join(dist, 'index.html'), 'utf8');

// Preload the three Latin Poppins files used above the fold, so text renders in the real font
// sooner (together with the metric-matched fallback in index.css this removes the layout shift
// when the font swaps in). Hashed names are read from the build output; the URL prefix is taken
// from the stylesheet link so it follows the configured base path.
const cssHref = /<link rel="stylesheet"[^>]*href="([^"]*\/assets\/)[^"]+\.css"/.exec(builtTemplate)?.[1];
const fontPreloads = cssHref
  ? readdirSync(join(dist, 'assets'))
    .filter(name => /^poppins-latin-(400|600|700)-normal-[\w-]+\.woff2$/.test(name))
    .map(name => `<link rel="preload" href="${cssHref}${name}" as="font" type="font/woff2" crossorigin>`)
    .join('\n    ')
  : '';
const template = fontPreloads ? builtTemplate.replace('</head>', `    ${fontPreloads}\n  </head>`) : builtTemplate;
const attr = (value: string) => value.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
// JSON inside <script> must not be able to close the tag.
const jsonLd = JSON.stringify(localBusinessJsonLd()).replace(/</g, '\\u003c');

function setTag(html: string, pattern: RegExp, tag: string): string {
  if (!pattern.test(html)) throw new Error(`prerender: index.html is missing ${pattern}`);
  return html.replace(pattern, tag);
}

function page(path: string, body: string, options: { noindex?: boolean } = {}): string {
  const { title, description } = getRouteMeta(path);
  const fullTitle = attr(`${title} | ${SITE_NAME}`);
  const desc = attr(description);
  const url = attr(canonicalUrl(path));
  let html = template;
  html = setTag(html, /<title>[\s\S]*?<\/title>/, `<title>${fullTitle}</title>`);
  html = setTag(html, /<meta name="description"[^>]*>/, `<meta name="description" content="${desc}">`);
  html = setTag(html, /<meta property="og:title"[^>]*>/, `<meta property="og:title" content="${fullTitle}">`);
  html = setTag(html, /<meta name="twitter:title"[^>]*>/, `<meta name="twitter:title" content="${fullTitle}">`);
  html = setTag(html, /<meta property="og:description"[^>]*>/, `<meta property="og:description" content="${desc}">`);
  html = setTag(html, /<meta name="twitter:description"[^>]*>/, `<meta name="twitter:description" content="${desc}">`);
  const head = options.noindex
    ? `<meta name="robots" content="noindex">\n`
    : `<link rel="canonical" href="${url}">\n    <meta property="og:url" content="${url}">\n    <script type="application/ld+json">${jsonLd}</script>\n`;
  html = setTag(html, /<\/head>/, `    ${head}  </head>`);
  html = setTag(html, /<div id="root"><\/div>/, `<div id="root" data-prerendered-path="${attr(path)}">${body}</div>`);
  return html;
}

// "/about" -> dist/about.html; static hosts (Cloudflare Pages, Netlify, GitHub Pages) serve it at /about.
const fileFor = (path: string) => path === '/' ? join(dist, 'index.html') : join(dist, `${path.slice(1)}.html`);

const routes: string[] = publicRoutes();
for (const path of routes) {
  const html = page(path, await render(path));
  const file = fileFor(path);
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, html);
}
// Unknown URLs: hosts that support a custom 404 page serve this with a 404 status.
writeFileSync(join(dist, '404.html'), page('/404', await render('/404'), { noindex: true }));

rmSync(join(root, 'dist-ssr'), { recursive: true, force: true });
console.log(`prerender: wrote ${routes.length} pages and 404.html`);
