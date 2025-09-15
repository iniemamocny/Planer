import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'node:path';

export default defineConfig({
  root: path.resolve(__dirname, 'frontend'),
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'frontend', 'src'),
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
