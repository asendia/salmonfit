import preprocess from 'svelte-preprocess';
import adapter from '@sveltejs/adapter-static';
import { resolve } from 'path';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  // Consult https://github.com/sveltejs/svelte-preprocess
  // for more information about preprocessors
  preprocess: preprocess(),

  kit: {
    adapter: adapter({
      pages: 'build',
      fallback: null
    }),
    amp: true,
    // "default-src * data: blob:; script-src blob: 'self' https://cdn.ampproject.org/v0.js https://cdn.ampproject.org/v0/ https://cdn.ampproject.org/viewer/ https://cdn.ampproject.org/rtv/; object-src 'none'; style-src 'unsafe-inline' https://cdn.ampproject.org/rtv/ https://cdn.materialdesignicons.com https://cloud.typography.com https://fast.fonts.net https://fonts.googleapis.com https://maxcdn.bootstrapcdn.com https://p.typekit.net https://use.fontawesome.com https://use.typekit.net; report-uri https://csp-collector.appspot.com/csp/amp"
    csp: {
      mode: "hash",
      directives: {
        'default-src': ['*', 'data:', 'blob:'],
        'script-src': ['blob:', 'self', 'https://cdn.ampproject.org/v0.js', 'https://cdn.ampproject.org/v0/', 
          'https://cdn.ampproject.org/viewer/', 'https://cdn.ampproject.org/rtv/'],
        'object-src': ['none'],
        'style-src': ['unsafe-inline', 'https://cdn.ampproject.org/rtv/', 'https://cdn.materialdesignicons.com',
          'https://cloud.typography.com', 'https://fast.fonts.net', 'https://fonts.googleapis.com',
          'https://maxcdn.bootstrapcdn.com', 'https://p.typekit.net', 'https://use.fontawesome.com',
          'https://use.typekit.net'],
        'report-uri': ['https://csp-collector.appspot.com/csp/amp']
      }
    },
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
