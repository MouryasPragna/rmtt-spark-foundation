import { useEffect } from 'react';
import { Link, useLocation, useSearchParams } from 'react-router-dom';
import { Search, X, ArrowRight } from 'lucide-react';
import { products } from '../data/products';
import { industryNames } from '../data/industries';
import { categories } from './productsData';
import { filterProducts } from '../lib/catalogue';
import ProductCard from '../components/ProductCard';
import styles from './Products.module.css';

const materials = [...new Set(products.flatMap(product => product.materials))].sort();
const industries = industryNames;

export default function Products() {
  const [params, setParams] = useSearchParams();
  const { hash } = useLocation();
  useEffect(() => {
    const category = hash.slice(1);
    if (categories.some(cat => cat.id === category)) {
      setParams(current => { const next = new URLSearchParams(current); next.set('cat', category); return next; }, { replace: true });
    }
  }, [hash, setParams]);
  const results = filterProducts(params);
  const update = (key: string, value: string) => {
    setParams(current => { const next = new URLSearchParams(current); value ? next.set(key, value) : next.delete(key); return next; }, { replace: key === 'q' });
  };
  const toggle = (key: string, value: string) => {
    setParams(current => {
      const next = new URLSearchParams(current);
      const values = next.getAll(key);
      next.delete(key);
      (values.includes(value) ? values.filter(item => item !== value) : [...values, value]).forEach(item => next.append(key, item));
      return next;
    });
  };
  return <div className={styles.main}>
    <section className={styles.pageHero}><div className="container">
      <div className="section-eyebrow">What we manufacture</div>
      <h1 className={styles.pageTitle}>Product range</h1>
      <p className={styles.pageSubtitle}>Three tool technologies — Solid Carbide, PCD and Brazed Carbide — all manufactured to the same exacting standards on German equipment in Bengaluru.</p>
    </div></section>
    <div className={styles.filterBar}><div className="container">
      <div className={styles.categoryTabs} role="group" aria-label="Product category">
        {[{ id: 'all', label: 'All' }, ...categories].map(cat => <button key={cat.id} type="button" className={styles.filterChip} aria-pressed={(params.get('cat') || 'all') === cat.id} onClick={() => update('cat', cat.id === 'all' ? '' : cat.id)}>{cat.id === 'pcd' ? 'PCD' : cat.label}</button>)}
      </div>
    </div></div>
    <section className={styles.catalogueSection}><div className="container">
      <label className={styles.searchLabel} htmlFor="product-search">Search products</label>
      <div className={styles.searchBox}><Search size={18} /><input id="product-search" type="search" maxLength={200} placeholder="Search tools or applications" value={params.get('q') || ''} onChange={event => update('q', event.target.value)} /></div>
      {([{ key: 'material', label: 'Material', values: materials }, { key: 'industry', label: 'Industry', values: industries }]).map(filter => <fieldset className={styles.filterGroup} key={filter.key}>
        <legend>{filter.label}</legend><div className={styles.chipRow}>{filter.values.map(value => <button type="button" key={value} className={styles.filterChip} aria-pressed={params.getAll(filter.key).includes(value)} onClick={() => toggle(filter.key, value)}>{value}</button>)}</div>
      </fieldset>)}
      <div className={styles.resultsHeader}><p role="status">{results.length} {results.length === 1 ? 'tool' : 'tools'}</p>{params.size > 0 && <button type="button" className={styles.clearFilters} onClick={() => setParams({})}><X size={14} />Clear filters</button>}</div>
      {results.length ? <div className={styles.productCards}>{results.map(product => <ProductCard key={product.slug} product={product} headingLevel={2} />)}</div> : <div className={styles.emptyState}><h2>No tools match your selection</h2><Link to="/contact" className={styles.catCta}>Describe your requirement <ArrowRight size={16} /></Link></div>}
    </div></section>
  </div>;
}
