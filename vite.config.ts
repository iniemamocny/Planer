import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'node:path';

export default defineConfig({
  base: './',
  root: path.resolve(__dirname, 'ui'),
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'ui', 'src'),
      '@ui': path.resolve(__dirname, 'ui', 'src'),
      '@core': path.resolve(__dirname, 'core'),
      '@api': path.resolve(__dirname, 'api'),
    },
  },
  server: {
    open: true,
  },
  build: {
    outDir: path.resolve(__dirname, 'dist-frontend'),
    emptyOutDir: true,
  },
});
