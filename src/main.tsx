import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import '@fontsource-variable/source-sans-3/wght.css'
import App from './App.tsx'

const root = document.getElementById('root')
if (root) createRoot(root).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
