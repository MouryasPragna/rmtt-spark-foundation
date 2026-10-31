import { describe, expect, test } from 'bun:test';
import { products } from '../data/products';
import { industryNames } from '../data/industries';
import { leaders } from '../data/leadership';
import { equipment } from '../data/equipment';
import { siteConfig } from './siteConfig';
import roshan from '../assets/roshan-tanuk.webp.asset.json';
import ravi from '../assets/ravi-kumar.webp.asset.json';
import syamala from '../assets/syamala-kumar.webp.asset.json';
import catalogue from '../assets/rmtt-final-catalogue.pdf.asset.json';
import { filterProducts, readQuoteSlugs, saveQuoteSlugs } from './catalogue';
import { MAX_DRAWING_BYTES, buildRfqMailto, rfqSchema, submitRfq, validateDrawing } from './rfq';

describe('static catalogue rules', () => {
  test('filters the shared cat and q URL parameters', () => {
    const result = filterProducts(new URLSearchParams('cat=pcd&q=reamer'));
    expect(result.map(tool => tool.slug)).toEqual(['pcd-reamer']);
  });
  test('combines material and industry filters', () => {
    const result = filterProducts(new URLSearchParams('cat=solid-carbide&material=titanium&industry=Automotive'));
    expect(result.map(tool => tool.slug)).toEqual(['solid-carbide-reamers']);
  });
  test('end-mill specifications match the approved FINAL deck values', () => {
    expect(products.find(tool => tool.slug === 'finishing-application-solid-carbide-endmill')?.specs).toEqual([
      { label: 'Diameter', value: '2–32 mm' },
      { label: 'Flutes (Z)', value: '2, 3, 4, 5, 6' },
      { label: 'Technology', value: 'multi-helix with high wear-resistance coatings' },
      { label: 'Features', value: 'high-polished and edge-honed' },
    ]);
  });
  test('reamers include approved coolant and multi-step options', () => {
    const specs = products.find(tool => tool.slug === 'solid-carbide-reamers')?.specs;
    expect(specs).toContainEqual({ label: 'Coolant', value: 'Internal coolant supply' });
    expect(specs).toContainEqual({ label: 'Options', value: 'Special multi-step reamers' });
  });
  test('restores persisted selections without duplicates or unknown tools', () => {
    let saved = '';
    saveQuoteSlugs({ setItem: (_key, value) => { saved = value; } }, ['pcd-reamer', 'pcd-reamer', 'unknown']);
    expect(readQuoteSlugs({ getItem: () => saved })).toEqual(['pcd-reamer']);
  });
  test('disabled storage cannot break a quote draft', () => {
    expect(readQuoteSlugs({ getItem: () => { throw new Error('disabled'); } })).toEqual([]);
    expect(() => saveQuoteSlugs({ setItem: () => { throw new Error('disabled'); } }, [])).not.toThrow();
  });
});

