import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { kinesoscoreSeoShells } from './scripts/seoShells.js'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), kinesoscoreSeoShells()],
  build: {
    rolldownOptions: {
      output: {
        codeSplitting: {
          groups: [
            {
              name: 'react-vendor',
              test: /node_modules[\\/](react|react-dom|scheduler)([\\/]|$)/,
              priority: 30,
            },
            {
              name: 'supabase',
              test: /node_modules[\\/]@supabase([\\/]|$)/,
              priority: 25,
            },
            {
              name: 'charts',
              test: /node_modules[\\/](recharts|d3-|internmap|delaunator|robust-predicates)/,
              priority: 20,
            },
            {
              name: 'vendor',
              test: /node_modules/,
              priority: 10,
            },
          ],
        },
      },
    },
  },
})
