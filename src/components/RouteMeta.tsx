import { useLocation } from 'react-router-dom';
import { getRouteMeta } from '../lib/routeMeta';
import { useDocumentMeta } from '../hooks/useDocumentMeta';

/** Keeps the title, description and canonical link in step with client-side navigation.
 *  The same values are written into each page's HTML at build time (scripts/prerender.ts). */
export default function RouteMeta() {
  const { pathname } = useLocation();
  const { title, description } = getRouteMeta(pathname);
  useDocumentMeta(title, description, pathname);
  return null;
}
