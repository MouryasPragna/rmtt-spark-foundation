import { describe, expect, test } from 'bun:test';
import { products } from './products';

describe('Solid Carbide specifications from FINAL PDF pages 7–9', () => {
  const spec = (family, label) => products.find(product => product.subcategory === family)?.specs?.find(item => item.label === label)?.value;
  test('end mills cover 2–32 mm with 2, 3, 4, 5 and 6 flutes', () => {
    expect(spec('sc-end-mills', 'Diameter')).toBe('2–32 mm');
    expect(spec('sc-end-mills', 'Flutes (Z)')).toBe('2, 3, 4, 5, 6');
  });
  test('reamers cover 2–32 mm with customer-specific H6/H7 tolerances', () => {
    expect(spec('sc-reamers', 'Diameter')).toBe('2–32 mm');
    expect(spec('sc-reamers', 'Tolerance')).toBe('Customer-specific, e.g. H6 / H7');
  });
  test('straight reamer flutes suit through and blind holes; left-hand spiral suits through holes', () => {
    expect(spec('sc-reamers', 'Straight flutes')).toBe('Through and blind holes');
    expect(spec('sc-reamers', 'Left-hand spiral flutes')).toBe('Through holes');
  });
  test('drills cover 2–25 mm with internal coolant from 4 mm', () => {
    expect(spec('sc-drills', 'Diameter')).toBe('2–25 mm');
    expect(spec('sc-drills', 'Coolant')).toBe('Internal from 4 mm diameter');
  });
  test('drills have two or three edges and 30-degree standard or 40-degree multi-step helix', () => {
    expect(spec('sc-drills', 'Edges')).toBe('2 or 3');
    expect(spec('sc-drills', 'Helix')).toBe('30° standard; 40° for multi-step');
  });
});