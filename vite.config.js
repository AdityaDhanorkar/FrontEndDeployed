import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://16.170.233.222:8080',
        changeOrigin: true,
        secure: false,
      },
    },
  },
})
