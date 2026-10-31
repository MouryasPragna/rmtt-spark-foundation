import { expect, test } from 'bun:test';
import { createElement } from 'react';
import { renderToString } from 'react-dom/server';
import { QuoteProvider, useQuote } from './QuoteContext';

test('quote consumers receive the provider state when storage is unavailable', () => {
  function Consumer() {
    const { selected } = useQuote();
    return String(selected.length);
  }
  expect(renderToString(createElement(QuoteProvider, null, createElement(Consumer)))).toBe('0');
});