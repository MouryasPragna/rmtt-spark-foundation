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
    <section className={styles.section}>
      <div className="container">

        {/* Header */}
        <div className={styles.head}>
          <div className="section-eyebrow">Our journey</div>
          <h2 className={styles.title}>Milestones of innovation</h2>
          <p className={styles.sub}>
            From a 2013 trading startup to a precision tool manufacturer.
          </p>
          <p className={styles.intro}>
            We began our journey in 2013 as a startup trading company, laying the foundation
            for our presence in the precision tooling industry.
          </p>
        </div>

        {/* Timeline */}
        <div className={styles.timelineWrap}>

          {/* Horizontal connector line */}
          <div className={styles.line} />

          {/* Items */}
          <div className={styles.items}>
            {milestones.map((m, i) => {
              const isAbove = i % 2 === 0; // odd index (1,3,5) → above line
              return (
                <div key={m.year} className={styles.item}>

                  {/* ABOVE slot */}
                  <div className={styles.slotAbove}>
                    {isAbove && (
                      <div className={styles.card}>
                        <div className={styles.year}>{m.year}</div>
                        <p className={styles.text}>{m.text}</p>
                      </div>
                    )}
                    {isAbove && <div className={styles.stem} />}
                  </div>

                  {/* DOT on the line */}
                  <div className={styles.dotWrap}>
                    <div className={styles.dot} />
                  </div>

                  {/* BELOW slot */}
                  <div className={styles.slotBelow}>
                    {!isAbove && <div className={styles.stem} />}
                    {!isAbove && (
                      <div className={styles.card}>
                        <div className={styles.year}>{m.year}</div>
                        <p className={styles.text}>{m.text}</p>
                      </div>
                    )}
                  </div>

                </div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}
