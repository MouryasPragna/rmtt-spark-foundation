import { expect, test } from 'bun:test';
import { readFileSync } from 'node:fs';
import { categories } from '../src/pages/productsData';
import { products } from '../src/data/products';
import { publishedNews } from '../src/data/news';
import { siteConfig } from '../src/lib/siteConfig';

test('sitemap covers all current public category, family, product and published article routes', () => {
  const xml = readFileSync(new URL('../public/sitemap.xml', import.meta.url), 'utf8');
  const paths = [...xml.matchAll(/<loc>[^<]*#(\/[^<]*)<\/loc>/g)].map(match => match[1]);
  const expected = [
    '/', '/about', '/products', '/applications', '/services', '/news', '/contact', '/privacy', '/terms',
    ...categories.flatMap(category => [`/products/${category.id}`, ...category.subcategories.map(family => `/products/${category.id}/${family.id}`)]),
    ...products.map(product => `/products/${product.slug}`),
    ...publishedNews.map(item => `/news/${item.id}`),
  ];
  expect(paths.sort()).toEqual([...new Set(expected)].sort());
  expect(paths).toContain('/products/solid-carbide/sc-end-mills');
  expect(paths).toContain('/products/specialized');
  for (const match of xml.matchAll(/<loc>([^<]*)<\/loc>/g)) {
    expect(new URL(match[1]).origin).toBe(new URL(siteConfig.siteUrl).origin);
  }
});