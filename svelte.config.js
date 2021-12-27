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
      assets: 'build',
      fallback: null
    }),
    // hydrate the <div id="svelte"> element in src/app.html
    target: '#svelte',
    vite: {
      resolve: {
        alias: {
          $components: resolve('./src/components'),
          $assets: resolve('./src/assets')
        }
      }
    }
  }
};

export default config;
