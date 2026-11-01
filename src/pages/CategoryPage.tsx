import { useEffect } from 'react';
import { useParams, useLocation, Link, Navigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import styles from './Products.module.css';
import { categories, type Category } from './productsData';
import ContentPending from '../components/ContentPending';
import PageHero from '../components/PageHero';

/**
 * Competence page in the MAPAL information pattern: hero intro, product-family
 * brief cards, key capability blocks, then product-family sections with the actual tools.
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
      {cat.heroImage ? (
        <PageHero image={cat.heroImage} alt={cat.heroAlt ?? ''} tools>
          <div className="section-eyebrow">{cat.label}</div>
          <h1 className={styles.pageTitle}>{cat.headline}</h1>
        </PageHero>
      ) : null}
      <section className={styles.productIntro}>
        <div className="container">
          {cat.heroImage ? null : (
            <>
              <div className="section-eyebrow">{cat.label}</div>
              <h1 className={styles.pageTitle}>{cat.headline}</h1>
            </>
          )}
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

      {/* Product families — brief cards linking to each family page */}
      <section id={cat.id} className={styles.catSection} aria-labelledby="families-heading">
        <div className="container">
          <div className={`section-heading ${styles.sectionHeadRow}`}>
            <h2 id="families-heading" className={styles.catTitle}>Product families</h2>
            <p className={styles.sectionHeadSub}>Each tool category has its own page with the tools in that programme.</p>
          </div>
          <div className={styles.familiesGrid}>
            {cat.subcategories.map(sub => (
              <Link key={sub.id} to={`/products/${cat.id}/${sub.id}`} className={styles.familyCard}>
                <h3 className={styles.familyTitle}>{sub.title}</h3>
                <p className={styles.familyBlurb}>{sub.blurb}</p>
                <span className={styles.solutionLink} style={{ color: cat.color }}>
                  View the family <ArrowRight size={15} aria-hidden="true" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Key capability blocks — MAPAL key-info pattern */}
      <section className={styles.capSection} aria-labelledby="capabilities-heading">
        <div className="container">
          <div className={`section-heading ${styles.sectionHeadRow}`}>
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
