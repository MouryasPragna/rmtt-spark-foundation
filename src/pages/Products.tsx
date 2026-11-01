import PageHero from '../components/PageHero';
import heroPhoto from '../assets/factory-hero-collage.jpg.asset.json';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
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
      <div className={styles.productsLayout}>
        <nav className={styles.solutionNav} aria-label="Product solution areas" data-focus-surface="dark">
          {categories.map(area => (
            <div key={area.id} className={styles.solutionNavGroup}>
              <Link to={`/products/${area.id}`} className={styles.solutionNavLink}>
                <span>{area.id === 'brazed' ? 'Brazed Carbide Tools' : area.label}</span>
                <ChevronRight size={18} aria-hidden="true" />
              </Link>
              {area.id === 'solid-carbide' && <div className={styles.solutionNavFamilies}>
                {area.subcategories.map(family => <Link key={family.id} to={`/products/${area.id}/${family.id}`} className={styles.solutionNavFamily}>
                  <span>{family.id === 'sc-end-mills' ? 'End Milling' : family.id === 'sc-drills' ? 'Drills' : family.title}</span>
                  <ChevronRight size={16} aria-hidden="true" />
                </Link>)}
              </div>}
            </div>
          ))}
        </nav>
        <div className={styles.solutionTiles}>
        {categories.map(area => (
          <Link key={area.id} to={`/products/${area.id}`} className={styles.solutionTile}>
            <h3 className={styles.solutionTileTitle}>{area.id === 'brazed' ? 'Brazed Carbide Tools' : area.label}<ChevronRight size={18} aria-hidden="true" /></h3>
            <div className={styles.solutionTileImage}>
              <img src={area.image} alt={area.imageAlt} width={640} height={420} loading="lazy" />
            </div>
          </Link>
        ))}
        </div>
      </div>
    </div></section>
  </div>;
}
