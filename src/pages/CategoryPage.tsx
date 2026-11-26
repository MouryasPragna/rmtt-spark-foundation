import { useEffect } from 'react';
import { useParams, useLocation, Link, Navigate } from 'react-router-dom';
import { ArrowRight, CircleCheck } from 'lucide-react';
import styles from './Products.module.css';
import { categories, type Category } from './productsData';
import ContentPending from '../components/ContentPending';
import PageHero from '../components/PageHero';
import StudioPhoto from '../components/StudioPhoto';
import { SHOW_PENDING } from '../lib/contentPending';

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
      {cat.heroImage && cat.studio ? (
        <section className={styles.studioHero} data-page-hero>
          <div className={`container ${styles.studioHeroHead}`}>
            <div className="section-eyebrow">{cat.label}</div>
            <h1 className={styles.pageTitle}>{cat.headline}</h1>
          </div>
          <StudioPhoto src={cat.heroImage} alt={cat.heroAlt ?? ''} eager maxWidth={1280} backdrop={cat.studioBackdrop} />
        </section>
      ) : cat.heroImage ? (
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
          {cat.story ? <h2 className={`section-heading-title ${styles.storyHeading}`}>{cat.story.heading}</h2> : null}
          <p className={styles.pageSubtitle}>{cat.intro}</p>
          {cat.intro2 ? <p className={styles.pageSubtitleSecond}>{cat.intro2}</p> : null}
          <div className={styles.jumpLinks}>
            {categories.map(c => (
              <Link
                key={c.id}
                to={`/products/${c.id}`}
                className={styles.jumpLink}
                style={c.id === cat.id ? { background: 'rgba(30, 51, 68,0.08)' } : undefined}
              >
                <c.icon size={14} />
                {c.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Single-page categories: construction (drawing next to the finished tool), then solutions */}
      {cat.story && <section className={styles.storySection} aria-labelledby="construction-heading">
        <div className="container">
          <div className={styles.storyGrid}>
            <div>
              <h2 id="construction-heading" className={`section-heading-title ${styles.catTitle}`}>{cat.story.construction.heading}</h2>
              {cat.story.construction.paragraphs.map(text => <p key={text} className={styles.storyText}>{text}</p>)}
            </div>
            <figure className={styles.drawingToTool}>
              <div className={styles.drawingToToolPair}>
                <img src={cat.story.drawingToTool.drawing} alt={cat.story.drawingToTool.drawingAlt} width={700} height={1050} loading="lazy" decoding="async" />
                <span className={styles.drawingToToolArrow} aria-hidden="true"><ArrowRight size={22} /></span>
                <img src={cat.story.drawingToTool.tool} alt={cat.story.drawingToTool.toolAlt} width={700} height={1050} loading="lazy" decoding="async" />
              </div>
              <figcaption>From the customer's drawing to the finished tool: {cat.story.drawingToTool.model}</figcaption>
            </figure>
          </div>
        </div>
      </section>}
      {cat.story && <section className={styles.capSection} aria-labelledby="solutions-heading">
        <div className="container">
          <div className={`section-heading ${styles.sectionHeadRow}`}>
            <h2 id="solutions-heading" className={styles.catTitle}>{cat.story.solutions.heading}</h2>
          </div>
          <ul className={styles.solutionsList}>
            {cat.story.solutions.items.map(item => <li key={item}><CircleCheck size={20} aria-hidden="true" /><span>{item}</span></li>)}
          </ul>
        </div>
      </section>}

      {/* Product families — brief cards linking to each family page */}
      {cat.id !== 'pcd' && cat.subcategories.length > 0 && <section id={cat.id} className={styles.catSection} aria-labelledby="families-heading">
        <div className="container">
          <div className={`section-heading ${styles.sectionHeadRow}`}>
            <h2 id="families-heading" className={styles.catTitle}>Product families</h2>
            <p className={styles.sectionHeadSub}>Each tool category has its own page with the tools in that programme.</p>
          </div>
          <div className={styles.familiesGrid}>
            {cat.subcategories.map(sub => (
              <Link key={sub.id} to={`/products/${cat.id}/${sub.id}`} className={`${styles.familyCard} ${sub.cardImage ? styles.familyCardPhoto : ''}`}>
                {sub.cardImage ? (
                  <div className={styles.familyCardMedia}>
                    <img src={sub.cardImage} alt={sub.cardImageAlt ?? ''} width={800} height={450} loading="lazy" decoding="async" />
                  </div>
                ) : null}
                <div className={styles.familyCardBody}>
                  <h3 className={styles.familyTitle}>{sub.title}</h3>
                  <p className={styles.familyBlurb}>{sub.blurb}</p>
                  <span className={styles.solutionLink} style={{ color: cat.color }}>
                    View the family <ArrowRight size={15} aria-hidden="true" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>}

      {/* PCD overview — families stay hidden; these cards link to the PCD Tools page */}
      {cat.id === 'pcd' && <section id={cat.id} className={styles.catSection} aria-labelledby="pcd-overview-heading">
        <div className="container">
          <div className={`section-heading ${styles.sectionHeadRow}`}>
            <h2 id="pcd-overview-heading" className={styles.catTitle}>PCD technology and tools</h2>
          </div>
          <div className={styles.familiesGrid}>
            {[
              { id: 'technology', title: 'PCD Technology', blurb: cat.subcategories.find(sub => sub.id === 'pcd-tools')?.blurb, href: '/products/pcd/pcd-technology', action: 'View the technology' },
              { id: 'tools', title: 'PCD Tools', blurb: 'Application-based individual solutions for drilling, milling and precision boring PCD tools — from proposal and tool design to manufacturing.', href: '/products/pcd/pcd-tooling', action: 'View the tools' },
            ].map(block => (
              <Link key={block.id} to={block.href} className={styles.familyCard}>
                <h3 className={styles.familyTitle}>{block.title}</h3>
                <p className={styles.familyBlurb}>{block.blurb}</p>
                <span className={styles.solutionLink} style={{ color: cat.color }}>
                  {block.action} <ArrowRight size={15} aria-hidden="true" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>}

      {/* Key capability blocks — MAPAL key-info pattern */}
      {cat.capabilities.length > 0 && <section className={styles.capSection} aria-labelledby="capabilities-heading">
        <div className="container">
          <div className={`section-heading ${styles.sectionHeadRow}`}>
            <h2 id="capabilities-heading" className={styles.catTitle}>Key capabilities</h2>
            <p className={styles.sectionHeadSub}>What defines the tools in this programme.</p>
          </div>
          <div className={styles.capGrid}>
            {cat.capabilities.filter(block => SHOW_PENDING || !block.pending).map(block => (
              <div key={block.id} className={styles.capBlock}>
                <h3 className={styles.capTitle}>{block.title}</h3>
                {block.body ? <p className={styles.capBody}>{block.body}</p> : null}
                {block.pending ? <ContentPending tone="inline" what="This capability" /> : block.pendingNote ? <ContentPending tone="inline" note={block.pendingNote} /> : null}
              </div>
            ))}
          </div>
        </div>
      </section>}

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
