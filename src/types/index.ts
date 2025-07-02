// src/types/index.ts

// Used across Product-related components
export interface Product {
  id: string;
  name: string;
  brand: string;
  category: string;
  description: string;
  price: number;
  discountPrice?: number;
  color: string;
  sizes: string[];
  images: string[]; // Multiple images
  tags?: string[];
  createdAt: string;
  stock: number;
}

// Used for Cart management
export interface CartItem {
  id: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
  size: string;
  color: string;
}

// Used for Wishlist management
export interface WishlistItem {
  id: string;
  name: string;
  image: string;
  price: number;
  color?: string;
  size?: string;
}

// User Profile (expandable for auth, dashboard, admin)
export interface UserProfile {
  id: string;
  name: string;
  email: string;
  address?: string;
  phone?: string;
  photoURL?: string;
  createdAt?: string;
  isAdmin?: boolean;
}

// Order history & checkout details
export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  totalAmount: number;
  paymentStatus: 'pending' | 'paid' | 'failed';
  orderStatus: 'processing' | 'shipped' | 'delivered' | 'cancelled';
  shippingAddress: string;
  createdAt: string;
}

// Product Review
export interface Review {
  id: string;
  productId: string;
  userId: string;
  rating: number;
  comment: string;
  createdAt: string;
  userName?: string;
  userPhoto?: string;
}
