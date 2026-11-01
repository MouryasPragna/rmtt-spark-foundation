import { describe, expect, test } from 'bun:test';
import { categories, productNavigation } from './productsData';

describe('MAPAL-pattern competence data', () => {
  test('product navigation has four destinations and each nested destination resolves to its own family', () => {
    expect(productNavigation.map(area => area.href)).toEqual(['/products/solid-carbide', '/products/pcd', '/products/brazed', '/products/specialized']);
    for (const area of productNavigation) {
      const category = categories.find(item => area.href === `/products/${item.id}`);
      expect(category).toBeDefined();
      for (const family of area.families) {
        expect(category?.subcategories.some(item => family.href === `/products/${category.id}/${item.id}`)).toBe(true);
      }
    }
  });
  test('Solid Carbide second-level navigation contains the three requested families', () => {
    expect(productNavigation.find(area => area.href === '/products/solid-carbide')?.families).toEqual([
      { label: 'End Mills', href: '/products/solid-carbide/sc-end-mills' },
      { label: 'Reamers', href: '/products/solid-carbide/sc-reamers' },
      { label: 'Drills', href: '/products/solid-carbide/sc-drills' },
    ]);
  });
  test('Brazed Carbide second-level navigation uses the available milling and drilling/reaming families', () => {
    expect(productNavigation.find(area => area.href === '/products/brazed')?.families).toEqual([
      { label: 'Milling Cutters', href: '/products/brazed/bc-milling' },
      { label: 'Drills & Reamers', href: '/products/brazed/bc-reamers' },
    ]);
  });
  test('the overview has exactly the four approved solution groups', () => {
    expect(categories.map(category => category.id)).toEqual(['solid-carbide', 'pcd', 'brazed', 'specialized']);
  });
  test('Solid Carbide contains End Milling, Reamers and Drills families', () => {
    expect(categories.find(category => category.id === 'solid-carbide')?.subcategories.map(family => family.id))
      .toEqual(['sc-end-mills', 'sc-reamers', 'sc-drills']);
  });
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
  test('featured examples link to a family page of the same category', () => {
    for (const cat of categories) {
      expect(cat.featured.href.startsWith(`/products/${cat.id}/`)).toBe(true);
      expect(cat.subcategories.some(sub => cat.featured.href.endsWith(`/${sub.id}`))).toBe(true);
    }
  });
});
