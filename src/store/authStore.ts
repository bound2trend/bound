import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { supabase } from '../lib/supabase';
import type { User } from '../types';

interface AuthState {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  checkSession: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isLoading: false,
      error: null,

      checkSession: async () => {
        set({ isLoading: true });

        try {
          const { data } = await supabase.auth.getSession();

          if (data.session) {
            const { data: userData } = await supabase
              .from('users')
              .select('*')
              .eq('id', data.session.user.id)
              .single();

            set({
              user: userData as User,
              isLoading: false,
              error: null
            });
          } else {
            set({
              user: null,
              isLoading: false,
              error: null
            });
          }
        } catch (error) {
          set({
            user: null,
            isLoading: false,
            error: error instanceof Error ? error.message : 'An error occurred'
          });
        }
      },

      login: async (email, password) => {
  set({ isLoading: true, error: null });

  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;

    if (data.user) {
      const { data: userData } = await supabase
        .from('users')
        .select('*')
        .eq('id', data.user.id)
        .single();

      set({
        user: userData as User,
        isLoading: false,
        error: null,
      });
    } else {
      // Fix: reset loading and set error if no user returned
      set({
        isLoading: false,
        error: 'Login failed: user not found',
      });
      throw new Error('Login failed: user not found');
    }
  } catch (error) {
    set({
      isLoading: false,
      error: error instanceof Error ? error.message : 'Login failed',
    });
    throw error;
  }
},


      register: async (email, password) => {
        set({ isLoading: true, error: null });

        try {
          const { data, error } = await supabase.auth.signUp({
            email,
            password,
          });

          if (error) throw error;

          if (data.user) {
            await supabase.from('users').insert([
              {
                id: data.user.id,
                email: data.user.email
              }
            ]);

            set({
              user: {
                id: data.user.id,
                email: data.user.email as string
              } as User,
              isLoading: false,
              error: null
            });
          }
        } catch (error) {
          set({
            isLoading: false,
            error: error instanceof Error ? error.message : 'Registration failed'
          });
          throw error;  // <--- This throws error to form catch block
        }
      },

      logout: async () => {
        set({ isLoading: true });

        try {
          await supabase.auth.signOut();
          set({ user: null, isLoading: false, error: null });
        } catch (error) {
          set({
            isLoading: false,
            error: error instanceof Error ? error.message : 'Logout failed'
          });
        }
      },
    }),
    {
      name: 'bound-auth-storage',
    }
  )
);
