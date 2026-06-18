import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    proxy: {
      // Forward all /api/* requests to the local Express server in dev
      '/api': {
        target:       'http://localhost:3001',
        changeOrigin: true,
        secure:       false,
      }
    }
  }
});
