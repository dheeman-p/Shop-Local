export type Product = {
  id: string
  name: string
  description: string
  price: number
  category: Category
  emoji: string
  allergens: string[]
  inStock: boolean
}

export type Category = 'Breads' | 'Pastries' | 'Cakes' | 'Cookies'

export const CATEGORIES: Category[] = ['Breads', 'Pastries', 'Cakes', 'Cookies']

export const PRODUCTS: Product[] = [
  {
    id: 'sourdough-boule',
    name: 'Country Sourdough Boule',
    description:
      'Naturally leavened for 24 hours, baked in a stone hearth. Crackly crust, open crumb, a gentle tang.',
    price: 8.5,
    category: 'Breads',
    emoji: '🍞',
    allergens: ['Gluten'],
    inStock: true,
  },
  {
    id: 'seeded-rye',
    name: 'Seeded Rye Loaf',
    description: 'Dense, malty rye packed with sunflower, flax and pumpkin seeds.',
    price: 7.0,
    category: 'Breads',
    emoji: '🥖',
    allergens: ['Gluten', 'Seeds'],
    inStock: true,
  },
  {
    id: 'milk-baguette',
    name: 'Milk Baguette',
    description: 'Soft, feather-light baguette enriched with a splash of local milk.',
    price: 3.75,
    category: 'Breads',
    emoji: '🥐',
    allergens: ['Gluten', 'Dairy'],
    inStock: true,
  },
  {
    id: 'cinnamon-knot',
    name: 'Cinnamon Knot',
    description: 'Hand-knotted brioche rolled in cinnamon sugar. Best warm.',
    price: 4.25,
    category: 'Pastries',
    emoji: '🥨',
    allergens: ['Gluten', 'Dairy', 'Egg'],
    inStock: true,
  },
  {
    id: 'almond-croissant',
    name: 'Almond Croissant',
    description: 'Twice-baked croissant filled with frangipane and toasted almonds.',
    price: 5.5,
    category: 'Pastries',
    emoji: '🥐',
    allergens: ['Gluten', 'Dairy', 'Nuts', 'Egg'],
    inStock: true,
  },
  {
    id: 'pain-au-chocolat',
    name: 'Pain au Chocolat',
    description: 'Laminated 27-layer dough wrapped around two batons of dark chocolate.',
    price: 4.75,
    category: 'Pastries',
    emoji: '🥐',
    allergens: ['Gluten', 'Dairy', 'Egg'],
    inStock: false,
  },
  {
    id: 'lemon-drizzle',
    name: 'Lemon Drizzle Loaf',
    description: 'Whole lemon cake soaked in citrus syrup with a crunchy sugar crust.',
    price: 18.0,
    category: 'Cakes',
    emoji: '🍰',
    allergens: ['Gluten', 'Dairy', 'Egg'],
    inStock: true,
  },
  {
    id: 'chocolate-torte',
    name: 'Flourless Chocolate Torte',
    description: 'Rich, fudgy and naturally gluten-free. Served in an 8-inch round.',
    price: 22.0,
    category: 'Cakes',
    emoji: '🎂',
    allergens: ['Dairy', 'Egg'],
    inStock: true,
  },
  {
    id: 'carrot-cake',
    name: 'Carrot & Walnut Cake',
    description: 'Grated carrot, toasted walnuts and a cream cheese frosting.',
    price: 19.5,
    category: 'Cakes',
    emoji: '🍰',
    allergens: ['Gluten', 'Dairy', 'Egg', 'Nuts'],
    inStock: true,
  },
  {
    id: 'brown-butter-cookie',
    name: 'Brown Butter Cookie',
    description: 'Chewy centre, crisp edges, finished with flaked sea salt.',
    price: 2.5,
    category: 'Cookies',
    emoji: '🍪',
    allergens: ['Gluten', 'Dairy', 'Egg'],
    inStock: true,
  },
  {
    id: 'double-choc-cookie',
    name: 'Double Chocolate Cookie',
    description: 'Cocoa dough studded with 70% dark chocolate chunks.',
    price: 2.75,
    category: 'Cookies',
    emoji: '🍪',
    allergens: ['Gluten', 'Dairy', 'Egg'],
    inStock: true,
  },
  {
    id: 'oat-raisin-cookie',
    name: 'Oat & Raisin Cookie',
    description: 'Scottish oats, plump raisins and a hint of nutmeg.',
    price: 2.25,
    category: 'Cookies',
    emoji: '🍪',
    allergens: ['Gluten', 'Dairy'],
    inStock: true,
  },
]

export const formatPrice = (value: number): string =>
  value.toLocaleString('en-GB', { style: 'currency', currency: 'GBP' })
