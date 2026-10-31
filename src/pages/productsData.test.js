import { describe, expect, test } from 'bun:test';
import { categories } from './productsData';

describe('MAPAL-pattern competence data', () => {
  test('every category defines the competence pattern: intro, featured example, capability blocks and families', () => {
    for (const cat of categories) {
      expect(cat.intro.length).toBeGreaterThan(0);
      expect(cat.intro2.length).toBeGreaterThan(0);
      expect(cat.featured.blurb.length).toBeGreaterThan(0);
      expect(cat.featured.image.length).toBeGreaterThan(0);
      expect(cat.capabilities.length).toBeGreaterThanOrEqual(4);
      for (const sub of cat.subcategories) expect(sub.products.length).toBeGreaterThan(0);
    }
  });
  test('pending capability blocks carry no fabricated body copy', () => {
    for (const cat of categories) {
      for (const block of cat.capabilities) {
        if (block.pending) expect(block.body).toBe('');
        if (block.pendingNote) expect(block.body.length).toBeGreaterThan(0);
      }
    }
    // At least one capability site-wide still waits on client approval.
    expect(categories.some(cat => cat.capabilities.some(block => block.pending))).toBe(true);
  });
  test('featured examples link to a family section of the same category', () => {
    for (const cat of categories) expect(cat.featured.href.startsWith(`/products/${cat.id}#`)).toBe(true);
  });
});
