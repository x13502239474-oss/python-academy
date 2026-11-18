import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// GitHub Pages 部署时设置 base 为仓库名；本地/CNAME 场景留空。
// 通过环境变量 VITE_BASE 覆盖，例如：VITE_BASE=/python-academy/ npm run build
const base = process.env.VITE_BASE || '/'

export default defineConfig({
  base,
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg', 'icons/icon-192.svg', 'icons/icon-512.svg'],
      manifest: {
        name: 'Python Academy',
        short_name: 'Python Academy',
        description: '从零开始，掌握编程。零基础 Python 交互式学习平台',
        theme_color: '#0a1428',
        background_color: '#0a1428',
        display: 'standalone',
        orientation: 'portrait',
        start_url: base,
        icons: [
          { src: 'icons/icon-192.svg', sizes: '192x192', type: 'image/svg+xml', purpose: 'any maskable' },
          { src: 'icons/icon-512.svg', sizes: '512x512', type: 'image/svg+xml', purpose: 'any maskable' },
        ],
      },
      workbox: {
        // 只预缓存轻量资源；Pyodide 运行时（约 14MB）走运行时缓存，避免 SW 安装失败
        globPatterns: ['**/*.{js,css,html,svg,woff2}'],
        runtimeCaching: [
          {
            // 本地托管的 Pyodide 运行时：wasm / stdlib / lock / mjs / asm.js
            urlPattern: /\/pyodide\/.*\.(wasm|zip|json|mjs|js)(\?.*)?$/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'pyodide-runtime',
              expiration: { maxEntries: 20, maxAgeSeconds: 60 * 60 * 24 * 30 },
              cacheableResponse: { statuses: [0, 200] },
            },
          },
        ],
        navigateFallback: 'index.html',
      },
    }),
  ],
  build: {
    target: 'es2022',
    chunkSizeWarningLimit: 900,
  },
  worker: { format: 'es' },
})
