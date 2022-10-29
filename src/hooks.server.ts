import { cspDirectives, generateCSPHeaderValue } from '$lib/csp/csp';
import * as amp from '@sveltejs/amp';
import type { Handle } from '@sveltejs/kit';
export const handle: Handle = async ({ event, resolve }) => {
	if (event.url.pathname === '/') {
		const response = await resolve(event, {
			transformPageChunk: ({ html, done }) => {
				if (done) {
					const ampHtml = amp.transform(html);
					return ampHtml;
				}
			}
		});
		response.headers.set('x-frame-options', 'sameorigin');
		response.headers.set('x-xss-protection', '1; mode=block');
		response.headers.set('x-content-type-options', 'nosniff');
		response.headers.set('referrer-policy', 'strict-origin-when-cross-origin');
		response.headers.set('permissions-policy', 'fullscreen=()');
		// Temporary until sveltekit support CSP with AMP
		response.headers.set('content-security-policy', generateCSPHeaderValue(cspDirectives));
		response.headers.set('cache-control', 's-maxage=60, stale-while-revalidate');
		return response;
	}
	const response = await resolve(event);
	return response;
};
