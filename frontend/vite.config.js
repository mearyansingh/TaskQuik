import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		react(),
		VitePWA(
			{
				registerType: 'autoUpdate',
				includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'robots.txt'],
				manifest: {
					name: 'TaskQuik',
					short_name: 'TaskQuik',
					start_url: '.',
					display: 'standalone',
					theme_color: '#4a4a4a',
					icons: [
						{
							"src": "/android-chrome-192x192.png",
							"sizes": "192x192",
							"type": "image/png",
							"purpose": "any"
						},
						{
							"src": "/android-chrome-192x192.png",
							"sizes": "192x192",
							"type": "image/png",
							"purpose": "maskable"

						},
						{
							"src": "/android-chrome-512x512.png",
							"sizes": "512x512",
							"type": "image/png",
							"purpose": 'any'
						},
						{
							"src": '/android-chrome-512x512.png',
							"sizes": '512x512',
							"type": 'image/png',
							"purpose": 'maskable'
						}
					],
				},
			}
		)
	],
})
