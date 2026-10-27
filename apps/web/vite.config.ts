import path from 'node:path';
import tailwindcss from '@tailwindcss/vite';
import { tanstackRouter } from '@tanstack/router-plugin/vite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  envDir: '../..',
  resolve: {
    alias: { '@': path.resolve(import.meta.dirname, 'src') },
  },
  plugins: [
    tanstackRouter({ target: 'react', autoCodeSplitting: true }),
    react(),
    tailwindcss(),
    VitePWA({
      registerType: 'autoUpdate',
      // ponytail: ícone SVG placeholder. Trocar por PNGs 192/512 + maskable quando houver identidade visual.
      manifest: {
        name: 'Descomplica Essa Política',
        short_name: 'Descomplica',
        description: 'Dados, fatos e transparência sem enrolação.',
        lang: 'pt-BR',
        theme_color: '#f7f5f0',
        background_color: '#f7f5f0',
        display: 'standalone',
        icons: [{ src: '/icon.svg', sizes: 'any', type: 'image/svg+xml', purpose: 'any' }],
      },
    }),
  ],
});
