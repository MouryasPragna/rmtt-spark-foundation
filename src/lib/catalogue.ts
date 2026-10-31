import { products, type Product } from '../data/products';

export function filterProducts(params: URLSearchParams): Product[] {
  const cat = params.get('cat');
  const query = (params.get('q') || '').trim().toLowerCase().slice(0, 200);
  const materials = params.getAll('material');
  const industries = params.getAll('industry');
  return products.filter(product =>
    (!cat || cat === 'all' || product.category === cat) &&
    (!query || [product.name, product.description, ...product.applications, ...(product.examples || []).map(example => example.model), ...(product.markings || []).map(m => m.value)].join(' ').toLowerCase().includes(query)) &&
    (!materials.length || materials.some(material => product.materials.includes(material))) &&
    (!industries.length || industries.some(industry => product.industries.includes(industry)))
  );
}


export function saveQuoteSlugs(storage: Pick<Storage, 'setItem'>, slugs: string[]) {
  try { storage.setItem('rmtt-quote', JSON.stringify(slugs)); } catch { /* Storage may be disabled. */ }
}