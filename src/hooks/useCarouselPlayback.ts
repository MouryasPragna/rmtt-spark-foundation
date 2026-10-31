import { useEffect, useState } from 'react';
import { canAutoplay } from '../lib/carousel';

export function useCarouselPlayback(count: number) {
  const [reducedMotion, setReducedMotion] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  const [paused, setPaused] = useState(false);
  const [hovering, setHovering] = useState(false);
  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReducedMotion(query.matches);
    query.addEventListener('change', update);
    return () => query.removeEventListener('change', update);
  }, []);
  const playing = canAutoplay(reducedMotion, paused, hovering, count);
  return {
    playing, reducedMotion, paused,
    toggle: () => setPaused(value => !value),
    interactionProps: {
      onMouseEnter: () => setHovering(true),
      onMouseLeave: () => setHovering(false),
      onFocusCapture: () => setPaused(true),
      onTouchStart: () => setPaused(true),
    },
  };
}