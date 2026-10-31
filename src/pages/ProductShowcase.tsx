import { useState, useEffect, useCallback, useRef, type JSX } from 'react';
import { useCarouselPlayback } from '../hooks/useCarouselPlayback';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Pause, Play, FileText, Download } from 'lucide-react';
import styles from './ProductShowcase.module.css';
import factoryCollage from '../assets/factory-hero-collage.jpg.asset.json';
import factoryMachining from '../assets/factory-hero-machining.jpg.asset.json';
import factoryFloor from '../assets/factory-hero-floor.jpg.asset.json';
import { siteConfig } from '../lib/siteConfig';

// ── TYPES ────────────────────────────────────────────────────────────────────
interface Slide {
  id: string;
  image: string;
  mobileImage?: string; // optional crop for narrow screens
  imageAlt: string;
  category: string;
  title: string;
  subtitle: string;
  tag: string;
  href: string;
}

// ── DATA — factory photography from the company PDF ──────────────────────────
const slides: Slide[] = [
  
  {
    id: 'solid-carbide-drills',
    image: factoryCollage.url,
    imageAlt: 'Riddhi precision tool manufacturing in the factory',
    category: 'Solid Carbide',
    title: 'Step Drills & Solid Carbide Drills',
    subtitle: 'High-polish flute geometry for single-pass multi-diameter drilling. Internal coolant options available for aluminium die casting and steel.',
    tag: 'Aluminium · Steel · Multi-diameter',
    href: '/products/solid-carbide',
  },
  {
    id: 'pcd-hsk-reamer',
    image: factoryMachining.url,
    imageAlt: 'Close-up of precision machining in progress',
    category: 'PCD Tools',
    title: 'PCD Form Grooving Cutters',
    subtitle: 'Purpose-designed PCD form geometry for accurate profiles and long machining cycles.',
    tag: 'Two-wheeler · Aluminium die casting',
    href: '/products/pcd',
  },
  {
    id: 'pcd-module-reamer',
    image: factoryFloor.url,
    imageAlt: 'Precision CNC machines on the factory floor',
    category: 'PCD Tools',
    title: 'PCD Multi-Step Reamer',
    subtitle: 'PCD-edged reaming solution for consistent precision bore machining, with application-designed stepped cutting geometry.',
    tag: 'Precision bore machining · Aluminium',
    href: '/products/pcd',
  },
  {
    id: 'pcd-tools',
    image: `${import.meta.env.BASE_URL}images/hero/inspection.webp`,
    mobileImage: `${import.meta.env.BASE_URL}images/hero/inspection-mobile.webp`,
    imageAlt: 'Tool measuring machine with an illuminated cutting tool in its clamping fixture',
    category: 'PCD Tools',
    title: 'Seamless Brazing',
    subtitle: 'A solid carbide body seamlessly brazed to a steel body, with well-balanced PCD material, high-quality pocket seats and perfectly smooth flutes.',
    tag: 'Wire EDM · Lapping & grinding of cutting edges',
    href: '/products/pcd',
  },
];

