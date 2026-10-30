import { fileURLToPath, URL } from 'node:url'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'

const rickAndMortyProxy = {
  '/api/rick-and-morty': {
    target: 'https://rickandmortyapi.com',
    changeOrigin: true,
    rewrite: (path) => path.replace(/^\/api\/rick-and-morty/, '/api')
  }
}

// https://vite.dev/config/
export default defineConfig({
  base: process.env.GITHUB_PAGES === 'true' ? '/reactapp/' : '/',
  server: {
    host: true,
    allowedHosts: true,
    proxy: rickAndMortyProxy
  },
  preview: {
    proxy: rickAndMortyProxy
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      devOptions: {
        enabled: false
      },
      workbox: {
        globPatterns: ['**/*.{js,jsx,css,html,ico,png,svg}'],
        globIgnores: ['**/pwa-1280x720.png'],
        cleanupOutdatedCaches: true,
        clientsClaim: true,
        skipWaiting: true,
      },
      manifest: {
        name: 'softapp',
        short_name: 'softapp',
        description: 'Plataforma para desarrollo de Progressive Web Apps y ecosistema React 19',
        lang: 'es',
        scope: './',
        start_url: './',
        display: 'standalone',
        theme_color: '#9333ea',
        screenshots: [
          {
            src: 'pwa-1280x720.png',
            sizes: '1280x720',
            type: 'image/png',
            form_factor: 'wide'
          }
        ],
        icons: [
          {
            src: 'pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'any'
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any'
          }
        ]
      }
    })
  ]
})
