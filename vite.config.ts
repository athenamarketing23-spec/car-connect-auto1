import { defineConfig as defineViteConfig } from 'vite'
import { defineConfig as defineLovableConfig } from "@lovable.dev/vite-tanstack-config";
import react from '@vitejs/plugin-react'

const viteConfig = defineViteConfig({
  base: '/car-connect-auto/',
  plugins: [react()],
  resolve: {
    alias: {
      '@': '/src',
    },
  },
})

export default defineLovableConfig({
  ...viteConfig,
  tanstackStart: {
    server: { entry: "server" },
  },
})
