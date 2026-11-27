import { defineConfig, searchForWorkspaceRoot, type Plugin } from 'vite'
import { readFileSync, realpathSync } from 'node:fs'
import react from '@vitejs/plugin-react'

// Real paths (/products/pcd/...) need absolute asset URLs. The base is the path part of the
// public site address, so a GitHub Pages project site (VITE_SITE_URL=https://user.github.io/repo)
// builds for /repo/ and a custom domain builds for /. VITE_BASE overrides it when set.
function siteBase(): string {
  if (process.env.VITE_BASE) return process.env.VITE_BASE
  try {
    const path = new URL(process.env.VITE_SITE_URL || 'https://example.invalid/').pathname.replace(/\/+$/, '')
    return `${path}/`
  } catch {
    return '/'
  }
}
const base = siteBase()

// Checked-in asset pointers (*.asset.json) store relative URLs such as "images/assets/x.jpg".
// Those only resolved correctly while every page lived at "/" under HashRouter; on a real
// path like /products/t-slot-milling-cutter they would point into /products/images/...
// This rewrites each pointer's url to start from the site base when it is imported.
function absoluteAssetUrls(): Plugin {
  return {
    name: 'absolute-asset-pointer-urls',
    enforce: 'pre',
    load(id) {
      const file = id.split('?')[0]
      if (!file.endsWith('.asset.json')) return null
      const data = JSON.parse(readFileSync(file, 'utf8'))
      if (typeof data.url === 'string' && !/^(?:[a-z]+:)?\/\//i.test(data.url) && !data.url.startsWith('/')) {
        data.url = `${base}${data.url}`
      }
      return JSON.stringify(data)
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [absoluteAssetUrls(), react()],
  base,
  // One stylesheet for the whole site: pre-rendered pages then arrive fully styled. With per-page
  // CSS chunks each page's styles only loaded with its script, so heroes and grids jumped (CLS 0.3–0.8).
  build: { cssCodeSplit: false },
  // Dependencies may be symlinked outside the workspace in the preview sandbox.
  server: { fs: { allow: [searchForWorkspaceRoot(process.cwd()), realpathSync('node_modules')] } },
})
