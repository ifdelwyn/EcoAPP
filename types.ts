export interface EcoProduct {
  id: string;
  name: string;
  category: 'Recycled' | 'Organic' | 'Sustainable Fashion' | 'Energy Saver';
  subtitle: string;
  description: string;
  price: number;
  rating: number;
  reviews: number;
  image: string;
  impactScore: string; // e.g., "Saves 5kg CO2", "100% Biodegradable", "Saves 40W"
}

export interface CartItem {
  id: string; // unique cart item id (productId + option + addOns key)
  product: EcoProduct;
  option: string; // e.g., Size or Type
  quantity: number;
  addOns: { name: string; price: number }[];
  totalPrice: number;
}

export interface Order {
  id: string;
  items: CartItem[];
  status: 'Processing' | 'Preparing' | 'Shipped' | 'Delivered';
  deliveryAddress: string;
  paymentMethod: string;
  subtotal: number;
  deliveryFee: number;
  discount: number;
  total: number;
  timestamp: string;
}
