import { expect, test } from 'bun:test';
import { canAutoplay } from './carousel';

test('reduced motion disables autoplay even when play is requested', () => {
  expect(canAutoplay(true, false, false, 4)).toBe(false);
  expect(canAutoplay(false, false, false, 4)).toBe(true);
});
test('pause and hover stop carousel timers', () => {
  expect(canAutoplay(false, true, false, 3)).toBe(false);
  expect(canAutoplay(false, false, true, 3)).toBe(false);
});