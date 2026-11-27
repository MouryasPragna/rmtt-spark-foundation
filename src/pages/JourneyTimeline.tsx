import { useEffect, useRef, useState } from 'react';
import styles from './JourneyTimeline.module.css';
import img2013 from '../assets/journey-2013.webp';
import img2017 from '../assets/journey-2017.jpg.asset.json';
import img2018 from '../assets/journey-2018.jpg.asset.json';
import img2020 from '../assets/journey-2020.jpg.asset.json';
import img2022 from '../assets/journey-2022.jpg.asset.json';
import img2025 from '../assets/journey-2025.jpg.asset.json';

interface Milestone {
  year: string;
  label: string;
  title: string;
  text: string;
  /** Milestones without a photo show the year as a large mark instead. */
  image?: string;
  alt?: string;
}

const milestones: Milestone[] = [
  { year: '2013', label: 'Founded', title: 'Started as a trading company', image: img2013, alt: 'Multi-spindle tool holder with a solid carbide drill', text: 'We began our journey in 2013 as a startup trading company in Bengaluru, laying the foundation for our presence in the precision tooling industry.' },
  { year: '2017', label: 'Manufacturing unit', title: 'From trading to production', image: img2017.url, alt: 'Tool being ground on a SAACKE machine', text: 'Established a dedicated manufacturing unit for solid carbide tools, marking the shift from trading to production.' },
  { year: '2018', label: '5-axis grinding', title: 'High-precision CNC grinding', image: img2018.url, alt: 'SAACKE 5-axis grinding machine running', text: 'Strategic investment in a 5-axis CNC tool grinding machine strengthened capabilities in high-precision tool manufacturing.' },
  { year: '2020', label: 'PCD tooling', title: 'Expansion into PCD tools', image: img2020.url, alt: 'Vollmer machine for PCD tools', text: 'Expanded into PCD tool manufacturing with the addition of a Vollmer EDM machine, enabling advanced specialised tooling solutions.' },
  { year: '2022', label: 'Added capacity', title: 'Second CNC grinding machine', image: img2022.url, alt: 'Tool face grinding on a CNC machine', text: 'Capacity and efficiency further enhanced with the installation of a second CNC tool grinding machine.' },
  { year: '2025', label: 'Inspection', title: 'Advanced quality control', image: img2025.url, alt: 'Tool inspection on a Walter Helicheck machine', text: 'Integration of a Walter Helicheck Pro measuring machine for advanced inspection and quality control.' },
];

export default function JourneyTimeline() {
  const [active, setActive] = useState(milestones.length - 1);
  const yearsRef = useRef<HTMLOListElement>(null);
  const current = milestones[active];

  // Keep the selected year centred when the row scrolls sideways (phones).
  useEffect(() => {
    const list = yearsRef.current;
    const item = list?.children[active] as HTMLElement | undefined;
    if (!list || !item) return;
    if (list.scrollWidth <= list.clientWidth) return;
    const left = item.offsetLeft - (list.clientWidth - item.clientWidth) / 2;
    list.scrollTo({ left, behavior: 'smooth' });
  }, [active]);
  return (
    <section className={styles.section} aria-labelledby="journey-heading">
      <div className="container">
        <header className={`section-heading ${styles.head}`}>
          <h2 id="journey-heading" className={styles.title}>Milestones of innovation</h2>
          <p className={styles.sub}>From a 2013 trading startup to a precision tool manufacturer.</p>
        </header>
        <div className={styles.timeline}>
          <ol className={styles.years} aria-label="Milestone years" ref={yearsRef}>
            {milestones.map((m, i) => (
              <li key={m.year}>
                <button
                  type="button"
                  className={`${styles.yearButton} ${i === active ? styles.yearActive : ''}`}
                  aria-current={i === active ? 'step' : undefined}
                  aria-controls="journey-panel"
                  onClick={() => setActive(i)}
                >
                  <span className={styles.year}>{m.year}</span>
                  <span className={styles.label}>{m.label}</span>
                </button>
              </li>
            ))}
          </ol>
          <article id="journey-panel" className={styles.card} aria-live="polite" key={current.year}>
            <div className={styles.cardBody}>
              <span className={styles.cardYear}>{current.year}</span>
              <h3 className={styles.cardTitle}>{current.title}</h3>
              <p className={styles.text}>{current.text}</p>
            </div>
            {current.image
              ? <img className={styles.cardImg} src={current.image} alt={current.alt ?? ''} loading="lazy" />
              : <div className={styles.cardMark} aria-hidden="true">{current.year}</div>}
          </article>
        </div>
      </div>
    </section>
  );
}
