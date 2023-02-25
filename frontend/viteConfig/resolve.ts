import path from 'path';
import type { ResolveOptions, AliasOptions } from 'vite';

type myResolveOptions = ResolveOptions & { alias?: AliasOptions };

export function createViteResolve(myDirname: string): myResolveOptions {
	const pathResolve = (dir: string) => path.resolve(myDirname, '.', dir);
	const viteResolve: myResolveOptions = {
		alias: {
			'@': pathResolve('src'),
			'~': pathResolve('node_modules'),
			'~bootstrap': pathResolve('node_modules/bootstrap'),
		},
		extensions: [
			'.mjs',
			'.js',
			'.ts',
			'.jsx',
			'.tsx',
			'.json'
		],
	};

	return viteResolve;
}
