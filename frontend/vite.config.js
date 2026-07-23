import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
  registerType: 'autoUpdate',
  injectRegister: 'auto',
  includeAssets: ['logo.png'],

  manifest: {
    name: 'Expense Tracker',
    short_name: 'Expenses',
    description: 'Menaxho shpenzimet e tua më lehtë',
    start_url: '/',
    scope: '/',
    display: 'standalone',
    theme_color: '#2563eb',
    background_color: '#ffffff',

    icons: [
      {
        src: '/logo.png',
        sizes: '192x192',
        type: 'image/png'
      },
      {
        src: '/logo.png',
        sizes: '512x512',
        type: 'image/png'
      }
    ]
  }
})
  ],
})