import { defineConfig, loadEnv } from 'vite';
import configBuild from './viteConfig/build';
import configResolve from './viteConfig/resolve';
import configServer from './viteConfig/server';
import configPlugins from './viteConfig/plugins';

export type Mode = 'development' | 'production';
export type Command = 'serve' | 'build';

export default defineConfig(({ command, mode }: {
	command?: Command;
	mode: Mode | string;
}) => {
	const env = loadEnv(mode as Mode, process.cwd(), '');
	const DOMAIN = mode === 'development'
		? env.VITE_DOMAIN_DEV
		: env.VITE_DOMAIN_PROD;

	const configuration = {
		plugins: configPlugins(mode as Mode),
		server: configServer(DOMAIN),
		resolve: configResolve(__dirname),
		build: configBuild(),
	};

	return command === 'serve' ? {
		...configuration,
		test: {
			globals: true,
			environment: 'jsdom',
			setupFiles: './vitest.setup.js'
		}
	} : configuration;
});
