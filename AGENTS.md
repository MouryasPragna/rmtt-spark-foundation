# Project decisions
- Keep product records, searchable model examples and example drawings in `src/data/products.ts`, category presentation in `src/pages/productsData.tsx` and media in checked-in asset pointers; label example geometry separately from range specifications. Share the catalogue pointer through siteConfig so all downloads serve the same edition.
- Define shared contact details, including WhatsApp, in `src/lib/siteConfig.ts` and import them wherever contact links render to prevent inconsistent destinations.
- Render privacy and terms routes through the shared LegalPage with existing page styles to keep legal placeholders consistent without redesigning the site.
- Store approved legal sections in `src/data/legal.ts`; empty arrays render a contact placeholder so legal copy is never fabricated.
- Use the shared NotFound page for unmatched application and catalogue routes so recovery links and page titles agree.
- Use the inherited `--focus-outline` token or `data-focus-surface` for dark focus contexts so CSS Modules share one focus-ring rule.
- Keep optional leadership and customer sections gated by their typed arrays in src/data so empty client data never renders fabricated profiles or logos.
- Share the industry options and icons through src/data/industries.ts across Home, Contact and catalogue filters; keep product industry assignments source-backed rather than inferred from company sectors.
- Leadership profiles omit biographies, hide blank roles and render initials for missing portraits so approved names can appear without invented titles or images.
- Use the shared PhotoPlaceholder for missing real photos so neutral icon panels replace stock imagery consistently.
- Keep equipment definitions in src/data/equipment.ts with page-specific summaries so Home, About and Technology share one inventory without changing their copy.
- Define category colours only in src/index.css and reference category tokens from shared catalog data and application pages so product technologies remain visually consistent.
- Use index.css and CSS Modules only; unused shadcn scaffolding is removed to keep the static site dependency surface minimal.

- Retain HashRouter for refresh-safe static hosting; resolve category IDs and product slugs through the shared product route to preserve existing links.
- Keep quote selections in QuoteContext with guarded localStorage persistence because RFQ drafts must survive reloads without a backend.
- Preserve the quote context identity through Vite hot-update data so mounted providers and refreshed consumers cannot diverge during preview updates.
- Validate quote fields and attachments in src/lib/rfq.ts and call its single submitRfq boundary; future delivery connects here without changing the form.
- Apply client-side route titles and descriptions through RouteMeta and useDocumentMeta; static social previews remain sitewide.
- Keep one focusable main landmark around route content and lazy-load all non-Home pages so navigation stays accessible and the initial bundle stays lean.
- Use the shared carousel playback hook so every timer respects reduced motion, focus, touch and explicit pause.
- Serve Source Sans 3 through Fontsource with swap, avoiding third-party font requests on static hosting.
- Allow the resolved dependency directory in Vite's development file serving so symlinked Fontsource assets load in the preview.
- Keep news content in `src/data/news.ts` (supplied file, only `published` items render) with presentation helpers in `src/lib/news.ts`; regenerate `public/sitemap.xml` with `bun scripts/sitemap.ts` from `siteConfig.siteUrl` so held articles never leak into routes or the sitemap.
- Generate `public/rss.xml` during both build modes from published news; share links use the configured public HashRouter article URL, and RSS omits unconfirmed publication dates so subscriptions never expose held posts or fabricated dates.

- Category photographs and verified matching product/news entries use optimized client-source asset pointers; preserve complete tool geometry and distinguish pictured examples from the broader range. Cards share ZoomImage and the Lightbox, with image inspection separate from detail navigation so zoom is available consistently without nested controls.
