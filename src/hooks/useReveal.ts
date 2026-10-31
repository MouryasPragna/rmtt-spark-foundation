import { useEffect, useRef, useState } from 'react';

export function useReveal<T extends HTMLElement = HTMLDivElement>(
  options?: IntersectionObserverInit
) {
  const ref = useRef<T | null>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || shown) return;

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setShown(true);
            obs.disconnect();
          }
        });
      },
      {
        threshold: 0.08,
        rootMargin: '0px 0px -40px 0px',
        ...options,
      }
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, [shown]); // options intentionally omitted — passed options are stable at call site

  return { ref, shown };
}

export function useCountUp(
  target: string,
  start: boolean,
  duration = 1600
): string {
  const [value, setValue] = useState(target);

  useEffect(() => {
    if (!start) return;

    const match = target.match(/^([^\d.-]*)([\d.,]+)(.*)$/);
    if (!match) {
      setValue(target);
      return;
    }

    const prefix = match[1];
    const numStr = match[2].replace(/,/g, '');
    const suffix = match[3];
    const end = parseFloat(numStr);

    if (Number.isNaN(end)) {
      setValue(target);
      return;
    }

    const decimals = (numStr.split('.')[1] || '').length;
    const t0 = performance.now();
    let raf = 0;

    const tick = (now: number) => {
      const p = Math.min(1, (now - t0) / duration);
      const eased = 1 - Math.pow(1 - p, 3); // cubic ease-out
      setValue(prefix + (end * eased).toFixed(decimals) + suffix);
      if (p < 1) raf = requestAnimationFrame(tick);
      else setValue(target); // snap to exact final value
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [start, target, duration]);

  return value;
}