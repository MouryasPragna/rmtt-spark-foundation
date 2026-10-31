import type { NewsItem } from '../data/news';
import { articleUrl, rssUrl } from './newsSharing';
import { siteConfig } from './siteConfig';
import { formatNewsDate } from './news';

const xml = (value: string) => value.replace(/[<>&"']/g, char => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', '"': '&quot;', "'": '&apos;' })[char] || char);

export function generateNewsRss(items: NewsItem[]): string {
  const published = items.filter(item => item.published).sort((a, b) => b.date.localeCompare(a.date));
  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
<channel>
<title>RMTT News &amp; Articles</title>
<link>${xml(`${siteConfig.siteUrl}/#/news`)}</link>
<description>News and articles from Riddhi Machine Tool Technology.</description>
<language>en-in</language>
<atom:link href="${xml(rssUrl)}" rel="self" type="application/rss+xml" />
${published.map(item => {
  const url = xml(articleUrl(item.id));
  // The VOLLMER item's stored date is a placeholder, not an approved publication date.
  const date = item.id !== 'vollmer-edm-welcome' && formatNewsDate(item.date)
    ? `<pubDate>${new Date(`${item.date}T00:00:00Z`).toUTCString()}</pubDate>` : '';
  return `<item><title>${xml(item.title)}</title><link>${url}</link><guid isPermaLink="true">${url}</guid><description>${xml(item.summary)}</description><category>${xml(item.category)}</category>${date}</item>`;
}).join('\n')}
</channel>
</rss>
`;
}