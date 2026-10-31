import { Link } from 'react-router-dom';
import styles from './EnquiryFab.module.css';

export default function EnquiryFab() {
  return (
    <aside aria-label="Enquiries">
      <Link to="/contact" className={styles.link}>Enquire now</Link>
    </aside>
  );
}