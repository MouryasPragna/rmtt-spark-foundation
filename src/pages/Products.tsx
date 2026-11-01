import PageHero from '../components/PageHero';
import heroPhoto from '../assets/factory-hero-collage.jpg.asset.json';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { categories } from './productsData';
import styles from './Products.module.css';

/** MAPAL products-overview pattern: the four solution areas, each linking to its competence page. */
export default function Products() {
  return <div className={styles.main}>
    <PageHero image={heroPhoto.url} alt="RMTT precision tooling and manufacturing facility"><div className="container">
      <div className="section-eyebrow">Products & solutions</div>
      <h1 className={styles.pageTitle}>Tools and process solutions</h1>
      <p className={styles.pageSubtitle}>
        Our portfolio combines individually designed custom tools with a high-performance
        standard programme for milling, drilling, reaming and precision boring. Supplemented
        by application engineering and manufacturing technology, customers receive a complete
        package for the machining process.
      </p>
    </div></PageHero>
    <section className={styles.solutionsSection} aria-labelledby="solutions-heading"><div className="container">
      <div className={`section-heading ${styles.sectionHeadRow}`}>
        <h2 id="solutions-heading" className={styles.catTitle}>Solution areas</h2>
        <p className={styles.sectionHeadSub}>Four tool technologies, one manufacturing standard — choose a competence to explore its programme.</p>
      </div>
      <div className={styles.solutionsGrid}>
        {categories.map(area => (
          <Link key={area.id} to={`/products/${area.id}`} className={styles.solutionCard}>
            <div className={styles.solutionCardImg}>
              <img src={area.image} alt={area.imageAlt} width={640} height={420} loading="lazy" />
              <span className={styles.solutionLabel} style={{ color: area.color }}>{area.label}</span>
            </div>
            <div className={styles.solutionCardBody}>
              <h3 className={styles.solutionTitle}>{area.headline}</h3>
              <p className={styles.solutionBlurb}>{area.intro}</p>
              <span className={styles.solutionLink} style={{ color: area.color }}>
                Explore <ArrowRight size={16} aria-hidden="true" />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div></section>
  </div>;
}
