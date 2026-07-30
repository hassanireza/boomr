import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

/**
 * Vite configuration.
 *
 * `base` is set to a relative path ('./') in production so the built
 * index.html references its JS and CSS bundles relative to wherever
 * it is actually served from. This means the app works out of the
 * box on GitHub Pages regardless of the repository name, whether it
 * is a project page (https://<user>.github.io/<repo>/) or a user or
 * organization root page (https://<user>.github.io/), with no manual
 * configuration required.
 */
export default defineConfig(({ mode }) => ({
  base: mode === 'production' ? './' : '/',
  plugins: [react()],
  build: {
    outDir: 'dist',
    sourcemap: false,
    target: 'es2020',
  },
  server: {
    port: 5173,
  },
}));
