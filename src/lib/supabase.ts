import { createClient } from '@supabase/supabase-js';

// Get environment variables with fallbacks
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase URL or Anonymous Key. Please click the "Connect to Supabase" button in the top right to set up your project.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export async function signIn(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  
  return { data, error };
}

export async function signUp(email: string, password: string) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });
  
  return { data, error };
}

export async function signOut() {
  const { error } = await supabase.auth.signOut();
  return { error };
}

export async function getProducts() {
  const { data, error } = await supabase
    .from('products')
    .select('*');
  
  return { data, error };
}

export async function getProductBySlug(slug: string) {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('slug', slug)
    .single();
  
  return { data, error };
}

export async function getFeaturedProducts() {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('featured', true)
    .limit(8);
  
  return { data, error };
}

export async function getWishlist(userId: string) {
  const { data, error } = await supabase
    .from('wishlist')
    .select('*, product:products(*)')
    .eq('user_id', userId);
  
  return { data, error };
}

export async function addToWishlist(userId: string, productId: string) {
  const { data, error } = await supabase
    .from('wishlist')
    .insert([{ user_id: userId, product_id: productId }]);
  
  return { data, error };
}

export async function removeFromWishlist(userId: string, productId: string) {
  const { data, error } = await supabase
    .from('wishlist')
    .delete()
    .match({ user_id: userId, product_id: productId });
  
  return { data, error };
}

export async function getOrders(userId: string) {
  const { data, error } = await supabase
    .from('orders')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });
  
  return { data, error };
}

export async function getFitRoomModels() {
  const { data, error } = await supabase
    .from('fit_room_models')
    .select('*');
  
  return { data, error };
}