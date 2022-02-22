import fs from 'fs/promises';

(async () => {
  const documents = ['build/index.html', 'build/404.html'];
  for (let d of documents) {
    console.log('Removing empty CSP meta tag from', d);
    const oldHtml = await fs.readFile(d, 'utf8');
    const newHtml = oldHtml.replace('<meta http-equiv="content-security-policy" content="">', '');
    await fs.writeFile(d, newHtml, 'utf8');
  }
})();
