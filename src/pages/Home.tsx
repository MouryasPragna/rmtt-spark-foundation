import { Link } from 'react-router-dom';
import { ArrowRight, Settings, Gem, Layers, Sparkles } from 'lucide-react';
import styles from './Home.module.css';
import { useReveal} from '../hooks/useReveal';
import ProductShowcase from './ProductShowcase';
import { serviceBlocks } from '../data/services';
import ContentPending from '../components/ContentPending';
import { industries } from '../data/industries';
import ZoomImage from '../components/ZoomImage';
import solidCarbideEndmills from '../assets/home-solid-endmill.webp.asset.json';
import equipmentHero from '../assets/equipment-hero.png';
import pcdTool1 from '../assets/home-pcd-boring.webp.asset.json';
import brazedTool1 from '../assets/home-brazed-tslot.webp.asset.json';
import specialTool from '../assets/brazed-tool-8.png.asset.json';


const products = [
  {
    id: 'solid-carbide',
    icon: Settings,
    category: 'Solid Carbide',
    name: 'End Mills, Reamers & Drills',
    description:
      'Solid carbide tools for milling, precision bores and drilling, with application-specific geometries.',
    imageAlt: 'Solid carbide end mill with helical cutting flutes',
    color: 'var(--cat-solid)',
    bg: 'var(--cat-solid-bg)',
    image: solidCarbideEndmills.url,
  },
  {
    id: 'pcd',
    icon: Gem,
    category: 'PCD Tools',
    name: 'PCD Boring, Reaming & Milling',
    description:
      'PCD tools for aluminium machining, including precision boring, reaming and milling solutions.',
    imageAlt: 'PCD boring tool with a visible cutting tip and holder',
    color: 'var(--cat-pcd)',
    bg: 'var(--cat-pcd-bg)',
    image: pcdTool1.url,
  },
  {
    id: 'brazed',
    icon: Layers,
    category: 'Brazed Carbide',
    name: 'Special Brazed Tools',
    description:
      'Carbide-tipped tools on steel bodies, including T-slot cutters, reamers and customer-specific forms.',
    imageAlt: 'Brazed carbide T-slot milling cutter with a wide cutting head',
    color: 'var(--cat-brazed)',
    bg: 'var(--cat-brazed-bg)',
    image: brazedTool1.url,
  },
  {
    id: 'specialized',
    icon: Sparkles,
    category: 'Specialized Solutions',
    name: 'Special & Combination Tools',
    description:
      'Application-engineered special, form and combination tools manufactured to customer-specific requirements.',
    imageAlt: 'Special carbide tool with a long cylindrical body',
    color: 'var(--cat-specialized)',
    bg: 'var(--cat-specialized-bg)',
    image: specialTool.url,
  },
];

