import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { resolve } from 'path';
import fs from 'fs';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
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
    https: {
      key: fs.readFileSync(resolve(__dirname, '../certs/localhost.key')),
      cert: fs.readFileSync(resolve(__dirname, '../certs/localhost.crt')),
    },
    proxy: {
      '/api': {
        target: 'https://localhost:3001',
        changeOrigin: true,
        secure: false,
        ws: true,
      },
      '/ws': {
        target: 'wss://localhost:3001',
        ws: true,
        secure: false
      }
    }
  },
});