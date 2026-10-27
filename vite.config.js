import { fileURLToPath, URL } from 'node:url'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  server: {
    host: true,
    allowedHosts: true
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
        enabled: true
      },
      workbox: {
        globPatterns: ['**/*.{js,jsx,css,html,ico,png,svg}'],
        cleanupOutdatedCaches: true,
        clientsClaim: true,
        skipWaiting: true,
      },
      includeAssets: ['favicon.svg', 'pwa-1280x720.png', 'pwa-720x1280.png'],
      manifest: {
        name: 'softapp',
        short_name: 'softapp',
        description: 'Plataforma para desarrollo de Progressive Web Apps y ecosistema React 19',
        scope: '/',
        start_url: '/',
        display: 'standalone',
        theme_color: '#9333ea',
        screenshots: [
          {
            src: 'pwa-1280x720.png',
            sizes: '1280x720',
            type: 'image/png',
            form_factor: 'wide'
          },
          {
            src: 'pwa-720x1280.png',
            sizes: '720x1280',
            type: 'image/png',
            form_factor: 'narrow'
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
