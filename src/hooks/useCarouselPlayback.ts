import { useEffect, useState } from 'react';
import { canAutoplay } from '../lib/carousel';

const isToggle = (target: EventTarget) =>
  target instanceof Element && target.closest('[data-carousel-toggle]') !== null;

/** `autoplay: false` starts paused: nothing moves until the visitor presses Play. */
export function useCarouselPlayback(count: number, { autoplay = true }: { autoplay?: boolean } = {}) {
  // Starts false so the build-time render and the first browser render match; the
  // effect below applies the visitor's real preference immediately after mount.
  const [reducedMotion, setReducedMotion] = useState(false);
  const [paused, setPaused] = useState(!autoplay);
  const [hovering, setHovering] = useState(false);
  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReducedMotion(query.matches);
    update();
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
      // Focus or touch inside the carousel pauses it, except on the play/pause
      // button itself: that button sets the state explicitly, so pausing on its
      // focus would make the first click resume instead of pause.
      onFocusCapture: (event: { target: EventTarget }) => { if (!isToggle(event.target)) setPaused(true); },
      onTouchStart: (event: { target: EventTarget }) => { if (!isToggle(event.target)) setPaused(true); },
    },
  };
}