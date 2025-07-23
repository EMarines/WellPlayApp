import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [sveltekit()],
	
	// Configuración para prevenir errores EPERM en Windows/OneDrive
	server: {
		fs: {
			// Permitir acceso a archivos fuera del workspace
			allow: ['..']
		},
		// Configuración específica para Windows
		watch: {
			// Ignorar archivos temporales de OneDrive
			ignored: [
				'**/node_modules/**',
				'**/.git/**',
				'**/.svelte-kit/**',
				'**/~$*',
				'**/*.tmp',
				'**/*.temp',
				'**/Desktop.ini',
				'**/Thumbs.db'
			],
			// Usar polling en lugar de eventos del sistema de archivos
			usePolling: process.env.USE_POLLING === 'true'
		}
	},
	
	// Optimizaciones de dependencias
	optimizeDeps: {
		// Forzar optimización de estas dependencias
		include: ['firebase/app', 'firebase/auth', 'firebase/firestore', 'firebase/storage']
	},
	
	// Configuración de build
	build: {
		// Usar un directorio temporal diferente
		outDir: 'build',
		// Limpiar el directorio de salida antes de build
		emptyOutDir: true,
		// Configuración para archivos estáticos
		rollupOptions: {
			output: {
				// Prevenir nombres de archivos problemáticos
				sanitizeFileName: (name) => {
					return name.replace(/[<>:"/\\|?*]/g, '_');
				}
			}
		}
	}
});
