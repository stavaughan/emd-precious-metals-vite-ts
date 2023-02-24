import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig, loadEnv } from 'vite';

export default defineConfig(({ command, mode }) => {
	const env = loadEnv(mode, process.cwd(), '');

	const pathResolve = (dir: string) => path.resolve(__dirname, '.', dir);
	if (command === 'serve') {
		return {
			plugins: [react()],
			server: {
				host: true,
				proxy: {
					'/api': {
						target: env.VITE_DOMAIN_DEV,
					},
				},
			},
			resolve: {
				alias: {
					'@': pathResolve('src'),
					'~': pathResolve('node_modules'),
					'~bootstrap': pathResolve('node_modules/bootstrap'),
				},
			},
			build: {
				minify: false,
			},
			test: {
				globals: true,
				environment: 'jsdom',
				setupFiles: './vitest.setup.ts'
			}
		}
	} else {
		return {
			plugins: [react()],
			server: {
				host: true,
				proxy: {
					'/api': {
						target: './api',
						changeOrigin: true,
						rewrite: (path) => path.replace(/^\/api/, ''),
					},
				},
			},
			resolve: {
				alias: {
					'@': pathResolve('src'),
					'~': pathResolve('node_modules'),
					'~bootstrap': pathResolve('node_modules/bootstrap'),
				},
			},
			build: {
				rollupOptions: {
					input: {
						main: path.resolve(__dirname, 'build/index.html'),
					},
				},
				minify: true,
			}
		}
	}
});
