import { useRef, useState } from 'react';
import type { KeyboardEvent } from 'react';
import type { LucideIcon } from 'lucide-react';
import type { ProductImage } from '../data/products';
import PhotoPlaceholder from './PhotoPlaceholder';
import styles from './Gallery.module.css';

type Props = { images: ProductImage[]; icon: LucideIcon; width?: number; height?: number; aspect?: string; eager?: boolean };

/** Image group with thumbnail switching only; zoom and the lightbox were removed at client request. */
export default function Gallery({ images, icon, width = 800, height = 800, aspect = '1 / 1', eager = false }: Props) {
  const [index, setIndex] = useState(0);
  const thumbs = useRef<(HTMLButtonElement | null)[]>([]);
  if (!images.length) return <div className={styles.main} style={{ aspectRatio: aspect }}><PhotoPlaceholder icon={icon} /></div>;
  const current = images[Math.min(index, images.length - 1)];

  const onThumbKey = (e: KeyboardEvent, i: number) => {
    const delta = e.key === 'ArrowRight' || e.key === 'ArrowDown' ? 1 : e.key === 'ArrowLeft' || e.key === 'ArrowUp' ? -1 : 0;
    const target = e.key === 'Home' ? 0 : e.key === 'End' ? images.length - 1 : delta ? (i + delta + images.length) % images.length : -1;
    if (target < 0) return;
    e.preventDefault();
    setIndex(target);
    thumbs.current[target]?.focus();
  };

  return (
    <div className={styles.gallery}>
      <div className={styles.main} style={{ aspectRatio: aspect }}>
        <img src={current.src} alt={current.alt} width={width} height={height} loading={eager ? 'eager' : 'lazy'} decoding="async" draggable={false} className={styles.protected} />
      </div>
      {images.length > 1 && (
        <div className={styles.thumbs} role="group" aria-label="Choose image">
          {images.map((img, i) => (
            <button key={img.src + i} ref={el => { thumbs.current[i] = el; }} type="button" className={styles.thumb} aria-current={i === index ? 'true' : undefined} aria-label={`Show image ${i + 1} of ${images.length}: ${img.alt}`} tabIndex={i === index ? 0 : -1} onClick={() => setIndex(i)} onKeyDown={e => onThumbKey(e, i)}>
              <img src={img.src} alt="" width={72} height={72} loading="lazy" decoding="async" draggable={false} className={styles.protected} />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