const form = { name: ' Person ', company: ' Company ', email: 'person@example.com', phone: '', toolType: 'PCD Reamer', industry: '', material: '', machine: '', qty: '', description: ' Bore finishing ', website: '', consent: true };
describe('client-side quote validation', () => {
  test('explicit consent is required before an enquiry can be submitted', () => {
    expect(rfqSchema.safeParse({ ...form, consent: false }).success).toBe(false);
    expect(rfqSchema.safeParse({ ...form, consent: undefined }).success).toBe(false);
    expect(rfqSchema.safeParse(form).success).toBe(true);
  });
  test('10 MB is accepted and anything larger is rejected', () => {
    expect(MAX_DRAWING_BYTES).toBe(10 * 1024 * 1024);
    expect(validateDrawing({ name: 'drawing.pdf', type: 'application/pdf', size: MAX_DRAWING_BYTES })).toBeUndefined();
    expect(validateDrawing({ name: 'drawing.pdf', type: 'application/pdf', size: MAX_DRAWING_BYTES + 1 })).toBeDefined();
  });
  test('only PDF, DXF and DWG drawings are accepted', () => {
    for (const extension of ['pdf', 'dxf', 'dwg']) expect(validateDrawing({ name: `drawing.${extension}`, type: '', size: 100 })).toBeUndefined();
    expect(validateDrawing({ name: 'drawing.exe', type: '', size: 100 })).toBeDefined();
    expect(validateDrawing({ name: 'drawing.pdf', type: 'image/png', size: 100 })).toBeDefined();
  });
  test('trims field values and rejects whitespace-only requirements', () => {
    expect(rfqSchema.parse(form).name).toBe('Person');
    expect(rfqSchema.safeParse({ ...form, description: '  ' }).success).toBe(false);
  });
  test('filled honeypot is rejected', () => {
    expect(rfqSchema.safeParse({ ...form, website: 'spam' }).success).toBe(false);
  });
  test('all form fields enforce length limits', () => {
    expect(rfqSchema.safeParse({ ...form, name: 'x'.repeat(101) }).success).toBe(false);
    expect(rfqSchema.safeParse({ ...form, description: 'x'.repeat(2001) }).success).toBe(false);
  });
  test('submission never reports success while disconnected', async () => {
    const payload = { ...form, tools: ['pcd-reamer'] };
    expect(await submitRfq(payload)).toBe('draft');
    expect(buildRfqMailto(payload, 'sales@rmtt.co.in')).toContain('mailto:sales@rmtt.co.in?subject=');
  });
});
describe('approved company data', () => {
  test('industry options contain exactly the six approved sectors', () => {
    expect(industryNames).toEqual(['Automotive', 'Aerospace', 'Defence', 'Energy', 'General Engineering', 'Hydraulic']);
  });
  test('leadership pairs FINAL portraits with approved names and no invented roles', () => {
    expect(leaders).toEqual([
      { name: 'Roshan Tanuk', role: '', img: roshan.url },
      { name: 'K. Ravi Kumar', role: '', img: ravi.url },
      { name: 'K. Syamala Kumar', role: '', img: syamala.url },
    ]);
  });
  test('unconfirmed equipment is excluded', () => {
    expect(equipment.map(item => item.id)).toEqual(['saacke', 'vollmer', 'helicheck', 'coating']);
  });
  test('equipment models match FINAL page 5 nameplates', () => {
    expect(equipment.flatMap(item => item.models || [])).toEqual(['UW II', 'UW ID O', 'QWD', 'HELICHECK PRO']);
  });
  test('the complete FINAL postal address is shared', () => {
    expect(siteConfig.address).toEqual({ street: 'GNC Industrial Estate, Agara Village, Tataguni Post, Kanakapura Main Road', cityLine: 'Bengaluru – 560082, India' });
  });
  test('the catalogue download uses the supplied FINAL PDF pointer', () => {
    expect(siteConfig.catalogueUrl).toBe(catalogue.url);
    expect(catalogue.content_type).toBe('application/pdf');
  });
});
describe('FINAL catalogue additions', () => {
  test('end mills are returned by each approved material filter', () => {
    for (const material of ['nodular cast iron', 'Inconel', 'titanium', 'stainless steel', 'PH steels', 'aerospace aluminium alloys']) {
      expect(filterProducts(new URLSearchParams({ material })).some(tool => tool.slug === 'finishing-application-solid-carbide-endmill')).toBe(true);
    }
  });
  test('reamer and drill PVD specifications are product-specific', () => {
    for (const slug of ['solid-carbide-reamers', 'solid-carbide-drills']) expect(products.find(tool => tool.slug === slug)?.specs).toContainEqual({ label: 'Coating', value: 'Application-specific PVD wear-resistant coating' });
    expect(products.find(tool => tool.slug === 'solid-carbide-drills')?.specs).toContainEqual({ label: 'Material', value: 'Ultra-fine carbide' });
  });
  test('all eight FINAL brazed model references are searchable', () => {
    for (const model of ['RDH60-00229', 'RDH60-00062-01', 'RDH60-00135', 'RDH60-00200', 'RDH60-00220', 'RDH60-00227', 'RDH60-00232', 'RDH60-00241']) expect(filterProducts(new URLSearchParams({ q: model })).length).toBeGreaterThan(0);
    expect(filterProducts(new URLSearchParams({ q: 'RDH60-00241' }))[0]?.slug).toBe('t-slot-milling-cutter');
  });
  test('shell drawing is an example gallery image, not a general range specification', () => {
    const shell = products.find(tool => tool.slug === 'brazed-carbide-shell-milling-cutter');
    expect(shell?.images?.length).toBe(2);
    expect(shell?.images?.[1].alt).toContain('Ø40 H6');
    expect(shell?.specs?.some(spec => spec.value.includes('Ø40'))).toBe(false);
  });
  test('tools without their own details get catalogue category details', () => {
    expect(products.find(tool => tool.slug === 'pcd-milling-tool')?.benefits).toContain('Surface finish less than Ra 0.2 is possible to achieve');
    expect(products.find(tool => tool.slug === 't-slot-milling-cutter')?.specs?.[0].value).toBe('Heat-treated, high-quality tool steel');
    expect(products.find(tool => tool.slug === 'solid-carbide-drills')?.benefits?.[0]).toBe('Well-polished flutes for better chip flow');
  });
});

import { getProductImages } from '../data/products';
describe('product images', () => {
  test('prefers images[], falls back to image, else empty', () => {
    expect(getProductImages({ name: 'A', image: 'a.jpg', images: [{ src: 'b.jpg', alt: 'B' }] })).toEqual([{ src: 'b.jpg', alt: 'B' }]);
    expect(getProductImages({ name: 'A', image: 'a.jpg' })).toEqual([{ src: 'a.jpg', alt: 'A' }]);
    expect(getProductImages({ name: 'A' })).toEqual([]);
  });
});

describe('pictured tool markings', () => {
  test('PCD reamer shows the size engraved on its photo', async () => {
    const { products } = await import('../data/products.ts');
    const reamer = products.find(p => p.slug === 'pcd-reamer');
    expect(reamer.markings).toEqual([{ label: 'Model', value: 'RDH70-0411' }, { label: 'Size marked (mm)', value: 'Ø22.05 / Ø23.75 × 100.0' }]);
  });
  test('engraved PCD model numbers are searchable', () => {
    expect(filterProducts(new URLSearchParams({ q: 'RDH70-0434' }))[0]?.slug).toBe('pcd-milling-tool');
  });
});
