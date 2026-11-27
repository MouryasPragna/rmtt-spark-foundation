import { useState, useEffect, useCallback, useRef, type JSX } from 'react';
import { useCarouselPlayback } from '../hooks/useCarouselPlayback';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';
import styles from './ProductShowcase.module.css';
import factoryCollage from '../assets/factory-hero-collage.jpg.asset.json';

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
  brand?: boolean;      // dark company-intro slide (white/orange text)
  focus?: string;       // object-position keeping the tool in frame on the photo side
  ratio?: number;       // photo width / height (default 16:9); lines the blurred copy up with the sharp crop
  titleAccent?: string; // trailing part of the title, shown in orange
  linkText?: string;
}

// ── DATA — factory photography from the company PDF ──────────────────────────
const slides: Slide[] = [
  {
    id: 'brand',
    brand: true,
    image: `${import.meta.env.BASE_URL}images/hero/home-hero-brand.jpg`,
    imageAlt: 'Grinding wheel sending up sparks as it regrinds a precision cutting tool',
    category: 'Precision Cutting Tool Manufacturer',
    title: 'Riddhi Machine Tool Technology',
    titleAccent: 'Machine Tool Technology',
    subtitle: 'Engineering confidence in every cut',
    tag: 'Solid Carbide · PCD · Brazed · Reconditioning',
    href: '/products',
    linkText: 'Explore products',
  },
  {
    id: 'solid-carbide-drills',
    ratio: 1600 / 756,
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
    focus: '70% 50%',
    image: `${import.meta.env.BASE_URL}images/hero/pcd-closeup.webp`,
    mobileImage: `${import.meta.env.BASE_URL}images/hero/pcd-closeup-mobile.webp`,
    imageAlt: 'Close-up of RIDDHI PCD tools: a PCD milling cutter, form tools and a boring tool with brazed PCD cutting edges',
    category: 'PCD Tools',
    title: 'PCD Form Grooving Cutters',
    subtitle: 'Purpose-designed PCD form geometry for accurate profiles and long machining cycles.',
    tag: 'Two-wheeler · Aluminium die casting',
    href: '/products/pcd',
  },
  {
    id: 'brazed-tools',
    focus: '55% 55%',
    image: `${import.meta.env.BASE_URL}images/hero/brazed-closeup.webp`,
    mobileImage: `${import.meta.env.BASE_URL}images/hero/brazed-closeup-mobile.webp`,
    imageAlt: 'Close-up of RIDDHI brazed carbide-tipped tools, with carbide tips brazed onto heat-treated steel bodies',
    category: 'Brazed Tools',
    title: 'Special Brazed Tools',
    subtitle: 'Carbide-tipped tools on steel bodies — T-slot cutters, reamers and customer-specific forms engineered for your component.',
    tag: 'T-slot cutters · Reamers · Custom forms',
    href: '/products/brazed',
  },
  {
    id: 'tool-reconditioning',
    ratio: 1600 / 912,
    focus: '72% 60%',
    image: `${import.meta.env.BASE_URL}images/hero/inspection.webp`,
    mobileImage: `${import.meta.env.BASE_URL}images/hero/inspection-mobile.webp`,
    imageAlt: 'Tool measuring machine with an illuminated cutting tool in its clamping fixture',
    category: 'Tool Reconditioning',
    title: 'Regrinding & Reconditioning',
    subtitle: 'Worn solid carbide, PCD and brazed tools reground and reconditioned to restore cutting geometry and extend tool life.',
    tag: 'Regrinding · Edge preparation · Inspection',
    href: '/services',
  },
];

// ── COMPONENT ────────────────────────────────────────────────────────────────
export default function ProductShowcase(): JSX.Element {
  const [current, setCurrent] = useState(0);
  // Standards: no auto-moving content by default. The hero starts paused; Play is offered.
  const playback = useCarouselPlayback(slides.length, { autoplay: false });
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
      className={`${styles.showcase} ${slide.brand ? styles.showcaseBrand : ''}`}
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
            {/* Split slides: behind the translucent text panel, the photo continues to the left of the
                sharp crop (a blurred copy aligned to the same scale and position), over a softer full
                fill for any area wider than the photo itself. */}
            {!s.brand && <img src={s.image} alt="" aria-hidden="true" className={styles.bgBlurFill} width={1600} height={900} loading="lazy" decoding="async" />}
            {!s.brand && <img src={s.image} alt="" aria-hidden="true" className={styles.bgBlur} width={1600} height={900} loading="lazy" decoding="async"
              style={{ ['--fx' as string]: String(parseFloat(s.focus ?? '50%') / 100), ['--fy' as string]: (s.focus ?? '50% 50%').split(' ')[1] ?? '50%', ['--ar' as string]: String(s.ratio ?? 16 / 9) }} />}
            <div className={s.brand ? styles.photoFull : styles.photoSide}>
              <picture>
                {s.mobileImage && <source media="(max-width: 768px)" srcSet={s.mobileImage} />}
              <img
                src={s.image}
                alt={s.imageAlt}
                className={styles.bgImg}
                style={s.focus ? { objectPosition: s.focus } : undefined}
                width={1600}
                height={900}
                fetchPriority={i === 0 ? 'high' : undefined}
                loading={i === 0 ? 'eager' : 'lazy'}
              />
              </picture>
            </div>
            {/* Dark vignette — strong at edges, lighter centre so product pops */}
            <div className={`${styles.vignette} ${s.brand ? styles.vignetteDark : styles.vignetteSplit}`} />
          </div>
        ))}
      </div>

      {/* Content overlay */}
      <div className={styles.contentWrap}>

        {/* Left — page headline (fixed) above the rotating slide text */}
        <div className={`${styles.copyColumn} ${slide.brand ? '' : styles.copyColumnSplit}`}>
        <h1 className={`${styles.heroHeading} ${slide.brand ? styles.heroHeadingBrand : ''}`}>
          Precision cutting tools: solid carbide, PCD and brazed carbide, made in Bengaluru
        </h1>
        <div
          className={`${styles.textBlock} ${slide.brand ? styles.textBlockBrand : ''} ${animating ? styles.textHide : styles.textShow}`}
          key={current}
          aria-live={playback.playing ? 'off' : 'polite'}
        >
          {slide.brand ? (
            <>
              <p className={styles.brandPill}>{slide.category}</p>
              <h2 className={styles.title}>
                {slide.titleAccent
                  ? <>{slide.title.slice(0, slide.title.length - slide.titleAccent.length)}<span className={styles.brandAccent}>{slide.titleAccent}</span></>
                  : slide.title}
              </h2>
              <p className={styles.brandTagline}>{slide.subtitle}</p>
            </>
          ) : (
            <>
              <div className={styles.category}>{slide.category}</div>
              <h2 className={styles.title}>{slide.title}</h2>
              <p className={styles.subtitle}>{slide.subtitle}</p>
            </>
          )}
          <div className={styles.tag}>
            <span>{slide.tag}</span>
          </div>
          <Link to={slide.href} className={styles.rangeCta}>{slide.linkText ?? 'View range'}<ArrowRight size={16} aria-hidden="true" /></Link>
        </div>
        </div>

        {/* Right — slide counter + dots */}
        <div className={styles.controls}>
          {!playback.reducedMotion && (
            <button
              type="button"
              data-carousel-toggle
              className={styles.playToggle}
              aria-label={playback.paused ? 'Play carousel' : 'Pause carousel'}
              onClick={playback.toggle}
            >
              {playback.paused ? <Play size={14} aria-hidden="true" /> : <Pause size={14} aria-hidden="true" />}
            </button>
          )}
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
