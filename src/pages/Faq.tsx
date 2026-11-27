import { Link } from 'react-router-dom';
import { ArrowRight, Plus } from 'lucide-react';
import PageHero from '../components/PageHero';
import heroPhoto from '../assets/factory-hero-floor.jpg.asset.json';
import { faqGroups, faqItems } from '../data/faq';
import { siteConfig } from '../lib/siteConfig';
import styles from './Faq.module.css';

// FAQPage structured data built from the same approved answers the page shows.
const jsonLd = JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqItems.map(item => ({
    '@type': 'Question',
    name: item.question,
    acceptedAnswer: { '@type': 'Answer', text: item.answer.join(' ') },
  })),
}).replace(/</g, '\\u003c');

export default function Faq() {
  return (
    <div className={styles.main}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd }} />
      <PageHero image={heroPhoto.url} alt="RMTT manufacturing facility">
        <div className="container">
          <h1 className={styles.pageTitle}>Frequently asked questions</h1>
          <p>Answers about our tools, how they are made and how to send an enquiry.</p>
        </div>
      </PageHero>

      {faqGroups.map(group => (
        <section key={group.id} className={styles.group} aria-labelledby={`faq-${group.id}`}>
          <div className={`container ${styles.inner}`}>
            <div className="section-heading">
              <h2 id={`faq-${group.id}`}>{group.title}</h2>
            </div>
            <div className={styles.list}>
              {group.items.map(item => (
                <details key={item.id} id={item.id} className={styles.item}>
                  <summary className={styles.question}>
                    <span>{item.question}</span>
                    <Plus size={20} aria-hidden="true" className={styles.icon} />
                  </summary>
                  <div className={styles.answer}>
                    {item.answer.map((paragraph, index) => <p key={index}>{paragraph}</p>)}
                    {item.link ? (
                      <Link to={item.link.to} className={styles.sectionLink}>
                        {item.link.label} <ArrowRight size={16} aria-hidden="true" />
                      </Link>
                    ) : null}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>
      ))}

      <section className={styles.closing}>
        <div className={`container ${styles.inner}`}>
          <h2>Have a question that isn't answered here?</h2>
          <p>Send us your drawing and application details, or write to <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>.</p>
          <Link to="/contact" className={styles.primaryCta}>Send an enquiry</Link>
        </div>
      </section>
    </div>
  );
}
