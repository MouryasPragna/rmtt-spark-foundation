import PageHero from '../components/PageHero';
import heroPhoto from '../assets/factory-hero-floor.jpg.asset.json';
import styles from './Contact.module.css';
import { privacy, terms } from '../data/legal';
import { siteConfig } from '../lib/siteConfig';

export default function LegalPage({ title }: { title: string }) {
  const doc = title === 'Privacy Policy' ? privacy : terms;
  return (
    <div className={styles.main}>
      <PageHero image={heroPhoto.url} alt="RMTT manufacturing facility">
        <div className="container">
          <h1 className={styles.pageTitle}>{title}</h1>
          {doc.sections.length ? <p>Last updated {doc.lastUpdated}</p> : null}
        </div>
      </PageHero>
      <section className={styles.contactSection}>
        <div className={`container ${styles.legalBody}`}>
          {doc.draft && doc.sections.length ? (
            <p className={styles.legalDraft} role="note">
              <strong>Draft for review.</strong> This text describes how this website currently works and is awaiting
              approval by Riddhi Machine Tool Technology. Questions: <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>.
            </p>
          ) : null}
          {doc.sections.length ? doc.sections.map(section => (
            <section key={section.heading} className={styles.legalSection}>
              <h2 className={styles.legalHeading}>{section.heading}</h2>
              {section.paragraphs.map((paragraph, index) => <p key={index}>{paragraph}</p>)}
            </section>
          )) : <p>This page will be published shortly. For questions contact <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>.</p>}
        </div>
      </section>
    </div>
  );
}
