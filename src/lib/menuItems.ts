export interface FoodCategory {
  name: string;
  items: Array<Food>;
  imgHref?: string;
}
interface Food {
  name: string;
  price?: number;
  imgHref?: string | Promise<string>;
  description?: string;
}

import grilledSalmonRicePhoto from '$assets/menu/grilled-salmon-rice.jpg';
import smokedSalmonSpaghetti from '$assets/menu/smoked-salmon-spaghetti.jpg';
import saladPhoto from '$assets/menu/salad.jpg';

const menuItems: Array<FoodCategory> = [
  {
    name: 'Salmon',
    imgHref: grilledSalmonRicePhoto,
    items: [
      {
        name: 'Grilled Premium Salmon',
        imgHref: grilledSalmonRicePhoto,
        description: 'Premium salmon, steamed rice, and salad of the day'
      },
      {
        name: 'Premium Salmon Geprek',
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
        description:
          'Garlic, mushroom champignon, parsley, and steamed jasmine rice with Premium Salmon'
      }
    ]
  },
  {
    name: 'Smoked Salmon',
    imgHref: smokedSalmonSpaghetti,
    items: [
      {
        name: 'Smoked Salmon Fried Rice',
        description:
          'Steamed jasmine rice, garlic, mushroom champignon, parsley with Premium Salmon'
      },
      {
        name: 'Spaghetti Aglio Olio With Smoked Salmon',
        imgHref: smokedSalmonSpaghetti,
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
    imgHref: saladPhoto,
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
        name: 'Salad of The Day'
      },
      {
        name: 'French Fries'
      }
    ]
  },
  {
    name: 'A La Carte',
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

export default menuItems;
