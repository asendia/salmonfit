export interface FoodCategory {
  name: string;
  items: Array<Food>;
  imgIds: Array<number>;
}
interface Food {
  name: string;
  price?: number;
  imgHref?: string;
  description?: string;
}

import imgSalmonGeprekRice from '$assets/menu/salmon-geprek-rice.webp';
import imgGrilledSalmonRice from '$assets/menu/grilled-salmon-rice.webp';
import imgSalmonFriedRice from '$assets/menu/salmon-fried-rice.webp';
import imgSmokedSalmonFriedRice from '$assets/menu/smoked-salmon-fried-rice.webp';
import imgSmokedSalmonSpaghetti from '$assets/menu/smoked-salmon-spaghetti.webp';
import imgSalad from '$assets/menu/salad.webp';
import menuItemsJSON from '$data/menu.json';

const foodImageMap = {
  'Grilled Salmon': imgGrilledSalmonRice,
  'Salmon Geprek': imgSalmonGeprekRice,
  'Salmon fried rice': imgSalmonFriedRice,
  'Smoked salmon fried rice': imgSmokedSalmonFriedRice,
  'Spaghetti Aglio Olio with Norwegian Smoked Salmon': imgSmokedSalmonSpaghetti,
  'Salad of The Day': imgSalad,
};

const menuItems: Array<FoodCategory> = menuItemsJSON;

// Attach image to menuItems
for (const foodCategory of menuItems) {
  for (const food of foodCategory.items) {
    if (foodImageMap[food.name]) {
      food.imgHref = foodImageMap[food.name];
    }
  }
}

// Generate imageIds
menuItems.forEach((m) => {
  m.items.forEach((item, id) => {
    if (item.imgHref) {
      m.imgIds.push(id);
    }
  });
});

export default menuItems;
