import { Link, Navigate, useParams } from 'react-router-dom';
import styles from './Products.module.css';
import { categories } from './productsData';
import ProductCard from '../components/ProductCard';
import Gallery from '../components/Gallery';
import { getProductImages } from '../data/products';

/** One tool category (family) on its own page, in the MAPAL family-page pattern. */
export default function FamilyPage() {
  const { categoryId, familyId } = useParams<{ categoryId: string; familyId: string }>();
  const cat = categories.find(c => c.id === categoryId);
  const family = cat?.subcategories.find(sub => sub.id === familyId);
  if (!cat || !family) return <Navigate to="/products" replace />;

  return (
    <div className={styles.main}>
      <section className={styles.productIntro}>
        <div className="container">
          <Link to={`/products/${cat.id}`} className={styles.detailLink}>Products / {cat.label}</Link>
          <h1 className={styles.pageTitle}>{family.title}</h1>
          <p className={styles.pageSubtitle}>{family.blurb}</p>
          <div className={styles.jumpLinks}>
            {cat.subcategories.map(sub => (
              <Link
                key={sub.id}
                to={`/products/${cat.id}/${sub.id}`}
                className={styles.jumpLink}
                style={sub.id === family.id ? { background: 'rgba(0,40,85,0.08)' } : undefined}
              >
                {sub.title}
              </Link>
            ))}
          </div>
        </div>
      </section>
      <section className={styles.catalogueSection} aria-labelledby="family-tools-heading">
        <div className="container">
          <h2 id="family-tools-heading" className="visually-hidden">Tools in this family</h2>
          {cat.id === 'solid-carbide' ? family.products.map(product => <div key={product.slug} className={styles.detailGrid}>
            <div className={styles.detailImage}><Gallery images={getProductImages(product)} icon={cat.icon} eager /></div>
            <div>
              <p className={styles.catIntro}>{product.description}</p>
              <h2 className={`section-heading-title ${styles.subCatTitle}`}>Product range & technology</h2>
              <table className={styles.specTable}><tbody>{product.specs?.map(spec => <tr key={spec.label}><th scope="row">{spec.label}</th><td>{spec.value}</td></tr>)}</tbody></table>
              <h2 className={`section-heading-title ${styles.subCatTitle}`}>Applications & materials</h2>
              <ul className={styles.applicationList}>{product.applications.map(application => <li key={application}>{application}</li>)}</ul>
              {product.benefits?.length ? <><h2 className={`section-heading-title ${styles.subCatTitle}`}>Benefits</h2><ul className={styles.applicationList}>{product.benefits.map(benefit => <li key={benefit}>{benefit}</li>)}</ul></> : null}
            </div>
          </div>) : <div className={styles.productCards}>
            {family.products.map(product => <ProductCard key={product.slug} product={product} headingLevel={3} />)}
          </div>}
        </div>
      </section>
    </div>
  );
}
