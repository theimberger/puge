import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), VitePWA({
    manifest: {
      "name": "Puge - Budgeting",
      "short_name": "Puge",
      "start_url": ".",
      "display": "standalone",
      "background_color": "#335555",
      "description": "The simplist budgeting app.",
      "icons": [
        {
          "src": "/puge/phone-icon.png",
          "sizes": "360x360",
          "type": "image/png",
        },
      ],
      "theme_color": "#335555",
      "related_applications": []
    }
  })],
  base: '/puge/'
})
