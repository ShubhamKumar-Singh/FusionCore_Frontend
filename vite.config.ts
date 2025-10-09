import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Resolve API URL from environment. We intentionally avoid requiring Node type defs
// by accessing the environment through globalThis as any.
const API_URL = ((globalThis as any).process?.env?.VITE_API_URL as string) || ((globalThis as any).process?.env?.npm_config_vite_api_url as string) || ''

function devProxy() {
  if (!API_URL) return undefined
  try {
    const url = new URL(API_URL)
    return {
      // forward any request starting with /api to the API_URL origin
      '/api': {
        target: url.origin,
        changeOrigin: true,
        secure: false,
        rewrite: (path: string) => path.replace(/^\/api/, ''),
      },
    }
  } catch {
    return undefined
  } 
}

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    strictPort: false,
    proxy: devProxy(),
  },
  preview: {
    port: 4173,
  },
})
