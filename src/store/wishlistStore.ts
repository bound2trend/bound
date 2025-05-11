import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { supabase } from '../lib/supabase';
import type { Product, WishlistItem } from '../types';
import { useAuthStore } from './authStore';

interface WishlistState {
  items: WishlistItem[];
  isLoading: boolean;
  error: string | null;
  fetchWishlist: () => Promise<void>;
  addToWishlist: (product: Product) => Promise<void>;
  removeFromWishlist: (productId: string) => Promise<void>;
  isInWishlist: (productId: string) => boolean;
}

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      items: [],
      isLoading: false,
      error: null,
      
      fetchWishlist: async () => {
        const user = useAuthStore.getState().user;
        if (!user) return;
        
        set({ isLoading: true });
        
        try {
          const { data, error } = await supabase
            .from('wishlist')
            .select('*, product:products(*)')
            .eq('user_id', user.id);
            
          if (error) throw error;
          
          set({ 
            items: data as WishlistItem[],
            isLoading: false 
          });
        } catch (error) {
          set({ 
            isLoading: false, 
            error: error instanceof Error ? error.message : 'Failed to fetch wishlist'
          });
        }
      },
      
      addToWishlist: async (product) => {
        const user = useAuthStore.getState().user;
        if (!user) return;
        
        set({ isLoading: true });
        
        try {
          const wishlistItem = {
            user_id: user.id,
            product_id: product.id,
            added_at: new Date().toISOString()
          };
          
          const { error } = await supabase
            .from('wishlist')
            .insert([wishlistItem]);
            
          if (error) throw error;
          
          // Add the item to local state
          const newItem: WishlistItem = {
            id: `${user.id}-${product.id}`,
            userId: user.id,
            productId: product.id,
            product,
            addedAt: new Date().toISOString()
          };
          
          set({ 
            items: [...get().items, newItem],
            isLoading: false 
          });
        } catch (error) {
          set({ 
            isLoading: false, 
            error: error instanceof Error ? error.message : 'Failed to add to wishlist'
          });
        }
      },
      
      removeFromWishlist: async (productId) => {
        const user = useAuthStore.getState().user;
        if (!user) return;
        
        set({ isLoading: true });
        
        try {
          const { error } = await supabase
            .from('wishlist')
            .delete()
            .match({ user_id: user.id, product_id: productId });
            
          if (error) throw error;
          
          set({ 
            items: get().items.filter(item => item.productId !== productId),
            isLoading: false 
          });
        } catch (error) {
          set({ 
            isLoading: false, 
            error: error instanceof Error ? error.message : 'Failed to remove from wishlist'
          });
        }
      },
      
      isInWishlist: (productId) => {
        return get().items.some(item => item.productId === productId);
      }
    }),
    {
      name: 'bound-wishlist-storage',
    }
  )
);