import PageHero from '../components/PageHero';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CircleCheck as CheckCircle2, MapPin, Factory } from 'lucide-react';
import styles from './About.module.css';
import JourneyTimeline from './JourneyTimeline';
import factoryCollage from '../assets/factory-hero-collage.jpg.asset.json';
import facilityBrand from '../assets/bengaluru-facility-brand.jpg';
import PhotoPlaceholder from '../components/PhotoPlaceholder';
import { siteConfig } from '../lib/siteConfig';
import { industries } from '../data/industries';
import { categories } from './productsData';

const missionVision = [
  {
    type: 'mission',
    title: 'Advancing Make in India through world-class precision tools',
    desc: 'To advance the Make in India vision by manufacturing world-class precision cutting tools that meet global standards of quality and performance.',
    points: [
      'Global quality benchmarks achieved locally',
      'German manufacturing standards, Indian manufacturing',
      'Reducing import dependency in precision tooling',
    ],
  },
  {
    type: 'vision',
    title: 'One-stop partner for advanced precision cutting tools',
    desc: 'To be a trusted and reliable one-stop solution for advanced precision cutting tools across automotive, aerospace, and engineering industries.',
    points: [
      'Trusted partner, not just a supplier',
      'Full-spectrum tooling across industries',
      'Long-term relationships built on performance',
    ],
  },
];

// Key facts, all taken from the site's own copy: founding and milestone years, the four product
// families on the Products page, the industries list and the 5-axis grinding capability.
const facts = [
  { value: '2013', label: 'Founded in Bengaluru' },
  { value: '2017', label: 'Manufacturing since' },
  { value: String(categories.length), label: 'Product families' },
  { value: String(industries.length), label: 'Industries served' },
  { value: '5-axis', label: 'CNC tool grinding' },
];

const principles = [
  {
    title: 'Customer-oriented thinking',
    desc: 'We begin every engagement by deeply understanding the real application need — the material, the machine, the tolerance, and the production challenge. Solutions follow from genuine listening, not a catalogue.',
  },
  {
    title: 'Technology-driven solutions',
    desc: 'We invest continuously in advanced global machinery — SAACKE 5-axis grinding, VOLLMER Wire EDM, Walter Helicheck measurement — to push the boundary of what Indian manufacturing can deliver.',
  },
  {
    title: 'Service excellence',
    desc: 'Precision tools must perform consistently on the shop floor. We provide long-term support, rapid responsiveness, and technical partnership — before, during, and after every order.',
  },
];

const values = [
  {
    title: 'Precision',
    desc: 'Every tool meets the tightest tolerance. No compromise on accuracy.',
  },
  {
    title: 'Reliability',
    desc: 'Consistent performance batch after batch, application after application.',
  },
  {
    title: 'Innovation',
    desc: 'Adopting the latest processes and materials to solve harder problems.',
  },
  {
    title: 'Partnership',
    desc: 'Long-term relationships grounded in technical support and trust.',
  },
];

