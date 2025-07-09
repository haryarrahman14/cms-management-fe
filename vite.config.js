import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
  ],
  base: './',
  server:{
    port: 5173,
    allowedHosts: true,
    host: '0.0.0.0',
    cors: true,
    strictPort: true,
  },
  preview:{
    port: 5173,
    allowedHosts: true,
    host: '0.0.0.0',
    cors:true,
    strictPort: true,
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
})
