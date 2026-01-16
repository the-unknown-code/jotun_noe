import { readFile } from 'fs/promises';
import { join } from 'path';
import { setHeader } from 'h3';

export default defineEventHandler(async event => {
	// 🚫 Disable all caching
	setHeader(
		event,
		'Cache-Control',
		'no-store, no-cache, must-revalidate, proxy-revalidate'
	);
	setHeader(event, 'Pragma', 'no-cache');
	setHeader(event, 'Expires', '0');
	setHeader(event, 'Surrogate-Control', 'no-store');

	const filePath = join(process.cwd(), 'public', 'companies.json');
	const json = await readFile(filePath, 'utf-8');

	return JSON.parse(json);
});
