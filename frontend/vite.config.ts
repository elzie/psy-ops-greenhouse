//import { reactRouter } from "@react-router/dev/vite";
import { defineConfig } from 'vite'
//import tsconfigPaths from "vite-tsconfig-paths";
import tailwindcss from "@tailwindcss/vite";
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),

  ],
  server: {
    proxy: {
      '/api': 'http://localhost:3000',
    }
  }
})
