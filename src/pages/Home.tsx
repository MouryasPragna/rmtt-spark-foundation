import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, ChevronLeft, ArrowRight, Settings, Gem, Layers, Car, Zap, Droplets, CircleCheck as CheckCircle2, Download, FileText, Pause, Play } from 'lucide-react';
import styles from './Home.module.css';
import { useCarouselPlayback } from '../hooks/useCarouselPlayback';
import { useReveal} from '../hooks/useReveal';
import ProductShowcase from './ProductShowcase';
import { homeEquipment } from '../data/equipment';
import EquipmentCarousel from '../components/EquipmentCarousel';
import { industries } from '../data/industries';
import ZoomImage from '../components/ZoomImage';
import PhotoPlaceholder from '../components/PhotoPlaceholder';
import solidCarbideEndmills from '../assets/home-solid-endmill.webp.asset.json';
import pcdTool1 from '../assets/home-pcd-boring.webp.asset.json';
import brazedTool1 from '../assets/home-brazed-tslot.webp.asset.json';
import { getLatestNews } from '../data/news';
const latestNews = getLatestNews(3);
import NewsCard from '../components/NewsCard';
import newsStyles from './News.module.css';
import { siteConfig } from '../lib/siteConfig';


const products = [
  {
    id: 'solid-carbide',
    icon: Settings,
    category: 'Solid Carbide',
    name: 'End Mills, Reamers & Drills',
    description:
      'Solid carbide tools for milling, precision bores and drilling, with application-specific geometries.',
    imageAlt: 'Solid carbide end mill with helical cutting flutes',
    caption: 'Solid carbide end mill',
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
    caption: 'PCD boring tool',
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
    caption: 'Brazed carbide T-slot cutter',
    color: 'var(--cat-brazed)',
    bg: 'var(--cat-brazed-bg)',
    image: brazedTool1.url,
  },
];

const applications = [
  {
    title: 'Cylinder Head Valve Seat & Guide',
    industry: 'Automotive',
    color: 'var(--cat-pcd)',
    material: 'Grey cast iron',
    tool: 'Steel body + PCD tipped multi-step reamer',
    result: 'Improved profile accuracy, better finish consistency',
    icon: Car,
  },
  {
    title: 'Two-Wheeler Shock Absorber Bore',
    industry: 'Two-wheeler',
    color: 'var(--cat-pcd)',
    material: 'Aluminium die casting',
    tool: 'PCD 5-step reamer (Module 70, Z-4 tips)',
    result: '5 steps in one tool, Vc=210 m/min',
    icon: Zap,
  },
  {
    title: 'Hydraulic Manifold Spool Bore Grooving',
    industry: 'Hydraulics',
    color: 'var(--cat-brazed)',
    material: 'Grey cast iron',
    tool: 'Special multi-grooving brazed carbide tool',
    result: 'Special multi-grooving brazed carbide tool',
    icon: Droplets,
  },
];



