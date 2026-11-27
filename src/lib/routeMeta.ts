import { products } from '../data/products';
import { categories } from '../pages/productsData';
import { getNewsById } from '../data/news';
import { siteConfig } from './siteConfig';

const pages: Record<string, [string, string]> = {
  '/': ['Precision cutting tools', 'Riddhi Machine Tool Technology manufactures solid carbide, PCD and brazed carbide cutting tools in Bengaluru.'],
  '/products': ['Product range', 'Explore solid carbide, PCD, brazed carbide and specialized cutting tools for milling, drilling, reaming and precision boring.'],
  '/products/pcd/pcd-technology': ['PCD Tooling Technology', 'PCD material and manufacturing technology — wire EDM, lapping, grinding, brazing and pocket seats, with the anatomy of an RMTT PCD tool.'],
  '/about': ['About Riddhi', 'Discover Riddhi Machine Tool Technology, our journey and manufacturing equipment.'],
  '/applications': ['Applications', 'Explore cutting tool applications for automotive, aerospace and precision machining.'],
  '/services': ['Technology & services', 'Application engineering, custom solutions and the SAACKE, VOLLMER and Walter Helicheck equipment behind our tools.'],
  '/news': ['News & Articles', 'Company news and technical articles on cutting tools from Riddhi Machine Tool Technology.'],
  '/contact': ['Contact us', 'Contact Riddhi Machine Tool Technology to discuss your tooling requirements and download the product catalogue.'],
};

/**
 * Search titles and descriptions written for pages whose data text is too short or too long for
 * a search snippet (aim: 120–160 characters). A null title keeps the page's own title.
 */
const overrides: Record<string, [string | null, string]> = {
  "/products/pcd/pcd-tooling": ["PCD Tool Solutions", "Application-based PCD drilling, milling, reaming and boring tools for aluminium machining, designed and manufactured by RIDDHI in Bengaluru."],
  "/products/solid-carbide/sc-end-mills": ["Solid Carbide End Mills", "RIDDHI solid carbide end mills, 2–32 mm with 2–6 flutes: multi-helix, edge-honed and coated for steel, cast iron, titanium, Inconel and aluminium."],
  "/products/solid-carbide/sc-reamers": ["Solid Carbide Reamers", "RIDDHI solid carbide reamers, 2–32 mm, with internal coolant and H6/H7 tolerances for precision bores in cast iron, steel, titanium and Inconel."],
  "/products/solid-carbide/sc-drills": ["Solid Carbide Drills & Step Drills", "RIDDHI solid carbide drills and step drills, 2–25 mm, with internal coolant from 4 mm, for cast iron, steels, titanium and aerospace aluminium."],
  "/products/finishing-application-solid-carbide-endmill": [null, "High-performance RIDDHI solid carbide end mills for slot, shoulder, profile and high-feed milling, built for cost-effective, reliable machining."],
  "/products/solid-carbide-drills": [null, "RIDDHI solid carbide drills for grey and nodular iron, steels, PH steel and titanium, with polished flutes, edge honing and internal coolant."],
  "/products/solid-carbide-reamers": [null, "High-performance RIDDHI solid carbide reamers with internal coolant for precision bores: unequal spacing, monoblock design and H6/H7 tolerances."],
  "/products/brazed": [null, "RIDDHI brazed carbide-tipped tools: solid carbide performance at lower tool cost, with heat-treated steel bodies and 5-axis ground cutting edges."],
  "/faq": ["Frequently asked questions", "Answers about RIDDHI solid carbide, PCD and brazed carbide tools: sizes, materials, coatings, inspection and how to send an enquiry."],
  "/privacy": ["Privacy Policy", "How Riddhi Machine Tool Technology collects, uses and protects personal data sent through this website, and how to exercise your rights."],
  "/terms": ["Terms of Use", "Terms for using the Riddhi Machine Tool Technology website: product information, quotations, intellectual property, links and liability."],
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
  const override = overrides[path];
  return override ? { title: override[0] ?? title, description: override[1] } : { title, description };
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
