
import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import babel from '@rolldown/plugin-babel'
import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    babel({
      presets: [reactCompilerPreset()],
    }),
    tailwindcss(),

    VitePWA({
      strategies: 'generateSW',
      registerType: 'autoUpdate',
      injectRegister: 'auto',

      includeAssets: [
        'favicon.svg',
        'icons/vaporlock-icon.svg',
      ],

      manifest: {
        id: '/',
        name: 'Vaporlock',
        short_name: 'Vaporlock',
        description: 'Explora el universo steampunk de Vaporlock.',
        lang: 'es',
        start_url: '/',
        scope: '/',
        display: 'standalone',
        orientation: 'any',
        theme_color: '#171512',
        background_color: '#171512',

        icons: [
          {
            src: '/icons/vaporlock-icon.svg',
            sizes: 'any',
            type: 'image/svg+xml',
            purpose: 'any',
          },
        ],
      },

      workbox: {
        globPatterns: [
          '**/*.{js,css,html,ico,png,svg,woff2,webmanifest}',
        ],

        navigateFallback: 'index.html',

        // Activación automática de nuevas versiones.
        skipWaiting: true,
        clientsClaim: true,

        // Limpia las cachés de versiones anteriores.
        cleanupOutdatedCaches: true,

        runtimeCaching: [
          {
            // Caché exclusiva para imágenes.
            urlPattern: ({ request }) =>
              request.destination === 'image',

            handler: 'CacheFirst',

            options: {
              cacheName: 'vaporlock-images-cache',

              expiration: {
                maxEntries: 150,
                maxAgeSeconds: 30 * 24 * 60 * 60,
              },

              cacheableResponse: {
                statuses: [0, 200],
              },
            },
          },
        ],
      },

      devOptions: {
        enabled: false,
      },
    }),
  ],
})
