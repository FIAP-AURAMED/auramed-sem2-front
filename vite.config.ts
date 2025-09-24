import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
// Para a Vercel, a base é sempre a raiz '/'
export default defineConfig({
  plugins: [
    react(),
    tailwindcss()
  ],
  base: '/',
})