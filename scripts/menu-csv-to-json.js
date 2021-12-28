import { readFile, writeFile } from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

(async () => {
  console.log('Opening data/menu.csv');
  const menuCSV = await readFile(path.join(__dirname, '../src/data/menu.csv'), 'utf8');
  console.log('Converting data/menu.csv to src/data/menu.json');
  const menuListJSON = csvTojs(menuCSV);
  const menuJSON = groupMenuList(menuListJSON);
  await writeFile(path.join(__dirname, '../src/data/menu.json'), JSON.stringify(menuJSON, null, 2), 'utf8');
  console.log('menu.json has been generated');
})();

function groupMenuList(menuListJSON) {
  const menuJSON = [];
  let foodCategory;
  for (const item of menuListJSON) {
    const containsValue = typeof item.Menu === 'string' && item.Menu.trim().length > 0;
    const isFoodCategory = containsValue && item.Price === undefined;
    if (isFoodCategory) {
      foodCategory = {
        name: item.Menu,
        items: [],
        itemIdsWithImages: []
      };
      menuJSON.push(foodCategory);
    } else if (foodCategory && containsValue) {
      const food = {
        name: item.Menu,
        description:
          item.Description +
          (item.Calories ? ` - ${item.Calories} cal` : ''),
      };
      foodCategory.items.push(food);
    }
  }
  return menuJSON;
}

// Source: https://gist.github.com/jonmaim/7b896cf5c8cfe932a3dd
function csvTojs(csv) {
  const lines = csv.split(/\r?\n/);
  const result = [];
  const headers = lines[0].split(',');

  for (let i = 1; i < lines.length; i++) {
    const obj = {};

    const row = lines[i];
    let queryIdx = 0,
      startValueIdx = 0,
      idx = 0;

    if (row.trim() === '') {
      continue;
    }

    while (idx < row.length) {
      /* if we meet a double quote we skip until the next one */
      let c = row[idx];

      if (c === '"') {
        do {
          c = row[++idx];
        } while (c !== '"' && idx < row.length - 1);
      }

      if (c === ',' || /* handle end of line with no comma */ idx === row.length - 1) {
        /* we've got a value */
        let value = row.substr(startValueIdx, idx - startValueIdx).trim();

        /* skip first double quote */
        if (value[0] === '"') {
          value = value.substr(1);
        }
        /* skip last comma */
        if (value[value.length - 1] === ',') {
          value = value.substr(0, value.length - 1);
        }
        /* skip last double quote */
        if (value[value.length - 1] === '"') {
          value = value.substr(0, value.length - 1);
        }

        const key = headers[queryIdx++];
        obj[key] = value;
        startValueIdx = idx + 1;
      }

      ++idx;
    }

    result.push(obj);
  }
  return result;
}
