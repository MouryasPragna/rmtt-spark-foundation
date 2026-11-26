/* eslint-disable react-refresh/only-export-components -- build-time server entry, never hot-reloaded */
// Build-time renderer used only by scripts/prerender.ts (never shipped to the browser).
import { StrictMode } from 'react';
import { prerender } from 'react-dom/static';
import { StaticRouter } from 'react-router-dom';
import { AppShell } from './App';
export { getRouteMeta, canonicalUrl, localBusinessJsonLd, SITE_NAME } from './lib/routeMeta';
export { publicRoutes } from './lib/publicRoutes';

const tree = (url: string) => (
  <StrictMode>
    <StaticRouter location={url}>
      <AppShell />
    </StaticRouter>
  </StrictMode>
);

/** Renders one route to complete HTML.
 *  The first pass loads the route's lazy page modules; the second renders with them ready,
 *  so the content is written in place rather than behind a "Loading…" fallback. */
export async function render(url: string): Promise<string> {
  // progressiveChunkSize: never move a large finished section out of place for streaming;
  // a static file should read top to bottom without scripts.
  const options = { progressiveChunkSize: Number.MAX_SAFE_INTEGER };
  await new Response((await prerender(tree(url), options)).prelude).text();
  const { prelude } = await prerender(tree(url), options);
  const html = await new Response(prelude).text();
  if (html.includes('route-loading')) throw new Error(`prerender: ${url} still rendered its loading fallback`);
  return html;
}