// ── COMPONENT ────────────────────────────────────────────────────────────────
export default function ProductShowcase(): JSX.Element {
  const [current, setCurrent] = useState(0);
  const playback = useCarouselPlayback(slides.length);
  const [animating, setAnimating] = useState(false);
  const [direction, setDirection] = useState<'next' | 'prev'>('next');
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const count = slides.length;

  const goTo = useCallback((idx: number, dir: 'next' | 'prev' = 'next') => {
    if (animating) return;
    if (playback.reducedMotion) { setCurrent(idx); return; }
    setDirection(dir);
    setAnimating(true);
    setTimeout(() => {
      setCurrent(idx);
      setAnimating(false);
    }, 550);
  }, [animating, playback.reducedMotion]);

  const next = useCallback(() =>
    goTo((current + 1) % count, 'next'), [current, count, goTo]);

  const prev = useCallback(() =>
    goTo((current - 1 + count) % count, 'prev'), [current, count, goTo]);

  // Auto-advance
  useEffect(() => {
    if (!playback.playing) return;
    timerRef.current = setInterval(next, 5000);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [playback.playing, next]);

  const slide = slides[current];

  return (
    <section
      className={styles.showcase}
      style={{ '--hero-img-h': slide.mobileImage ? '340px' : '240px' } as React.CSSProperties}
      role="region"
      aria-roledescription="carousel"
      {...playback.interactionProps}
      aria-label="Product highlights carousel"
    >
      {/* Background images — all preloaded, active one is visible */}
      <div className={styles.bgLayer}>
        {slides.map((s, i) => (
          <div
            key={s.id}
            aria-hidden={i !== current}
            className={`
              ${styles.bgSlide}
              ${i === current ? styles.bgSlideActive : ''}
              ${animating && i === current ? (direction === 'next' ? styles.bgEnterNext : styles.bgEnterPrev) : ''}
            `}
          >
            <picture>
              {s.mobileImage && <source media="(max-width: 768px)" srcSet={s.mobileImage} />}
            <img
              src={s.image}
              alt={s.imageAlt}
              className={styles.bgImg}
              width={1600}
              height={900}
              fetchPriority={i === 0 ? 'high' : undefined}
              loading={i === 0 ? 'eager' : 'lazy'}
            />
            </picture>
            {/* Dark vignette — strong at edges, lighter centre so product pops */}
            <div className={styles.vignette} />
          </div>
        ))}
      </div>

      {/* Content overlay */}
      <div className={styles.contentWrap}>

        {/* Left — text */}
        <div
          className={`${styles.textBlock} ${animating ? styles.textHide : styles.textShow}`}
          key={current}
          aria-live={playback.playing ? 'off' : 'polite'}
        >
          <p className={styles.tagline}>Engineering confidence in every cut</p>
          <div className={styles.category}>{slide.category}</div>
          <h2 className={styles.title}>{slide.title}</h2>
          <p className={styles.subtitle}>{slide.subtitle}</p>
          <div className={styles.tag}>
            <span>{slide.tag}</span>
            <Link to={slide.href} className={styles.rangeLink}>View range →</Link>
          </div>
          <div className={styles.ctaRow}>
            <Link to="/contact" className={styles.primaryCta}><FileText size={16} />Request a Quote</Link>
            <a href={siteConfig.catalogueUrl} download="rmtt-catalogue.pdf" target="_blank" rel="noopener noreferrer" className={styles.secondaryCta}><Download size={16} />Download Catalogue</a>
          </div>
        </div>

        {/* Right — slide counter + dots */}
        <div className={styles.controls}>
          <button type="button" className={styles.playBtn} onClick={playback.toggle} disabled={playback.reducedMotion} aria-label={playback.paused || playback.reducedMotion ? 'Play slideshow' : 'Pause slideshow'}>
            {playback.paused || playback.reducedMotion ? <Play size={12} /> : <Pause size={12} />}
          </button>
          <div className={styles.dots}>
            {slides.map((_, i) => (
              <button
                key={i}
                type="button"
                aria-label={`Go to slide ${i + 1}`}
                aria-current={i === current ? 'true' : undefined}
                className={`${styles.dot} ${i === current ? styles.dotActive : ''}`}
                onClick={() => goTo(i, i > current ? 'next' : 'prev')}
              />
            ))}
          </div>
        </div>
      </div>


      {/* Arrow buttons */}
      <button
        type="button"
        aria-label="Previous product"
        className={`${styles.arrow} ${styles.arrowLeft}`}
        onClick={prev}
      >
        <ChevronLeft size={22} />
      </button>
      <button
        type="button"
        aria-label="Next product"
        className={`${styles.arrow} ${styles.arrowRight}`}
        onClick={next}
      >
        <ChevronRight size={22} />
      </button>

    </section>
  );
}
