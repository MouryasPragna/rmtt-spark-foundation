import PageHero from '../components/PageHero';
import heroPhoto from '../assets/factory-hero-floor.jpg.asset.json';
import { Link } from 'react-router-dom';
import styles from './Contact.module.css';

export default function NotFound() {
  return <div className={styles.main}>
    <PageHero image={heroPhoto.url} alt="RMTT manufacturing facility"><div className="container"><h1 className={styles.pageTitle}>Page not found</h1></div></PageHero>
    <section className={styles.contactSection}><div className={`container ${styles.recoveryLinks}`}>
      <Link to="/">Home</Link>
      <Link to="/products">Products</Link>
    </div></section>
  </div>;
}