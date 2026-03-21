import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { VitePWA } from 'vite-plugin-pwa'

import { splashScreen } from 'vite-plugin-splash-screen'

splashScreen({
  logoSrc: '/icons/stickky-note-icon.png',
})

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'Sticky Notes2',
        short_name: 'StickyNotes',
        description: 'A modern real-time sticky notes app',
        theme_color: '#f5c842',
        background_color: '#ff6b6b',
        display: 'standalone',
        start_url: '/',
        icons: [
          {
            src: '/icons/logo.svg',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/icons/logo.svg',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable',
          },
        ],
      },
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '.'),
    },
  },
  build: {
    chunkSizeWarningLimit: 600,
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-react': ['react', 'react-dom', 'react-router-dom'],
          'vendor-firebase': [
            'firebase/app',
            'firebase/auth',
            'firebase/firestore',
          ],
          // ← removed @tiptap/pm, it gets bundled automatically
          //   with the other tiptap packages
          'vendor-tiptap': [
            '@tiptap/react',
            '@tiptap/starter-kit',
            '@tiptap/extension-underline',
            '@tiptap/core',
          ],
        },
      },
    },
  },
})
