import adapter from '@sveltejs/adapter-netlify';
import preprocess from 'svelte-preprocess';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: [
		preprocess({
			postcss: true
		})
	],

	kit: {
		csp: {
			directives: {
				'script-src': ['self', 'sha256-NweuQYnxvSiInAyg+rh/jmD3SOMMsbpjijkCc2Swi60='],
				'object-src': ['none'],
				'font-src': [
					'https://fonts.gstatic.com/s/outfit/v6/QGYyz_MVcBeNP4NjuGObqx1XmO1I4W61O4a0EwItq6fNIg.woff2'
				],
				'style-src': ['self']
			}
		},
		adapter: adapter()
	}
};

export default config;
