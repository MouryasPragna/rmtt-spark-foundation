import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import '@fontsource/poppins/400.css'
import '@fontsource/poppins/600.css'
import '@fontsource/poppins/700.css'

import './index.css'
import App from './App.tsx'

// Old links used hash routes (/#/about). Move them to the real path before React starts.
const legacy = window.location.hash.startsWith('#/') ? window.location.hash.slice(1) : null
if (legacy) window.history.replaceState(null, '', `${import.meta.env.BASE_URL.replace(/\/$/, '')}${legacy}`)

const root = document.getElementById('root')
if (root) {
  const app = <StrictMode><App /></StrictMode>
  // Hydrate only when the server sent the pre-rendered HTML for this exact path.
  // If a host fell back to another page's HTML (or a legacy hash link was rewritten),
  // render fresh instead so React never reconciles against the wrong page.
  const prerendered = root.dataset.prerenderedPath
  const current = window.location.pathname.replace(import.meta.env.BASE_URL.replace(/\/$/, ''), '').replace(/\/+$/, '') || '/'
  if (prerendered && prerendered === current && !legacy) {
    hydrateRoot(root, app)
  } else {
    root.replaceChildren()
    createRoot(root).render(app)
  }
}
