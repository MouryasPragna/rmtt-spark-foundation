import { useEffect } from 'react';
import { useParams, useLocation, Link, Navigate } from 'react-router-dom';
import { ChevronRight, ArrowRight, Check, FileText } from 'lucide-react';
import styles from './Products.module.css';
import { categories, type Category } from './productsData';
import ProductCard from '../components/ProductCard';
import Gallery from '../components/Gallery';

export default function CategoryPage() {
  const { categoryId } = useParams<{ categoryId: string }>();
  const { hash } = useLocation();
  const cat: Category | undefined = categories.find(c => c.id === categoryId);

  useEffect(() => {
    if (hash) {
      const el = document.querySelector(hash);
      if (el) {
        const y = el.getBoundingClientRect().top + window.scrollY - 110;
        window.scrollTo({ top: y, behavior: 'smooth' });
        return;
      }
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [hash, categoryId]);

  if (!cat) return <Navigate to="/products" replace />;

  return (
    <div className={styles.main}>
      <section className={styles.pageHero}>
        <div className="container">
          <div className="section-eyebrow">{cat.label}</div>
          <h1 className={styles.pageTitle}>{cat.headline}</h1>
          <p className={styles.pageSubtitle}>{cat.intro}</p>
          <div className={styles.jumpLinks}>
            {categories.map(c => (
              <Link
                key={c.id}
                to={`/products/${c.id}`}
                className={styles.jumpLink}
                style={c.id === cat.id ? { background: 'rgba(0,40,85,0.08)' } : undefined}
              >
                <c.icon size={14} />
                {c.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section id={cat.id} className={styles.catSection}>
        <div className="container">
          <div className={styles.catHeader}>
            <div className={styles.catHeaderText}>
              <ul className={styles.features}>
                {cat.features.map(f => (
                  <li key={f} className={styles.feature}>
                    <Check size={14} style={{ color: cat.color, flexShrink: 0 }} />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className={styles.catGallery}>
              <Gallery images={[{ src: cat.image, alt: cat.imageAlt }]} icon={cat.icon} width={800} height={600} aspect="4 / 3" eager />
            </div>
          </div>

          {cat.subcategories.map(sub => (
            <div key={sub.id} id={sub.id} className={styles.subCat}>
              <div className={styles.subCatHead}>
                <h2 className={styles.subCatTitle}>{sub.title}</h2>
                <p className={styles.subCatBlurb}>{sub.blurb}</p>
              </div>
              <div className={styles.productCards}>
                {sub.products.map(product => <ProductCard key={product.slug} product={product} headingLevel={3} />)}
              </div>
            </div>
          ))}

          <div className={styles.catFooter}>
            <Link to="/contact" className={styles.catCta}>
              <FileText size={15} />
              Request quote for {cat.label}
              <ChevronRight size={15} />
            </Link>
          </div>
        </div>
      </section>

      <section className={styles.bottomCta}>
        <div className="container">
          <h2 className={styles.ctaTitle}>Don't see what you need?</h2>
          <p className={styles.ctaSub}>
            We regularly manufacture custom and special tools to customer specifications. Share your drawing or describe your challenge.
          </p>
          <Link to="/contact" className={styles.ctaBtn}>
            Describe your requirement <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </div>
  );
}
