import type { Handle } from '@sveltejs/kit';
export const handle: Handle = async ({ event, resolve }) => {
	const response = await resolve(event);
	response.headers.set('x-frame-options', 'sameorigin');
	response.headers.set('x-xss-protection', '1; mode=block');
	response.headers.set('x-content-type-options', 'nosniff');
	response.headers.set('referrer-policy', 'strict-origin-when-cross-origin');
	response.headers.set('permissions-policy', 'microphone=()');
	response.headers.set('cache-control', 's-maxage=60, stale-while-revalidate');
	return response;
};
