import { expect, test } from 'bun:test';
import { readFileSync } from 'node:fs';
import { categories } from '../src/pages/productsData';
import { products } from '../src/data/products';
import { siteConfig } from '../src/lib/siteConfig';

test('sitemap covers all current public category, family, product and published article routes', () => {
  const xml = readFileSync(new URL('../public/sitemap.xml', import.meta.url), 'utf8');
  const paths = [...xml.matchAll(/<loc>([^<]*)<\/loc>/g)].map(match => new URL(match[1]).pathname);
  expect(xml).not.toContain('/#/');
  const expected = [
    '/', '/about', '/products', '/services', '/contact', '/privacy', '/terms', '/products/pcd/pcd-tooling', '/products/pcd/pcd-technology',
    ...categories.flatMap(category => category.id === 'pcd' ? [`/products/${category.id}`] : [`/products/${category.id}`, ...category.subcategories.map(family => `/products/${category.id}/${family.id}`)]),
    ...products.filter(product => product.category !== 'pcd').map(product => `/products/${product.slug}`),
  ];
  expect(paths.sort()).toEqual([...new Set(expected)].sort());
  expect(paths).toContain('/products/solid-carbide/sc-end-mills');
  expect(paths).toContain('/products/specialized');
  expect(paths).toContain('/products/pcd');
  for (const hidden of ['/applications', '/news', '/products/pcd/pcd-tools', '/products/pcd/pcd-reamers', '/products/pcd/pcd-milling']) expect(paths).not.toContain(hidden);
  expect(paths.some(p => p.startsWith('/news/'))).toBe(false);
  for (const match of xml.matchAll(/<loc>([^<]*)<\/loc>/g)) {
    expect(new URL(match[1]).origin).toBe(new URL(siteConfig.siteUrl).origin);
  }
});

test('robots.txt points crawlers at the sitemap', () => {
  const robots = readFileSync(new URL('../public/robots.txt', import.meta.url), 'utf8');
  expect(robots).toContain(`Sitemap: ${siteConfig.siteUrl}/sitemap.xml`);
});
