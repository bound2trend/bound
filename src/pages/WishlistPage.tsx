// src/pages/WishlistPage.tsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
// Replace this mock with Firebase fetch when ready
import { mockProducts } from '../data/mockProducts'; 
import { useAuthStore } from '../store/authStore';
import { useCartStore } from '../store/cartStore';

const WishlistPage: React.FC = () => {
  const user = useAuthStore(state => state.user);
  const navigate = useNavigate();
  const addToCart = useCartStore(state => state.addToCart);
  
  // For now, simulate wishlist product IDs
  const [wishlistIds, setWishlistIds] = useState<string[]>([
    'cargo-joggers',
    'classic-shirt',
  ]);
  
  // Filter products in wishlist
  const wishlistProducts = mockProducts.filter(p => wishlistIds.includes(p.id));
  
  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  const removeFromWishlist = (id: string) => {
    setWishlistIds(prev => prev.filter(pid => pid !== id));
    // Later: update Firebase wishlist here
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Your Wishlist</h1>
      {wishlistProducts.length === 0 ? (
        <p className="text-gray-600">Your wishlist is empty.</p>
      ) : (
        <ul className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {wishlistProducts.map(product => (
            <li key={product.id} className="border rounded-lg p-4 flex flex-col">
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-full h-48 object-cover rounded-md mb-4"
              />
              <h2 className="text-lg font-semibold">{product.name}</h2>
              <p className="text-gray-500 text-sm mb-2">₹{product.price}</p>
              <div className="mt-auto flex justify-between items-center">
                <button
                  onClick={() => addToCart(product)}
                  className="bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-800 transition"
                >
                  Add to Cart
                </button>
                <button
                  onClick={() => removeFromWishlist(product.id)}
                  aria-label={`Remove ${product.name} from wishlist`}
                  className="text-red-600 hover:text-red-800 transition"
                >
                  Remove
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default WishlistPage;
