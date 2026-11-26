import { defineConfig, searchForWorkspaceRoot, type Plugin } from 'vite'
import { readFileSync, realpathSync } from 'node:fs'
import react from '@vitejs/plugin-react'

// Real paths (/products/pcd/...) need absolute asset URLs, so the base is the site root.
// To serve from a sub-path (e.g. a GitHub Pages project site), build with VITE_BASE=/repo-name/.
const base = process.env.VITE_BASE || '/'

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
  // Dependencies may be symlinked outside the workspace in the preview sandbox.
  server: { fs: { allow: [searchForWorkspaceRoot(process.cwd()), realpathSync('node_modules')] } },
})
