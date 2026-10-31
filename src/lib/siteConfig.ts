import catalogue from '../assets/rmtt-final-catalogue.pdf.asset.json';
export const siteConfig = {
  catalogueUrl: catalogue.url,
  // Public site address (no trailing slash). Override with VITE_SITE_URL, e.g. in the deploy
  // workflow, when the client's own domain is connected.
  siteUrl: String(import.meta.env?.VITE_SITE_URL || 'https://ck9819.github.io/rmtt-website').replace(/\/$/, ''),
  email: 'sales@rmtt.co.in',
  phone: '+91 99459 09155',
  phoneHref: 'tel:+919945909155',
  whatsapp: '919945909155',
  address: {
    street: 'GNC Industrial Estate, Agara Village, Tataguni Post, Kanakapura Main Road',
    cityLine: 'Bengaluru – 560082, India',
  },
} as const;