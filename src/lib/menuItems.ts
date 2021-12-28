export interface FoodCategory {
  name: string;
  items: Array<Food>;
  itemIdsWithImages: Array<number>;
}
interface Food {
  name: string;
  price?: number;
  imgHref?: string;
  description?: string;
}

import menuItemsJSON from '$data/menu.json';
import foodImageMap from './foodImageMap';

const menuItems: Array<FoodCategory> = menuItemsJSON;

// Attach images to menuItems
for (const foodCategory of menuItems) {
  for (const food of foodCategory.items) {
    const key = food.name.split(' ').join('-').toLowerCase();
    if (foodImageMap[key]) {
      food.imgHref = foodImageMap[key];
    }
  }
}

// Generate imageIds
menuItems.forEach((m) => {
  m.items.forEach((item, id) => {
    if (item.imgHref) {
      m.itemIdsWithImages.push(id);
    }
  });
});

export default menuItems;
