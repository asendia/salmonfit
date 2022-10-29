export interface FoodCategory {
	name: string;
	items: Array<Food>;
}
interface Food {
	name: string;
	price?: number;
	imgHref?: string;
	info: Array<string>;
	description?: string;
}

import menuItemsJSON from '$lib/data/menu.json';
import foodImageMap from './foodImageMap';

const menuItems: Array<FoodCategory> = menuItemsJSON;

// Attach images to menuItems
for (const foodCategory of menuItems) {
	for (const food of foodCategory.items) {
		const key = food.name.split(' ').join('-').toLowerCase() as keyof typeof foodImageMap;
		if (foodImageMap[key]) {
			food.imgHref = foodImageMap[key] as string;
		}
	}
}

export default menuItems;
