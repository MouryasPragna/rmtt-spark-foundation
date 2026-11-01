import PageHero from '../components/PageHero';
import { Link } from 'react-router-dom';
import { ArrowRight, Check } from 'lucide-react';
import styles from './Technology.module.css';
import ZoomImage from '../components/ZoomImage';
import ContentPending from '../components/ContentPending';
import { equipment } from '../data/equipment';
import { serviceBlocks } from '../data/services';

const processSteps = [
  { step: '01', title: 'Application analysis', desc: 'You share the part drawing, material, machine type and cycle requirements. We analyse and design the optimal tool geometry.' },
  { step: '02', title: 'Tool design & DFM', desc: 'Our engineers create the tool design optimised for your application. We apply Design for Manufacturability to balance performance and cost.' },
  { step: '03', title: 'Manufacturing', desc: 'Tool is manufactured on SAACKE grinding or VOLLMER EDM, with edge preparation and appropriate coating applied.' },
  { step: '04', title: 'Inspection & dispatch', desc: 'The facility includes Walter Helicheck measurement equipment.' },
];

export default function Technology() {
  return (
    <div className={styles.main}>
      <PageHero image="images/hero/inspection.webp" alt="Precision cutting tool in RMTT inspection equipment">
        <div className="container">
          <div className="section-eyebrow">Our capabilities</div>
          <h1 className={styles.pageTitle}>Technology & services</h1>
          <p className={styles.pageSubtitle}>
            The Bengaluru facility includes SAACKE grinding, VOLLMER Wire EDM and Walter Helicheck measurement equipment — supporting customers from application analysis to dispatch.
          </p>
        </div>
      </PageHero>

      {/* Services — MAPAL information pattern with pending-evidence placeholders */}
      <section className={styles.servicesSection} aria-labelledby="services-heading">
        <div className="container">
          <div className={`section-heading ${styles.servicesHead}`}>
            <div className="section-eyebrow">Beyond manufacturing</div>
            <h2 id="services-heading" className={styles.servicesTitle}>Services</h2>
            <p className={styles.servicesSub}>Support around the tools themselves, from the first enquiry to long-term supply.</p>
          </div>
          <div className={styles.servicesGrid}>
            {serviceBlocks.map(block => (
              <div key={block.id} className={styles.serviceBlock}>
                <h3 className={styles.serviceTitle}>{block.title}</h3>
                {block.pending
                  ? <ContentPending tone="inline" what="This service" />
                  : <p className={styles.serviceBody}>{block.body}</p>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className={styles.processSection}>
        <div className="container">
          <div className={`section-heading ${styles.processHead}`}>
            <div className="section-eyebrow">From enquiry to delivery</div>
            <h2 className={styles.processTitle}>Our manufacturing process</h2>
            <p className={styles.processSub}>Transparent, fast and technical — from your requirement to a precision tool at your machine.</p>
          </div>
          <div className={styles.processSteps}>
            {processSteps.map((p) => (
              <div key={p.step} className={styles.processStep}>
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
      {/* Machines */}
      <section className={styles.machinesSection}>
        <div className="container">
          <h2 className="section-heading-title">Equipment</h2>
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

    </div>
  );
}
