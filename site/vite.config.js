import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Standalone Guillen Solutions site. Component library consumed as @aagf470/ui.
export default defineConfig({
  plugins: [react()],
  // One React, always: the ui package is sometimes consumed as a local file
  // symlink (monorepo), which would otherwise pull a second React copy into
  // the production bundle and crash any package component that uses hooks.
  resolve: { dedupe: ['react', 'react-dom', 'react-router-dom'] },
})
