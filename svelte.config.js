import preprocess from 'svelte-preprocess';
import adapter from '@sveltejs/adapter-static';
import { resolve } from 'path';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  // Consult https://github.com/sveltejs/svelte-preprocess
  // for more information about preprocessors
  preprocess: preprocess(),

  kit: {
    amp: true,
    adapter: adapter({
      pages: 'build',
      fallback: null
    }),
    prerender: {
      // With the default value, somehow sveltekit crawls non page components like
      // service-worker.js, favicon.png and it results in error: "404 /service-worker.js (linked from /)"
      // even though those files exist in "build" directory
      crawl: false,
    },
    vite: {
      resolve: {
        alias: {
          $assets: resolve('./src/assets'),
          $data: resolve('./src/data'),
          $components: resolve('./src/components')
        }
      }
    }
  }
};

export default config;
