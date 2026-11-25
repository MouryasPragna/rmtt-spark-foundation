import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from './Products.module.css';
import pcdToolingRange from '../assets/pcd-tool-range-photo.webp.asset.json';

const WHY_PCD = [
  'PCD cutting material has the highest hardness of any other cutting material and a very smooth chip surface. Aluminium has an affinity to attract built-up edges at the cutting zone due to its soft nature and the heat generated while cutting, thus sticking quickly to the cutting edge. This is very bad for machining performance, especially if the tools are made with solid carbide material.',
  'PCD, due to its highest hardness together with an ultra-fine microstructure, high surface smoothness, and sharp cutting edges, has zero or very low effect of built-up edge, especially while machining aluminium. This helps to operate the tool at the highest cutting speeds and feeds, reducing machining time drastically together with very long tool life.',
];

const BENEFITS = [
  'Highest wear resistance, longer tool life',
  'Tight tolerances can be achieved for longer machining cycles',
  'Surface finish less than Ra 0.2 is possible to achieve',
  'Multi-operations can be combined into a single tool, thus eliminating the need for multiple tools, lowering production costs, and achieving the highest process capability.',
];

/** PCD Tools page in the Solid Carbide family-page pattern: intro, then image beside the approved copy. */
export default function PCDTools() {
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
          <h1 className={styles.pageTitle}>Precision PCD Tooling for High-Performance Machining</h1>
          <p className={styles.pageSubtitle}>
            PCD (Polycrystalline Diamond) tools are the top choice for highly productive machining of aluminium parts in the automotive and aerospace industries.
          </p>
          <p className={styles.pageSubtitleSecond}>
            RIDDHI adapts its extensive experience and know-how, offering application-based individual solutions for drilling, milling, and precision boring PCD tools.
          </p>
        </div>
      </section>

      <section className={styles.catalogueSection} aria-labelledby="pcd-tooling-heading">
        <div className="container">
          <h2 id="pcd-tooling-heading" className="visually-hidden">PCD tooling detail</h2>
          <div className={styles.detailGrid}>
            <div className={styles.detailImage}>
              <img
                src={`${import.meta.env.BASE_URL}${pcdToolingRange.url}`}
                alt="PCD tools from the RIDDHI range — pictured examples"
                width={800}
                height={800}
                loading="eager"
                decoding="async"
                draggable={false}
                className={styles.protectedImg}
              />
            </div>
            <div>
              <p className={styles.catIntro}>
                Our approach begins with understanding the customer's component and application requirements. Based on these insights, we provide application-specific engineering solutions, covering the complete PCD tooling process—from proposal and tool design to manufacturing at our state-of-the-art facility—ensuring solutions that meet the customer's performance and production requirements.
              </p>
              <h2 id="why-pcd" className={`section-heading-title ${styles.subCatTitle}`}>Why PCD?</h2>
              {WHY_PCD.map(paragraph => <p key={paragraph.slice(0, 24)} className={styles.catIntro}>{paragraph}</p>)}
              <h2 className={`section-heading-title ${styles.subCatTitle}`}>Benefits</h2>
              <ul className={styles.applicationList}>
                {BENEFITS.map(benefit => <li key={benefit}>{benefit}</li>)}
              </ul>
              <Link to="/products/pcd/pcd-technology" className={styles.detailLink}>PCD Tooling Technology</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
