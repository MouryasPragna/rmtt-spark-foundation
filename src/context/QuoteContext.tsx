import { createContext, useContext, useEffect, useState, type Context, type ReactNode } from 'react';
import { products, type Product } from '../data/products';
import { readQuoteSlugs, saveQuoteSlugs } from '../lib/catalogue';

type Quote = { selected: Product[]; add: (slug: string) => void; remove: (slug: string) => void };
// Keep provider and consumers on the same context during Vite hot updates.
// Otherwise an already-mounted provider can retain the previous context object.
const QuoteContext: Context<Quote | undefined> = import.meta.hot?.data.quoteContext ?? createContext<Quote | undefined>(undefined);
if (import.meta.hot) import.meta.hot.data.quoteContext = QuoteContext;

export function QuoteProvider({ children }: { children: ReactNode }) {
  const [slugs, setSlugs] = useState<string[]>(() => {
    try { return readQuoteSlugs(window.localStorage); } catch { return []; }
  });
  useEffect(() => {
    try { saveQuoteSlugs(window.localStorage, slugs); } catch { /* Keep in-memory selections. */ }
  }, [slugs]);
  const selected = slugs.flatMap(slug => products.filter(product => product.slug === slug));
  const add = (slug: string) => {
    if (products.some(product => product.slug === slug)) setSlugs(current => current.includes(slug) ? current : [...current, slug]);
  };
  const remove = (slug: string) => setSlugs(current => current.filter(value => value !== slug));
  return <QuoteContext.Provider value={{ selected, add, remove }}>{children}</QuoteContext.Provider>;
}

export function useQuote() {
  const quote = useContext(QuoteContext);
  if (!quote) throw new Error('QuoteProvider is required');
  return quote;
}