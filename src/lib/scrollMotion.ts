/**
 * Site-wide scroll motion (website build standards, "Motion & scroll"):
 * - Section headings, single blocks and closing bands fade in with a 16px rise (600ms, once).
 * - Card groups reveal their children one after another, 90ms apart (at most four steps).
 * - Lazy images fade in when they finish loading instead of popping in.
 *
 * Elements are tagged here, client-side, after hydration — never in the markup — so the
 * pre-rendered HTML stays fully visible without JavaScript. Anything already on screen when
 * it is tagged is marked shown straight away, so nothing above the fold flickers. Visitors who
 * ask for reduced motion get no hiding and no transitions at all.
 *
 * Opt-in is by selector (below) rather than per-page wiring, so a new page that uses the shared
 * section heading or one of these grids gets the same motion for free.
 */

/** Blocks that reveal as one piece. */
const SINGLE = [
  '.section-heading',
  'h2.section-heading-title',
  '[class*="_ctaSection_"] > .container',
  '[class*="_ctaInner_"]',
  '[class*="_bottomCta_"]',
  '[class*="_philosophyQuote_"]',
  '[class*="_locationGrid_"]',
  '[class*="_timeline_"]',
  '[class*="_techLeft_"]',
].map(s => `#main-content ${s}`).join(',');

/** Groups whose direct children reveal in sequence. */
const GROUP = [
  'factsGrid', 'missionVisionGrid', 'principlesGrid', 'valuesGrid',
  'contactCards', 'nextSteps',
  'industryTags', 'prodGrid', 'svcGrid', 'techRight',
  'solutionTiles', 'familiesGrid', 'capGrid', 'productCards', 'figures',
  'servicesGrid', 'processSteps', 'machinesGrid',
].map(name => `#main-content [class*="_${name}_"]`).join(',');

/** How long to keep the transition rules after a reveal, so card hover transitions take over. */
const SETTLE_MS = 1200;

export function startScrollMotion(): () => void {
  const main = document.getElementById('main-content');
  if (!main || typeof IntersectionObserver === 'undefined') return () => {};
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return () => {};

  const timers = new Set<number>();
  const settle = (el: HTMLElement, attr: 'reveal' | 'revealGroup') => {
    const id = window.setTimeout(() => { el.dataset[attr] = 'done'; timers.delete(id); }, SETTLE_MS);
    timers.add(id);
  };

  const io = new IntersectionObserver(entries => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      const el = entry.target as HTMLElement;
      io.unobserve(el);
      const attr = el.dataset.revealGroup !== undefined ? 'revealGroup' : 'reveal';
      el.dataset[attr] = 'in';
      settle(el, attr);
    }
  }, { rootMargin: '0px 0px -40px 0px', threshold: 0 });

  const onScreen = (el: Element) => el.getBoundingClientRect().top < window.innerHeight;

  const tag = (el: HTMLElement, attr: 'reveal' | 'revealGroup') => {
    if (el.dataset.reveal !== undefined || el.dataset.revealGroup !== undefined) return;
    // A block inside a group (e.g. a heading in a revealing card) moves with its group.
    if (attr === 'reveal' && el.closest('[data-reveal-group]')) return;
    if (onScreen(el)) { el.dataset[attr] = 'done'; return; }
    el.dataset[attr] = 'hidden';
    io.observe(el);
  };

  const fadeImage = (img: HTMLImageElement) => {
    if (img.dataset.img !== undefined || img.complete || img.fetchPriority === 'high') return;
    img.dataset.img = 'loading';
    const done = () => { img.dataset.img = 'loaded'; };
    img.addEventListener('load', done, { once: true });
    img.addEventListener('error', done, { once: true });
  };

  const scan = () => {
    main.querySelectorAll<HTMLElement>(GROUP).forEach(el => tag(el, 'revealGroup'));
    main.querySelectorAll<HTMLElement>(SINGLE).forEach(el => tag(el, 'reveal'));
    main.querySelectorAll<HTMLImageElement>('img[loading="lazy"]').forEach(fadeImage);
  };

  // Routes load lazily and swap content, so rescan whenever #main-content changes.
  let frame = 0;
  const mo = new MutationObserver(() => {
    if (frame) return;
    frame = requestAnimationFrame(() => { frame = 0; scan(); });
  });
  mo.observe(main, { childList: true, subtree: true });
  scan();

  return () => {
    mo.disconnect();
    io.disconnect();
    if (frame) cancelAnimationFrame(frame);
    timers.forEach(id => clearTimeout(id));
  };
}
