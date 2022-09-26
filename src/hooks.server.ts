import type { Handle } from '@sveltejs/kit';
import * as amp from '@sveltejs/amp';
export const handle: Handle = async ({ event, resolve }) => {
	if (event.url.pathname === '/') {
		const response = await resolve(event, {
			transformPageChunk: ({ html, done }) => {
				if (done) {
					const ampHtml = amp.transform(html);
					// Add amp-carousel
					const ampHtmlWithCarousel = ampHtml.replace(
						'<script async src="https://cdn.ampproject.org/v0.js"></script>',
						'<script async src="https://cdn.ampproject.org/v0.js"></script><link rel="preload" as="script" href="https://cdn.ampproject.org/v0/amp-carousel-0.2.js"><script async custom-element="amp-carousel" src="https://cdn.ampproject.org/v0/amp-carousel-0.2.js"></script>'
					);
					return ampHtmlWithCarousel;
				}
			}
		});
		response.headers.set('x-frame-options', 'sameorigin');
		response.headers.set('x-xss-protection', '1; mode=block');
		response.headers.set('x-content-type-options', 'nosniff');
		response.headers.set('referrer-policy', 'strict-origin-when-cross-origin');
		response.headers.set('permissions-policy', 'fullscreen=()');
		response.headers.set(
			'content-security-policy',
			"default-src * data: blob:; script-src blob: 'self' https://cdn.ampproject.org/v0.js https://cdn.ampproject.org/v0/ https://cdn.ampproject.org/viewer/ https://cdn.ampproject.org/rtv/; object-src 'none'; style-src 'unsafe-inline' https://cdn.ampproject.org/rtv/ https://cdn.materialdesignicons.com https://cloud.typography.com https://fast.fonts.net https://fonts.googleapis.com https://maxcdn.bootstrapcdn.com https://p.typekit.net https://use.fontawesome.com https://use.typekit.net; report-uri https://csp-collector.appspot.com/csp/amp"
		);
		response.headers.set('cache-control', 's-maxage=60, stale-while-revalidate');
		return response;
	}
	const response = await resolve(event);
	return response;
};
