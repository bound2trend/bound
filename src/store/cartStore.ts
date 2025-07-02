// src/store/cartStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface CartItem {
  id: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
  color?: string;
  size?: string;
}

interface CartStore {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  getTotal: () => number;
  getItemCount: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (newItem) => {
        const items = get().items;
        const existing = items.find(item => item.id === newItem.id && item.size === newItem.size && item.color === newItem.color);

        if (existing) {
          const updatedItems = items.map(item =>
            item.id === existing.id &&
            item.size === existing.size &&
            item.color === existing.color
              ? { ...item, quantity: item.quantity + newItem.quantity }
              : item
          );
          set({ items: updatedItems });
        } else {
          set({ items: [...items, newItem] });
        }
      },

      removeItem: (id) => {
        set({ items: get().items.filter(item => item.id !== id) });
      },

      updateQuantity: (id, quantity) => {
        const updatedItems = get().items.map(item =>
          item.id === id ? { ...item, quantity } : item
        );
        set({ items: updatedItems });
      },

      clearCart: () => set({ items: [] }),

      getTotal: () =>
        get().items.reduce((acc, item) => acc + item.price * item.quantity, 0),

      getItemCount: () =>
        get().items.reduce((count, item) => count + item.quantity, 0),
    }),
    {
      name: 'cart-storage', // key in localStorage
    }
  )
);
