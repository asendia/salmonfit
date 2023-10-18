import { createReadStream, writeFile } from 'fs';
import csv from 'csv-parser';

let menuItems = [];

createReadStream('./src/lib/data/menu.csv')
	.pipe(csv())
	.on('data', (row) => {
		if (row.Menu && !row.Calories && !row.Description && !row.Price) {
			menuItems.push({
				name: row.Menu.trim(),
				items: [],
				itemIdsWithImages: []
			});
		} else if (row.Menu && row.Calories && row.Description && row.Price) {
			const item = {
				name: row.Menu.trim(),
				info: [
					`Cal ${row.Calories}`,
					`Fat ${row.Fat}gr`,
					`Carb ${row.Carbs}gr`,
					`IDR ${row.Price}`
				],
				description: row.Description
			};
			const lastCategory = menuItems[menuItems.length - 1];
			console.log(lastCategory.name, item.name);
			lastCategory.items.push(item);
		}
	})
	.on('end', async () => {
		writeFile('./src/lib/data/menu.json', JSON.stringify(menuItems, null, 2), (err) => {
			if (err) {
				console.log(err);
			}
		});

		// Generate TypeScript file content
		let tsFileContent = '';
		menuItems.forEach((category) => {
			category.items.forEach((item) => {
				const itemNameSnakeCase = snakeCase(item.name);
				tsFileContent += `import img${itemNameSnakeCase
					.split('-')
					.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
					.join('')} from '$lib/assets/menu/details/${itemNameSnakeCase}.webp';\n`;
			});
		});

		tsFileContent += '\n\nconst menuDetailPhotoMap = {\n';
		menuItems.forEach((category) => {
			category.items.forEach((item) => {
				const itemNameSnakeCase = snakeCase(item.name);
				tsFileContent += `\t'${itemNameSnakeCase}': img${itemNameSnakeCase
					.split('-')
					.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
					.join('')},\n`;
			});
		});
		tsFileContent += '};\n\nexport default menuDetailPhotoMap;\n';

		writeFile('./src/lib/menuDetailPhotoMap.ts', tsFileContent, (err) => {
			if (err) {
				console.log(err);
			}
		});

		// replace /menu/details/ with /menu/thumbs/
		tsFileContent = tsFileContent.replace(/\/menu\/details\//g, '/menu/thumbs/');
		writeFile('./src/lib/menuThumbnailPhotoMap.ts', tsFileContent, (err) => {
			if (err) {
				console.log(err);
			}
		});
	});

function snakeCase(str) {
	return (
		str
			// Convert non-alphanumeric characters to spaces
			.replace(/[^a-zA-Z0-9]+/g, ' ')
			// Replace spaces with dash
			.replace(/\s+/g, '-')
			// Convert the string to lowercase
			.toLowerCase()
	);
}
