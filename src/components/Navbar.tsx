import { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Phone, Mail, ChevronDown, ChevronRight } from 'lucide-react';
import styles from './Navbar.module.css';
import { siteConfig } from '../lib/siteConfig';
import { productNavigation as productOptions } from '../pages/productsData';

const navLinks: Array<{ label: string; href: string; dropdown?: typeof productOptions }> = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Products', href: '/products', dropdown: productOptions },
  { label: 'Applications', href: '/applications' },
  { label: 'Services', href: '/services' },
  { label: 'Downloads', href: '/downloads' },
  { label: 'News', href: '/news' },
  { label: 'Contact', href: '/contact' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  const location = useLocation();
  const isActive = (href: string) => href === '/' ? location.pathname === '/' : location.pathname.startsWith(href);
  const menuButton = useRef<HTMLButtonElement>(null);
  const productsButton = useRef<HTMLButtonElement>(null);
  const productsContainer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
    setProductsOpen(false);
    setExpandedCategory(null);
  }, [location]);

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const escape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') { setOpen(false); menuButton.current?.focus(); }
    };
    document.addEventListener('keydown', escape);
    return () => { document.body.style.overflow = previous; document.removeEventListener('keydown', escape); };
  }, [open]);
  useEffect(() => {
    if (!productsOpen) return;
    const closeOutside = (event: PointerEvent) => {
      if (event.target instanceof Node && !productsContainer.current?.contains(event.target)) setProductsOpen(false);
    };
    document.addEventListener('pointerdown', closeOutside);
    return () => document.removeEventListener('pointerdown', closeOutside);
  }, [productsOpen]);

  // Clicking a product group opens its page and expands its families in the menu.
  const openCategory = (href: string) => {
    setExpandedCategory(value => value === href ? null : href);
    navigate(href);
  };
  const menuLabel = (option: typeof productOptions[number]) => option.href === '/products/brazed' ? 'Brazed Tools' : option.label;

  return (
    <>
      <div className={styles.topBar} role="region" aria-label="Quick contact">
        <div className={styles.topBarInner}>
          <a href={siteConfig.phoneHref} className={styles.topBarLink}>
            <Phone size={13} /> {siteConfig.phone}
          </a>
          <a href={`mailto:${siteConfig.email}`} className={styles.topBarLink}>
            <Mail size={13} /> {siteConfig.email}
          </a>
        </div>
      </div>

      <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}>
        <div className={styles.inner}>
          <Link to="/" className={styles.logo} aria-label="Riddhi Machine Tool Technology home">
            <img src={`${import.meta.env.BASE_URL}1.png`} alt="Riddhi Machine Tool Technology" width={1805} height={592} loading="lazy" className={styles.logoImg} />
          </Link>
          
          

          <nav className={styles.nav} aria-label="Main navigation">
            {navLinks.map(link =>
              link.dropdown ? (
                <div
                  key={link.href}
                  ref={productsContainer}
                  className={styles.navItem}
                  onBlur={event => { if (!event.currentTarget.contains(event.relatedTarget)) setProductsOpen(false); }}
                  onKeyDown={event => { if (event.key === 'Escape') { event.preventDefault(); setProductsOpen(false); productsButton.current?.focus(); } }}
                >
                  <button
                    type="button"
                    ref={productsButton}
                    onClick={() => setProductsOpen(value => !value)}
                    onKeyDown={event => { if (event.key === 'ArrowDown') { event.preventDefault(); setProductsOpen(true); } }}
                    aria-controls="products-dropdown"
                    className={`${styles.navLink} ${isActive(link.href) ? styles.active : ''}`}
                                        aria-expanded={productsOpen}
                  >
                    {link.label}
                    <ChevronDown size={14} style={{ marginLeft: 4, verticalAlign: 'middle' }} />
                  </button>
                  {productsOpen && (
                    <div id="products-dropdown" className={styles.dropdown} data-focus-surface="dark">
                      {link.dropdown.map(opt => (
                        <div key={opt.href} className={styles.dropdownGroup}>
                          {opt.families.length > 0 ? <button type="button" className={styles.dropdownItem} onClick={() => toggleCategory(opt.href)} aria-expanded={expandedCategory === opt.href} aria-controls={`desktop-families-${opt.href.split('/').pop()}`}>
                            <span>{menuLabel(opt)}</span>{expandedCategory === opt.href ? <ChevronDown size={16} aria-hidden="true" /> : <ChevronRight size={16} aria-hidden="true" />}
                          </button> : <Link to={opt.href} className={styles.dropdownItem}>
                            <span>{menuLabel(opt)}</span><ChevronRight size={16} aria-hidden="true" />
                          </Link>}
                          {opt.families.length > 0 && expandedCategory === opt.href && <ul id={`desktop-families-${opt.href.split('/').pop()}`} className={styles.dropdownFamilies} aria-label={`${opt.label} tool families`}>
                            {opt.families.map(family => <li key={family.href}>
                              <Link to={family.href} className={styles.dropdownFamily}>
                                <span>{family.label}</span><ChevronRight size={14} aria-hidden="true" />
                              </Link>
                            </li>)}
                          </ul>}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={link.href}
                  to={link.href}
                  className={`${styles.navLink} ${isActive(link.href) ? styles.active : ''}`}
                >
                  {link.label}
                </Link>
              )
            )}
          </nav>

          <div className={styles.actions}>
            <button
              ref={menuButton}
              type="button"
              aria-controls="mobile-navigation"
              className={styles.menuBtn}
              onClick={() => setOpen(v => !v)}
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
            >
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {open && (
          <nav id="mobile-navigation" aria-label="Mobile navigation" className={styles.mobileMenu}>
            {navLinks.map(link => (
              <div key={link.href}>
                <Link
                  to={link.href}
                  className={`${styles.mobileLink} ${isActive(link.href) ? styles.active : ''}`}
                >
                  {link.label}
                </Link>
                {link.dropdown && (
                  <div className={styles.mobileSubMenu}>
                    {link.dropdown.map(opt => (
                      <div key={opt.href}>
                        {opt.families.length > 0 ? <button type="button" className={styles.mobileSubLink} onClick={() => toggleCategory(opt.href)} aria-expanded={expandedCategory === opt.href} aria-controls={`mobile-families-${opt.href.split('/').pop()}`}>
                          <span>{menuLabel(opt)}</span>{expandedCategory === opt.href ? <ChevronDown size={16} aria-hidden="true" /> : <ChevronRight size={16} aria-hidden="true" />}
                        </button> : <Link to={opt.href} className={styles.mobileSubLink}>{menuLabel(opt)}</Link>}
                        {opt.families.length > 0 && expandedCategory === opt.href && <ul id={`mobile-families-${opt.href.split('/').pop()}`} className={styles.mobileFamilies} aria-label={`${opt.label} tool families`}>
                          {opt.families.map(family => <li key={family.href}>
                            <Link to={family.href} className={styles.mobileFamilyLink}>{family.label}</Link>
                          </li>)}
                        </ul>}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>
        )}
      </header>
    </>
  );
}
