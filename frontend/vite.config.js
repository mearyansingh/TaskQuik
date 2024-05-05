import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		react(),
		VitePWA(
			{
				registerType: 'prompt',
				includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'robots.txt'],
				manifest: {
					id: '/',
					name: 'TaskQuik - Task Management App',
					short_name: 'TaskQuik',
					description: 'Simplify task management and boost productivity with TaskQuik. Organize your tasks and stay on top of deadlines effortlessly. Try TaskQuik today!',
					lang: 'en-US',
					dir: "ltr",
					start_url: '.',
					scope: '/',
					display: 'standalone',
					theme_color: '#3498db',
					background_color: "#000",
					orientation: 'portrait',
					display_override: ["window-controls-overlay"],
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
					"shortcuts": [
						{
							"name": "Add New Task",
							"short_name": "Add Task",// if there is limited display space
							"description": "Quickly add a new task to your list",
							"url": "/create-task",
							"icons": [
								{
									"src": "/android-chrome-192x192.png",
									"type": "image/png",
									"purpose": "any",
									"sizes": "192x192"
								}
							]
						},
						{
							"name": "View All Tasks",
							"description": "View all your tasks at a glance",
							"url": "/tasks"
						}
					],
					"edge_side_panel": {},
					"features": [
						"Cross Platform",
						"fast",
						"simple"
					],
					"categories": [
						"productivity", "utilities"
					],
					"screenshots": [
						{
							"src": "./screenshot-playlist.png",
							"sizes": "1280x720",
							"platform": "wide",
							"label": "The main PWAmp user interface, showing a list of songs, and playback buttons."
						},
						{
							"src": "./screenshot-visualizer.png",
							"sizes": "1280x720",
							"platform": "wide",
							"label": "The PWAmp visualizer, showing the current song, the playback buttons, and a colorful visualization of the current song."
						},
						{
							"src": "./screenshot-widget.png",
							"sizes": "600x400",
							"label": "The PWAmp mini-player widget"
						}
					],
				},
			}
		)
	],
})
