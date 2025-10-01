import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig(({ command }) => {
  if (command === 'build') {
    return {
      plugins: [react(), tailwindcss()],
    }
  } else {
    return {
      plugins: [react(), tailwindcss()],
      base: '/',
    }
  }
})
