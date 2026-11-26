import { products } from '../data/products';
import { categories } from '../pages/productsData';

/**
 * Every public, indexable page. The sitemap and the build-time pre-render both use
 * this list, so a page can't be in one and missing from the other.
 * Hidden sections (Applications, News, retired PCD families) are deliberately absent.
 */
export function publicRoutes(): string[] {
  const fixed = ['/', '/about', '/products', '/services', '/contact', '/privacy', '/terms', '/products/pcd/pcd-tooling', '/products/pcd/pcd-technology'];
  return [...new Set([
    ...fixed,
    ...categories.flatMap(category => category.id === 'pcd' ? [`/products/${category.id}`] : [
      `/products/${category.id}`,
      ...category.subcategories.map(family => `/products/${category.id}/${family.id}`),
    ]),
    ...products.filter(product => product.category !== 'pcd').map(product => `/products/${product.slug}`),
  ])];
}
