import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from './Products.module.css';
import PcdAnatomy from '../components/PcdAnatomy';

/** Approved copy only: the PCD Tooling Technology blurb and the Manufacturing technology capability block. */
const TECHNOLOGY = [
  {
    title: 'PCD material',
    body: 'PCD combines very high hardness, an ultra-fine microstructure, smooth chip surfaces and sharp cutting edges. Aluminium can adhere at a hot cutting edge and form built-up edge, impairing machining performance. PCD reduces this effect compared with solid carbide and supports high speeds, feeds and long tool life.',
  },
  {
    title: 'Manufacturing technology',
    body: 'Wire EDM, lapping and grinding of cutting edges on solid carbide or steel tool bodies, with seamless brazing, high-quality pocket seats and smooth flutes.',
  },
];

/** PCD Technology page: how an RMTT PCD tool is built (anatomy) first, then the material and manufacturing story. */
export default function PCDTechnology() {
  const { hash } = useLocation();

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
  }, [hash]);

  return (
    <div className={styles.main}>
      <section className={styles.productIntro}>
        <div className="container">
          <Link to="/products/pcd" className={styles.detailLink}>Products / PCD Tools</Link>
          <h1 className={styles.pageTitle}>PCD Tooling Technology</h1>
          <p className={styles.pageSubtitle}>
            Polycrystalline diamond tooling for highly productive machining of aluminium parts in automotive and aerospace applications.
          </p>
          <p className={styles.pageSubtitleSecond}>
            RMTT starts with the customer's component and application requirements, then develops a proposal, tool design and manufacturing solution to meet production and performance requirements for drilling, milling and precision boring.
          </p>
          <div className={styles.jumpLinks}>
            <Link to="/products/pcd/pcd-technology" className={styles.jumpLink} style={{ background: 'rgba(30, 51, 68,0.08)' }} aria-current="page">PCD Technology</Link>
            <Link to="/products/pcd/pcd-tooling" className={styles.jumpLink}>PCD Tools</Link>
          </div>
        </div>
      </section>

      <section className={styles.catalogueSection} aria-labelledby="pcd-technology-heading">
        <div className="container">
          <PcdAnatomy />
          <h2 id="pcd-technology-heading" className="visually-hidden">PCD technology detail</h2>
          <div className={`${styles.techBlocks} ${styles.afterAnatomy}`}>
            {TECHNOLOGY.map(block => (
              <div key={block.title}>
                <h2 className={`section-heading-title ${styles.subCatTitle}`}>{block.title}</h2>
                <p className={styles.catIntro}>{block.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
