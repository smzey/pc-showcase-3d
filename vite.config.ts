import { defineConfig } from 'vite';

export default defineConfig({
  // Relative base ensures seamless hosting on GitHub Pages subpaths, Cloudflare Pages, Vercel, and Netlify
  base: './',
  build: {
    outDir: 'dist',
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          three: ['three'],
        },
      },
    },
  },
});
