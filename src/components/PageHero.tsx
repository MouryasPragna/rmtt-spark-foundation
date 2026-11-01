import type { ReactNode } from 'react';
import styles from './PageHero.module.css';

type Props = {
  image: string;
  alt: string;
  children: ReactNode;
  tools?: boolean;
};

/** Shared image hero; tool photographs stay fully visible without cropping. */
export default function PageHero({ image, alt, children, tools = false }: Props) {
  const src = /^(https?:|data:|\/)/.test(image) ? image : `${import.meta.env.BASE_URL}${image}`;
  const photo = <img className={styles.photo} src={src} alt={alt} width={1600} height={600} fetchPriority="high" decoding="async" />;
  return (
    <section className={`${styles.hero} ${tools ? styles.tools : ''}`} data-page-hero>
      {!tools && photo}
      <div className={`container ${styles.content}`}>{children}</div>
      {tools && photo}
    </section>
  );
}