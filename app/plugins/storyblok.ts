// /plugins/storyblok.client.ts

import { useAsyncStory } from '~/libs/storyblok';
import useAppStore from '~/store/useAppStore';

export default defineNuxtPlugin({
	parallel: false, // ⬅️ Forces plugin to run BEFORE app creation
	async setup() {
		const {
			public: { app },
		} = useRuntimeConfig();

		if (app.storyblok.enabled && app.storyblok.settings) {
			const nuxtApp = useNuxtApp();
			const config = useRuntimeConfig();

			// Handle Preview Mode
			if (nuxtApp.$preview && config.public.storyblokPreviewKey) {
				const storyblokApi = useStoryblokApi();
				// @ts-expect-error - Storyblok API not typed
				storyblokApi.accessToken = config.public.storyblokPreviewKey;
			}

			try {
				const { story: settings } = await useAsyncStory(app.storyblok.settings);
				useAppStore().saveSettings(settings);
			} catch (error) {
				console.error('Failed to load Storyblok settings:', error);
			}
		}
	},
});
