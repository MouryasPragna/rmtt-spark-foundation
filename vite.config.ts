import { defineConfig, searchForWorkspaceRoot } from 'vite'
import { realpathSync } from 'node:fs'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Relative base so the build works under a GitHub Pages project path or a custom domain
  // (the site uses HashRouter, so no server rewrites are needed).
  base: './',
  // Dependencies may be symlinked outside the workspace in the preview sandbox.
  server: { fs: { allow: [searchForWorkspaceRoot(process.cwd()), realpathSync('node_modules')] } },
})
