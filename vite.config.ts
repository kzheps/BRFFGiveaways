import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { build } from 'esbuild';
import electron from 'vite-plugin-electron';
import renderer from 'vite-plugin-electron-renderer';
import svgr from 'vite-plugin-svgr';
import path from 'path';
import type { UserConfig } from 'vite';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  const plugins = [
    react({
      babel: {
        plugins: ['@babel/plugin-transform-react-jsx'],
      },
      jsxRuntime: 'automatic',
    }),
    svgr({
      svgrOptions: {
        icon: true,
      },
    }),
    electron({
      entry: 'src/electron/main.ts',
      onstart(args) {
        build({
          entryPoints: ['src/electron/main.ts'],
          bundle: true,
          outfile: 'dist-electron/main.cjs',
          platform: 'node',
          target: 'node16',
          format: 'cjs',
          external: ['electron'],
        }).then(() => {
          args.reload()
        })
      },
    }),
    renderer(),
  ];

  return {
    base: './',
    plugins,
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
        'stream': 'stream-browserify',
        'util': 'util',
        'zlib': 'browserify-zlib',
      },
    },
    build: {
      outDir: 'dist',
      assetsDir: '.',
      sourcemap: env.NODE_ENV !== 'production',
      minify: 'terser',
      target: 'esnext',
      chunkSizeWarningLimit: 1600,
      rollupOptions: {
        output: {
          manualChunks: {
            react: ['react', 'react-dom'],
            vendor: ['zustand', 'date-fns', 'clsx'],
            tmi: ['tmi.js'],
            confetti: ['canvas-confetti', 'react-confetti'],
          },
        },
      },
    },
    optimizeDeps: {
      include: [
        'react',
        'react-dom',
        'tmi.js',
        '@tanstack/react-virtual',
        'canvas-confetti',
        'lucide-react'
      ],
      exclude: [],
    },
    define: {
      'process.env.NODE_ENV': JSON.stringify(env.NODE_ENV),
    },
  } as UserConfig;
});
