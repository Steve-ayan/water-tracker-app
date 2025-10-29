import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// This is the clean, base Vite configuration.
// The API proxy block has been removed entirely to prevent conflicts 
// with the final Vercel deployment.
export default defineConfig({
  plugins: [react()],
})