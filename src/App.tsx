import { HashRouter, Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import WhatsAppFab from './components/WhatsAppFab';
import Home from './pages/Home';
import { QuoteProvider } from './context/QuoteContext';
import RouteMeta from './components/RouteMeta';
import ScrollToTop from './components/ScrollToTop';
const Products = lazy(() => import('./pages/Products'));
const ProductRoute = lazy(() => import('./pages/ProductRoute'));
const Industries = lazy(() => import('./pages/Industries'));
const Technology = lazy(() => import('./pages/Technology'));
const Contact = lazy(() => import('./pages/Contact'));
const About = lazy(() => import('./pages/About'));
const TrustSignals = lazy(() => import('./pages/TrustSignals'));
const LegalPage = lazy(() => import('./pages/LegalPage'));
const NotFound = lazy(() => import('./pages/NotFound'));
const News = lazy(() => import('./pages/News'));
const NewsArticle = lazy(() => import('./pages/NewsArticle'));

export default function App() {
  return (
    <HashRouter>
      <QuoteProvider>
      <RouteMeta />
      <ScrollToTop />
      <a className="skip-link" href="#main-content" onClick={event => { event.preventDefault(); document.getElementById('main-content')?.focus(); }}>Skip to main content</a>
      <Navbar />
      <main id="main-content" tabIndex={-1}>
      <Suspense fallback={<div className="route-loading" role="status">Loading…</div>}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:categoryId" element={<ProductRoute />} />
        <Route path="/applications" element={<Industries />} />
        <Route path="/services" element={<Technology />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="/downloads" element={<TrustSignals />} />
        <Route path="/news" element={<News />} />
        <Route path="/news/:id" element={<NewsArticle />} />
        <Route path="/privacy" element={<LegalPage title="Privacy Policy" />} />
        <Route path="/terms" element={<LegalPage title="Terms" />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      </Suspense>
      </main>
      <Footer />
      <WhatsAppFab />
      </QuoteProvider>
    </HashRouter>
  );
}
