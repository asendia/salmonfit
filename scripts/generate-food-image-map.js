import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

(async () => {
  const dirInfo = await fs.readdir(path.join(__dirname, '../src/assets/menu'));
  let importStatements = '';
  let foodImageMapStatement = 'const foodImageMap = {\n';
  const extension = '.webp';
  dirInfo
    .filter((f) => f.endsWith(extension))
    .forEach((f) => {
      let camelCaseFilename = 'img',
        upperCase = true;
      for (let i = 0; i < f.length - extension.length; i++) {
        if (f[i] === '-') {
          upperCase = true;
          continue;
        }
        camelCaseFilename += upperCase ? f[i].toUpperCase() : f[i];
        upperCase = false;
      }
      importStatements += `import ${camelCaseFilename} from '$assets/menu/${f}'\n`;
      foodImageMapStatement += `  '${f.slice(
        0,
        f.length - extension.length
      )}': ${camelCaseFilename},\n`;
    });
  foodImageMapStatement += '};\n\n';
  foodImageMapStatement += 'export default foodImageMap;\n';

  await fs.writeFile(path.join(__dirname, '../src/lib/foodImageMap.ts'), importStatements + '\n' + foodImageMapStatement, 'utf8');
})();
