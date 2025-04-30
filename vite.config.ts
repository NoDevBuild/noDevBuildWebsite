import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    host: true,
    // Add historyApiFallback for client-side routing
    historyApiFallback: true
  },
  optimizeDeps: {
    exclude: ['lucide-react']
  },
  build: {
    rollupOptions: {
      external: ['tippy.js/dist/tippy.css'],
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom'],
          'ui-vendor': ['@tippyjs/react', 'tippy.js']
        }
      }
    }
  }
});