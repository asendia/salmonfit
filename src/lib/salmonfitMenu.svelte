<script lang="ts" context="module">
  interface FoodCategory {
    name: string;
    items: Array<Food>;
    imgHref?: string;
  }
  interface Food {
    name: string;
    price?: number;
    imgHref?: string;
    description?: string;
  }
  export const categories = [
    {
      name: 'Salmon',
      imgHref: '/menu/grilled-salmon.webp',
      items: [
        {
          name: 'Norwegian Salmon Geprek',
          price: 3900000,
          imgHref:
            'https://d1sag4ddilekf6.azureedge.net/compressed_webp/items/IDITE20210818035952279897/photo/menueditor_item_7db50249f3ac44e6b1dad0a335b05f6c_1629275461184476704.webp',
          description:
            '2 hours marinated salmon and fried with seasoned flour, steamed jasmine rice, spicy sauce (Sambal geprek)'
        },
        {
          name: 'Grilled Norwegian Salmon',
          price: 5100000,
          imgHref:
            'https://d1sag4ddilekf6.azureedge.net/compressed_webp/items/IDITE20210818035952321697/photo/menueditor_item_668ab8bdab99465b803d339053682e3c_1629275505904520369.webp',
          description: 'Norwegian salmon 100gr, steamed rice, and salad of the day'
        },
        {
          name: 'Spaghetti Aglio Olio With Norwegian Salmon',
          price: 4100000,
          description:
            'Cooked pasta, garlic, mushroom champignon, parsley, and parmesan cheese with Norewegian Salmon'
        },
        {
          name: 'Creamy Spaghetti Carbonara With Norwegian Salmon',
          price: 4500000,
          description:
            'Cooked pasta, garlic, mushroom champignon, parsley, cooking cream, and parmesan cheese with Norwegian Salmon'
        },
        {
          name: 'Norwegian Salmon Fried Rice',
          price: 3500000,
          description:
            'Garlic, mushroom champignon, parsley, and steamed jasmine rice with Norwegian Salmon'
        }
      ]
    },
    {
      name: 'Smoked Salmon',
      imgHref: '/menu/spaghetti-salmon.webp',
      items: [
        {
          name: 'Smoked Salmon Fried Rice',
          price: 3900000,
          imgHref:
            'https://d1sag4ddilekf6.azureedge.net/compressed_webp/items/IDITE20210818035953226265/photo/menueditor_item_198b3445cb0a42c7a67e8ff6f790802c_1629281365749767676.webp',
          description:
            'Steamed jasmine rice, garlic, mushroom champignon, parsley with Norwegian Salmon'
        },
        {
          name: 'Spaghetti Aglio Olio With Smoked Salmon',
          price: 4700000,
          description:
            'Cooked pasta, garlic, mushroom champignon, parsley, steamed jasmine rice with smoked salmon'
        },
        {
          ID: 'IDITE20210818035953182730',
          name: 'Creamy Spaghetti Carbonara With Smoked Salmon',
          available: true,
          price: 5100000,
          description:
            'Cooked pasta, garlic, mushroom champignon, cooking cream, parmesan cheese with smoked salmon'
        }
      ]
    },
    {
      name: 'Dessert',
      imgHref: '/menu/cheese-cake.webp',
      items: [
        {
          name: 'Whole New York Cheesecake',
          price: 6300000,
          imgHref:
            'https://d1sag4ddilekf6.azureedge.net/compressed_webp/items/IDITE2021081808235372284/photo/menueditor_item_41f9c14c31544980b96daee7ec2779e7_1629281522787091639.webp',
          description: '12,7 cm (5 inchies)'
        },
        {
          name: 'New York Cheesecake Slice',
          price: 1900000,
          description: '1 slice'
        }
      ]
    },
    {
      name: 'Shrimp',
      imgHref: '/menu/prawn.webp',
      items: [
        {
          name: 'Spaghetti Aglio Olio With Shrimp',
          price: 3900000,
          description: 'Cooked pasta, garlic, mushroom champignon, parshley with shrimp'
        },
        {
          name: 'Creamy Spaghetti Carbonara With Shrimp',
          price: 4500000,
          description:
            'Cooked pasta, garlic, mushroom champignon, parsley, cooking cream, parmesan cheese with shrimp'
        },
        {
          name: 'Shrimp Fried Rice',
          price: 3300000,
          description: 'Steamed jasmine rice, garlic, mushroom champignon, parsley with shrimp'
        }
      ]
    },
    {
      name: 'Side Dish',
      items: [
        {
          name: 'Steamed Jasmine Rice',
          price: 900000
        },
        {
          name: 'Butter Rice',
          price: 1200000
        },
        {
          name: 'Salad of The Day',
          price: 1500000
        },
        {
          name: 'French Fries',
          price: 1300000,
          imgHref:
            'https://d1sag4ddilekf6.azureedge.net/compressed_webp/items/IDITE2021081808345513978/photo/6636d83bde494fad92707b15a8b9ef38_1629355720370533367.webp'
        },
        {
          name: 'Egg',
          price: 700000,
          description: '(Sunny side up / scrambled / omelet / boiled)'
        },
        {
          name: 'Hash Brown',
          price: 1500000
        }
      ]
    },
    {
      name: 'A La Carte',
      items: [
        {
          name: 'Grilled Garlic Butter Shrimp',
          price: 3500000,
          description: 'Shrimp 100gr'
        },
        {
          name: 'Smoked Salmon',
          price: 4700000,
          description: 'Premium smoked salmon 80gr'
        },
        {
          name: 'Grilled Norwegiam Salmon Butter',
          price: 4100000,
          description: 'Norwegian Salmon 100gr and butter'
        },
        {
          name: 'Norwegian Salmon Geprek',
          price: 3300000,
          description:
            '2 hours marinated salmon and fried with seasoned flour, spicy souce (Sambal Geprek)'
        }
      ]
    }
  ] as Array<FoodCategory>;
</script>
