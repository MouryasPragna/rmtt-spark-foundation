import { Link, useNavigate } from 'react-router-dom';
import { Plus, Check, FileText, Settings } from 'lucide-react';
import { products, getProductImages, type Product } from '../data/products';
import { categories } from './productsData';
import { useQuote } from '../context/QuoteContext';
import ProductCard from '../components/ProductCard';
import Gallery from '../components/Gallery';
import styles from './Products.module.css';

export default function ProductDetail({ product }: { product: Product }) {
  const { selected, add } = useQuote();
  const navigate = useNavigate();
  const added = selected.some(tool => tool.slug === product.slug);
  const category = categories.find(cat => cat.id === product.category);
  const related = products.filter(tool => tool.category === product.category && tool.slug !== product.slug).sort((a, b) => Number(b.subcategory === product.subcategory) - Number(a.subcategory === product.subcategory)).slice(0, 3);
  return <div className={styles.main}>
    <section className={styles.pageHero}><div className="container">
      <Link to={`/products?cat=${product.category}`} className={styles.detailLink}>Products / {category?.label}</Link>
      <h1 className={styles.pageTitle}>{product.name}</h1>
    </div></section>
    <section className={styles.catalogueSection}><div className="container">
      <div className={styles.detailGrid}>
        <div className={styles.detailImage}><Gallery images={getProductImages(product)} icon={Settings} eager /></div>
        <div><p className={styles.catIntro}>{product.description}</p>
          {product.applications.length > 0 && <><h2 className={styles.subCatTitle}>Typical applications</h2><ul className={styles.applicationList}>{product.applications.map(application => <li key={application}>{application}</li>)}</ul></>}
          {product.benefits?.length ? <><h2 className={styles.subCatTitle}>Benefits</h2><ul className={styles.applicationList}>{product.benefits.map(benefit => <li key={benefit}>{benefit}</li>)}</ul></> : null}
          {!!product.markings?.length && <table className={styles.specTable}><caption>Pictured tool — markings on the photo</caption><tbody>{product.markings.map(m => <tr key={m.label}><th scope="row">{m.label}</th><td>{m.value}</td></tr>)}</tbody></table>}
          {!!product.specs?.length && <table className={styles.specTable}><caption>Specifications</caption><tbody>{product.specs.map(spec => <tr key={spec.label}><th scope="row">{spec.label}</th><td>{spec.value}</td></tr>)}</tbody></table>}
          <div className={styles.detailActions}>
            <button type="button" className={styles.quoteButton} disabled={added} onClick={() => add(product.slug)}>{added ? <Check size={16} /> : <Plus size={16} />}{added ? 'Added to quote' : 'Add to quote'}</button>
            <button type="button" className={styles.catCta} onClick={() => { add(product.slug); navigate('/contact'); }}>Request quote for this tool</button>
            {product.datasheetUrl && <a href={product.datasheetUrl} download className={styles.detailLink}><FileText size={16} />Download datasheet</a>}
          </div>
        </div>
      </div>
      {product.examples?.length ? <section className={styles.relatedSection}>
        <h2 className={styles.catTitle}>Pictured examples</h2>
        <p className={styles.catIntro}>Model references shown in the FINAL catalogue. These are customer-specific examples, not standard availability or range specifications.</p>
        <div className={styles.productCards}>{product.examples.map(example => <figure key={example.model}><Gallery images={[{ src: example.image, alt: `${example.model} — customer-specific brazed carbide example` }]} icon={Settings} /><figcaption className={styles.catIntro}>{example.model}</figcaption></figure>)}</div>
      </section> : null}
      {related.length > 0 && <section className={styles.relatedSection}><h2 className={styles.catTitle}>Related products</h2><div className={styles.productCards}>{related.map(tool => <ProductCard key={tool.slug} product={tool} />)}</div></section>}
    </div></section>
  </div>;
}