export default function Home() {

  
  const industryReveal = useReveal<HTMLDivElement>();
  const productsHeadReveal = useReveal<HTMLDivElement>();
  const productsGridReveal = useReveal<HTMLDivElement>();
  const servicesHeadReveal = useReveal<HTMLDivElement>();
  const servicesGridReveal = useReveal<HTMLDivElement>();
  const techReveal = useReveal<HTMLDivElement>();
  const techRightReveal = useReveal<HTMLDivElement>();
  const ctaReveal = useReveal<HTMLDivElement>();

  return (
    <div>
      <h1 className="visually-hidden">Precision cutting tools: solid carbide, PCD and brazed carbide, made in Bengaluru</h1>
      <ProductShowcase />
      
      {/* Industry strip */}
      <section className={styles.industryStrip}>
        <div className={`container ${styles.industryInner}`}>
          <span className={styles.industryLabel}>Industries served</span>
          <div
            ref={industryReveal.ref}
            className={`${styles.industryTags} ${styles.revealStagger} ${industryReveal.shown ? styles.revealStaggerShown : ''}`}
          >
            {industries.map(ind => (
              <div key={ind.label} className={styles.industryTag}>
                <ind.icon size={14} />
                {ind.label}
              </div>
            ))}
          </div>
        </div>
      </section>



      {/* Products */}
      <section className={styles.section}>
        <div className="container">
          <div
            ref={productsHeadReveal.ref}
            className={`section-heading ${styles.sectionHead} ${styles.reveal} ${productsHeadReveal.shown ? styles.revealShown : ''}`}
          >
            <div>
              <div className="section-eyebrow">What we make</div>
              <h2 className={styles.sectionTitle}>Product range</h2>
              <p className={styles.sectionSub}>
                Three tool technologies, one manufacturing standard — all ground on German machinery in Bengaluru.
              </p>
            </div>
            <Link to="/products" className={styles.sectionLink}>
              View all products <ArrowRight size={14} />
            </Link>
          </div>
          <div
            ref={productsGridReveal.ref}
            className={`${styles.prodGrid} ${styles.revealStagger} ${productsGridReveal.shown ? styles.revealStaggerShown : ''}`}
          >
            {products.map(p => (
              <article key={p.id} className={styles.prodCard}>
                <div className={styles.prodCardImg}>
                  {p.image ? (
                    <ZoomImage src={p.image} alt={p.imageAlt} width={640} height={1600} />
                  ) : (
                    <p.icon size={40} color={p.color} strokeWidth={1.5} />
                  )}
                </div>
                <div className={styles.prodCardBody}>
                  <div className={styles.prodCat} style={{ color: 'var(--cat-solid)' }}>{p.category}</div>
                  <h3 className={styles.prodName}>{p.name}</h3>
                  <p className={styles.prodDesc}>{p.description}</p>
                  <Link to={`/products/${p.id}`} className={styles.prodLink} style={{ color: p.color }}>
                    Explore range <ArrowRight size={16} aria-hidden="true" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className={styles.section} aria-labelledby="home-services-heading">
        <div className="container">
          <div
            ref={servicesHeadReveal.ref}
            className={`section-heading ${styles.sectionHead} ${styles.reveal} ${servicesHeadReveal.shown ? styles.revealShown : ''}`}
          >
            <div>
              <div className="section-eyebrow">Beyond manufacturing</div>
              <h2 id="home-services-heading" className={styles.sectionTitle}>Services</h2>
              <p className={styles.sectionSub}>
                Support around the tools themselves, from the first enquiry to long-term supply.
              </p>
            </div>
            <Link to="/services" className={styles.sectionLink}>
              All services <ArrowRight size={14} />
            </Link>
          </div>
          <div
            ref={servicesGridReveal.ref}
            className={`${styles.svcGrid} ${styles.revealStagger} ${servicesGridReveal.shown ? styles.revealStaggerShown : ''}`}
          >
            {serviceBlocks.map(block => (
              <div key={block.id} className={styles.svcBlock}>
                <h3 className={styles.svcTitle}>{block.title}</h3>
                {block.pending
                  ? <ContentPending tone="inline" what="This service" />
                  : <p className={styles.svcBody}>{block.body}</p>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technology highlight */}
      <section className={styles.techSection}>
        <div className="container">
          <div className={styles.techGrid}>
            <div
              ref={techReveal.ref}
              className={`${styles.techLeft} ${styles.reveal} ${techReveal.shown ? styles.revealShown : ''}`}
            >
              <header className="section-heading"><div className="section-eyebrow" style={{ background: 'var(--blue-xlight)', color: 'var(--steel)' }}>
                Key capabilities
              </div>
              <h2 className={styles.techTitle}>What defines our tools</h2></header>
              <div className={styles.capBlocks}>
                <div className={styles.capBlock}>
                  <h3 className={styles.capBlockTitle}>Latest production equipment</h3>
                  <p className={styles.capBlockBody}>The Bengaluru facility includes SAACKE grinding, VOLLMER Wire EDM and Walter Helicheck optical measurement.</p>
                </div>
                <div className={styles.capBlock}>
                  <h3 className={styles.capBlockTitle}>For every workpiece material</h3>
                  <p className={styles.capBlockBody}>Geometries for cast iron, alloyed and stainless steels, titanium, Inconel and aluminium, with application-specific PVD wear-resistant coatings.</p>
                </div>
                <div className={styles.capBlock}>
                  <h3 className={styles.capBlockTitle}>Customer-specific solutions</h3>
                  <p className={styles.capBlockBody}>Special machining tasks require special tools — solutions are engineered individually from the customer's component and production requirements.</p>
                </div>
              </div>
              <Link to="/services" className={styles.techLink}>
                See all technology <ArrowRight size={14} />
              </Link>
            </div>
            <div
              ref={techRightReveal.ref}
              className={`${styles.techRight} ${styles.revealStagger} ${techRightReveal.shown ? styles.revealStaggerShown : ''}`}
            >
              <img
                src={equipmentHero}
                alt="SAACKE grinding, VOLLMER Wire EDM and Walter measurement machines at the RMTT facility"
                className={styles.techPhoto}
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className={styles.ctaSection}>
        <div className="container">
          <div
            ref={ctaReveal.ref}
            className={`${styles.ctaInner} ${styles.reveal} ${ctaReveal.shown ? styles.revealShown : ''}`}
          >
            <div className={styles.ctaText}>
              <h2 className={styles.ctaTitle}>Ready to optimise your machining process?</h2>
              <p className={styles.ctaSub}>
                Share your application details and we'll engineer the right tool for your requirements.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
