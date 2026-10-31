// Presentation helpers for src/data/news.ts (kept separate so the supplied data file stays unedited).
import brazedTslot from '../assets/home-brazed-tslot.webp.asset.json';
const LOCAL_NEWS_IMAGE = /^\/images\/news\/[a-zA-Z0-9_-]+\.(?:webp|png|jpe?g|avif)$/;

/** Resolves local images and explicitly approved checked-in asset pointers only. */
export function newsImageUrl(src?: string): string | undefined {
  if (src === brazedTslot.url) return src;
  return src && LOCAL_NEWS_IMAGE.test(src) ? `${import.meta.env?.BASE_URL || '/'}${src.slice(1)}` : undefined;
}

/** Formats YYYY-MM-DD as "10 Oct 2026"; invalid dates return undefined. */
export function formatNewsDate(date: string): string | undefined {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) return undefined;
  const value = new Date(`${date}T00:00:00Z`);
  if (Number.isNaN(value.getTime()) || value.toISOString().slice(0, 10) !== date) return undefined;
  return new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC' }).format(value).replace('Sept', 'Sep');
}
