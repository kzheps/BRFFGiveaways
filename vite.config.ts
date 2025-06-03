import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';
import path from 'path';

export default defineConfig({
  base: '/',
  plugins: [
    react(),
    svgr({
      exportAsDefault: false,
      svgrOptions: {
        icon: true,
      },
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  build: {
    outDir: 'dist',
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
