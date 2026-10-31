import styles from './WhatsAppFab.module.css';
import { siteConfig } from '../lib/siteConfig';

const MESSAGE = 'Hello Riddhi team, I would like to discuss a tooling requirement.';

export default function WhatsAppFab() {
  const href = `https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(MESSAGE)}`;
  return (
    <aside aria-label="WhatsApp contact">
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className={styles.fab}
    >
      <span className={styles.pulse} aria-hidden="true" />
      <svg viewBox="0 0 32 32" width="28" height="28" fill="currentColor" aria-hidden="true">
        <path d="M16.003 3C9.374 3 4 8.373 4 14.999c0 2.382.69 4.6 1.88 6.473L4 29l7.71-1.83a11.96 11.96 0 0 0 4.293.788h.005C22.626 27.958 28 22.585 28 15.959 28 12.74 26.747 9.71 24.475 7.437A11.92 11.92 0 0 0 16.003 3Zm0 21.946h-.004a9.95 9.95 0 0 1-5.072-1.388l-.364-.216-4.575 1.086 1.108-4.46-.237-.376a9.92 9.92 0 0 1-1.529-5.293c0-5.493 4.476-9.964 9.978-9.964 2.666 0 5.171 1.04 7.054 2.923a9.892 9.892 0 0 1 2.924 7.05c-.002 5.493-4.479 9.638-9.283 9.638Zm5.474-7.453c-.3-.15-1.775-.876-2.05-.976-.275-.1-.475-.15-.674.15-.2.3-.774.976-.949 1.176-.175.2-.349.225-.649.075-.3-.15-1.266-.466-2.412-1.487-.892-.795-1.494-1.778-1.669-2.078-.175-.3-.019-.462.131-.612.135-.135.3-.349.45-.524.15-.175.2-.3.3-.5.1-.2.05-.375-.025-.525-.075-.15-.674-1.624-.924-2.224-.243-.583-.49-.503-.674-.512l-.575-.01a1.1 1.1 0 0 0-.8.375c-.275.3-1.05 1.025-1.05 2.5s1.075 2.9 1.225 3.1c.15.2 2.114 3.227 5.124 4.527.716.31 1.275.495 1.71.633.718.228 1.372.196 1.889.119.576-.086 1.775-.726 2.025-1.426.25-.7.25-1.3.175-1.425-.075-.125-.275-.2-.575-.35Z"/>
      </svg>
    </a>
    </aside>
  );
}
