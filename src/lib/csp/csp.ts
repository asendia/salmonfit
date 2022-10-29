import type { CspDirectives } from '@sveltejs/kit/types/private';

// Temporary until sveltekit support CSP with AMP

// Default values from https://amp.dev/documentation/guides-and-tutorials/optimize-and-measure/secure-pages/
export const cspDirectives: CspDirectives = {
	'default-src': ['http://localhost:*', 'https://salmonfit.com', 'data:', 'blob:'],
	'script-src': [
		'blob:',
		'self',
		'https://cdn.ampproject.org/v0.js',
		'https://cdn.ampproject.org/v0/',
		'https://cdn.ampproject.org/rtv/'
	],
	'object-src': ['none'],
	'font-src': ['self'],
	'style-src': ['unsafe-inline']
};

export function generateCSPHeaderValue(directives: CspDirectives) {
	const headerVal: Array<string> = [];
	Object.keys(cspDirectives).forEach((d) => {
		const directive = directives[d as keyof CspDirectives];
		if (!Array.isArray(directive)) return;
		const v = directive
			.map((i) => {
				// CSP BaseSource
				if (['self', 'unsafe-eval', 'unsafe-hashes', 'unsafe-inline', 'none'].includes(i)) {
					return `'${i}'`;
				}
				return i;
			})
			.join(' ');
		headerVal.push(`${d} ${v};`);
	});
	return headerVal.join(' ');
}
