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

import grilledSalmonPhoto from '$assets/menu/grilled-salmon.webp';
import spaghettiSalmonPhoto from '$assets/menu/spaghetti-salmon.webp';
import cheesecakePhoto from '$assets/menu/cheese-cake.webp';
import prawnPhoto from '$assets/menu/prawn.webp';

const menuItems: Array<FoodCategory> = [
  {
    name: 'Salmon',
    imgHref: grilledSalmonPhoto,
    items: [
      {
        name: 'Grilled Norwegian Salmon',
        imgHref: grilledSalmonPhoto,
        description: 'Norwegian salmon 80gr, steamed rice, and salad of the day'
      },
      {
        name: 'Norwegian Salmon Geprek',
        description:
          'Marinated salmon and fried with seasoned flour, steamed jasmine rice, spicy sauce (Sambal geprek)'
      },
      {
        name: 'Spaghetti Aglio Olio With Norwegian Salmon',
        description:
          'Cooked pasta, garlic, mushroom champignon, parsley, and parmesan cheese with Norewegian Salmon'
      },
      {
        name: 'Creamy Spaghetti Carbonara With Norwegian Salmon',
        description:
          'Cooked pasta, garlic, mushroom champignon, parsley, cooking cream, and parmesan cheese with Norwegian Salmon'
      },
      {
        name: 'Norwegian Salmon Fried Rice',
        description:
          'Garlic, mushroom champignon, parsley, and steamed jasmine rice with Norwegian Salmon'
      }
    ]
  },
  {
    name: 'Smoked Salmon',
    imgHref: spaghettiSalmonPhoto,
    items: [
      {
        name: 'Smoked Salmon Fried Rice',
        description:
          'Steamed jasmine rice, garlic, mushroom champignon, parsley with Norwegian Salmon'
      },
      {
        name: 'Spaghetti Aglio Olio With Smoked Salmon',
        description:
          'Cooked pasta, garlic, mushroom champignon, parsley, steamed jasmine rice with smoked salmon'
      },
      {
        name: 'Creamy Spaghetti Carbonara With Smoked Salmon',
        description:
          'Cooked pasta, garlic, mushroom champignon, cooking cream, parmesan cheese with smoked salmon'
      }
    ]
  },
  {
    name: 'Dessert',
    imgHref: cheesecakePhoto,
    items: [
      {
        name: 'Whole New York Cheesecake',
        description: '12,7 cm (5 inchies)'
      },
      {
        name: 'New York Cheesecake Slice',
        description: '1 slice'
      }
    ]
  },
  {
    name: 'Shrimp',
    imgHref: prawnPhoto,
    items: [
      {
        name: 'Spaghetti Aglio Olio With Shrimp',
        description: 'Cooked pasta, garlic, mushroom champignon, parshley with shrimp'
      },
      {
        name: 'Creamy Spaghetti Carbonara With Shrimp',
        description:
          'Cooked pasta, garlic, mushroom champignon, parsley, cooking cream, parmesan cheese with shrimp'
      },
      {
        name: 'Shrimp Fried Rice',
        description: 'Steamed jasmine rice, garlic, mushroom champignon, parsley with shrimp'
      }
    ]
  },
  {
    name: 'Side Dish',
    items: [
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
      },
      {
        name: 'Egg',
        description: '(Sunny side up / scrambled / omelet)'
      },
      {
        name: 'Hash Brown'
      }
    ]
  },
  {
    name: 'A La Carte',
    items: [
      {
        name: 'Grilled Garlic Butter Shrimp',
        description: 'Shrimp 100gr'
      },
      {
        name: 'Smoked Salmon',
        description: 'Premium smoked salmon 80gr'
      },
      {
        name: 'Grilled Norwegiam Salmon Butter',
        description: 'Norwegian Salmon 80gr and butter'
      },
      {
        name: 'Norwegian Salmon Geprek',
        description:
          '2 hours marinated salmon and fried with seasoned flour, spicy souce (Sambal Geprek)'
      }
    ]
  }
];

export default menuItems;
