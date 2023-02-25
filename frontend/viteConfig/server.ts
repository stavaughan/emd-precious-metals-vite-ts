import type { ServerOptions } from 'vite';

const configServer = (DOMAIN: string): ServerOptions => {
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
};

export default configServer;
