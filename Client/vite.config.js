import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
   base: '/Client/', // Ensure this is set correctly
  build: {
    outDir: 'dist',
    emptyOutDir: true
  }
})