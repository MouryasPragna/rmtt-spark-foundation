import { expect, test } from 'bun:test';
import { news } from '../data/news';
import { articleUrl, newsShareLinks } from './newsSharing';
import { generateNewsRss } from './rss';

test('share destinations preserve the full static article URL', () => {
  const links = newsShareLinks('vollmer-edm-welcome', 'VOLLMER & RMTT');
  expect(articleUrl('vollmer-edm-welcome')).toBe('https://ck9819.github.io/rmtt-website/#/news/vollmer-edm-welcome');
  expect(new URL(links.linkedin).searchParams.get('url')).toBe(links.url);
  expect(new URL(links.whatsapp).searchParams.get('text')).toBe(`VOLLMER & RMTT ${links.url}`);
});
test('RSS excludes held articles and escapes supplied text', () => {
  const sample = { ...news[0], title: 'Tools & <precision>', published: true };
  const feed = generateNewsRss([sample, { ...sample, id: 'held', published: false }]);
  expect(feed).toContain('<title>Tools &amp; &lt;precision&gt;</title>');
  expect(feed).not.toContain('/news/held');
  expect(feed).toContain('<pubDate>Sat, 10 Oct 2026 00:00:00 GMT</pubDate>');
});
test('RSS omits the unconfirmed VOLLMER publication date', () => {
  const item = news.find(item => item.id === 'vollmer-edm-welcome');
  expect(item).toBeDefined();
  const feed = generateNewsRss(item ? [item] : []);
  expect(feed).toContain('/news/vollmer-edm-welcome');
  expect(feed).not.toContain('<pubDate>');
});