import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';

export default defineConfig({
  base: '/',
  plugins: [react(), svgr()],
  build: {
    sourcemap: true,
    commonjsOptions: {
      include: [/node_modules/, 'tmi.js', 'uuid', '@tanstack/react-virtual'],
    },
  },
  optimizeDeps: {
    exclude: ['lucide-react'],
    include: ['tmi.js', 'uuid', '@tanstack/react-virtual'],
  },
});
