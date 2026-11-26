// Writes dist/_headers: security response headers for hosts that read this file
// (Cloudflare Pages, Netlify). Run after `vite build`; see the "build" script.
// Hosts that ignore _headers need the same values set in their own config, or a
// Cloudflare proxy in front (Transform Rules → Modify Response Header).
import { writeFileSync } from 'node:fs';

// The enquiry form POSTs to VITE_RFQ_ENDPOINT when one is configured (https only, see
// src/lib/rfq.ts), so its origin must be allowed in connect-src or the browser blocks it.
const endpoint = process.env.VITE_RFQ_ENDPOINT || '';
const rfqOrigin = /^https:\/\//.test(endpoint) ? new URL(endpoint).origin : '';

const csp = [
  "default-src 'self'",
  "script-src 'self'",
  // React renders inline style attributes (e.g. CSS custom properties), which need 'unsafe-inline'.
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data:",
  "font-src 'self' data:",
  `connect-src 'self'${rfqOrigin ? ` ${rfqOrigin}` : ''}`,
  "form-action 'self'",
  "frame-src 'none'",
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "object-src 'none'",
  'upgrade-insecure-requests',
].join('; ');

writeFileSync(new URL('../dist/_headers', import.meta.url), `/*
  Content-Security-Policy: ${csp}
  X-Frame-Options: DENY
  Permissions-Policy: camera=(), microphone=(), geolocation=(), payment=(), usb=()
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin
  Strict-Transport-Security: max-age=63072000; includeSubDomains
  Cross-Origin-Opener-Policy: same-origin
`);
console.log(`headers: wrote dist/_headers${rfqOrigin ? ` (connect-src allows ${rfqOrigin})` : ''}`);
