import { useRef, useState } from 'react';
import type { KeyboardEvent, PointerEvent } from 'react';
import type { LucideIcon } from 'lucide-react';
import { ZoomIn } from 'lucide-react';
import type { ProductImage } from '../data/products';
import PhotoPlaceholder from './PhotoPlaceholder';
import Lightbox, { preloadImage } from './Lightbox';
import styles from './Gallery.module.css';

const block = (e: { preventDefault(): void }) => e.preventDefault();

type Props = { images: ProductImage[]; icon: LucideIcon; width?: number; height?: number; aspect?: string; eager?: boolean };

export default function Gallery({ images, icon, width = 800, height = 800, aspect = '1 / 1', eager = false }: Props) {
  const [index, setIndex] = useState(0);
  const [open, setOpen] = useState(false);
  const [lens, setLens] = useState<{ x: number; y: number } | null>(null);
  const thumbs = useRef<(HTMLButtonElement | null)[]>([]);
  const viewButton = useRef<HTMLButtonElement>(null);
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

  const onMove = (e: PointerEvent<HTMLButtonElement>) => {
    if (e.pointerType !== 'mouse') return setLens(null);
    const r = e.currentTarget.getBoundingClientRect();
    setLens({ x: ((e.clientX - r.left) / r.width) * 100, y: ((e.clientY - r.top) / r.height) * 100 });
  };

  return (
    <div className={styles.gallery}>
      <button type="button" className={styles.main} style={{ aspectRatio: aspect }} onClick={() => setOpen(true)} onPointerMove={onMove} onPointerLeave={() => setLens(null)} onContextMenu={block} onMouseEnter={() => images[index + 1] && preloadImage(images[index + 1].src)} aria-label={`Open larger view of ${current.alt}`}>
        <img src={current.src} alt={current.alt} width={width} height={height} loading={eager ? 'eager' : 'lazy'} decoding="async" draggable={false} onDragStart={block} className={styles.protected} />
        {lens && <span className={styles.lens} aria-hidden="true" style={{ backgroundImage: `url("${current.src}")`, backgroundPosition: `${lens.x}% ${lens.y}%` }} />}
        <span className={styles.shield} aria-hidden="true" />
      </button>
      <div className={styles.bar}>
        {images.length > 1 && <div className={styles.thumbs} role="group" aria-label="Choose image">
          {images.map((img, i) => (
            <button key={img.src + i} ref={el => { thumbs.current[i] = el; }} type="button" className={styles.thumb} aria-current={i === index ? 'true' : undefined} aria-label={`Show image ${i + 1} of ${images.length}: ${img.alt}`} tabIndex={i === index ? 0 : -1} onClick={() => setIndex(i)} onKeyDown={e => onThumbKey(e, i)} onFocus={() => preloadImage(img.src)} onMouseEnter={() => preloadImage(img.src)} onContextMenu={block}>
              <img src={img.src} alt="" width={72} height={72} loading="lazy" decoding="async" draggable={false} onDragStart={block} className={styles.protected} />
            </button>
          ))}
        </div>}
        <button ref={viewButton} type="button" className={styles.viewLarger} onClick={() => setOpen(true)} aria-label={`View larger: ${current.alt}`} title="View larger"><ZoomIn size={18} aria-hidden="true" /></button>
      </div>
      {open && <Lightbox images={images} index={index} onIndex={setIndex} onClose={() => setOpen(false)} />}
    </div>
  );
}
