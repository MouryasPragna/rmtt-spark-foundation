import { Link } from 'react-router-dom';
import { Settings } from 'lucide-react';
import { products, getProductImages, type Product } from '../data/products';
import { categories } from './productsData';
import ProductCard from '../components/ProductCard';
import Gallery from '../components/Gallery';
import styles from './Products.module.css';

export default function ProductDetail({ product }: { product: Product }) {
  const category = categories.find(cat => cat.id === product.category);
  const related = products.filter(tool => tool.category === product.category && tool.slug !== product.slug).sort((a, b) => Number(b.subcategory === product.subcategory) - Number(a.subcategory === product.subcategory)).slice(0, 3);
  return <div className={styles.main}>
    <section className={styles.productIntro}><div className="container">
      <Link to={`/products?cat=${product.category}`} className={styles.detailLink}>Products / {category?.label}</Link>
      <h1 className={styles.pageTitle}>{product.name}</h1>
    </div></section>
    <section className={styles.catalogueSection}><div className="container">
      <div className={styles.detailGrid}>
        <div className={styles.detailImage}><Gallery images={getProductImages(product)} icon={Settings} eager /></div>
        <div><p className={styles.catIntro}>{product.description}</p>
          {product.applications.length > 0 && <><h2 className={`section-heading-title ${styles.subCatTitle}`}>Typical applications</h2><ul className={styles.applicationList}>{product.applications.map(application => <li key={application}>{application}</li>)}</ul></>}
          {product.benefits?.length ? <><h2 className={`section-heading-title ${styles.subCatTitle}`}>Benefits</h2><ul className={styles.applicationList}>{product.benefits.map(benefit => <li key={benefit}>{benefit}</li>)}</ul></> : null}
          {!!product.markings?.length && <table className={styles.specTable}><caption>Pictured tool — markings on the photo</caption><tbody>{product.markings.map(m => <tr key={m.label}><th scope="row">{m.label}</th><td>{m.value}</td></tr>)}</tbody></table>}
          {!!product.specs?.length && <table className={styles.specTable}><caption>Specifications</caption><tbody>{product.specs.map(spec => <tr key={spec.label}><th scope="row">{spec.label}</th><td>{spec.value}</td></tr>)}</tbody></table>}
        </div>
      </div>
      {product.examples?.length ? <section className={styles.relatedSection}>
        <header className="section-heading"><h2 className={styles.catTitle}>Pictured examples</h2>
        <p className={styles.catIntro}>Model references shown in the FINAL catalogue. These are customer-specific examples, not standard availability or range specifications.</p></header>
        <div className={styles.productCards}>{product.examples.map(example => <figure key={example.model}><Gallery images={[{ src: example.image, alt: `${example.model} — customer-specific brazed carbide example` }]} icon={Settings} /><figcaption className={styles.catIntro}>{example.model}</figcaption></figure>)}</div>
      </section> : null}
      {related.length > 0 && <section className={styles.relatedSection}><h2 className={`section-heading-title ${styles.catTitle}`}>Related products</h2><div className={styles.productCards}>{related.map(tool => <ProductCard key={tool.slug} product={tool} />)}</div></section>}
    </div></section>
  </div>;
}