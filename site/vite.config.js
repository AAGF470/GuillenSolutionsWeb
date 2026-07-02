import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Standalone Guillen Solutions site. Component library consumed as @aagf470/ui.
export default defineConfig({
  plugins: [react()],
})
