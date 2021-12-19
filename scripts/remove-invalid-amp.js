import fs from 'fs';

const ssrjs = fs.readFileSync('./node_modules/@sveltejs/kit/dist/ssr.js', 'utf8');
const str1 = '<amp-install-serviceworker src="${options.service_worker}" layout="nodisplay"></amp-install-serviceworker>';
console.log('Replacing ssr.js for AMP service worker on indexes:', ssrjs.indexOf(str1));
const newSsrjs = ssrjs.replace(str1, '');

fs.writeFileSync('./node_modules/@sveltejs/kit/dist/ssr.js', newSsrjs, 'utf8');
