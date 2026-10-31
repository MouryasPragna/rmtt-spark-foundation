import { Link, Navigate, useParams } from 'react-router-dom';
import styles from './Products.module.css';
import { categories } from './productsData';
import ProductCard from '../components/ProductCard';

/** One tool category (family) on its own page, in the MAPAL family-page pattern. */
export default function FamilyPage() {
  const { categoryId, familyId } = useParams<{ categoryId: string; familyId: string }>();
  const cat = categories.find(c => c.id === categoryId);
  const family = cat?.subcategories.find(sub => sub.id === familyId);
  if (!cat || !family) return <Navigate to="/products" replace />;

  return (
    <div className={styles.main}>
      <section className={styles.pageHero}>
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
          <div className={styles.productCards}>
            {family.products.map(product => <ProductCard key={product.slug} product={product} headingLevel={3} />)}
          </div>
        </div>
      </section>
    </div>
  );
}
