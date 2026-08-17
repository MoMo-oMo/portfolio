import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  // GitHub Pages serves project pages from /<repo-name>/, not the domain root.
  base: process.env.NODE_ENV === 'production' ? '/portfolio/' : '/',
  plugins: [vue()],
})