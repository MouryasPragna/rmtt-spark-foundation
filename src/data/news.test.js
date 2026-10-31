import { expect, test } from 'bun:test';
import { readFileSync } from 'node:fs';
import { news, publishedNews, getLatestNews, getNewsById } from './news';
import { formatNewsDate, newsImageUrl } from '../lib/news';
import { siteConfig } from '../lib/siteConfig';
import brazedTslot from '../assets/home-brazed-tslot.webp.asset.json';

test('eight articles are published, including the VOLLMER post', () => {
  expect(publishedNews.length).toBe(8);
  expect(getNewsById('vollmer-edm-welcome')?.image?.src).toBe('/images/news/vollmer-edm.webp');
  expect(news.every(item => item.published)).toBe(true);
});
test('latest news returns the three newest published items', () => {
  expect(getLatestNews(3).map(item => item.date)).toEqual(['2026-10-10', '2026-09-22', '2026-08-28']);
});
test('dates format like "10 Oct 2026"', () => {
  expect(formatNewsDate('2026-10-10')).toBe('10 Oct 2026');
  expect(formatNewsDate('2026-09-22')).toBe('22 Sep 2026');
  expect(formatNewsDate('2026-02-30')).toBeUndefined();
});
test('only local news images resolve', () => {
  expect(newsImageUrl('/images/news/pcd-reamers.webp')).toBe('/images/news/pcd-reamers.webp');
  for (const path of ['https://example.com/a.webp', '/images/news/../a.webp', '/images/a.webp', undefined]) expect(newsImageUrl(path)).toBeUndefined();
});
test('the T-slot article uses the verified company T-slot photograph', () => {
  expect(getNewsById('brazed-carbide-t-slot-cutters')?.image?.src).toBe(brazedTslot.url);
  expect(newsImageUrl(brazedTslot.url)).toBe(brazedTslot.url);
  expect(newsImageUrl('/__l5e/assets-v1/unapproved/photo.webp')).toBeUndefined();
});
test('article bodies do not repeat the shared call-to-action paragraph', () => {
  const cta = 'Need a custom tool for your application?';
  for (const item of news) {
    const hits = item.body.filter(block => (block.type !== 'ul' ? block.text : block.items.join(' ')).includes(cta));
    expect(hits).toEqual([]);
  }
});
test('sitemap lists every published article and not the held one, on the site domain', () => {
  const xml = readFileSync(new URL('../../public/sitemap.xml', import.meta.url), 'utf8');
  for (const item of publishedNews) expect(xml).toContain(`${siteConfig.siteUrl}/#/news/${item.id}`);
  expect(xml).toContain(`${siteConfig.siteUrl}/#/news</loc>`);
  expect(xml).toContain('vollmer-edm-welcome');
  expect(xml).not.toContain('example.com');
});
