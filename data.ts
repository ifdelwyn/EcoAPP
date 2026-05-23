import { EcoProduct } from './types';

export const ECO_PRODUCTS: EcoProduct[] = [
  {
    id: '1',
    name: 'Ocean Plastic Backpack',
    category: 'Recycled',
    subtitle: 'From 25 reclaimed plastic bottles',
    description: 'A durable, weather-resistant everyday backpack made entirely from ocean-bound plastic bottles. Features dedicated compartments, ergonomic padded shoulder straps, and a clean minimalist form.',
    price: 65.00,
    rating: 4.8,
    reviews: 145,
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&q=80&w=600',
    impactScore: 'Removes 1.2kg ocean debris'
  },
  {
    id: '2',
    name: 'Reusable Thermo Bottle',
    category: 'Recycled',
    subtitle: 'High-grade recycled steel',
    description: 'Double-walled vacuum insulated bottle keeping cold drinks chilled for 24h & hot drinks warm for 12h. Crafted with 90% post-consumer recycled premium stainless steel.',
    price: 24.50,
    rating: 4.9,
    reviews: 320,
    image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&q=80&w=600',
    impactScore: 'Eliminates 150 single-use cups/year'
  },
  {
    id: '3',
    name: 'Bamboo Toothbrush (4-Pack)',
    category: 'Organic',
    subtitle: 'Biodegradable organic bamboo',
    description: 'A premium pack of four dentist-approved, antibacterial toothbrushes. Ergonomic organic bamboo handles paired with charcoal-infused BPA-free soft nylon bristles.',
    price: 12.00,
    rating: 4.7,
    reviews: 185,
    image: 'https://images.unsplash.com/photo-1593005510509-d95b268ff996?auto=format&fit=crop&q=80&w=600',
    impactScore: '100% Compostable handles'
  },
  {
    id: '4',
    name: 'Lavender Shampoo Cup Bar',
    category: 'Organic',
    subtitle: 'Zero waste vegan ingredients',
    description: 'Concentrated organic formula loaded with essential oils and wild lavender. Generates rich lather, balances scalp hydration, and is equivalent to 3 bottles of liquid shampoo with no plastic waste.',
    price: 14.80,
    rating: 4.6,
    reviews: 98,
    image: 'https://images.unsplash.com/photo-1607006342411-1a90e632623d?auto=format&fit=crop&q=80&w=600',
    impactScore: 'Prevents 3 plastic bottles'
  },
  {
    id: '5',
    name: 'Hemp Fiber Summer Shirt',
    category: 'Sustainable Fashion',
    subtitle: 'Breathable active fit hemp blend',
    description: 'A stylish, ultra-comfy, loose-weave hemp shirt designed for summer breathability. Cultivated with 80% less water than typical cotton apparel, highly antimicrobial, and bio-recyclable.',
    price: 52.00,
    rating: 4.5,
    reviews: 74,
    image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&q=80&w=600',
    impactScore: 'Saves 2,400L of water'
  },
  {
    id: '6',
    name: 'Recycled Canvas Sneakers',
    category: 'Sustainable Fashion',
    subtitle: 'Recycled rubber & organic cotton',
    description: 'Vibrant casual sneakers built with sustainable cotton canvas and vulcanized natural tree-sap rubber outsoles. Incredibly light, flexible, and completely animal-product-free.',
    price: 78.00,
    rating: 4.7,
    reviews: 110,
    image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&q=80&w=600',
    impactScore: 'Carbon-neutral logistics'
  },
  {
    id: '7',
    name: 'Smart LED Light Bulb',
    category: 'Energy Saver',
    subtitle: 'High energy efficiency vintage bulb',
    description: 'A striking ambient amber warm vintage light bulb drawing only 6 watts of electricity while outputting standard 60-watt brightness. Fully compatible with Google Home & Alexa timers.',
    price: 18.00,
    rating: 4.8,
    reviews: 215,
    image: 'https://images.unsplash.com/photo-1565814636199-ae8133055c1c?auto=format&fit=crop&q=80&w=600',
    impactScore: 'Cuts power usage by 85%'
  },
  {
    id: '8',
    name: 'Solar Panel Charger Kit',
    category: 'Energy Saver',
    subtitle: 'High efficiency crystalline cell',
    description: 'Ultra-thin, foldable solar panels designed for cellphones, battery banks, and camping gear. Water-safe material with double standard fast-charging USB safety hubs.',
    price: 45.00,
    rating: 4.9,
    reviews: 165,
    image: 'https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?auto=format&fit=crop&q=80&w=600',
    impactScore: '100% off-grid kinetic green power'
  }
];

export const ADD_ONS = [
  { name: 'Carbon Offset Shipping', price: 1.50 },
  { name: 'Eco-Kraft Gift Wrap', price: 2.00 },
  { name: '1-Year Ext. Green Support', price: 3.50 },
  { name: 'Plant-A-Tree Impact Donation', price: 1.00 }
];
