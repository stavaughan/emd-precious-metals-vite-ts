import { defineConfig, loadEnv } from 'vite';
import { createViteBuild } from './build/vite/build';
import { createViteResolve } from './build/vite/resolve';
import { createViteServer } from './build/vite/server';
import { createVitePlugins } from './build/vite/plugins';

export default defineConfig(({ command, mode }) => {
	const env = loadEnv(mode, process.cwd(), '');

	if (command === 'serve') {
		return {
			plugins: createVitePlugins(),
			// server: createViteServer(),
			server: {
				host: true,
				proxy: {
					'/api': {
						target: env.VITE_DOMAIN_DEV,
					},
				},
			},
			resolve: createViteResolve(__dirname),
			build: createViteBuild(),
			// build: {
			// 	minify: false,
			// },
			test: {
				globals: true,
				environment: 'jsdom',
				setupFiles: './vitest.setup.ts'
			}
		}
	} else {
		return {
			plugins: createVitePlugins(),
			// server: {
			// 	host: true,
			// 	proxy: {
			// 		'/api': {
			// 			target: './api',
			// 			changeOrigin: true,
			// 			rewrite: (path) => path.replace(/^\/api/, ''),
			// 		},
			// 	},
			// },
			server: createViteServer(),
			resolve: createViteResolve(__dirname),
			build: createViteBuild(),
		}
	}
});
