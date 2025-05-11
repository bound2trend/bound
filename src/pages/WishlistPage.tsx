import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingBag, X } from 'lucide-react';
import Button from '../components/common/Button';
import { useWishlistStore } from '../store/wishlistStore';
import { useCartStore } from '../store/cartStore';
import { useAuthStore } from '../store/authStore';

const WishlistPage: React.FC = () => {
  const { user } = useAuthStore();
  const { items, fetchWishlist, removeFromWishlist, isLoading } = useWishlistStore();
  const { addItem } = useCartStore();
  
  useEffect(() => {
    if (user) {
      fetchWishlist();
    }
  }, [user, fetchWishlist]);
  
  const handleAddToCart = (item: any) => {
    addItem(
      item.product,
      1,
      item.product.sizes[0],
      item.product.colors[0]
    );
  };
  
  if (!user) {
    return (
      <div className="min-h-screen pt-20">
        <div className="container-custom py-16 text-center">
          <Heart size={64} className="text-neutral-300 mx-auto mb-6" />
          <h1 className="text-3xl font-bold mb-3">Sign in to view your wishlist</h1>
          <p className="text-neutral-600 max-w-md mx-auto mb-8">
            Save your favorite items to your wishlist and access them anytime.
          </p>
          <Link to="/login">
            <Button variant="primary" size="lg">
              Sign In
            </Button>
          </Link>
        </div>
      </div>
    );
  }
  
  if (isLoading) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full"></div>
      </div>
    );
  }
  
  if (items.length === 0) {
    return (
      <div className="min-h-screen pt-20">
        <div className="container-custom py-16 text-center">
          <Heart size={64} className="text-neutral-300 mx-auto mb-6" />
          <h1 className="text-3xl font-bold mb-3">Your wishlist is empty</h1>
          <p className="text-neutral-600 max-w-md mx-auto mb-8">
            Save items you love to your wishlist. Share your wishlist with friends and family.
          </p>
          <Link to="/shop">
            <Button variant="primary" size="lg">
              Continue Shopping
            </Button>
          </Link>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen pt-20 pb-16 bg-neutral-50">
      <div className="container-custom py-12">
        <h1 className="text-3xl font-bold mb-8">My Wishlist</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item: any) => (
            <div key={item.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="aspect-[3/4] bg-neutral-100 relative">
                <Link to={`/product/${item.product.slug}`}>
                  <img 
                    src={item.product.images[0]} 
                    alt={item.product.name}
                    className="w-full h-full object-cover"
                  />
                </Link>
                
                <button 
                  className="absolute top-3 right-3 w-8 h-8 bg-white rounded-full flex items-center justify-center text-neutral-700 hover:text-error transition-colors"
                  onClick={() => removeFromWishlist(item.productId)}
                  aria-label="Remove from wishlist"
                >
                  <X size={16} />
                </button>
              </div>
              
              <div className="p-4">
                <Link to={`/product/${item.product.slug}`} className="hover:text-primary">
                  <h3 className="font-medium text-neutral-800">{item.product.name}</h3>
                </Link>
                
                <div className="mt-1 flex items-center">
                  <span className="font-semibold text-neutral-900">
                    ₹{(item.product.price / 100).toFixed(2)}
                  </span>
                  
                  {item.product.compareAtPrice && (
                    <span className="ml-2 text-neutral-500 line-through text-sm">
                      ₹{(item.product.compareAtPrice / 100).toFixed(2)}
                    </span>
                  )}
                </div>
                
                {/* Available colors */}
                <div className="mt-3 flex items-center gap-1">
                  {item.product.colors.map((color: any) => (
                    <div 
                      key={color.name}
                      className="w-4 h-4 rounded-full border border-neutral-300"
                      style={{ backgroundColor: color.value }}
                      title={color.name}
                    ></div>
                  ))}
                </div>
                
                <div className="mt-4 grid grid-cols-2 gap-2">
                  <Link to={`/product/${item.product.slug}`}>
                    <Button 
                      variant="outline"
                      fullWidth
                    >
                      View Details
                    </Button>
                  </Link>
                  
                  <Button 
                    variant="primary"
                    fullWidth
                    onClick={() => handleAddToCart(item)}
                  >
                    <ShoppingBag size={16} className="mr-1" />
                    Add to Cart
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WishlistPage;