export default function About() {
  const [facilityPhotoUnavailable, setFacilityPhotoUnavailable] = useState(false);
  return (
    <div className={styles.main}>
      <PageHero image={factoryCollage.url} alt="RMTT precision tool manufacturing facility">
        <div className="section-eyebrow">Who we are</div>
        <h1>Precision cutting tool manufacturer in Bengaluru</h1>
        <p className={styles.heroTagline}>Transforming raw materials into finer tools</p>
      </PageHero>

      {/* At a glance: the hero's supporting copy plus key facts */}
      <section className={styles.factsSection} aria-labelledby="facts-heading">
        <div className="container">
          <h2 id="facts-heading" className="visually-hidden">At a glance</h2>
          <div className={styles.factsIntro}>
            <p>Riddhi Machine Tool Technology is a Bengaluru-based precision metal cutting tools manufacturer delivering solid carbide and PCD solutions through advanced and innovative technologies, serving the automotive, aerospace and precision engineering industries in line with the vision of <strong>Make in India</strong>.</p>
          </div>
          <dl className={styles.factsGrid}>
            {facts.map(f => (
              <div key={f.label} className={styles.fact}>
                <dt className={styles.factLabel}>{f.label}</dt>
                <dd className={styles.factValue}>{f.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <JourneyTimeline />
      {/* Mission & Vision */}
      <section className={styles.missionVisionSection}>
        <div className="container">
          <div className={`section-heading ${styles.missionVisionHead}`}>
            <div className="section-eyebrow">Our goals</div>
            <h2 className={styles.missionVisionTitle}>Mission & vision</h2>
            <p className={styles.missionVisionSub}>
              Two commitments that guide every product we manufacture and every partnership we build.
            </p>
          </div>
          <div className={styles.missionVisionGrid}>
            {missionVision.map(item => (
              <div key={item.type} className={`${styles.mvCard} ${styles[item.type]}`}>
                <div className={styles.mvLabel}>{item.type === 'mission' ? 'Our mission' : 'Our vision'}</div>
                <h3 className={styles.mvTitle}>{item.title}</h3>
                <p className={styles.mvDesc}>{item.desc}</p>
                <ul className={styles.mvPoints}>
                  {item.points.map(point => (
                    <li key={point} className={styles.mvPoint}>
                      <CheckCircle2 size={16} className={styles.mvPointIcon} aria-hidden="true" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Purpose & Philosophy */}
      <section className={styles.purposeSection}>
        <div className="container">
          <div className={`section-heading ${styles.purposeHead}`}>
            <div className="section-eyebrow">Our purpose</div>
            <h2 className={styles.purposeTitle}>Purpose & philosophy</h2>
            <p className={styles.purposeSub}>
              Our approach is guided by three core principles.
            </p>
          </div>

          <div className={styles.principlesGrid}>
            {principles.map(p => (
              <div key={p.title} className={styles.principleCard}>
                <h3 className={styles.principleTitle}>{p.title}</h3>
                <p className={styles.principleDesc}>{p.desc}</p>
              </div>
            ))}
          </div>

          <figure className={styles.philosophyQuote}>
            <blockquote>
              <p>These principles shape every product, every process and every partnership we build — making RMTT more than a supplier: a trusted manufacturing and technology partner.</p>
            </blockquote>
          </figure>
        </div>
      </section>

      {/* Values */}
      <section className={styles.valuesSection}>
        <div className="container">
          <div className={`section-heading ${styles.valuesHead}`}>
            <div className="section-eyebrow">What we stand for</div>
            <h2 className={styles.valuesTitle}>Our values</h2>
          </div>
          <div className={styles.valuesGrid}>
            {values.map(v => (
              <div key={v.title} className={styles.valueCard}>
                <h3 className={styles.valueTitle}>{v.title}</h3>
                <p className={styles.valueDesc}>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Location */}
      <section className={styles.locationSection}>
        <div className="container">
          <div className={styles.locationGrid}>
            <div className={styles.locationBody}>
              <header className="section-heading"><div className="section-eyebrow">Find us</div>
              <h2 className={styles.locationTitle}>Bengaluru facility</h2>
              <p className={styles.locationText}>
                Our manufacturing facility is located in GNC Industrial Estate, Bengaluru — India's manufacturing hub for automotive, two-wheeler, aerospace and precision engineering.
              </p></header>
              <ul className={styles.locationDetails}>
                <li>
                  <MapPin size={16} aria-hidden="true" style={{ color: 'var(--blue)', flexShrink: 0, marginTop: 3 }} />
                  <div>
                    <span className="visually-hidden">Address: </span>
                    <span>{siteConfig.address.street}, {siteConfig.address.cityLine}</span>
                  </div>
                </li>
              </ul>
              <Link to="/contact" className={styles.locationCta}>
                Request a meeting <ArrowRight size={15} />
              </Link>
            </div>
            <div className={styles.locationImgWrap}>
              {facilityPhotoUnavailable ? <PhotoPlaceholder icon={Factory} /> : <img
                src={facilityBrand}
                alt="Riddhi precision machining — Engineering confidence in every cut, Make In India"
                width={1365} height={768} loading="lazy" className={styles.locationImg}
                onError={() => setFacilityPhotoUnavailable(true)}
              />}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className={styles.ctaSection}>
        <div className="container">
          <h2 className={styles.ctaTitle}>Ready to work with us?</h2>
          <p className={styles.ctaSub}>Share your machining challenge and we'll engineer the right solution.</p>
          <Link to="/contact" className={styles.ctaBtn}>
            Get started <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </div>
  );
}
