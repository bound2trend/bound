import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, X, ChevronRight } from 'lucide-react';
import Button from '../components/common/Button';
import { useCartStore } from '../store/cartStore';

const CartPage: React.FC = () => {
  const { items, removeItem, updateQuantity, totalPrice } = useCartStore();
  
  // Calculate subtotal
  const subtotal = totalPrice();
  
  // Calculate shipping
  const shipping = subtotal > 99900 ? 0 : 9900; // Free shipping for orders over ₹999
  
  // Calculate tax (assuming 18% GST)
  const tax = Math.round(subtotal * 0.18);
  
  // Calculate total
  const total = subtotal + shipping + tax;
  
  if (items.length === 0) {
    return (
      <div className="min-h-screen pt-20">
        <div className="container-custom py-16 text-center">
          <ShoppingBag size={64} className="text-neutral-300 mx-auto mb-6" />
          <h1 className="text-3xl font-bold mb-3">Your cart is empty</h1>
          <p className="text-neutral-600 max-w-md mx-auto mb-8">
            Looks like you haven't added any products to your cart yet.
            Browse our collection to find something you'll love.
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
        <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <ul className="divide-y divide-neutral-100">
                {items.map(item => (
                  <li key={item.id} className="p-4 sm:p-6">
                    <div className="flex flex-col sm:flex-row gap-4">
                      <div className="sm:w-24 w-full h-32 sm:h-24 bg-neutral-100 rounded-md overflow-hidden flex-shrink-0">
                        <img 
                          src={item.product.images[0]} 
                          alt={item.product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex justify-between mb-2">
                          <Link to={`/product/${item.product.slug}`} className="font-medium hover:text-primary">
                            {item.product.name}
                          </Link>
                          <button 
                            onClick={() => removeItem(item.id)}
                            className="text-neutral-400 hover:text-neutral-900"
                            aria-label="Remove item"
                          >
                            <X size={18} />
                          </button>
                        </div>
                        
                        <div className="text-sm text-neutral-500 mb-3">
                          <span>Size: {item.size}</span>
                          <span className="mx-2">|</span>
                          <span>Color: {item.color.name}</span>
                        </div>
                        
                        <div className="flex justify-between items-center">
                          <div className="flex items-center border border-neutral-300 rounded-md">
                            <button 
                              className="px-3 py-2 text-neutral-500 hover:text-neutral-900"
                              onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                              aria-label="Decrease quantity"
                            >
                              -
                            </button>
                            <span className="px-3 py-2 w-12 text-center">{item.quantity}</span>
                            <button 
                              className="px-3 py-2 text-neutral-500 hover:text-neutral-900"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              aria-label="Increase quantity"
                            >
                              +
                            </button>
                          </div>
                          
                          <span className="font-semibold">
                            ₹{((item.price * item.quantity) / 100).toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-bold mb-4">Order Summary</h2>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-neutral-600">
                  <span>Subtotal</span>
                  <span>₹{(subtotal / 100).toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-neutral-600">
                  <span>Shipping</span>
                  <span>{shipping === 0 ? 'Free' : `₹${(shipping / 100).toFixed(2)}`}</span>
                </div>
                <div className="flex justify-between text-neutral-600">
                  <span>Tax (18% GST)</span>
                  <span>₹{(tax / 100).toFixed(2)}</span>
                </div>
                <div className="border-t border-neutral-200 pt-3 flex justify-between font-bold">
                  <span>Total</span>
                  <span>₹{(total / 100).toFixed(2)}</span>
                </div>
              </div>
              
              <div className="space-y-3">
                <Link to="/checkout">
                  <Button 
                    variant="primary"
                    size="lg"
                    fullWidth
                    className="flex justify-center items-center"
                  >
                    Proceed to Checkout
                    <ChevronRight size={16} className="ml-1" />
                  </Button>
                </Link>
                
                <Link to="/shop">
                  <Button 
                    variant="outline"
                    fullWidth
                  >
                    Continue Shopping
                  </Button>
                </Link>
              </div>
              
              <div className="mt-6 text-sm text-neutral-500">
                <p className="mb-2">
                  We accept:
                </p>
                <div className="flex space-x-2">
                  <img src="https://via.placeholder.com/40x25" alt="Visa" className="h-6" />
                  <img src="https://via.placeholder.com/40x25" alt="Mastercard" className="h-6" />
                  <img src="https://via.placeholder.com/40x25" alt="PayPal" className="h-6" />
                  <img src="https://via.placeholder.com/40x25" alt="Apple Pay" className="h-6" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;