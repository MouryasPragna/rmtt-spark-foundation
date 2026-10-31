import { defineConfig, searchForWorkspaceRoot } from 'vite'
import { realpathSync } from 'node:fs'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/rmtt-website/',
  // Dependencies may be symlinked outside the workspace in the preview sandbox.
  server: { fs: { allow: [searchForWorkspaceRoot(process.cwd()), realpathSync('node_modules')] } },
})
