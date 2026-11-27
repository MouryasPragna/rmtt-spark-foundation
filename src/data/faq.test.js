import { expect, test } from 'bun:test';
import { faqGroups, faqItems } from './faq';
import { publicRoutes } from '../lib/publicRoutes';

test('every FAQ item has a question, an answer and, if linked, a real page', () => {
  const routes = new Set(publicRoutes());
  expect(faqGroups.length).toBeGreaterThan(0);
  expect(new Set(faqItems.map(item => item.id)).size).toBe(faqItems.length);
  for (const item of faqItems) {
    expect(item.question.endsWith('?')).toBe(true);
    expect(item.answer.length).toBeGreaterThan(0);
    for (const paragraph of item.answer) expect(paragraph.trim().length).toBeGreaterThan(20);
    if (item.link) expect(routes.has(item.link.to)).toBe(true);
  }
});

test('FAQ answers make none of the claims still awaiting client evidence', () => {
  const text = faqItems.flatMap(item => [item.question, ...item.answer]).join(' ').toLowerCase();
  for (const pending of ['iso', 'certif', '24 hour', '24-hour', 'lead time', 'minimum order', 'regrind', 'recondition', '±', 'tialn', 'altin', 'dlc'])
    expect(text).not.toContain(pending);
});
