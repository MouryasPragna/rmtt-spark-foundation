import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CircleCheck as CheckCircle2, MapPin, Users, Zap, Cpu, Lightbulb, Award, Eye, Target, Factory } from 'lucide-react';
import styles from './About.module.css';
import JourneyTimeline from './JourneyTimeline';
import { facilityEquipment } from '../data/equipment';
import factoryCollage from '../assets/factory-hero-collage.jpg.asset.json';
import PhotoPlaceholder from '../components/PhotoPlaceholder';
import { siteConfig } from '../lib/siteConfig';

const missionVision = [
  {
    type: 'mission',
    icon: Target,
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
    icon: Eye,
    title: 'One-stop partner for advanced precision cutting tools',
    desc: 'To be a trusted and reliable one-stop solution for advanced precision cutting tools across automotive, aerospace, and engineering industries.',
    points: [
      'Trusted partner, not just a supplier',
      'Full-spectrum tooling across industries',
      'Long-term relationships built on performance',
    ],
  },
];

const principles = [
  {
    num: '01',
    icon: Users,
    title: 'Customer-oriented thinking',
    desc: 'We begin every engagement by deeply understanding the real application need — the material, the machine, the tolerance, and the production challenge. Solutions follow from genuine listening, not a catalogue.',
  },
  {
    num: '02',
    icon: Zap,
    title: 'Technology-driven solutions',
    desc: 'We invest continuously in advanced global machinery — SAACKE 5-axis grinding, VOLLMER Wire EDM, Walter Helicheck measurement — to push the boundary of what Indian manufacturing can deliver.',
  },
  {
    num: '03',
    icon: Cpu,
    title: 'Service excellence',
    desc: 'Precision tools must perform consistently on the shop floor. We provide long-term support, rapid responsiveness, and technical partnership — before, during, and after every order.',
  },
];

const values = [
  {
    icon: Target,
    title: 'Precision',
    desc: 'Every tool meets the tightest tolerance. No compromise on accuracy.',
  },
  {
    icon: CheckCircle2,
    title: 'Reliability',
    desc: 'Consistent performance batch after batch, application after application.',
  },
  {
    icon: Lightbulb,
    title: 'Innovation',
    desc: 'Adopting the latest processes and materials to solve harder problems.',
  },
  {
    icon: Award,
    title: 'Partnership',
    desc: 'Long-term relationships grounded in technical support and trust.',
  },
];

