import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/fakeapi/',  // ← reemplaza con el nombre exacto de tu repo
})