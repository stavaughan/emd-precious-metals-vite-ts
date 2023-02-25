import { defineConfig, loadEnv } from 'vite';
import { createViteBuild } from './build/vite/build';
import { createViteResolve } from './build/vite/resolve';
import { createViteServer } from './build/vite/server';
import { createVitePlugins } from './build/vite/plugins';

export type Mode = 'development' | 'production';
export type Command = 'serve' | 'build';

export default defineConfig(({
	command,
	mode
}: {
	command?: Command;
	mode?: Mode | string;
}) => {
	const env = loadEnv(mode as Mode, process.cwd(), '');

	const DOMAIN = mode === 'development'
		? env.VITE_DOMAIN_DEV
		: env.VITE_DOMAIN_PROD;

	if (command === 'serve') {
		return {
			plugins: createVitePlugins(mode as Mode),
			server: createViteServer(DOMAIN),
			resolve: createViteResolve(__dirname),
			build: createViteBuild(),
			test: {
				globals: true,
				environment: 'jsdom',
				setupFiles: './vitest.setup.ts'
			}
		}
	} else {
		return {
			plugins: createVitePlugins(mode as Mode),
			server: createViteServer(DOMAIN),
			resolve: createViteResolve(__dirname),
			build: createViteBuild(),
		}
	}
});
