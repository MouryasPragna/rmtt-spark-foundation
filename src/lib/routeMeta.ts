import { products } from '../data/products';
import { categories } from '../pages/productsData';
import { getNewsById } from '../data/news';
import { siteConfig } from './siteConfig';

const pages: Record<string, [string, string]> = {
  '/': ['Precision cutting tools', 'Riddhi Machine Tool Technology manufactures solid carbide, PCD and brazed carbide cutting tools in Bengaluru.'],
  '/products': ['Product range', 'Explore solid carbide, PCD, brazed carbide and specialized cutting tools for milling, drilling, reaming and precision boring.'],
  '/products/pcd/pcd-tooling': ['PCD Tools', 'Precision PCD tooling for high-performance aluminium machining, from application-based design to manufacture.'],
  '/products/pcd/pcd-technology': ['PCD Tooling Technology', 'PCD material and manufacturing technology — wire EDM, lapping, grinding, brazing and pocket seats, with the anatomy of an RMTT PCD tool.'],
  '/about': ['About Riddhi', 'Discover Riddhi Machine Tool Technology, our journey and manufacturing equipment.'],
  '/applications': ['Applications', 'Explore cutting tool applications for automotive, aerospace and precision machining.'],
  '/services': ['Technology & services', 'Application engineering, custom solutions and the SAACKE, VOLLMER and Walter Helicheck equipment behind our tools.'],
  '/news': ['News & Articles', 'Company news and technical articles on cutting tools from Riddhi Machine Tool Technology.'],
  '/contact': ['Contact us', 'Contact Riddhi Machine Tool Technology to discuss your tooling requirements and download the product catalogue.'],
  '/privacy': ['Privacy Policy', 'Riddhi Machine Tool Technology privacy policy — client legal copy pending.'],
  '/terms': ['Terms', 'Riddhi Machine Tool Technology terms — client legal copy pending.'],
};

export const SITE_NAME = 'Riddhi Machine Tool Technology';

/** One trailing-slash-free form per page, used for canonical URLs. */
export function normalizePath(pathname: string): string {
  const clean = pathname.replace(/\/+$/, '');
  return clean === '' ? '/' : clean;
}

export function canonicalUrl(pathname: string): string {
  const path = normalizePath(pathname);
  return `${siteConfig.siteUrl}${path === '/' ? '/' : path}`;
}

/** Title and description for a route. Shared by the browser (RouteMeta) and the build-time pre-render. */
export function getRouteMeta(pathname: string): { title: string; description: string } {
  const path = normalizePath(pathname);
  const segments = path.split('/').filter(Boolean);
  const isFamily = /^\/products\/[^/]+\/[^/]+$/.test(path);
  const id = /^\/products\/[^/]+$/.test(path) ? segments[1] : undefined;
  const product = products.find(tool => tool.slug === id);
  const category = categories.find(cat => cat.id === id);
  const article = /^\/news\/[^/]+$/.test(path) ? getNewsById(segments[1]) : undefined;
  const family = isFamily ? categories.find(cat => cat.id === segments[1])?.subcategories.find(sub => sub.id === segments[2]) : undefined;
  const [title, description] = article ? [article.title, article.summary]
    : product ? [product.name, product.description]
    : family ? [family.title, family.blurb]
    : category ? [category.label, category.intro]
    : pages[path] || ['Page not found', 'Explore Riddhi Machine Tool Technology cutting tools.'];
  return { title, description };
}

/** LocalBusiness structured data built only from details already published on the site. */
export function localBusinessJsonLd(): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: SITE_NAME,
    url: `${siteConfig.siteUrl}/`,
    logo: `${siteConfig.siteUrl}/1.png`,
    image: `${siteConfig.siteUrl}/1.png`,
    email: siteConfig.email,
    telephone: siteConfig.phoneHref.replace('tel:', ''),
    address: {
      '@type': 'PostalAddress',
      streetAddress: siteConfig.address.street,
      addressLocality: 'Bengaluru',
      addressRegion: 'Karnataka',
      postalCode: '560082',
      addressCountry: 'IN',
    },
    sameAs: [siteConfig.linkedin],
  };
}
