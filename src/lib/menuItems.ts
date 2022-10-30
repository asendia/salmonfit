export interface FoodCategory {
	name: string;
	items: Array<Food>;
}
export interface Food {
	name: string;
	price?: number;
	thumbnailHref?: string;
	photoHref?: string;
	info: Array<string>;
	description?: string;
}

import menuItemsJSON from '$lib/data/menu.json';
import menuThumbnailPhotoMap from './menuThumbnailPhotoMap';
import menuDetailPhotoMap from './menuDetailPhotoMap';
import { urlHashFromName } from './url';

const menuItems: Array<FoodCategory> = menuItemsJSON;

// Attach images to menuItems
for (const foodCategory of menuItems) {
	for (const food of foodCategory.items) {
		const key = urlHashFromName(food.name) as keyof typeof menuThumbnailPhotoMap;
		if (menuThumbnailPhotoMap[key]) {
			food.thumbnailHref = menuThumbnailPhotoMap[key];
		}
		if (menuDetailPhotoMap[key]) {
			food.photoHref = menuDetailPhotoMap[key];
		}
	}
}

export default menuItems;
