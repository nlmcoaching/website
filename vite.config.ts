import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  // GitHub Pages project site: https://nlmcoaching.github.io/website/
  base: process.env.GITHUB_ACTIONS === 'true' ? '/website/' : '/',
  plugins: [react()],
})
