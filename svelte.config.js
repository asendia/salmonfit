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
				'script-src': ['self'],
				'object-src': ['none'],
				'font-src': ['self'],
				'style-src': ['self']
			}
		},
		adapter: adapter()
	}
};

export default config;
