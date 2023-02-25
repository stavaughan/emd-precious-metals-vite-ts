import type { BuildOptions } from 'vite';

// https://github.com/jsxiaosi/react-xs-admin/blob/main/build/vite/build.ts
export function createViteBuild(): BuildOptions {
	const viteBuild = {
		// target: 'es2020',
		outDir: 'dist',
		// cssTarget: 'chrome80',
		// assetsDir: 'static',
		// cssCodeSplit: true,
		// sourcemap: false,
		// brotliSize: false,
		// chunkSizeWarningLimit: 2000,
		manifest: true,
	};
	return viteBuild;
}
