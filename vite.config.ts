import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // Fix for Recharts require_isUnsafeProperty issue
      'victory-vendor/lib-vendor/d3-interpolate': 'victory-vendor/lib-vendor/d3-interpolate/src/index.js',
    }
  },
  build: {
    // Production optimizations
    minify: 'esbuild',
    // Code splitting
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('react') || id.includes('react-dom')) {
              return 'react-vendor';
            }
            if (id.includes('react-hook-form') || id.includes('zod') || id.includes('@hookform/resolvers')) {
              return 'form-vendor';
            }
            if (id.includes('framer-motion')) {
              return 'animation-vendor';
            }
          }
        },
      },
    },
    // Chunk size warnings
    chunkSizeWarningLimit: 1000,
    // Source maps for production debugging
    sourcemap: false,
  },
  // Performance optimizations
  optimizeDeps: {
    include: [
      'react', 
      'react-dom', 
      'framer-motion', 
      'react-hook-form', 
      'zod', 
      'recharts',
      'lucide-react'
    ],
  },
})
