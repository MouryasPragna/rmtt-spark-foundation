import type { LucideIcon } from 'lucide-react';
import styles from './PhotoPlaceholder.module.css';

export default function PhotoPlaceholder({ icon: Icon }: { icon: LucideIcon }) {
  // TODO: replace with real photo
  return <div className={styles.panel} aria-hidden="true"><Icon size={64} strokeWidth={1.25} /></div>;
}