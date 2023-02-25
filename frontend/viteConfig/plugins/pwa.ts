import { VitePWA } from 'vite-plugin-pwa';
import type { ManifestOptions, VitePWAOptions } from 'vite-plugin-pwa';
import type { Mode } from '../../vite.config';

// adapted from: https://github.com/vite-pwa/vite-plugin-pwa/blob/main/examples/react-router/vite.config.ts

const configPwaPlugin = (mode: Mode) => {
	const pwaOptions: Partial<VitePWAOptions> = {
		mode,
		base: '/',
		includeAssets: [
			'favicon.svg',
			'favicon.ico',
			'robots.txt',
			'apple-touch-icon.png'
		],
		manifest: {
			name: 'Meristak Apps',
			short_name: 'Meristak',
			description: 'Scrap Precious Metals Calculator',
			theme_color: '#720000',
			background_color: '#fff',
			icons: [
				{
					src: '/pwa/logo192.svg',
					sizes: '192x192',
					type: 'image/png',
				},
				{
					src: "/pwa/logo512.svg",
					sizes: "512x512",
					type: "image/svg+xml",
				},
				{
					src: "/pwa/logo512.svg",
					sizes: "512x512",
					type: "image/svg+xml",
					purpose: 'any maskable',
				},
			],
		},
		devOptions: {
			enabled: process.env.SW_DEV === 'true',
			/* when using generateSW the PWA plugin will switch to classic */
			type: 'module',
			navigateFallback: 'index.html',
		},
	};

	const replaceOptions = { __DATE__: new Date().toISOString() }
	const claims = process.env.CLAIMS === 'true'
	const reload = process.env.RELOAD_SW === 'true'
	const selfDestroying = process.env.SW_DESTROY === 'true'

	if (process.env.SW === 'true') {
		pwaOptions.srcDir = 'src'
		pwaOptions.filename = claims ? 'claims-sw.ts' : 'prompt-sw.ts'
		pwaOptions.strategies = 'injectManifest'
			; (pwaOptions.manifest as Partial<ManifestOptions>).name = 'PWA Inject Manifest'
			; (pwaOptions.manifest as Partial<ManifestOptions>).short_name = 'PWA Inject'
	}

	if (claims)
		pwaOptions.registerType = 'autoUpdate';

	if (reload) {
		// @ts-expect-error overrides
		replaceOptions.__RELOAD_SW__ = 'true'
	}

	if (selfDestroying)
		pwaOptions.selfDestroying = selfDestroying;

	return VitePWA(pwaOptions);
}

export default configPwaPlugin;
