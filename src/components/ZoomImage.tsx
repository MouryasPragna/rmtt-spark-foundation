import styles from './ZoomImage.module.css';

type Props = { src: string; alt: string; width?: number; height?: number; eager?: boolean };

/** Plain non-interactive image; zoom and the lightbox were removed at client request. */
export default function ZoomImage({ src, alt, width = 800, height = 600, eager = false }: Props) {
  return (
    <span className={styles.image}>
      <span className={styles.frame}>
        <img src={src} alt={alt} width={width} height={height} loading={eager ? 'eager' : 'lazy'} decoding="async" draggable={false} />
      </span>
    </span>
  );
}
