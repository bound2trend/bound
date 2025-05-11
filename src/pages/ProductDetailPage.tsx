import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Star, Heart, Share2, ArrowRight, Truck, ShieldCheck, RotateCcw, Shirt as TShirt } from 'lucide-react';
import Button from '../components/common/Button';
import { useCartStore } from '../store/cartStore';
import { useWishlistStore } from '../store/wishlistStore';
import { useAuthStore } from '../store/authStore';
import FitRoomModal from '../components/fitroom/FitRoomModal';
import { products } from '../data/mockProducts';
import type { Product, ProductColor } from '../types';

const ProductDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState<ProductColor | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [isFitRoomOpen, setIsFitRoomOpen] = useState(false);
  
  const addItem = useCartStore(state => state.addItem);
  const { isInWishlist, addToWishlist, removeFromWishlist } = useWishlistStore();
  const user = useAuthStore(state => state.user);
  
  // Fetch product data
  useEffect(() => {
    setLoading(true);
    
    // Simulate API call with mock data
    const fetchProduct = () => {
      const foundProduct = products.find(p => p.slug === slug);
      
      if (foundProduct) {
        setProduct(foundProduct);
        setSelectedSize(foundProduct.sizes[0]);
        setSelectedColor(foundProduct.colors[0]);
      }
      
      setLoading(false);
    };
    
    fetchProduct();
  }, [slug]);
  
  if (loading) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full"></div>
      </div>
    );
  }
  
  if (!product) {
    return (
      <div className="min-h-screen pt-20">
        <div className="container-custom py-12 text-center">
          <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
          <p className="text-neutral-600 mb-6">
            The product you're looking for doesn't exist or has been removed.
          </p>
          <Link to="/shop">
            <Button variant="primary">Continue Shopping</Button>
          </Link>
        </div>
      </div>
    );
  }
  
  const isProductInWishlist = user ? isInWishlist(product.id) : false;
  
  const handleAddToCart = () => {
    if (!selectedSize || !selectedColor) return;
    
    addItem(product, quantity, selectedSize, selectedColor);
  };
  
  const handleWishlist = () => {
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
  
  const openFitRoom = () => {
    setIsFitRoomOpen(true);
  };
  
  return (
    <div className="min-h-screen pt-20">
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Product Images */}
          <div>
            <div className="bg-neutral-100 mb-4 rounded-lg overflow-hidden">
              <img 
                src={product.images[selectedImage]} 
                alt={product.name}
                className="w-full h-auto object-cover"
              />
            </div>
            
            <div className="grid grid-cols-4 gap-2">
              {product.images.map((image, index) => (
                <div 
                  key={index}
                  className={`rounded-md overflow-hidden cursor-pointer ${
                    selectedImage === index ? 'ring-2 ring-primary' : ''
                  }`}
                  onClick={() => setSelectedImage(index)}
                >
                  <img 
                    src={image} 
                    alt={`${product.name} - View ${index + 1}`}
                    className="w-full h-auto object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
          
          {/* Product Details */}
          <div>
            <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
            
            <div className="flex items-center mb-4">
              <div className="flex items-center mr-4">
                <Star size={16} className="text-yellow-500 fill-current" />
                <Star size={16} className="text-yellow-500 fill-current" />
                <Star size={16} className="text-yellow-500 fill-current" />
                <Star size={16} className="text-yellow-500 fill-current" />
                <Star size={16} className="text-neutral-300 fill-current" />
                <span className="ml-2 text-sm text-neutral-600">(24 reviews)</span>
              </div>
              
              <div className="flex items-center">
                {product.inStock ? (
                  <span className="text-success text-sm">In Stock</span>
                ) : (
                  <span className="text-error text-sm">Out of Stock</span>
                )}
              </div>
            </div>
            
            <div className="mb-6">
              <div className="flex items-baseline">
                <span className="text-2xl font-bold">
                  ₹{(product.price / 100).toFixed(2)}
                </span>
                
                {product.compareAtPrice && (
                  <>
                    <span className="ml-2 text-neutral-500 line-through">
                      ₹{(product.compareAtPrice / 100).toFixed(2)}
                    </span>
                    <span className="ml-2 text-success text-sm">
                      {Math.round((1 - product.price / product.compareAtPrice) * 100)}% OFF
                    </span>
                  </>
                )}
              </div>
              
              <p className="text-sm text-neutral-500 mt-1">
                Inclusive of all taxes
              </p>
            </div>
            
            <div className="mb-6">
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">
                  Size
                </label>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      className={`h-10 min-w-[3rem] px-3 border rounded-md ${
                        selectedSize === size 
                          ? 'border-primary bg-primary/10 text-primary' 
                          : 'border-neutral-300 text-neutral-700 hover:border-primary'
                      }`}
                      onClick={() => setSelectedSize(size)}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">
                  Color
                </label>
                <div className="flex flex-wrap gap-3">
                  {product.colors.map((color) => (
                    <button
                      key={color.name}
                      className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        selectedColor?.name === color.name ? 'ring-2 ring-primary ring-offset-2' : ''
                      }`}
                      style={{ backgroundColor: color.value }}
                      onClick={() => setSelectedColor(color)}
                      title={color.name}
                    >
                      {selectedColor?.name === color.name && (
                        <span className={`text-xs ${
                          color.name === 'White' ? 'text-black' : 'text-white'
                        }`}>✓</span>
                      )}
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">
                  Quantity
                </label>
                <div className="flex items-center border border-neutral-300 rounded-md w-min">
                  <button 
                    className="px-3 py-2 text-neutral-500 hover:text-neutral-900"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    aria-label="Decrease quantity"
                  >
                    -
                  </button>
                  <span className="px-3 py-2 w-12 text-center">{quantity}</span>
                  <button 
                    className="px-3 py-2 text-neutral-500 hover:text-neutral-900"
                    onClick={() => setQuantity(quantity + 1)}
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-3 mb-6">
                <Button 
                  variant="primary"
                  size="lg"
                  fullWidth
                  onClick={handleAddToCart}
                  disabled={!product.inStock}
                >
                  Add to Cart
                </Button>
                
                <Button 
                  variant="secondary"
                  size="lg"
                  onClick={openFitRoom}
                >
                  <TShirt size={20} className="mr-2" />
                  Try It On
                </Button>
                
                <Button 
                  variant="outline"
                  size="lg"
                  onClick={handleWishlist}
                  className={isProductInWishlist ? 'bg-primary/10' : ''}
                >
                  <Heart 
                    size={20} 
                    className={isProductInWishlist ? 'fill-primary text-primary' : ''} 
                  />
                </Button>
              </div>
            </div>
            
            <div className="border-t border-neutral-200 pt-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex">
                  <Truck size={20} className="text-neutral-600 mr-3 flex-shrink-0" />
                  <div>
                    <h4 className="text-sm font-medium">Free Shipping</h4>
                    <p className="text-xs text-neutral-500">On orders over ₹999</p>
                  </div>
                </div>
                
                <div className="flex">
                  <ShieldCheck size={20} className="text-neutral-600 mr-3 flex-shrink-0" />
                  <div>
                    <h4 className="text-sm font-medium">Secure Payment</h4>
                    <p className="text-xs text-neutral-500">100% secure checkout</p>
                  </div>
                </div>
                
                <div className="flex">
                  <RotateCcw size={20} className="text-neutral-600 mr-3 flex-shrink-0" />
                  <div>
                    <h4 className="text-sm font-medium">Easy Returns</h4>
                    <p className="text-xs text-neutral-500">10 day return policy</p>
                  </div>
                </div>
                
                <div className="flex">
                  <Share2 size={20} className="text-neutral-600 mr-3 flex-shrink-0" />
                  <div>
                    <h4 className="text-sm font-medium">Share Product</h4>
                    <div className="flex space-x-2 mt-1">
                      <a href="#" className="text-neutral-600 hover:text-primary">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"></path>
                        </svg>
                      </a>
                      <a href="#" className="text-neutral-600 hover:text-primary">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723 10.012 10.012 0 01-3.127 1.195 4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.9 4.9 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.937 4.937 0 004.604 3.417 9.868 9.868 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.054 0 13.999-7.496 13.999-13.986 0-.209 0-.42-.015-.63a9.935 9.935 0 002.46-2.534l-.047-.02z"></path>
                        </svg>
                      </a>
                      <a href="#" className="text-neutral-600 hover:text-primary">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15h-2v-6h2v6zm-1-6.7c-.66 0-1.2-.54-1.2-1.2 0-.66.54-1.2 1.2-1.2.66 0 1.2.54 1.2 1.2 0 .66-.54 1.2-1.2 1.2zM17 17h-2v-3c0-.77-.23-1.3-.8-1.3-.95 0-1.2.7-1.2 1.3v3h-2v-6h2v1.93c.4-.65 1.3-1.23 2.15-1.23 1.23 0 1.85.76 1.85 2.33V17z"></path>
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Product Description */}
        <div className="mt-12">
          <div className="border-b border-neutral-200">
            <div className="inline-block border-b-2 border-primary pb-2 font-semibold">
              Description
            </div>
          </div>
          
          <div className="py-6">
            <p className="text-neutral-700 whitespace-pre-line">
              {product.description}
            </p>
          </div>
        </div>
        
        {/* Similar Products */}
        <div className="mt-12">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-2xl font-bold">You May Also Like</h3>
            <Link 
              to="/shop"
              className="inline-flex items-center text-primary font-medium hover:underline"
            >
              View More
              <ArrowRight size={16} className="ml-1" />
            </Link>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {products
              .filter(p => 
                p.id !== product.id && 
                (p.category === product.category || p.collections.some(c => product.collections.includes(c)))
              )
              .slice(0, 4)
              .map(relatedProduct => (
                <div key={relatedProduct.id} className="product-card">
                  <Link to={`/product/${relatedProduct.slug}`}>
                    <div className="product-image-container aspect-[3/4] bg-neutral-100">
                      <img 
                        src={relatedProduct.images[0]} 
                        alt={relatedProduct.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-medium text-neutral-800">{relatedProduct.name}</h3>
                      <div className="mt-1">
                        <span className="font-semibold text-neutral-900">
                          ₹{(relatedProduct.price / 100).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
          </div>
        </div>
      </div>
      
      {/* FitRoom Modal */}
      {isFitRoomOpen && (
        <FitRoomModal 
          isOpen={isFitRoomOpen}
          onClose={() => setIsFitRoomOpen(false)}
          product={product}
        />
      )}
    </div>
  );
};

export default ProductDetailPage;