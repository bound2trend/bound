// src/store/authStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, onAuthStateChanged, User } from 'firebase/auth';
import { auth } from '../lib/firebase'; // You’ll set this up in firebase.ts later

interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  setUser: (user: User | null) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      loading: false,
      error: null,

      login: async (email, password) => {
        set({ loading: true, error: null });
        try {
          const res = await signInWithEmailAndPassword(auth, email, password);
          set({ user: res.user, loading: false });
        } catch (err: any) {
          set({ error: err.message, loading: false });
        }
      },

      register: async (email, password) => {
        set({ loading: true, error: null });
        try {
          const res = await createUserWithEmailAndPassword(auth, email, password);
          set({ user: res.user, loading: false });
        } catch (err: any) {
          set({ error: err.message, loading: false });
        }
      },

      logout: async () => {
        try {
          await signOut(auth);
          set({ user: null });
        } catch (err: any) {
          console.error('Logout error:', err);
        }
      },

      setUser: (user) => set({ user }),
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({ user: state.user }), // Persist only user data
    }
  )
);

// Listen for real-time auth updates
onAuthStateChanged(auth, (user) => {
  const store = useAuthStore.getState();
  store.setUser(user || null);
});
