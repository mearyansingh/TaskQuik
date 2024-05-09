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
					theme_color: '##306BFF',
					background_color: "#cfe2ff",
					orientation: 'portrait',
					display_override: ["window-controls-overlay"],
					icons: [
						{
							"src": "/maskable_icon_x192.png",
							"sizes": "192x192",
							"type": "image/png",
							"purpose": "any"
						},
						{
							"src": "/maskable_icon_x192.png",
							"sizes": "192x192",
							"type": "image/png",
							"purpose": "maskable"
						},
						{
							"src": "/maskable_icon_x512.png",
							"sizes": "512x512",
							"type": "image/png",
							"purpose": 'any'
						},
						{
							"src": '/maskable_icon_x512.png',
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
							"src": "./desktop-home.png",
							"sizes": "1280x720",
							"platform": "wide",
							"label": "The main TaskQuick Interface - displaying a crete new task button, all tasks and navigation buttons."
						},
						{
							"src": "./desktop-register.png",
							"sizes": "1280x720",
							"platform": "wide",
							"label": "TaskQuick registration - User registration and access options."
						},
						{
							"src": "./mobile-login.png",
							"sizes": "600x400",
							"label": "TaskQuick Login - User authentication and access options."
						},
						{
							"src": "./desktop-tasks.png",
							"sizes": "1280x720",
							"platform": "wide",
							"label": "TaskQuick Tasks View - List of tasks, details, and management options."
						},
						{
							"src": "./mobile-createTask.png",
							"sizes": "600x400",
							"label": "TaskQuick Create Task - allowing users to input task details and create new tasks."
						}
					],
				},
			}
		)
	],
})
