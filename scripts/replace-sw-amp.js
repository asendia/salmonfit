// Hack to fix service-worker & amp issue by implementing changes in: https://github.com/sveltejs/kit/issues/2264
import fs from 'fs';

const ssrjs = fs.readFileSync('./node_modules/@sveltejs/kit/dist/ssr.js', 'utf8');
const str1 = `<script async src="https://cdn.ampproject.org/v0.js"></script>\`;\n	}`;
const str2 = `if (options.service_worker) {\n		init += \`<script>\n			if ('serviceWorker' in navigator) {`;
console.log('Replacing ssr.js for AMP service worker on indexes:', ssrjs.indexOf(str1), ssrjs.indexOf(str2));
const newSsrjs = ssrjs.replace(str1,
  `<script async src="https://cdn.ampproject.org/v0.js"></script>\`;
    init += options.service_worker ? '<script async custom-element="amp-install-serviceworker" src="https://cdn.ampproject.org/v0/amp-install-serviceworker-0.1.js"></script>' : '';
}`)
.replace(str2,
  `if (options.service_worker && !options.amp) {
		init += \`<script>
    if ('serviceWorker' in navigator) {`);

fs.writeFileSync('./node_modules/@sveltejs/kit/dist/ssr.js', newSsrjs, 'utf8');
