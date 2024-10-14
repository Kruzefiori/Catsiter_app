/// <reference types="vitest" />
/// <reference types="vite/client" />
/// <reference types="vite-plugin-svgr/client" />

/*global __dirname*/

import react from '@vitejs/plugin-react'
import * as path from 'path'
import { defineConfig } from 'vite'
import svgr from 'vite-plugin-svgr'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@components': path.resolve(__dirname, './src/components'),
      '@assets': path.resolve(__dirname, './src/assets'),
      '@utils': path.resolve(__dirname, './src/utils')
    }
  },
  plugins: [
    react(),
    svgr({
      include: '**/*.svg?react',
      exclude: ''
    })
  ],
  test: {
    globals: true,
    environment: 'jsdom',
    css: true,
    setupFiles: ['./src/tests/setup.ts'],
    exclude: ['./backend/**', '**/node_modules/**'],
    bail: 1,
    passWithNoTests: true,
    coverage: {
      provider: 'v8',
      extension: ['.ts', '.tsx'],
      exclude: ['**/*.d.ts', '**/tests/*']
    }
  },
  server: {
    port: 3030
  }
})
