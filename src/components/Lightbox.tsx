import { useCallback, useEffect, useRef, useState } from 'react';
import type { PointerEvent } from 'react';
import { createPortal } from 'react-dom';
import { ChevronLeft, ChevronRight, Minus, Plus, RotateCcw, X } from 'lucide-react';
import type { ProductImage } from '../data/products';
import styles from './Gallery.module.css';

const loaded = new Set<string>();
export function preloadImage(src: string) {
  if (loaded.has(src) || typeof Image === 'undefined') return;
  loaded.add(src);
  const img = new Image();
  img.decoding = 'async';
  img.src = src;
}

const MIN = 1, MAX = 4;
const clamp = (v: number) => Math.min(MAX, Math.max(MIN, v));
const block = (e: { preventDefault(): void }) => e.preventDefault();

type View = { z: number; x: number; y: number };
const RESET: View = { z: 1, x: 0, y: 0 };

export default function Lightbox({ images, index, onIndex, onClose }: { images: ProductImage[]; index: number; onIndex: (i: number) => void; onClose: () => void }) {
  const dialog = useRef<HTMLDivElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const [view, setView] = useState<View>(RESET);
  const viewRef = useRef(view);
  viewRef.current = view;
  const pointers = useRef(new Map<number, { x: number; y: number }>());
  const gesture = useRef<{ dist: number; z: number } | null>(null);
  const count = images.length;
  const current = images[index];

  const go = useCallback((d: number) => { onIndex((index + d + count) % count); setView(RESET); }, [index, count, onIndex]);

  // Zoom anchored at a stage-relative point (centre when omitted).
  const zoomTo = useCallback((next: number, px?: number, py?: number) => {
    const el = stage.current;
    setView(v => {
      const z = clamp(next);
      if (z === 1) return RESET;
      const r = el?.getBoundingClientRect();
      const cx = px ?? (r ? r.width / 2 : 0), cy = py ?? (r ? r.height / 2 : 0);
      const ox = r ? cx - r.width / 2 : 0, oy = r ? cy - r.height / 2 : 0;
      const k = z / v.z;
      return { z, x: ox - (ox - v.x) * k, y: oy - (oy - v.y) * k };
    });
  }, []);

  useEffect(() => {
    const opener = document.activeElement as HTMLElement | null;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    dialog.current?.querySelector<HTMLElement>('[data-autofocus]')?.focus();
    return () => { document.body.style.overflow = prevOverflow; opener?.focus(); };
  }, []);

  useEffect(() => { if (count > 1) preloadImage(images[(index + 1) % count].src); }, [index, count, images]);

  useEffect(() => {
    const el = stage.current;
    if (!el) return;
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      const dy = e.deltaY * (e.deltaMode === 1 ? 16 : e.deltaMode === 2 ? 100 : 1);
      const r = el.getBoundingClientRect();
      zoomTo(viewRef.current.z * Math.exp(-dy * 0.0015), e.clientX - r.left, e.clientY - r.top);
    };
    el.addEventListener('wheel', onWheel, { passive: false });
    return () => el.removeEventListener('wheel', onWheel);
  }, [zoomTo]);

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') { e.preventDefault(); onClose(); }
    else if (e.key === 'ArrowRight' && count > 1) go(1);
    else if (e.key === 'ArrowLeft' && count > 1) go(-1);
    else if (e.key === '+' || e.key === '=') zoomTo(view.z * 1.5);
    else if (e.key === '-') zoomTo(view.z / 1.5);
    else if (e.key === '0') setView(RESET);
    else if (e.key === 'Tab') {
      const items = Array.from(dialog.current?.querySelectorAll<HTMLElement>('button:not([disabled])') ?? []);
      if (!items.length) return;
      const first = items[0], last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  };

  const onDown = (e: PointerEvent<HTMLDivElement>) => {
    e.currentTarget.setPointerCapture(e.pointerId);
    pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY });
    if (pointers.current.size === 2) {
      const [a, b] = [...pointers.current.values()];
      gesture.current = { dist: Math.hypot(a.x - b.x, a.y - b.y), z: viewRef.current.z };
    }
  };
  const onMovePtr = (e: PointerEvent<HTMLDivElement>) => {
    const prev = pointers.current.get(e.pointerId);
    if (!prev) return;
    pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY });
    if (pointers.current.size === 2 && gesture.current) {
      const [a, b] = [...pointers.current.values()];
      const r = e.currentTarget.getBoundingClientRect();
      zoomTo(gesture.current.z * (Math.hypot(a.x - b.x, a.y - b.y) / gesture.current.dist), (a.x + b.x) / 2 - r.left, (a.y + b.y) / 2 - r.top);
    } else if (viewRef.current.z > 1) {
      setView(v => ({ ...v, x: v.x + e.clientX - prev.x, y: v.y + e.clientY - prev.y }));
    }
  };
  const onUp = (e: PointerEvent<HTMLDivElement>) => {
    pointers.current.delete(e.pointerId);
    if (pointers.current.size < 2) gesture.current = null;
  };

  return createPortal(
    <div ref={dialog} className={styles.lightbox} role="dialog" aria-modal="true" aria-label={`Image viewer: ${current.alt}`} onKeyDown={onKey}>
      <div className={styles.lbTop}>
        <span className={styles.counter} aria-live="polite">{index + 1} / {count}</span>
        <div className={styles.lbTools}>
          <button type="button" onClick={() => zoomTo(view.z / 1.5)} disabled={view.z <= MIN} aria-label="Zoom out"><Minus size={20} /></button>
          <button type="button" onClick={() => zoomTo(view.z * 1.5)} disabled={view.z >= MAX} aria-label="Zoom in"><Plus size={20} /></button>
          <button type="button" onClick={() => setView(RESET)} disabled={view.z === 1} aria-label="Reset zoom"><RotateCcw size={20} /></button>
          <button type="button" onClick={onClose} aria-label="Close image viewer" data-autofocus><X size={22} /></button>
        </div>
      </div>
      <div ref={stage} className={styles.stage} data-zoomed={view.z > 1 || undefined} onPointerDown={onDown} onPointerMove={onMovePtr} onPointerUp={onUp} onPointerCancel={onUp} onContextMenu={block}>
        <img key={current.src} src={current.src} alt={current.alt} decoding="async" draggable={false} onDragStart={block} className={`${styles.lbImg} ${styles.protected}`} style={{ transform: `translate(${view.x}px, ${view.y}px) scale(${view.z})` }} />
        <span className={styles.shield} aria-hidden="true" />
      </div>
      {count > 1 && <>
        <button type="button" className={`${styles.lbNav} ${styles.lbPrev}`} onClick={() => go(-1)} onMouseEnter={() => preloadImage(images[(index - 1 + count) % count].src)} onFocus={() => preloadImage(images[(index - 1 + count) % count].src)} aria-label="Previous image"><ChevronLeft size={28} /></button>
        <button type="button" className={`${styles.lbNav} ${styles.lbNext}`} onClick={() => go(1)} onMouseEnter={() => preloadImage(images[(index + 1) % count].src)} onFocus={() => preloadImage(images[(index + 1) % count].src)} aria-label="Next image"><ChevronRight size={28} /></button>
      </>}
    </div>,
    document.body,
  );
}
