import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { X, ShoppingBag } from 'lucide-react';
import { useCartStore } from '../../store/cartStore';
import Button from '../common/Button';

interface MiniCartProps {
  onClose: () => void;
}

const MiniCart: React.FC<MiniCartProps> = ({ onClose }) => {
  const cartRef = useRef<HTMLDivElement>(null);
  const items = useCartStore(state => state.items);
  const removeItem = useCartStore(state => state.removeItem);
  const updateQuantity = useCartStore(state => state.updateQuantity);
  const totalPrice = useCartStore(state => state.totalPrice());
  
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (cartRef.current && !cartRef.current.contains(event.target as Node)) {
        onClose();
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);
  
  return (
    <div className="fixed top-0 right-0 h-full w-full md:w-96 bg-white shadow-lg z-50 animate-slide-in-right">
      <div ref={cartRef} className="flex flex-col h-full">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-200">
          <h3 className="font-bold text-lg">Your Cart ({items.length})</h3>
          <button 
            onClick={onClose}
            className="text-neutral-500 hover:text-neutral-900"
            aria-label="Close cart"
          >
            <X size={20} />
          </button>
        </div>
        
        {/* Cart items */}
        <div className="flex-1 overflow-y-auto py-4 px-6">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <ShoppingBag size={48} className="text-neutral-300 mb-4" />
              <p className="text-neutral-600 mb-2">Your cart is empty</p>
              <p className="text-neutral-500 text-sm mb-6">Add some products to your cart and they will appear here</p>
              <Button 
                variant="primary"
                onClick={onClose}
              >
                Continue Shopping
              </Button>
            </div>
          ) : (
            <ul className="space-y-4">
              {items.map(item => (
                <li key={item.id} className="flex gap-4 pb-4 border-b border-neutral-100">
                  <div className="w-20 h-24 bg-neutral-100 flex-shrink-0">
                    <img 
                      src={item.product.images[0]} 
                      alt={item.product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <h4 className="font-medium text-sm">{item.product.name}</h4>
                      <button 
                        onClick={() => removeItem(item.id)}
                        className="text-neutral-400 hover:text-neutral-900"
                        aria-label="Remove item"
                      >
                        <X size={16} />
                      </button>
                    </div>
                    
                    <div className="text-sm text-neutral-500 mt-1">
                      <span>Size: {item.size}</span>
                      <span className="mx-2">|</span>
                      <span>Color: {item.color.name}</span>
                    </div>
                    
                    <div className="flex justify-between items-center mt-2">
                      <div className="flex items-center border border-neutral-300 rounded-md">
                        <button 
                          className="px-2 py-1 text-neutral-500 hover:text-neutral-900"
                          onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                          aria-label="Decrease quantity"
                        >
                          -
                        </button>
                        <span className="px-2 py-1 text-sm">{item.quantity}</span>
                        <button 
                          className="px-2 py-1 text-neutral-500 hover:text-neutral-900"
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
                </li>
              ))}
            </ul>
          )}
        </div>
        
        {/* Footer */}
        {items.length > 0 && (
          <div className="px-6 py-4 border-t border-neutral-200">
            <div className="flex justify-between mb-4">
              <span className="font-medium">Subtotal</span>
              <span className="font-semibold">₹{(totalPrice / 100).toFixed(2)}</span>
            </div>
            <p className="text-neutral-500 text-sm mb-4">
              Shipping and taxes calculated at checkout
            </p>
            <div className="space-y-2">
              <Link to="/checkout" onClick={onClose}>
                <Button 
                  variant="primary"
                  fullWidth
                >
                  Checkout
                </Button>
              </Link>
              <Button 
                variant="outline"
                fullWidth
                onClick={onClose}
              >
                Continue Shopping
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MiniCart;