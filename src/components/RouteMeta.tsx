import { useLocation } from 'react-router-dom';
import { products } from '../data/products';
import { categories } from '../pages/productsData';
import { getNewsById } from '../data/news';
import { useDocumentMeta } from '../hooks/useDocumentMeta';

const pages: Record<string, [string, string]> = {
  '/': ['Precision cutting tools', 'Riddhi Machine Tool Technology manufactures solid carbide, PCD and brazed carbide cutting tools in Bengaluru.'],
  '/products': ['Product range', 'Explore solid carbide, PCD and brazed carbide tools. Search applications and select tools for a quote.'],
  '/about': ['About Riddhi', 'Discover Riddhi Machine Tool Technology, our journey and manufacturing equipment.'],
  '/applications': ['Applications', 'Explore cutting tool applications for automotive, aerospace and precision machining.'],
  '/services': ['Technology & services', 'Application engineering, custom solutions and the SAACKE, VOLLMER and Walter Helicheck equipment behind our tools.'],
  '/downloads': ['Downloads', 'Download the Riddhi Machine Tool Technology product catalogue.'],
  '/news': ['News & Articles', 'Company news and technical articles on cutting tools from Riddhi Machine Tool Technology.'],
  '/contact': ['Contact us', 'Contact Riddhi Machine Tool Technology to discuss your application details and tooling requirements.'],
  '/privacy': ['Privacy Policy', 'Riddhi Machine Tool Technology privacy policy — client legal copy pending.'],
  '/terms': ['Terms', 'Riddhi Machine Tool Technology terms — client legal copy pending.'],
};
export default function RouteMeta() {
  const { pathname } = useLocation();
  const segments = pathname.split('/').filter(Boolean);
  const isFamily = /^\/products\/[^/]+\/[^/]+$/.test(pathname);
  const id = /^\/products\/[^/]+\/?$/.test(pathname) ? segments[1] : undefined;
  const product = products.find(tool => tool.slug === id);
  const category = categories.find(cat => cat.id === id);
  const article = /^\/news\/[^/]+\/?$/.test(pathname) ? getNewsById(pathname.split('/')[2]) : undefined;
  const family = isFamily ? categories.find(cat => cat.id === segments[1])?.subcategories.find(sub => sub.id === segments[2]) : undefined;
  const [title, description] = article ? [article.title, article.summary] : product ? [product.name, product.description] : family ? [family.title, family.blurb] : category ? [category.label, category.intro] : pages[pathname] || ['Page not found', 'Explore Riddhi Machine Tool Technology cutting tools.'];
  useDocumentMeta(title, description);
  return null;
}