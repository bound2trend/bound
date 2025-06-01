import { createClient, SupabaseClient, User, Session } from '@supabase/supabase-js';

// Get environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    'Missing Supabase URL or Anonymous Key. Please click the "Connect to Supabase" button in the top right to set up your project.'
  );
}

// Create Supabase client instance
export const supabase: SupabaseClient = createClient(supabaseUrl, supabaseAnonKey);

// --- Auth functions ---

// Sign In user using email and password
export async function signIn(email: string, password: string): Promise<{ user?: User; session?: Session; error?: Error }> {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      return { error };
    }
    // data contains { user, session }
    return { user: data.user, session: data.session };
  } catch (err) {
    return { error: err as Error };
  }
}

// Sign Up new user with email and password
export async function signUp(email: string, password: string): Promise<{ user?: User; session?: Session; error?: Error }> {
  try {
    const { data, error } = await supabase.auth.signUp({ email, password });

    if (error) {
      return { error };
    }
    return { user: data.user, session: data.session };
  } catch (err) {
    return { error: err as Error };
  }
}

// Sign out current user
export async function signOut(): Promise<{ error?: Error }> {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) return { error };
    return {};
  } catch (err) {
    return { error: err as Error };
  }
}

// --- Product related queries ---

export async function getProducts(): Promise<{ data?: any[]; error?: Error }> {
  try {
    const { data, error } = await supabase.from('products').select('*');
    if (error) return { error };
    return { data };
  } catch (err) {
    return { error: err as Error };
  }
}

export async function getProductBySlug(slug: string): Promise<{ data?: any; error?: Error }> {
  try {
    const { data, error } = await supabase.from('products').select('*').eq('slug', slug).single();
    if (error) return { error };
    return { data };
  } catch (err) {
    return { error: err as Error };
  }
}

export async function getFeaturedProducts(): Promise<{ data?: any[]; error?: Error }> {
  try {
    const { data, error } = await supabase.from('products').select('*').eq('featured', true).limit(8);
    if (error) return { error };
    return { data };
  } catch (err) {
    return { error: err as Error };
  }
}

// --- Wishlist ---

export async function getWishlist(userId: string): Promise<{ data?: any[]; error?: Error }> {
  try {
    const { data, error } = await supabase.from('wishlist').select('*, product:products(*)').eq('user_id', userId);
    if (error) return { error };
    return { data };
  } catch (err) {
    return { error: err as Error };
  }
}

export async function addToWishlist(userId: string, productId: string): Promise<{ data?: any; error?: Error }> {
  try {
    const { data, error } = await supabase.from('wishlist').insert([{ user_id: userId, product_id: productId }]);
    if (error) return { error };
    return { data };
  } catch (err) {
    return { error: err as Error };
  }
}

export async function removeFromWishlist(userId: string, productId: string): Promise<{ data?: any; error?: Error }> {
  try {
    const { data, error } = await supabase.from('wishlist').delete().match({ user_id: userId, product_id: productId });
    if (error) return { error };
    return { data };
  } catch (err) {
    return { error: err as Error };
  }
}

// --- Orders ---

export async function getOrders(userId: string): Promise<{ data?: any[]; error?: Error }> {
  try {
    const { data, error } = await supabase.from('orders').select('*').eq('user_id', userId).order('created_at', { ascending: false });
    if (error) return { error };
    return { data };
  } catch (err) {
    return { error: err as Error };
  }
}

// --- FitRoom models ---

export async function getFitRoomModels(): Promise<{ data?: any[]; error?: Error }> {
  try {
    const { data, error } = await supabase.from('fit_room_models').select('*');
    if (error) return { error };
    return { data };
  } catch (err) {
    return { error: err as Error };
  }
}
