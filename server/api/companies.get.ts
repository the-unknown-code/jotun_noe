import { setHeader, getRequestURL } from 'h3';

export default defineEventHandler(async event => {
	// 🚫 Disable caching
	setHeader(event, 'Cache-Control', 'no-store');
	setHeader(event, 'Pragma', 'no-cache');
	setHeader(event, 'Expires', '0');

	const { origin } = getRequestURL(event);

	const data = await $fetch(`${origin}/companies.json`, {
		cache: 'no-store',
		headers: {
			'Cache-Control': 'no-cache',
		},
	});

	return data;
});
