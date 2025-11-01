// FILE: frontend/vite.config.js (CLEAN FINAL VERSION)

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// This is the clean, base configuration required for Vercel and Vite.
// We intentionally removed the 'server: { proxy: {...} }' block.
export default defineConfig({
  plugins: [react()],
})