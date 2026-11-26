import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { lazy, Suspense, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import WhatsAppFab from './components/WhatsAppFab';
import Home from './pages/Home';
import RouteMeta from './components/RouteMeta';
import ScrollToTop from './components/ScrollToTop';
import { startScrollMotion } from './lib/scrollMotion';
const Products = lazy(() => import('./pages/Products'));
const ProductRoute = lazy(() => import('./pages/ProductRoute'));
const FamilyPage = lazy(() => import('./pages/FamilyPage'));
const PCDTools = lazy(() => import('./pages/PCDTools'));
const PCDTechnology = lazy(() => import('./pages/PCDTechnology'));
const Technology = lazy(() => import('./pages/Technology'));
const Contact = lazy(() => import('./pages/Contact'));
const About = lazy(() => import('./pages/About'));
const LegalPage = lazy(() => import('./pages/LegalPage'));
const NotFound = lazy(() => import('./pages/NotFound'));

/** Everything inside the router. The browser wraps it in BrowserRouter (below);
 *  the build-time pre-render wraps it in StaticRouter (src/entry-server.tsx). */
export function AppShell() {
  // Scroll reveals and image fades start after hydration; see src/lib/scrollMotion.ts.
  useEffect(() => startScrollMotion(), []);
  return (
    <>
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
        <Route path="/products/pcd/pcd-tooling" element={<PCDTools />} />
        <Route path="/products/pcd/pcd-technology" element={<PCDTechnology />} />
        <Route path="/products/:categoryId/:familyId" element={<FamilyPage />} />
        <Route path="/applications" element={<Navigate to="/" replace />} />
        <Route path="/services" element={<Technology />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="/downloads" element={<Navigate to="/contact" replace />} />
        <Route path="/news" element={<Navigate to="/" replace />} />
        <Route path="/news/:id" element={<Navigate to="/" replace />} />
        <Route path="/privacy" element={<LegalPage title="Privacy Policy" />} />
        <Route path="/terms" element={<LegalPage title="Terms" />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      </Suspense>
      </main>
      <Footer />
      <WhatsAppFab />
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL.replace(/\/$/, '') || undefined}>
      <AppShell />
    </BrowserRouter>
  );
}
