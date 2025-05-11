import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { CartItem, Product, ProductColor } from '../types';

interface CartState {
  items: CartItem[];
  addItem: (product: Product, quantity: number, size: string, color: ProductColor) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: () => number;
  totalPrice: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      
      addItem: (product, quantity, size, color) => {
        set((state) => {
          // Check if item already exists with same product, size and color
          const existingItemIndex = state.items.findIndex(
            (item) => 
              item.productId === product.id && 
              item.size === size && 
              item.color.name === color.name
          );
          
          if (existingItemIndex !== -1) {
            // Update quantity of existing item
            const updatedItems = [...state.items];
            updatedItems[existingItemIndex].quantity += quantity;
            return { items: updatedItems };
          } else {
            // Add new item
            const newItem: CartItem = {
              id: `${product.id}-${size}-${color.name}-${Date.now()}`,
              productId: product.id,
              product,
              quantity,
              size,
              color,
              price: product.price
            };
            return { items: [...state.items, newItem] };
          }
        });
      },
      
      removeItem: (id) => {
        set((state) => ({
          items: state.items.filter((item) => item.id !== id)
        }));
      },
      
      updateQuantity: (id, quantity) => {
        set((state) => ({
          items: state.items.map((item) => 
            item.id === id ? { ...item, quantity } : item
          )
        }));
      },
      
      clearCart: () => {
        set({ items: [] });
      },
      
      totalItems: () => {
        return get().items.reduce((acc, item) => acc + item.quantity, 0);
      },
      
      totalPrice: () => {
        return get().items.reduce(
          (acc, item) => acc + item.price * item.quantity, 
          0
        );
      }
    }),
    {
      name: 'bound-cart-storage',
    }
  )
);