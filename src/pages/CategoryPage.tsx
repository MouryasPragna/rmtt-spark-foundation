import { useEffect } from 'react';
import { useParams, useLocation, Link, Navigate } from 'react-router-dom';
import { ChevronRight, ArrowRight } from 'lucide-react';
import styles from './Products.module.css';
import { categories, type Category } from './productsData';
import ProductCard from '../components/ProductCard';
import Gallery from '../components/Gallery';
import ContentPending from '../components/ContentPending';

/**
 * Competence page in the MAPAL information pattern: hero intro, featured example
 * highlight, key capability blocks, then product-family sections with the actual tools.
 */
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
          <p className={styles.pageSubtitleSecond}>{cat.intro2}</p>
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

      {/* Featured example — MAPAL highlight card pattern */}
      <section className={styles.featuredSection} aria-labelledby="featured-heading">
        <div className="container">
          <div className={styles.featuredGrid}>
            <div className={styles.featuredImg}>
              <Gallery images={[{ src: cat.featured.image, alt: cat.featured.imageAlt }]} icon={cat.icon} width={800} height={600} aspect="4 / 3" eager />
            </div>
            <div className={styles.featuredBody}>
              <div className="section-eyebrow" style={{ color: cat.color }}>Featured from this programme</div>
              <h2 id="featured-heading" className={styles.featuredTitle}>{cat.featured.title}</h2>
              <p className={styles.featuredBlurb}>{cat.featured.blurb}</p>
              <Link to={cat.featured.href} className={styles.featuredLink} style={{ color: cat.color }}>
                View the family <ArrowRight size={15} aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Key capability blocks — MAPAL key-info pattern */}
      <section className={styles.capSection} aria-labelledby="capabilities-heading">
        <div className="container">
          <div className={styles.sectionHeadRow}>
            <h2 id="capabilities-heading" className={styles.catTitle}>Key capabilities</h2>
            <p className={styles.sectionHeadSub}>What defines the tools in this programme.</p>
          </div>
          <div className={styles.capGrid}>
            {cat.capabilities.map(block => (
              <div key={block.id} className={styles.capBlock}>
                <h3 className={styles.capTitle}>{block.title}</h3>
                {block.body ? <p className={styles.capBody}>{block.body}</p> : null}
                {block.pending ? <ContentPending tone="inline" what="This capability" /> : block.pendingNote ? <ContentPending tone="inline" note={block.pendingNote} /> : null}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Product families */}
      <section id={cat.id} className={styles.catSection}>
        <div className="container">
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
            Special machining tasks require special tools. We manufacture custom tools individually
            tailored to the customer's requirements — share your drawing or describe your challenge.
          </p>
          <Link to="/contact" className={styles.ctaBtn}>
            Describe your requirement <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </div>
  );
}
