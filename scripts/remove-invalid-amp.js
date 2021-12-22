import fs from 'fs';

const ssrjs = fs.readFileSync('./node_modules/@sveltejs/kit/dist/ssr.js', 'utf8');
const ampInstallServiceWorkerComponent = '<amp-install-serviceworker src="${options.service_worker}" layout="nodisplay"></amp-install-serviceworker>';
console.log('Replacing ssr.js for AMP service worker on indexes:', ssrjs.indexOf(ampInstallServiceWorkerComponent));
const bodyComponent = '? rendered.html';
const bodyComponentNew = `? rendered.html + \`${ampInstallServiceWorkerComponent}\``
const ssrjsNew = ssrjs.replace(ampInstallServiceWorkerComponent, '').replace(bodyComponent, bodyComponentNew);

fs.writeFileSync('./node_modules/@sveltejs/kit/dist/ssr.js', ssrjsNew, 'utf8');
