import type { ServerOptions } from 'vite';

export function createViteServer(DOMAIN: string): ServerOptions {
	const viteServer: ServerOptions = {
		host: true,
		cors: true,
		proxy: {
			'/api': {
				target: DOMAIN,
				changeOrigin: true,
				secure: true,
			},
		},
	};
	return viteServer;
}
