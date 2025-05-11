import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingBag } from 'lucide-react';
import { useCartStore } from '../../store/cartStore';
import { useWishlistStore } from '../../store/wishlistStore';
import { useAuthStore } from '../../store/authStore';
import type { Product } from '../../types';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [hovered, setHovered] = useState(false);
  const addItem = useCartStore((state) => state.addItem);
  const { isInWishlist, addToWishlist, removeFromWishlist } = useWishlistStore();
  const user = useAuthStore((state) => state.user);
  
  const isProductInWishlist = user ? isInWishlist(product.id) : false;
  
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    
    // Add to cart with default options (first size and color)
    addItem(
      product, 
      1, 
      product.sizes[0], 
      product.colors[0]
    );
  };
  
  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    
    if (!user) {
      // Redirect to login if not logged in
      window.location.href = '/login';
      return;
    }
    
    if (isProductInWishlist) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };
  
  return (
    <Link 
      to={`/product/${product.slug}`}
      className="product-card"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="relative">
        {/* Product Image */}
        <div className="product-image-container aspect-[3/4] bg-neutral-100">
          <img 
            src={product.images[0]} 
            alt={product.name}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>
        
        {/* Quick actions */}
        <div className="absolute top-3 right-3 z-10">
          <button 
            className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
              isProductInWishlist 
                ? 'bg-primary text-white' 
                : 'bg-white text-neutral-700 hover:bg-primary hover:text-white'
            }`}
            onClick={handleWishlist}
            aria-label={isProductInWishlist ? "Remove from wishlist" : "Add to wishlist"}
          >
            <Heart size={16} fill={isProductInWishlist ? "white" : "none"} />
          </button>
        </div>
        
        {/* Quick add to cart */}
        <div 
          className={`absolute bottom-0 left-0 right-0 bg-primary text-white py-3 px-4 flex items-center justify-center font-medium quick-add ${
            hovered ? 'opacity-100' : 'opacity-0'
          }`}
          onClick={handleAddToCart}
        >
          <ShoppingBag size={16} className="mr-2" />
          Quick Add
        </div>
        
        {/* Product badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {product.new && (
            <span className="bg-primary text-white text-xs font-semibold px-2 py-1">
              NEW
            </span>
          )}
          {product.trending && (
            <span className="bg-secondary text-white text-xs font-semibold px-2 py-1">
              TRENDING
            </span>
          )}
          {product.compareAtPrice && (
            <span className="bg-success text-white text-xs font-semibold px-2 py-1">
              SALE
            </span>
          )}
        </div>
      </div>
      
      {/* Product info */}
      <div className="p-4">
        <h3 className="font-medium text-neutral-800">{product.name}</h3>
        <div className="mt-1 flex items-center">
          <span className="font-semibold text-neutral-900">
            ₹{(product.price / 100).toFixed(2)}
          </span>
          
          {product.compareAtPrice && (
            <span className="ml-2 text-neutral-500 line-through text-sm">
              ₹{(product.compareAtPrice / 100).toFixed(2)}
            </span>
          )}
        </div>
        
        {/* Color options */}
        <div className="mt-3 flex items-center gap-1">
          {product.colors.map((color) => (
            <div 
              key={color.name}
              className="w-4 h-4 rounded-full border border-neutral-300"
              style={{ backgroundColor: color.value }}
              title={color.name}
            ></div>
          ))}
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;