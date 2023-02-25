import type { BuildOptions } from 'vite';

const configBuild = (): BuildOptions => {
	const viteBuild = {
		outDir: 'dist',
		manifest: true,
	};
	return viteBuild;
}

export default configBuild;
