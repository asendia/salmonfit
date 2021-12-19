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

import imgGrilledSalmonRice from '$assets/menu/grilled-salmon-rice.jpg';
import imgSalmonGeprekRice from '$assets/menu/salmon-geprek-rice.jpg';
import imgSalmonFriedRice from '$assets/menu/salmon-fried-rice.jpg';
import imgSmokedSalmonFriedRice from '$assets/menu/smoked-salmon-fried-rice.jpg';
import imgSmokedSalmonSpaghetti from '$assets/menu/smoked-salmon-spaghetti.jpg';
import imgSalad from '$assets/menu/salad.jpg';

const menuItems: Array<FoodCategory> = [
  {
    name: 'Salmon',
    imgIds: [],
    items: [
      {
        name: 'Grilled Premium Salmon',
        imgHref: imgGrilledSalmonRice,
        description: 'Premium salmon, steamed rice, and salad of the day'
      },
      {
        name: 'Premium Salmon Geprek',
        imgHref: imgSalmonGeprekRice,
        description:
          'Marinated salmon and fried with seasoned flour, steamed jasmine rice, spicy sauce (Sambal geprek)'
      },
      {
        name: 'Spaghetti Aglio Olio With Premium Salmon',
        description: 'Cooked pasta, garlic, mushroom champignon and parsley with Premium Salmon'
      },
      {
        name: 'Creamy Spaghetti Carbonara With Premium Salmon',
        description:
          'Cooked pasta, garlic, mushroom champignon, parsley and cooking cream with Premium Salmon'
      },
      {
        name: 'Premium Salmon Fried Rice',
        imgHref: imgSalmonFriedRice,
        description:
          'Garlic, mushroom champignon, parsley, and steamed jasmine rice with Premium Salmon'
      }
    ]
  },
  {
    name: 'Smoked Salmon',
    imgIds: [],
    items: [
      {
        name: 'Smoked Salmon Fried Rice',
        imgHref: imgSmokedSalmonFriedRice,
        description:
          'Steamed jasmine rice, garlic, mushroom champignon, parsley with Premium Salmon'
      },
      {
        name: 'Spaghetti Aglio Olio With Smoked Salmon',
        imgHref: imgSmokedSalmonSpaghetti,
        description:
          'Cooked pasta, garlic, mushroom champignon, parsley, steamed jasmine rice with smoked salmon'
      },
      {
        name: 'Creamy Spaghetti Carbonara With Smoked Salmon',
        description:
          'Cooked pasta, garlic, mushroom champignon and cooking cream with smoked salmon'
      }
    ]
  },
  {
    name: 'Side Dish',
    imgIds: [],
    items: [
      {
        name: 'Shirataki / Konjac',
        description: '(Rice / noodle/ fettuccine)'
      },
      {
        name: 'Egg',
        description: '(Sunny side up / scrambled / omelet)'
      },
      {
        name: 'Boiled Pottato'
      },
      {
        name: 'Steamed Jasmine Rice'
      },
      {
        name: 'Butter Rice'
      },
      {
        name: 'Salad of The Day',
        imgHref: imgSalad
      },
      {
        name: 'French Fries'
      }
    ]
  },
  {
    name: 'A La Carte',
    imgIds: [],
    items: [
      {
        name: 'Smoked Salmon',
        description: 'Premium smoked salmon'
      },
      {
        name: 'Grilled Norwegiam Salmon Butter',
        description: 'Premium Salmon and butter'
      },
      {
        name: 'Premium Salmon Geprek',
        description: 'Marinated salmon and fried with seasoned flour, spicy souce (Sambal Geprek)'
      }
    ]
  }
];

// Generate imageIds
menuItems.forEach((m) => {
  m.items.forEach((item, id) => {
    if (item.imgHref) {
      m.imgIds.push(id);
    }
  });
});

export default menuItems;
