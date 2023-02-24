import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig, loadEnv } from 'vite';

export default defineConfig(({ mode }) => {
	const env = loadEnv(mode, process.cwd(), '');

	const DOMAIN =
		mode === 'development' ? env.VITE_DOMAIN_DEV : env.VITE_DOMAIN_PROD;

	const pathResolve = (dir: string) => path.resolve(__dirname, '.', dir);

	return {
		plugins: [react()],
		server: {
			host: true,
			proxy: {
				'/api': {
					target: DOMAIN,
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
		},
	};
});
