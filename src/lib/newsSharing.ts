import { siteConfig } from './siteConfig';

// Relative to the running site so the link works on any host or base path.
export const rssUrl = `${import.meta.env?.BASE_URL ?? '/'}rss.xml`;
export function articleUrl(id: string): string {
  return `${siteConfig.siteUrl}/#/news/${encodeURIComponent(id)}`;
}
export function newsShareLinks(id: string, title: string) {
  const url = articleUrl(id);
  return {
    url,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
    whatsapp: `https://wa.me/?text=${encodeURIComponent(`${title} ${url}`)}`,
  };
}