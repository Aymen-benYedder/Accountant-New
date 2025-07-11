import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { resolve } from 'path';
import fs from 'fs';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    {
      name: 'copy-redirects',
      closeBundle: () => {
        const src = path.resolve(__dirname, 'public/_redirects');
        const dest = path.resolve(__dirname, 'dist/_redirects');
        if (fs.existsSync(src)) {
          fs.copyFileSync(src, dest);
          console.log('Copied _redirects to dist');
        }
      }
    }
  ],
  resolve: {
    alias: [
      { find: "@jumbo", replacement: "/src/@jumbo" },
      { find: "@assets", replacement: "/src/@assets" },
      { find: "@app", replacement: "/src/app" },
      { find: "@contexts", replacement: "/src/contexts" },
    ],
  },
  define: {
    global: "window",
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html')
      }
    }
  },
  server: {
    proxy: {
      '/api': {
        target: process.env.VITE_API_BASE_URL || 'http://localhost:3000',
        changeOrigin: true,
        secure: false,
        ws: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      },
      '/socket.io': {
        target: process.env.VITE_WS_URL || 'ws://localhost:3000',
        ws: true,
        changeOrigin: true,
        secure: false
      }
    }
  },
});
