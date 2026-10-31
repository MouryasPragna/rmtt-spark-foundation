import styles from './Contact.module.css';
import { privacy, terms } from '../data/legal';
import { siteConfig } from '../lib/siteConfig';

export default function LegalPage({ title }: { title: string }) {
  const sections = title === 'Privacy Policy' ? privacy : terms;
  return (
    <div className={styles.main}>
      <section className={styles.pageHero}>
        <div className="container">
          <h1 className={styles.pageTitle}>{title}</h1>
        </div>
      </section>
      <section className={styles.contactSection}>
        <div className="container">
          {sections.length ? sections.map(section => (
            <section key={section.heading} className={styles.legalSection}>
              <h2>{section.heading}</h2>
              {section.paragraphs.map((paragraph, index) => <p key={index}>{paragraph}</p>)}
            </section>
          )) : <p>This page will be published shortly. For questions contact <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>.</p>}
        </div>
      </section>
    </div>
  );
}