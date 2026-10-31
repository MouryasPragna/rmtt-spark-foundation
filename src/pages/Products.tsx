import { useEffect } from 'react';
import { Link, useLocation, useSearchParams } from 'react-router-dom';
import { Search, X, ArrowRight, Wrench } from 'lucide-react';
import { products } from '../data/products';
import { industryNames } from '../data/industries';
import { categories } from './productsData';
import { filterProducts } from '../lib/catalogue';
import ProductCard from '../components/ProductCard';
import styles from './Products.module.css';

const materials = [...new Set(products.flatMap(product => product.materials))].sort();
const industries = industryNames;

/** MAPAL products-overview pattern: solution areas first, the filterable catalogue below. */
const solutionAreas = [
  ...categories.map(cat => ({
    id: cat.id,
    label: cat.label,
    headline: cat.headline,
    blurb: cat.intro,
    href: `/products/${cat.id}`,
    icon: cat.icon,
    color: cat.color,
    bg: cat.bg,
    image: cat.image,
    imageAlt: cat.imageAlt,
  })),
  {
    id: 'services',
    label: 'Services & Technology',
    headline: 'Services & Technology',
    blurb:
      'Application analysis, tool design, manufacturing on German grinding and EDM equipment, and optical measurement — from enquiry to dispatch.',
    href: '/services',
    icon: Wrench,
    color: 'var(--steel-dark)',
    bg: 'var(--surface)',
    image: '',
    imageAlt: '',
  },
];

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
      <div className="section-eyebrow">Products & solutions</div>
      <h1 className={styles.pageTitle}>Tools and process solutions</h1>
      <p className={styles.pageSubtitle}>
        Our portfolio combines individually designed custom tools with a high-performance
        standard programme for milling, drilling, reaming and precision boring. Supplemented
        by application engineering and manufacturing technology, customers receive a complete
        package for the machining process.
      </p>
    </div></section>
    <section className={styles.solutionsSection} aria-labelledby="solutions-heading"><div className="container">
      <div className={styles.sectionHeadRow}>
        <h2 id="solutions-heading" className={styles.catTitle}>Solution areas</h2>
        <p className={styles.sectionHeadSub}>Three tool technologies, one manufacturing standard — choose a competence to explore its programme.</p>
      </div>
      <div className={styles.solutionsGrid}>
        {solutionAreas.map(area => (
          <Link key={area.id} to={area.href} className={styles.solutionCard}>
            <div className={styles.solutionCardImg}>
              {area.image
                ? <img src={area.image} alt={area.imageAlt} width={640} height={420} loading="lazy" />
                : <area.icon size={40} color={area.color} strokeWidth={1.5} aria-hidden="true" />}
              <span className={styles.solutionLabel} style={{ color: area.color }}>{area.label}</span>
            </div>
            <div className={styles.solutionCardBody}>
              <h3 className={styles.solutionTitle}>{area.headline}</h3>
              <p className={styles.solutionBlurb}>{area.blurb}</p>
              <span className={styles.solutionLink} style={{ color: area.color }}>
                Explore <ArrowRight size={16} aria-hidden="true" />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div></section>
    <div className={styles.filterBar}><div className="container">
      <div className={styles.categoryTabs} role="group" aria-label="Product category">
        {[{ id: 'all', label: 'All' }, ...categories].map(cat => <button key={cat.id} type="button" className={styles.filterChip} aria-pressed={(params.get('cat') || 'all') === cat.id} onClick={() => update('cat', cat.id === 'all' ? '' : cat.id)}>{cat.id === 'pcd' ? 'PCD' : cat.label}</button>)}
      </div>
    </div></div>
    <section id="catalogue" className={styles.catalogueSection} aria-labelledby="catalogue-heading"><div className="container">
      <div className={styles.sectionHeadRow}>
        <h2 id="catalogue-heading" className={styles.catTitle}>Browse the full catalogue</h2>
        <p className={styles.sectionHeadSub}>Search tools or applications and select items for a quote request.</p>
      </div>
      <label className={styles.searchLabel} htmlFor="product-search">Search products</label>
      <div className={styles.searchBox}><Search size={18} /><input id="product-search" type="search" maxLength={200} placeholder="Search tools or applications" value={params.get('q') || ''} onChange={event => update('q', event.target.value)} /></div>
      {([{ key: 'material', label: 'Material', values: materials }, { key: 'industry', label: 'Industry', values: industries }]).map(filter => <fieldset className={styles.filterGroup} key={filter.key}>
        <legend>{filter.label}</legend><div className={styles.chipRow}>{filter.values.map(value => <button type="button" key={value} className={styles.filterChip} aria-pressed={params.getAll(filter.key).includes(value)} onClick={() => toggle(filter.key, value)}>{value}</button>)}</div>
      </fieldset>)}
      <div className={styles.resultsHeader}><p role="status">{results.length} {results.length === 1 ? 'tool' : 'tools'}</p>{params.size > 0 && <button type="button" className={styles.clearFilters} onClick={() => setParams({})}><X size={14} />Clear filters</button>}</div>
      {results.length ? <div className={styles.productCards}>{results.map(product => <ProductCard key={product.slug} product={product} headingLevel={3} />)}</div> : <div className={styles.emptyState}><h2>No tools match your selection</h2><Link to="/contact" className={styles.catCta}>Describe your requirement <ArrowRight size={16} /></Link></div>}
    </div></section>
  </div>;
}
