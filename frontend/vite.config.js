import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// This configuration has no proxy and is ideal for Vercel deployment.
export default defineConfig({
  plugins: [react()],
})