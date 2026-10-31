import { Link } from 'react-router-dom';
import { ArrowRight, Check } from 'lucide-react';
import styles from './Technology.module.css';
import ZoomImage from '../components/ZoomImage';
import { equipment } from '../data/equipment';

const processSteps = [
  { step: '01', title: 'Application analysis', desc: 'You share the part drawing, material, machine type and cycle requirements. We analyse and design the optimal tool geometry.' },
  { step: '02', title: 'Tool design & DFM', desc: 'Our engineers create the tool design optimised for your application. We apply Design for Manufacturability to balance performance and cost.' },
  { step: '03', title: 'Manufacturing', desc: 'Tool is manufactured on SAACKE grinding or VOLLMER EDM, with edge preparation and appropriate coating applied.' },
  { step: '04', title: 'Inspection & dispatch', desc: 'The facility includes Walter Helicheck measurement equipment.' },
];

export default function Technology() {
  return (
    <div className={styles.main}>
      <section className={styles.pageHero}>
        <div className="container">
          <div className="section-eyebrow">Our capabilities</div>
          <h1 className={styles.pageTitle}>Manufacturing technology</h1>
          <p className={styles.pageSubtitle}>
            The Bengaluru facility includes SAACKE grinding, VOLLMER Wire EDM and Walter Helicheck measurement equipment.
          </p>
        </div>
      </section>

      {/* Machines */}
      <section className={styles.machinesSection}>
        <div className="container">
          <div className={styles.machinesGrid}>
            {equipment.map(m => (
              <article key={m.num} className={`${styles.machineCard} ${m.image ? '' : styles.machineCardText}`}>
                {m.image && (
                  <div className={styles.machineImg}>
                    <ZoomImage src={m.image} alt={m.imageAlt} width={1000} height={700} />
                  </div>
                )}
                <div className={styles.machineBody}>
                  <h2 className={styles.machineName}>{m.name}</h2>
                  <p className={styles.machineDetail}>{m.detail}</p>
                  {m.uses && (
                    <ul className={styles.machineSpecs}>
                      {m.uses.map(u => (
                        <li key={u} className={styles.machineSpec}>
                          <Check size={15} className={styles.specIcon} aria-hidden="true" />
                          {u}
                        </li>
                      ))}
                    </ul>
                  )}

                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className={styles.processSection}>
        <div className="container">
          <div className={styles.processHead}>
            <div className="section-eyebrow">From enquiry to delivery</div>
            <h2 className={styles.processTitle}>Our manufacturing process</h2>
            <p className={styles.processSub}>Transparent, fast and technical — from your requirement to a precision tool at your machine.</p>
          </div>
          <div className={styles.processSteps}>
            {processSteps.map((p) => (
              <div key={p.step} className={styles.processStep}>
                <div className={styles.processStepTrack}>
                  <div className={styles.processStepNum}>{p.step}</div>
                </div>
                <div className={styles.processStepContent}>
                  <div className={styles.processStepTitle}>{p.title}</div>
                  <div className={styles.processStepDesc}>{p.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className={styles.ctaSection}>
        <div className="container">
          <h2 className={styles.ctaTitle}>See our technology in action</h2>
          <p className={styles.ctaSub}>Submit your application requirement and our engineers will demonstrate how our equipment solves your machining challenge.</p>
          <Link to="/contact" className={styles.ctaBtn}>
            Start a technical discussion <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </div>
  );
}
