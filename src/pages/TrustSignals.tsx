import { useState } from 'react';
import { Download, FileText, Award } from 'lucide-react';
import styles from './TrustSignals.module.css';
import pageStyles from './Contact.module.css';
import { customers } from '../data/customers';
import { siteConfig } from '../lib/siteConfig';

// ── TYPES ────────────────────────────────────────────────────────────────────
interface Certificate {
  id: string;
  icon: typeof Award;
  title: string;
  subtitle: string;
  description: string;
  color: string;
  bg: string;
}

interface Download {
  id: string;
  title: string;
  description: string;
  fileType: string;
  href: string;
  featured?: boolean;
}

// ── DATA ─────────────────────────────────────────────────────────────────────
const certificates: Certificate[] = [
  {
    id: 'manufacturing-equipment',
    icon: Award,
    title: 'Manufacturing equipment',
    subtitle: 'Our facility',
    description: 'Manufactured on SAACKE 5-axis grinding and VOLLMER Wire EDM machines.',
    color: 'var(--blue)',
    bg: 'var(--surface)',
  },
];

// TODO: Add per-category datasheets when real PDFs are available.
const downloads: Download[] = [
  {
    id: 'company-catalogue',
    title: 'Product Catalogue',
    description:
      'FINAL company catalogue — solid carbide, PCD and brazed carbide tools, specifications, equipment and leadership.',
    fileType: 'PDF',
    href: siteConfig.catalogueUrl,
    featured: true,
  },

];

// ── COMPONENT ────────────────────────────────────────────────────────────────
export default function TrustSignals() {
  const [downloading, setDownloading] = useState<string | null>(null);

  const handleDownload = (item: Download) => {
    setDownloading(item.id);
    setTimeout(() => setDownloading(null), 2000);
  };

  return (
    <div className={styles.wrapper}>
      <section className={pageStyles.pageHero}>
        <div className="container">
          <h1 className={pageStyles.pageTitle}>Downloads</h1>
        </div>
      </section>

      {/* ── 2. QUALITY CERTIFICATES ── */}
      <section className={styles.certSection}>
        <div className="container">
          <div className={styles.sectionHead}>
            <div className="section-eyebrow">Our equipment</div>
            <h2 className={styles.sectionTitle}>Manufacturing equipment</h2>
            <p className={styles.sectionSub}>
              SAACKE grinding and VOLLMER Wire EDM are part of our Bengaluru facility.
            </p>
          </div>
          <div className={styles.certGrid}>
            {certificates.map((cert) => (
              <div key={cert.id} className={styles.certCard}>
                <div className={styles.certIconWrap} style={{ background: cert.bg }}>
                  <cert.icon size={22} style={{ color: cert.color }} />
                </div>
                <div className={styles.certSubtitle} style={{ color: cert.color }}>
                  {cert.subtitle}
                </div>
                <h3 className={styles.certTitle}>{cert.title}</h3>
                <p className={styles.certDesc}>{cert.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Customer logos are shown only when real, approved assets exist. */}
      {customers.length > 0 && (
        <section className={styles.logosSection} aria-label="Customers">
          <div className="container">
            <div className={styles.logosTrack}>
              {customers.map(customer => (
                <div key={customer.id} className={styles.logoCard}>
                  <img src={customer.logo} alt={customer.name} width={120} height={60} loading="lazy" />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── 4. DOWNLOADABLE CATALOGUE ── */}
      <section className={styles.downloadSection}>
        <div className="container">
          <div className={styles.downloadLayout}>

            {/* Left — heading */}
            <div className={styles.downloadLeft}>
              <div className="section-eyebrow">Downloads</div>
              <h2 className={styles.downloadTitle}>Product Catalogue</h2>
              <p className={styles.downloadSub}>
                Download our complete product catalogue for tool specifications and applications.
              </p>
              {/* Featured download — big CTA */}
              <a
                href={downloads[0].href}
                download="rmtt-catalogue.pdf"
                className={styles.featuredDownload}
                onClick={() => handleDownload(downloads[0])}
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className={styles.featuredDownloadIcon}>
                  <FileText size={28} />
                </div>
                <div className={styles.featuredDownloadBody}>
                  <div className={styles.featuredDownloadTitle}>{downloads[0].title}</div>
                  <div className={styles.featuredDownloadMeta}>
                    {downloads[0].fileType} · Full product range
                  </div>
                </div>
                <div className={styles.featuredDownloadBtn}>
                  {downloading === downloads[0].id ? (
                    <span className={styles.downloadingSpinner} />
                  ) : (
                    <Download size={18} />
                  )}
                </div>
              </a>
            </div>


          </div>
        </div>
      </section>

    </div>
  );
}
