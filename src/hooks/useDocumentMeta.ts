import { useEffect } from 'react';
import { SITE_NAME, canonicalUrl } from '../lib/routeMeta';

function setMeta(selector: string, create: () => HTMLElement, apply: (el: HTMLElement) => void) {
  let el = document.head.querySelector<HTMLElement>(selector);
  if (!el) { el = create(); document.head.appendChild(el); }
  apply(el);
}

export function useDocumentMeta(title: string, description: string, pathname: string) {
  useEffect(() => {
    const fullTitle = `${title} | ${SITE_NAME}`;
    const url = canonicalUrl(pathname);
    document.title = fullTitle;
    setMeta('meta[name="description"]', () => Object.assign(document.createElement('meta'), { name: 'description' }), el => el.setAttribute('content', description));
    setMeta('link[rel="canonical"]', () => Object.assign(document.createElement('link'), { rel: 'canonical' }), el => el.setAttribute('href', url));
    for (const [attr, key, value] of [
      ['property', 'og:title', fullTitle], ['property', 'og:description', description], ['property', 'og:url', url],
      ['name', 'twitter:title', fullTitle], ['name', 'twitter:description', description],
    ] as const) {
      setMeta(`meta[${attr}="${key}"]`, () => { const m = document.createElement('meta'); m.setAttribute(attr, key); return m; }, el => el.setAttribute('content', value));
    }
  }, [title, description, pathname]);
}
