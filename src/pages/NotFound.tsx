import { Link } from 'react-router-dom';
import styles from './Contact.module.css';

export default function NotFound() {
  return <div className={styles.main}>
    <section className={styles.pageHero}><div className="container"><h1 className={styles.pageTitle}>Page not found</h1></div></section>
    <section className={styles.contactSection}><div className={`container ${styles.recoveryLinks}`}>
      <Link to="/">Home</Link>
      <Link to="/products">Products</Link>
    </div></section>
  </div>;
}