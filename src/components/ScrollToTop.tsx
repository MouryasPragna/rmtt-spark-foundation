import { useLayoutEffect } from 'react';
import { useLocation } from 'react-router-dom';

// Reset scroll to the top whenever the route changes (HashRouter keeps the previous
// scroll position otherwise). Skipped when the URL carries an in-page hash so pages
// that scroll to a section (e.g. product categories) keep working.
export default function ScrollToTop() {
  const { pathname, search, hash } = useLocation();
  useLayoutEffect(() => {
    if (hash) return;
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
  }, [pathname, search, hash]);
  return null;
}
