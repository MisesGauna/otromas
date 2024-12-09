import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()]
})

// vite.config.js  
export default {  
  server: {  
    host: true // Esto hace que Vite escuche en todas las interfaces  
  }  
};  
