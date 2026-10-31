import styles from './JourneyTimeline.module.css';

interface Milestone {
  year: string;
  text: string;
}

const milestones: Milestone[] = [
  { year: '2017', text: 'Established a dedicated manufacturing unit for solid carbide tools, marking the shift from trading to production.' },
  { year: '2018', text: 'Strategic investment in a 5-axis CNC tool grinding machine strengthened capabilities in high-precision tool manufacturing.' },
  { year: '2020', text: 'Expanded into PCD tool manufacturing with the addition of a Vollmer EDM machine, enabling advanced specialised tooling solutions.' },
  { year: '2022', text: 'Capacity and efficiency further enhanced with the installation of a second CNC tool grinding machine.' },
  { year: '2025', text: 'Integration of a Walter Helicheck Pro measuring machine for advanced inspection and quality control.' },
];

export default function JourneyTimeline() {
  return (
    <section className={styles.section} aria-labelledby="journey-heading">
      <div className="container">
        <header className={`section-heading ${styles.head}`}>
          <h2 id="journey-heading" className={styles.title}>Milestones of innovation</h2>
          <p className={styles.sub}>From a 2013 trading startup to a precision tool manufacturer.</p>
        </header>
        <p className={styles.intro}>
          We began our journey in 2013 as a startup trading company, laying the foundation
          for our presence in the precision tooling industry.
        </p>
        <ol className={styles.milestones}>
          {milestones.map(milestone => (
            <li key={milestone.year} className={styles.milestone}>
              <span className={styles.year}>{milestone.year}</span>
              <p className={styles.text}>{milestone.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
