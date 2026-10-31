import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail } from 'lucide-react';
import styles from './Footer.module.css';
import { siteConfig } from '../lib/siteConfig';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.top}>
        <div className="container">
          <div className={styles.grid}>
            <div className={styles.brand}>
              <img src={`${import.meta.env.BASE_URL}1.png`} alt="Riddhi Machine Tool Technology" width={1805} height={592} loading="lazy" className={styles.logoImg} />
              
            </div>

            <div className={styles.col}>
              <h2 className={styles.colTitle}>Products</h2>
              <ul className={styles.links}>
                <li><Link to="/products/solid-carbide">Solid Carbide Tools</Link></li>
                <li><Link to="/products/pcd">PCD Tools</Link></li>
                <li><Link to="/products/brazed">Brazed Carbide Tools</Link></li>
                <li><Link to="/products">All products</Link></li>
              </ul>
            </div>

            <div className={styles.col}>
              <h2 className={styles.colTitle}>Company</h2>
              <ul className={styles.links}>
                <li><Link to="/about">About Riddhi</Link></li>
                <li><Link to="/services">Services</Link></li>
                <li><Link to="/applications">Applications</Link></li>
                <li><Link to="/news">News</Link></li>
                <li><Link to="/contact">Contact Us</Link></li>
                <li><Link to="/downloads">Downloads</Link></li>
              </ul>
            </div>

            <div className={styles.col}>
              <h2 className={styles.colTitle}>Contact</h2>
              <ul className={styles.contactList}>
                <li>
                  <MapPin size={14} className={styles.contactIcon} />
                  <span>{siteConfig.address.street},<br />{siteConfig.address.cityLine}</span>
                </li>
                <li>
                  <Phone size={14} className={styles.contactIcon} />
                  <a href={siteConfig.phoneHref}>{siteConfig.phone}</a>
                </li>
                <li>
                  <Mail size={14} className={styles.contactIcon} />
                  <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
                </li>
              </ul>
            </div>
            <div className={styles.followCol}>
              <h2 className={styles.colTitle}>Follow us</h2>
              <div className={styles.socials}>
                <a
                  href="https://in.linkedin.com/company/riddhi-machine-tool-technology-blr"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Follow Riddhi on LinkedIn — opens LinkedIn in a new tab"
                  className={styles.social}>
              
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                    <rect x="2" y="9" width="4" height="12"/>
                    <circle cx="4" cy="4" r="2"/>
                  </svg>
                </a>
              </div>
            </div>
        </div>
      </div>
    </div>

      <div className={styles.bottom}>
        <div className="container">
          <div className={styles.bottomInner}>
            <img src={`${import.meta.env.BASE_URL}2.png`} alt="Make in India" width={1500} height={704} loading="lazy" className={styles.makeInIndiaImage} />
            <span>© {new Date().getFullYear()} Riddhi Machine Tool Technology. Images may not be copied or reused without permission.</span>
            <div className={styles.bottomLinks}>
              <Link to="/privacy">Privacy Policy</Link>
              <Link to="/terms">Terms</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
