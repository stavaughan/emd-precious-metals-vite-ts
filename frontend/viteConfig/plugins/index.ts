import react from '@vitejs/plugin-react';
import configPwaPlugin from './pwa';
import type { PluginOption } from 'vite';
import type { Mode } from '../../vite.config';

export function createVitePlugins(mode: Mode) {
	const vitePlugins: PluginOption[] = [];
	vitePlugins.push(
		react(),
		configPwaPlugin(mode)
	);

	return vitePlugins;
}
