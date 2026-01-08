import config, { app } from './app.config';
import { toSass } from './shared/sass-utils';
import { toKebabCase } from './app/libs/common/utils';

const modules = ['@nuxt/eslint', '@pinia/nuxt', '@vueuse/nuxt'];

if (app.storyblok.enabled) {
	// @ts-expect-error - Storyblok module is not typed
	modules.push([
		'@storyblok/nuxt',
		{
			accessToken: process.env.STORYBLOK_KEY,
			apiOptions: app.storyblok.apiOptions,
		},
	]);
}

export const scssFunctions = {
	'get($keys)': (keys: any) => {
		keys = keys.toString().replace(/['"]+/g, '').split('.');
		let result: any = config;
		for (let i = 0; i < keys.length; i++) {
			result = result[keys[i]];
		}
		return toSass(result);
	},
	'getColors()': () => toSass(config.colors),
	'getThemes()': () => toSass(config.themes),
};

export default defineNuxtConfig({
	compatibilityDate: '2025-07-15',

	modules,

	css: ['@/assets/main.scss'],

	$development: {
		devtools: { enabled: false },
		app: {
			rootId: `${toKebabCase(app.title)}-development`,
			head: {
				title: app.title,
			},
		},
	},

	$production: {
		app: {
			rootId: `${toKebabCase(app.title)}`,
			head: {
				title: app.title,
				meta: [
					{
						name: 'description',
						content: 'You are invited to the JOTUN Applicator Night Award 2026',
					},
					{ name: 'og:title', content: app.title },
					{
						name: 'og:description',
						content: 'You are invited to the JOTUN Applicator Night Award 2026',
					},
					{ name: 'og:type', content: 'website' },
					{ name: 'og:image', content: '/images/og.png' },
					{
						name: 'og:image:alt',
						content: 'JOTUN Applicator Night Award 2026 Invitation',
					},
					{ name: 'twitter:card', content: 'summary_large_image' },
					{ name: 'twitter:title', content: app.title },
					{
						name: 'twitter:description',
						content: 'You are invited to the JOTUN Applicator Night Award 2026',
					},
					{ name: 'twitter:image', content: '/images/og.png' },
				],
			},
		},
	},

	runtimeConfig: {
		public: {
			breakpoints: config.breakpoints,
			app: app as any,
		},
	},

	vite: {
		build: {
			cssMinify: true,
			terserOptions: {
				format: {
					comments: false,
				},
			},
		},
		esbuild: {
			legalComments: 'none',
		},
		css: {
			preprocessorOptions: {
				scss: {
					additionalData:
						'@use "@/assets/utils/functions.scss" as *; @use "/assets/utils/typography.scss" as *;',
					functions: scssFunctions,
				},
			},
		},
	},

	eslint: {
		checker: true,
	},

	nitro: {
		compressPublicAssets: {
			brotli: true,
			gzip: true,
		},
	},
});
