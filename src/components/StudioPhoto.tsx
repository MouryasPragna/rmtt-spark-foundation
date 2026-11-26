import styles from './StudioPhoto.module.css';

type Props = {
  src: string;
  alt: string;
  /** Load straight away (above the fold) instead of lazily. */
  eager?: boolean;
  /** Widest the photo itself is shown, in px; the backdrop band carries on to the edges. */
  maxWidth?: number;
};

/**
 * A client studio group photo shown on a full-width band in the photo's own backdrop gradient
 * (`--studio-backdrop`), so the picture blends into the page instead of sitting in a box.
 * The band is exactly as tall as the photo, which keeps the gradients lined up.
 */
export default function StudioPhoto({ src, alt, eager = false, maxWidth = 1200 }: Props) {
  return (
    <div className={styles.band}>
      <img
        className={styles.photo}
        src={src}
        alt={alt}
        width={1600}
        height={900}
        loading={eager ? 'eager' : 'lazy'}
        fetchPriority={eager ? 'high' : undefined}
        decoding="async"
        style={{ maxWidth }}
      />
    </div>
  );
}
