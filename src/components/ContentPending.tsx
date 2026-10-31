import styles from './ContentPending.module.css';

type Props = {
  /** What is missing, e.g. "The detailed coating programme". Rendered inside the sentence. */
  what: string;
  /** Optional replacement wording when the default sentence does not fit. */
  note?: string;
  /** Visual tone: compact inline note or a full standalone block. */
  tone?: 'inline' | 'block';
};

/**
 * Flags content that waits on approved client material instead of fabricating copy.
 * Used by capability and service blocks whose supporting evidence has not been supplied.
 */
export default function ContentPending({ what, note, tone = 'inline' }: Props) {
  return (
    <p className={`${styles.note} ${tone === 'block' ? styles.block : ''}`} role="note">
      <span className={styles.label}>Client approval pending</span>
      {note ?? `${what} will be added once approved supporting material is supplied.`}
    </p>
  );
}
