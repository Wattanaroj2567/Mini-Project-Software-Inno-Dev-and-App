/* eslint-env node */
import react from "@vitejs/plugin-react-swc";
import path from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const proxyTarget = process.env.VITE_PROXY_TARGET || "http://localhost:8080";

export default defineConfig({
  plugins: [react()],
  define: {
    global: "globalThis",
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    port: 5173,
    open: false,
    allowedHosts: [
      "springiest-febrific-darcey.ngrok-free.dev",
      "localhost",
      "127.0.0.1",
    ],
    proxy: {
      "/api": {
        target: proxyTarget,
        changeOrigin: true,
        secure: false,
      },
      "/images": {
        target: proxyTarget,
        changeOrigin: true,
        secure: false,
      },
      "/uploads": {
        target: proxyTarget,
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
