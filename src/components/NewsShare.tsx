import { useState } from 'react';
import { Check, Copy, MessageCircle } from 'lucide-react';
import { newsShareLinks } from '../lib/newsSharing';
import styles from '../pages/News.module.css';

export default function NewsShare({ id, title }: { id: string; title: string }) {
  const links = newsShareLinks(id, title);
  const [status, setStatus] = useState<'idle' | 'copied' | 'failed'>('idle');
  async function copy() {
    try {
      await navigator.clipboard.writeText(links.url);
      setStatus('copied');
    } catch {
      setStatus('failed');
    }
  }
  return <div className={styles.share}>
    <span className={styles.shareLabel}>Share article</span>
    <a className={styles.shareControl} href={links.linkedin} target="_blank" rel="noopener noreferrer" title="Share on LinkedIn" aria-label="Share on LinkedIn (opens in a new tab)"><strong aria-hidden="true">in</strong></a>
    <a className={styles.shareControl} href={links.whatsapp} target="_blank" rel="noopener noreferrer" title="Share on WhatsApp" aria-label="Share on WhatsApp (opens in a new tab)"><MessageCircle size={20} aria-hidden="true" /></a>
    <button className={styles.shareControl} type="button" onClick={copy} title="Copy article link" aria-label="Copy article link">{status === 'copied' ? <Check size={20} aria-hidden="true" /> : <Copy size={20} aria-hidden="true" />}</button>
    <span role="status" className={styles.shareStatus}>{status === 'copied' ? 'Link copied' : status === 'failed' ? 'Select and copy the link below.' : ''}</span>
    {status === 'failed' && <input className={styles.copyFallback} aria-label="Article link" value={links.url} readOnly onFocus={event => event.target.select()} />}
  </div>;
}