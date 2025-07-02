// src/store/wishlistStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface WishlistItem {
  id: string;
  name: string;
  image: string;
  price: number;
  color?: string;
  size?: string;
}

interface WishlistStore {
  items: WishlistItem[];
  addToWishlist: (item: WishlistItem) => void;
  removeFromWishlist: (id: string) => void;
  isInWishlist: (id: string) => boolean;
  clearWishlist: () => void;
}

export const useWishlistStore = create<WishlistStore>()(
  persist(
    (set, get) => ({
      items: [],

      addToWishlist: (newItem) => {
        const existing = get().items.find(item => item.id === newItem.id);
        if (!existing) {
          set({ items: [...get().items, newItem] });
        }
      },

      removeFromWishlist: (id) => {
        set({ items: get().items.filter(item => item.id !== id) });
      },

      isInWishlist: (id) => {
        return get().items.some(item => item.id === id);
      },

      clearWishlist: () => {
        set({ items: [] });
      },
    }),
    {
      name: 'wishlist-storage',
    }
  )
);
