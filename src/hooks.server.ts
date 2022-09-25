import type { Handle } from '@sveltejs/kit';
import * as amp from '@sveltejs/amp';
export const handle: Handle = async ({ event, resolve }) => {
	return resolve(event, {
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
};
