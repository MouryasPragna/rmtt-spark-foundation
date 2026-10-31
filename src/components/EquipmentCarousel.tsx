import { useEffect, useState } from 'react';
import { useCarouselPlayback } from '../hooks/useCarouselPlayback';
import ZoomImage from './ZoomImage';
import styles from './EquipmentCarousel.module.css';

type Item = { id: string; image?: string; imageAlt: string; shortName?: string; name: string; summary?: string };

export default function EquipmentCarousel({ items }: { items: Item[] }) {
  const slides = items.filter(i => i.image);
  const [index, setIndex] = useState(0);
  const playback = useCarouselPlayback(slides.length);
  const go = (n: number) => setIndex((n + slides.length) % slides.length);
  useEffect(() => {
    if (!playback.playing) return;
    const t = window.setTimeout(() => setIndex(i => (i + 1) % slides.length), 5000);
    return () => window.clearTimeout(t);
  }, [playback.playing, index, slides.length]);
  if (!slides.length) return null;
  const s = slides[index];
  return (
    <section className={styles.carousel} aria-roledescription="carousel" aria-label="Manufacturing equipment" {...playback.interactionProps}>
      <div className={styles.slide} aria-live={playback.playing ? 'off' : 'polite'}>
        <div className={styles.media} key={s.id}>
          <ZoomImage src={s.image!} alt={s.imageAlt} width={1000} height={750} />
        </div>
        <div className={styles.caption}>
          <div className={styles.name}>{s.shortName ?? s.name}</div>
          {s.summary && <div className={styles.summary}>{s.summary}</div>}
        </div>
      </div>
      <div className={styles.controls}>
        <div className={styles.dots}>
          {slides.map((m, i) => (
            <button key={m.id} type="button" className={i === index ? styles.dotActive : styles.dot} onClick={() => go(i)} aria-label={`Show ${m.shortName ?? m.name}`} aria-current={i === index} />
          ))}
        </div>
      </div>
    </section>
  );
}
