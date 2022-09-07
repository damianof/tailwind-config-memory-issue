import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'url'

const serverPort = 5173

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    port: serverPort,
    origin: `http://localhost:${ serverPort }`,
    open: `http://localhost:${ serverPort }`
  },
  envDir: './src/',
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  }
})
