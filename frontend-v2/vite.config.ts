import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import dotenv from 'dotenv';

// Cargar las variables de entorno
dotenv.config();


console.log('VITE_BACKEND_URL:', process.env.VITE_BACKEND_URL);
console.log('VITE_FASTAPI_URL:', process.env.VITE_FASTAPI_URL);
// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: "0.0.0.0",
    port: 5173,
    proxy: {
      // Redirigir todas las solicitudes a /api al backend de Node.js
      '/api': {
        target: process.env.VITE_BACKEND_URL,  // Usar la URL de tu backend
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
      // Redirigir todas las solicitudes a /fastapi al backend de FastAPI
      '/fastapi': {
        target: process.env.VITE_FASTAPI_URL,  // Usar la URL de FastAPI
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/fastapi/, ''),
      },
    },
  },
  base: "/",
});

