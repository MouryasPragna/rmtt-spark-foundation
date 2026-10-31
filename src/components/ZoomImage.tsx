import { useState, type PointerEvent } from 'react';
import { ZoomIn } from 'lucide-react';
import Lightbox from './Lightbox';
import styles from './ZoomImage.module.css';

export default function ZoomImage({ src, alt, width = 800, height = 600, eager = false }: { src: string; alt: string; width?: number; height?: number; eager?: boolean }) {
  const [open, setOpen] = useState(false);
  const [origin, setOrigin] = useState<string | null>(null);
  const onMove = (e: PointerEvent<HTMLButtonElement>) => {
    if (e.pointerType !== 'mouse') return setOrigin(null);
    const r = e.currentTarget.getBoundingClientRect();
    setOrigin(`${((e.clientX - r.left) / r.width) * 100}% ${((e.clientY - r.top) / r.height) * 100}%`);
  };
  return <>
    <button type="button" className={`${styles.image} ${origin ? styles.zooming : ''}`} onClick={() => setOpen(true)} onPointerMove={onMove} onPointerLeave={() => setOrigin(null)} aria-label={`Open larger view of ${alt}`} title="Click to view larger">
      <span className={styles.frame}>
        <img src={src} alt={alt} width={width} height={height} loading={eager ? 'eager' : 'lazy'} decoding="async" draggable={false} style={origin ? { transformOrigin: origin } : undefined} />
      </span>
      <span className={styles.control} aria-hidden="true"><ZoomIn size={16} /></span>
    </button>
    {open && <Lightbox images={[{ src, alt }]} index={0} onIndex={() => {}} onClose={() => setOpen(false)} />}
  </>;
}
