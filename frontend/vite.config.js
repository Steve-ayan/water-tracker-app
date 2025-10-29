import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Proxy API requests from React to the Node.js backend server
      '/api': {
        target: 'https://water-tracker-api-live.onrender.com', // Matches your backend server port
        changeOrigin: true,
        secure: true,
      },
    },
  },
})
