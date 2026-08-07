import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { kinesoscoreSeoShells } from './scripts/seoShells.js'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), kinesoscoreSeoShells()],
})
