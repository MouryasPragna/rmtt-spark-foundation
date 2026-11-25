import { useEffect, useRef, useState } from 'react';
import carbide from '../assets/pcd-anatomy-carbide.webp.asset.json';
import brazed from '../assets/pcd-anatomy-brazed.webp.asset.json';
import steel from '../assets/pcd-anatomy-steel.webp.asset.json';
import styles from './PcdAnatomy.module.css';

type Align = 'left' | 'right' | 'below';
interface Callout { n: number; title: string; desc: string; points: [number, number][]; label: [number, number]; align: Align }
interface Figure { src: string; alt: string; ratio: number; photo: { left: number; top: number; width: number; height: number }; callouts: Callout[] }

/** Coordinates are percentages of each figure canvas (photo + label space). */
const FIGURES: Figure[] = [
  {
    src: carbide.url, alt: 'RMTT PCD tool with a solid carbide body, showing PCD cutting tips and smooth flutes',
    ratio: 0.733, photo: { left: 0, top: 0, width: 40, height: 100 },
    callouts: [
      { n: 1, title: 'Well-balanced PCD material', desc: 'PCD grade selected to suit the workpiece material and application.', points: [[5.4, 3.6]], label: [48, 7], align: 'left' },
      { n: 2, title: 'High-quality pocket seats', desc: 'Precisely machined seats hold each PCD tip securely in position.', points: [[6.4, 14]], label: [48, 21], align: 'left' },
      { n: 3, title: 'Perfect smooth flutes', desc: 'Polished flutes guide chips cleanly away from the cutting zone.', points: [[12.4, 35]], label: [48, 40], align: 'left' },
      { n: 4, title: 'Solid carbide body', desc: 'A rigid carbide body for stable, vibration-resistant cutting.', points: [[20.8, 74]], label: [48, 74], align: 'left' },
    ],
  },
  {
    src: brazed.url, alt: 'Close-up of a PCD tip brazed onto the tool body',
    ratio: 0.64, photo: { left: 0, top: 0, width: 100, height: 77.6 },
    callouts: [
      { n: 5, title: 'Seamless brazing', desc: 'PCD tips are brazed to the body for a clean, durable joint.', points: [[14, 58], [86, 72]], label: [50, 86], align: 'below' },
    ],
  },
  {
    src: steel.url, alt: 'RMTT PCD form tool with a steel body and ground PCD cutting edges',
    ratio: 0.95, photo: { left: 55, top: 0, width: 45, height: 100 },
    callouts: [
      { n: 6, title: 'Wire EDM + lapping and grinding of cutting edges', desc: 'Edges are wire-eroded, then lapped and ground for a sharp finish.', points: [[71.7, 5], [58.2, 33]], label: [50, 18], align: 'right' },
      { n: 7, title: 'Steel body', desc: 'A tough steel body suited to larger and complex tool designs.', points: [[78.9, 80]], label: [50, 80], align: 'right' },
    ],
  },
];

const ALL = FIGURES.flatMap(f => f.callouts);

export default function PcdAnatomy() {
  const ref = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);
  const [active, setActive] = useState<number | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === 'undefined') { setInView(true); return; }
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setInView(true); io.disconnect(); } }, { threshold: 0.2 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const bind = (n: number) => ({
    onMouseEnter: () => setActive(n),
    onMouseLeave: () => setActive(a => (a === n ? null : a)),
    onFocus: () => setActive(n),
    onBlur: () => setActive(a => (a === n ? null : a)),
    onClick: () => setActive(a => (a === n ? null : n)),
  });

  return (
    <section ref={ref} className={`${styles.anatomy} ${inView ? styles.inView : ''}`} aria-labelledby="pcd-anatomy-heading">
      <h2 id="pcd-anatomy-heading" className={`section-heading-title ${styles.heading}`}>Anatomy of an RMTT PCD tool</h2>
      <div className={styles.figures}>
        {FIGURES.map((fig, fi) => (
          <figure key={fig.src} className={styles.figure} style={{ ['--ratio' as string]: String(fig.ratio), ['--photo-ratio' as string]: String(fig.ratio * fig.photo.width / fig.photo.height), ['--fi' as string]: fi }}>
            <img
              src={`${import.meta.env.BASE_URL}${fig.src}`}
              alt={fig.alt}
              className={styles.photo}
              style={{ left: `${fig.photo.left}%`, top: `${fig.photo.top}%`, width: `${fig.photo.width}%`, height: `${fig.photo.height}%` }}
              loading="lazy" decoding="async" draggable={false}
            />
            <svg className={styles.lines} viewBox={`0 0 100 ${100 / fig.ratio}`} aria-hidden="true">
              {fig.callouts.flatMap(c => c.points.map(([x, y], pi) => (
                <line key={`${c.n}-${pi}`} x1={x} y1={y / fig.ratio} x2={c.label[0]} y2={(c.align === 'below' ? c.label[1] - 2 : c.label[1]) / fig.ratio}
                  pathLength={1}
                  className={`${styles.line} ${active === c.n ? styles.lineActive : ''}`} style={{ ['--i' as string]: c.n }} />
              )))}
            </svg>
            {fig.callouts.map(c => c.points.map(([x, y], pi) => (
              pi === 0 ? (
                <button key={`m${c.n}`} type="button" className={`${styles.marker} ${active === c.n ? styles.active : ''}`}
                  style={{ ['--x' as string]: `${x}%`, ['--y' as string]: `${y}%`, ['--px' as string]: `${((x - fig.photo.left) / fig.photo.width) * 100}%`, ['--py' as string]: `${((y - fig.photo.top) / fig.photo.height) * 100}%`, ['--i' as string]: c.n }}
                  aria-label={`${c.n}. ${c.title}: ${c.desc}`} aria-pressed={active === c.n} {...bind(c.n)}>
                  {c.n}
                </button>
              ) : (
                <span key={`m${c.n}-${pi}`} aria-hidden="true" className={`${styles.marker} ${styles.dot} ${active === c.n ? styles.active : ''}`}
                  style={{ ['--x' as string]: `${x}%`, ['--y' as string]: `${y}%`, ['--px' as string]: `${((x - fig.photo.left) / fig.photo.width) * 100}%`, ['--py' as string]: `${((y - fig.photo.top) / fig.photo.height) * 100}%`, ['--i' as string]: c.n }} />
              )
            )))}
            {fig.callouts.map(c => (
              <div key={`l${c.n}`} aria-hidden="true"
                className={`${styles.label} ${styles[c.align]} ${active === c.n ? styles.labelActive : ''}`}
                style={{ left: `${c.label[0]}%`, top: `${c.label[1]}%`, ['--i' as string]: c.n }}
                onMouseEnter={() => setActive(c.n)} onMouseLeave={() => setActive(a => (a === c.n ? null : a))}
                onClick={() => setActive(a => (a === c.n ? null : c.n))}>
                <span className={styles.labelTitle}>{c.title}</span>
                <span className={styles.labelDesc}>{c.desc}</span>
              </div>
            ))}
          </figure>
        ))}
      </div>
      <ol className={styles.list}>
        {ALL.map(c => (
          <li key={c.n} className={active === c.n ? styles.listActive : ''} style={{ ['--i' as string]: c.n }}>
            <span className={styles.listNum} aria-hidden="true">{c.n}</span>
            <span><strong>{c.title}</strong><br />{c.desc}</span>
          </li>
        ))}
      </ol>
    </section>
  );
}
