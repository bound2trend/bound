import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  Star, Heart, Share2, ArrowRight, Truck, ShieldCheck, RotateCcw, Shirt as TShirt 
} from 'lucide-react';

import Button from '../components/common/Button';
import FitRoomModal from '../components/fitroom/FitRoomModal';

import { products } from '../data/mockProducts';

import { useCartStore } from '../store/cartStore';
import { useWishlistStore } from '../store/wishlistStore';
import { useAuthStore } from '../store/authStore';

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

  useEffect(() => {
    setLoading(true);

    const fetchProduct = () => {
      const found = products.find(p => p.slug === slug);
      if (found) {
        setProduct(found);
        setSelectedSize(found.sizes[0] || '');
        setSelectedColor(found.colors[0] || null);
      } else {
        setProduct(null);
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
              {product.images.map((img, idx) => (
                <div
                  key={idx}
                  className={`rounded-md overflow-hidden cursor-pointer ${
                    selectedImage === idx ? 'ring-2 ring-primary' : ''
                  }`}
                  onClick={() => setSelectedImage(idx)}
                >
                  <img 
                    src={img} 
                    alt={`${product.name} - View ${idx + 1}`} 
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
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    size={16} 
                    className={`${
                      i < 4 ? 'text-yellow-500 fill-current' : 'text-neutral-300 fill-current'
                    }`} 
                  />
                ))}
                <span className="ml-2 text-sm text-neutral-600">(24 reviews)</span>
              </div>
              <div>
                {product.inStock ? (
                  <span className="text-success text-sm">In Stock</span>
                ) : (
                  <span className="text-error text-sm">Out of Stock</span>
                )}
              </div>
            </div>

            <div className="mb-6">
              <div className="flex items-baseline">
                <span className="text-2xl font-bold">₹{(product.price / 100).toFixed(2)}</span>
                {product.compareAtPrice && (
                  <>
                    <span className="ml-2 text-neutral-500 line-through">₹{(product.compareAtPrice / 100).toFixed(2)}</span>
                    <span className="ml-2 text-success text-sm">
                      {Math.round((1 - product.price / product.compareAtPrice) * 100)}% OFF
                    </span>
                  </>
                )}
              </div>
              <p className="text-sm text-neutral-500 mt-1">Inclusive of all taxes</p>
            </div>

            {/* Size Selection */}
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">Size</label>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map(size => (
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

            {/* Color Selection */}
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">Color</label>
              <div className="flex flex-wrap gap-3">
                {product.colors.map(color => (
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
                        color.name.toLowerCase() === 'white' ? 'text-black' : 'text-white'
                      }`}>✓</span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity Selector */}
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">Quantity</label>
              <div className="flex items-center border border-neutral-300 rounded-md w-min">
                <button
                  className="px-3 py-2 text-neutral-500 hover:text-neutral-900"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  aria-label="Decrease quantity"
                >-</button>
                <span className="px-3 py-2 w-12 text-center">{quantity}</span>
                <button
                  className="px-3 py-2 text-neutral-500 hover:text-neutral-900"
                  onClick={() => setQuantity(quantity + 1)}
                  aria-label="Increase quantity"
                >+</button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 mb-6">
              <Button 
                variant="primary" size="lg" fullWidth 
                onClick={handleAddToCart} 
                disabled={!product.inStock}
              >
                Add to Cart
              </Button>

              <Button variant="secondary" size="lg" onClick={() => setIsFitRoomOpen(true)}>
                <TShirt size={20} className="mr-2" /> Try It On
              </Button>

              <Button 
                variant="outline" size="lg" 
                onClick={handleWishlist} 
                className={isProductInWishlist ? 'bg-primary/10' : ''}
              >
                <Heart 
                  size={20} 
                  className={isProductInWishlist ? 'text-primary fill-current' : 'text-neutral-600'} 
                />
                <span className="ml-2">{isProductInWishlist ? 'Remove from Wishlist' : 'Add to Wishlist'}</span>
              </Button>
            </div>

            {/* Share */}
            <div className="flex items-center space-x-4 mb-6">
              <a 
                href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`}
                target="_blank" rel="noopener noreferrer"
                aria-label="Share on Facebook"
                className="text-neutral-600 hover:text-primary"
              >
                <Share2 size={20} />
              </a>
              <a
                href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(product.name)}`}
                target="_blank" rel="noopener noreferrer"
                aria-label="Share on Twitter"
                className="text-neutral-600 hover:text-primary"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 fill-current" viewBox="0 0 24 24"><path d="M23.954 4.569a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.724c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482A13.978 13.978 0 011.671 3.15a4.822 4.822 0 00-.666 2.475c0 1.708.87 3.216 2.188 4.099a4.904 4.904 0 01-2.228-.616v.06a4.92 4.92 0 003.946 4.827 4.996 4.996 0 01-2.224.084 4.927 4.927 0 004.6 3.417 9.868 9.868 0 01-6.102 2.104c-.396 0-.79-.023-1.175-.067a13.945 13.945 0 007.548 2.212c9.058 0 14.009-7.496 14.009-13.986 0-.209-.005-.423-.015-.633a9.936 9.936 0 002.457-2.548l-.047-.02z" /></svg>
              </a>
              {/* Add more social share icons as needed */}
            </div>

            {/* Product Description */}
            <div className="prose max-w-none text-neutral-800" dangerouslySetInnerHTML={{ __html: product.description }}></div>

            {/* Features */}
            <div className="mt-8 grid grid-cols-2 gap-6">
              <div className="flex items-center space-x-3">
                <Truck size={24} className="text-primary" />
                <div>
                  <h4 className="font-semibold">Free Delivery</h4>
                  <p className="text-sm text-neutral-600">On all orders above ₹1000</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <ShieldCheck size={24} className="text-primary" />
                <div>
                  <h4 className="font-semibold">100% Original</h4>
                  <p className="text-sm text-neutral-600">Authentic products from top brands</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <RotateCcw size={24} className="text-primary" />
                <div>
                  <h4 className="font-semibold">Easy Returns</h4>
                  <p className="text-sm text-neutral-600">30 days return policy</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        <section className="mt-16">
          <h2 className="text-2xl font-bold mb-6">Related Products</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {products
              .filter(p => p.id !== product.id && (p.category === product.category || p.collections.some(c => product.collections.includes(c))))
              .slice(0, 4)
              .map(related => (
                <Link key={related.id} to={`/product/${related.slug}`} className="group block rounded-lg overflow-hidden border border-neutral-200 hover:shadow-lg transition-shadow">
                  <img src={related.images[0]} alt={related.name} className="w-full h-48 object-cover" />
                  <div className="p-3">
                    <h3 className="text-lg font-semibold group-hover:text-primary">{related.name}</h3>
                    <p className="text-sm text-neutral-600">₹{(related.price / 100).toFixed(2)}</p>
                  </div>
                </Link>
              ))
            }
          </div>
        </section>
      </div>

      {isFitRoomOpen && (
        <FitRoomModal product={product} onClose={() => setIsFitRoomOpen(false)} />
      )}
    </div>
  );
};

export default ProductDetailPage;
