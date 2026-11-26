import { useEffect, useState } from 'react';

/**
 * Reveals an element once it scrolls into view.
 * Returns a callback ref (attach with `ref={reveal.ref}`) and whether the element has been shown.
 * The element is held in state rather than a ref object, so reading `shown` during render is
 * safe and the observer re-attaches if the element changes.
 */
export function useReveal<T extends HTMLElement = HTMLDivElement>(
  options?: IntersectionObserverInit
) {
  const [node, setNode] = useState<T | null>(null);
  const [shown, setShown] = useState(false);
  const root = options?.root;
  const rootMargin = options?.rootMargin ?? '0px 0px -40px 0px';
  const threshold = options?.threshold ?? 0.08;

  useEffect(() => {
    if (!node || shown) return;
    const obs = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setShown(true);
          obs.disconnect();
        }
      },
      { root, rootMargin, threshold },
    );
    obs.observe(node);
    return () => obs.disconnect();
  }, [node, shown, root, rootMargin, threshold]);

  return { ref: setNode, shown };
}