export default function Home() {
  const [appIndex, setAppIndex] = useState(0);
  const playback = useCarouselPlayback(applications.length);
  const appCount = applications.length;

  
  const industryReveal = useReveal<HTMLDivElement>();
  const productsHeadReveal = useReveal<HTMLDivElement>();
  const productsGridReveal = useReveal<HTMLDivElement>();
  const techReveal = useReveal<HTMLDivElement>();
  const techRightReveal = useReveal<HTMLDivElement>();
  const appsHeadReveal = useReveal<HTMLDivElement>();
  const appsBodyReveal = useReveal<HTMLDivElement>();
  const ctaReveal = useReveal<HTMLDivElement>();

  useEffect(() => {
    if (!playback.playing) return;
    const id = setInterval(() => setAppIndex(i => (i + 1) % appCount), 4500);
    return () => clearInterval(id);
  }, [playback.playing, appCount]);

  const goPrev = () => setAppIndex(i => (i - 1 + appCount) % appCount);
  const goNext = () => setAppIndex(i => (i + 1) % appCount);

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
            className={`${styles.sectionHead} ${styles.reveal} ${productsHeadReveal.shown ? styles.revealShown : ''}`}
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
                  <span className={styles.prodCaption}>{p.caption}</span>
                </div>
                <div className={styles.prodCardBody}>
                  <div className={styles.prodCat} style={{ color: p.color }}>{p.category}</div>
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

      {/* Technology highlight */}
      <section className={styles.techSection}>
        <div className="container">
          <div className={styles.techGrid}>
            <div
              ref={techReveal.ref}
              className={`${styles.techLeft} ${styles.reveal} ${techReveal.shown ? styles.revealShown : ''}`}
            >
              <div className="section-eyebrow" style={{ background: 'var(--blue-xlight)', color: 'var(--steel)' }}>
                Our equipment
              </div>
              <h2 className={styles.techTitle}>Manufacturing technology</h2>
              <p className={styles.techSub}>
                The Bengaluru facility includes SAACKE grinding, VOLLMER Wire EDM and Walter Helicheck optical measurement.
              </p>
              <ul className={styles.equipList}>
                {homeEquipment.map(m => (
                  <li key={m.id}>
                    <strong>{m.shortName}</strong>
                    <span>{m.summary}</span>
                  </li>
                ))}
              </ul>
              <Link to="/services" className={styles.techLink}>
                See all technology <ArrowRight size={14} />
              </Link>
            </div>
            <div
              ref={techRightReveal.ref}
              className={`${styles.techRight} ${styles.revealStagger} ${techRightReveal.shown ? styles.revealStaggerShown : ''}`}
            >
              <EquipmentCarousel items={homeEquipment} />
            </div>
          </div>
        </div>
      </section>

      {/* Applications */}
      <section className={styles.appSection}>
        <div className="container">
          <div
            ref={appsHeadReveal.ref}
            className={`${styles.sectionHead} ${styles.reveal} ${appsHeadReveal.shown ? styles.revealShown : ''}`}
          >
            <div>
              <div className="section-eyebrow">Proven results</div>
              <h2 className={styles.sectionTitle}>Application case studies</h2>
              <p className={styles.sectionSub}>Real challenges solved with engineered tooling solutions.</p>
            </div>
            <Link to="/applications" className={styles.sectionLink}>
              All case studies <ArrowRight size={14} />
            </Link>
          </div>
          <div
            ref={appsBodyReveal.ref}
            className={`${styles.appCarousel} ${styles.reveal} ${appsBodyReveal.shown ? styles.revealShown : ''}`}
            role="region"
            aria-roledescription="carousel"
            aria-label="Application case studies"
            {...playback.interactionProps}
          >
            <div className={styles.appTrackWrap} aria-live={playback.playing ? 'off' : 'polite'}>
              <div
                className={styles.appTrack}
                style={{ transform: `translateX(-${appIndex * 100}%)` }}
              >
                {applications.map((app, i) => (
                  <div key={app.title} className={styles.appSlide} aria-hidden={i !== appIndex}>
                    <div className={styles.appCard}>
                      <div className={styles.appCardImg}>
                        <PhotoPlaceholder icon={app.icon} />
                        <div className={styles.appCardImgOverlay} />
                        <span className={styles.appBadge} style={{ background: app.color }}>{app.industry}</span>
                      </div>
                      <div className={styles.appCardBody}>
                        <h3 className={styles.appTitle}>{app.title}</h3>
                        <div className={styles.appMeta}>
                          <span><strong>Material:</strong> {app.material}</span>
                          <span><strong>Tool:</strong> {app.tool}</span>
                        </div>
                        <div className={styles.appResult}>
                          <CheckCircle2 size={14} className={styles.appResultIcon} />
                          <span>{app.result}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <button
              type="button"
              aria-label="Previous case study"
              className={`${styles.carBtn} ${styles.carBtnPrev}`}
              onClick={goPrev}
            >
              <ChevronLeft size={20} />
            </button>
            <button
              type="button"
              aria-label="Next case study"
              className={`${styles.carBtn} ${styles.carBtnNext}`}
              onClick={goNext}
            >
              <ChevronRight size={20} />
            </button>
            <div className={styles.carDots}>
              <button type="button" className="carousel-playback" onClick={playback.toggle} disabled={playback.reducedMotion}>
                {playback.paused || playback.reducedMotion ? <Play size={16} /> : <Pause size={16} />}{playback.paused || playback.reducedMotion ? 'Play' : 'Pause'}
              </button>
              {applications.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  aria-label={`Go to case study ${i + 1}`}
                  aria-current={i === appIndex ? 'true' : undefined}
                  className={`${styles.carDot} ${i === appIndex ? styles.carDotActive : ''}`}
                  onClick={() => setAppIndex(i)}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {latestNews.length > 0 && (
        <section className={newsStyles.section} aria-labelledby="latest-news-heading">
          <div className="container">
            <div className={newsStyles.heading}>
              <h2 id="latest-news-heading" className={newsStyles.sectionTitle}>Latest news</h2>
              <Link to="/news" className={newsStyles.allLink}>View all news <ArrowRight size={16} aria-hidden="true" /></Link>
            </div>
            <div className={newsStyles.grid}>{latestNews.map(item => <NewsCard key={item.id} item={item} headingLevel={3} />)}</div>
          </div>
        </section>
      )}
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
            <div className={styles.ctaBtns}>
              <Link to="/contact" className={styles.ctaBtnPrimary}>
                <FileText size={16} />
                Request a Quote
              </Link>
              <a
                href={siteConfig.catalogueUrl}
                download="rmtt-catalogue.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.ctaBtnSecondary}
              >
                <Download size={16} />
                Download Catalogue
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