export default function About() {
  const [facilityPhotoUnavailable, setFacilityPhotoUnavailable] = useState(false);
  return (
    <div className={styles.main}>
      {/* ── ABOUT HERO — MAPAL split style ── */}
<section className={styles.pageHero}>
  <div className={styles.pageHeroGrid}>

    {/* LEFT — text */}
    <div className={styles.pageHeroLeft}>
      <div className="section-eyebrow">
        Who we are
      </div>

      <h1 className={styles.pageTitle}>
        Riddhi Machine<br />Tool Technology
      </h1>

      <p className={styles.heroTagline}>Transforming raw materials into finer tools</p>
      <p className={styles.pageSubtitle}>
        Riddhi Machine Tool Technology is a Bengaluru-based precision metal cutting
        tools manufacturer delivering solid carbide and PCD solutions through advanced
        and innovative technologies.
      </p>
      <p className={styles.pageSubtitleSecond}>
        The company designs and manufactures using state-of-the-art CNC, 5-axis SAACKE
        grinding, and VOLLMER Wire EDM machines, serving the automotive, aerospace, and
        precision engineering industries, aligned with the vision of{' '}
        <strong>"Make in India."</strong>
      </p>

      {/* Key facts strip */}
      <div className={styles.heroFacts}>
        <div className={styles.heroFact}>
          <div className={styles.heroFactVal}>5-axis</div>
          <div className={styles.heroFactLbl}>SAACKE grinding</div>
        </div>
        <div className={styles.heroFactDivider} />
        <div className={styles.heroFact}>
          <div className={styles.heroFactVal}>PCD + SC</div>
          <div className={styles.heroFactLbl}>Tool technologies</div>
        </div>
        <div className={styles.heroFactDivider} />
        <div className={styles.heroFact}>
          <div className={styles.heroFactVal}>Bengaluru</div>
          <div className={styles.heroFactLbl}>Made in India</div>
        </div>
      </div>
    </div>

    {/* RIGHT — image in contained square */}
<div className={styles.pageHeroRight} style={{ position: 'relative' }}>
  <img
    src={`${import.meta.env.BASE_URL}0.jpg`}
    alt="RMTT SAACKE CNC grinding machine in operation"
    width={2420} height={3226} loading="lazy" className={styles.pageHeroImg}
  />
  <div className={styles.pageHeroBadge}>
    <img src={`${import.meta.env.BASE_URL}2.png`} alt="Make in India" width={1500} height={704} loading="lazy" className={styles.makeInIndiaImg} />
  </div>
</div>

  </div>
</section>

      <JourneyTimeline />
      {/* Mission & Vision */}
      <section className={styles.missionVisionSection}>
        <div className="container">
          <div className={styles.missionVisionHead}>
            <div className="section-eyebrow">Our goals</div>
            <h2 className={styles.missionVisionTitle}>Mission & vision</h2>
            <p className={styles.missionVisionSub}>
              Two commitments that guide every product we manufacture and every partnership we build.
            </p>
          </div>
          <div className={styles.missionVisionGrid}>
            {missionVision.map(item => (
              <div key={item.type} className={`${styles.mvCard} ${styles[item.type]}`}>
                <div className={styles.mvCardHeader}>
                  <div className={styles.mvIcon}>
                    <item.icon size={24} />
                  </div>
                  <div className={styles.mvLabel}>{item.type === 'mission' ? 'Mission' : 'Vision'}</div>
                  <h3 className={styles.mvTitle}>{item.title}</h3>
                </div>
                <p className={styles.mvDesc}>{item.desc}</p>
                <ul className={styles.mvPoints}>
                  {item.points.map(point => (
                    <li key={point} className={styles.mvPoint}>
                      <CheckCircle2 size={14} className={styles.mvPointIcon} />
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
          <div className={styles.purposeHead}>
            <div className="section-eyebrow">Our purpose</div>
            <h2 className={styles.purposeTitle}>Purpose & philosophy</h2>
            <p className={styles.purposeSub}>
              At RMTT, our objective is to be more than a supplier — we aim to be a trusted manufacturing and technology partner.
            </p>
          </div>

          <div className={styles.philosophyText}>
            <p>
              Our approach is guided by three core principles that shape every product, every process, and every partnership we build.
            </p>
          </div>

          <div className={styles.principlesGrid}>
            {principles.map(p => (
              <div key={p.num} className={styles.principleCard}>
                <div className={styles.principleNum}>{p.num}</div>
                <div className={styles.principleIconWrap}>
                  <p.icon size={24} />
                </div>
                <h3 className={styles.principleTitle}>{p.title}</h3>
                <p className={styles.principleDesc}>{p.desc}</p>
              </div>
            ))}
          </div>

          <div className={styles.philosophyQuote}>
            <p>
              "These principles shape every product, every process, and every partnership we build — making RMTT more than a supplier, and a trusted manufacturing and technology partner."
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className={styles.valuesSection}>
        <div className="container">
          <div className={styles.valuesHead}>
            <div className="section-eyebrow">What we stand for</div>
            <h2 className={styles.valuesTitle}>Our values</h2>
          </div>
          <div className={styles.valuesGrid}>
            {values.map(v => (
              <div key={v.title} className={styles.valueCard}>
                <div className={styles.valueIconWrap}>
                  <v.icon size={24} />
                </div>
                <h3 className={styles.valueTitle}>{v.title}</h3>
                <p className={styles.valueDesc}>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Manufacturing */}
      <section className={styles.manufacturingSection}>
        <div className="container">
          <div className={styles.manufacturingContent}>
            <div className="section-eyebrow">Our capability</div>
            <h2 className={styles.manufacturingTitle}>Manufacturing excellence</h2>
            <p className={styles.manufacturingSub}>
              Aligned with the Make in India vision, Riddhi Machine Tool Technology has invested in a state-of-the-art manufacturing facility equipped with advanced global technologies.
            </p>
            <ul className={styles.manufacturingList}>
              {facilityEquipment.map(item => (
                <li key={item.id}><CheckCircle2 size={16} /> {item.facilityName}</li>
              ))}
            </ul>

          </div>
        </div>
      </section>

      {/* Products & Capabilities */}
      <section className={styles.productsSection}>
        <div className="container">
          <div className={styles.productsContent}>
            <div className="section-eyebrow">What we deliver</div>
            <h2 className={styles.productsTitle}>Products & capabilities</h2>
            <p className={styles.productsSub}>
              RMTT offers a comprehensive range of precision cutting tools and special tooling solutions.
            </p>
            <div className={styles.productsGrid}>
              <div className={styles.productCategory}>
                <h3 className={styles.productCategoryTitle}>Special Solid Carbide Tools</h3>
                <ul className={styles.productList}>
                  <li>Drills and step tools</li>
                  <li>Solid carbide reamers</li>
                  <li>Whole mill and end mills</li>
                  <li>High-polish end mills for aluminium</li>
                </ul>
              </div>
              <div className={styles.productCategory}>
                <h3 className={styles.productCategoryTitle}>PCD Tools</h3>
                <ul className={styles.productList}>
                  <li>Multi-step PCD reamers</li>
                  <li>Brazed carbide reamers</li>
                  <li>PCD milling cutters</li>
                  <li>Precision profiling tools</li>
                </ul>
              </div>
              <div className={styles.productCategory}>
                <h3 className={styles.productCategoryTitle}>Brazed Carbide</h3>
                <ul className={styles.productList}>
                  <li>Special brazed carbide tools</li>
                  <li>Multi-grooving tools</li>
                  <li>T-slot cutters</li>
                  <li>Shell mills & reamers</li>
                </ul>
              </div>
            </div>
            <p className={styles.productsNote}>
              All tools are engineered with internal coolant options, advanced coatings, and optimized edge preparation, designed to meet exact customer and application requirements.
            </p>
          </div>
        </div>
      </section>

      {/* Location */}
      <section className={styles.locationSection}>
        <div className="container">
          <div className={styles.locationGrid}>
            <div className={styles.locationBody}>
              <div className="section-eyebrow">Find us</div>
              <h2 className={styles.locationTitle}>Bengaluru facility</h2>
              <p className={styles.locationText}>
                Our manufacturing facility is located in GNC Industrial Estate, Bengaluru — India's manufacturing hub for automotive, two-wheeler, aerospace and precision engineering.
              </p>
              <ul className={styles.locationDetails}>
                <li>
                  <MapPin size={16} style={{ color: 'var(--blue)', flexShrink: 0 }} />
                  <div>
                    <span className={styles.locationLabel}>Address</span>
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
                src={factoryCollage.url}
                alt="Riddhi facility Bengaluru"
                width={1600} height={900} loading="lazy" className={styles.locationImg}
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
