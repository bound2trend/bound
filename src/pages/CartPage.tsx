import React from 'react';
import { useCartStore } from '../store/cartStore';
import { useNavigate } from 'react-router-dom';

const CartPage: React.FC = () => {
  const { cartItems, removeFromCart, updateQuantity } = useCartStore();
  const navigate = useNavigate();

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6">Shopping Cart</h1>

      {cartItems.length === 0 ? (
        <p>Your cart is empty. <span onClick={() => navigate('/shop')} className="text-blue-600 underline cursor-pointer">Continue Shopping</span></p>
      ) : (
        <div className="space-y-6">
          {cartItems.map((item) => (
            <div key={item.id} className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b pb-4">
              <div className="flex items-center gap-4">
                <img src={item.image} alt={item.name} className="w-24 h-24 rounded object-cover" />
                <div>
                  <h2 className="text-lg font-semibold">{item.name}</h2>
                  <p className="text-sm text-gray-500">₹{item.price} × {item.quantity}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="px-2 py-1 bg-gray-100 rounded">-</button>
                <span>{item.quantity}</span>
                <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="px-2 py-1 bg-gray-100 rounded">+</button>
                <button onClick={() => removeFromCart(item.id)} className="text-red-500 ml-4">Remove</button>
              </div>
            </div>
          ))}

          <div className="flex justify-between items-center pt-6 border-t">
            <p className="text-lg font-semibold">Total: ₹{total}</p>
            <button onClick={() => navigate('/checkout')} className="bg-black text-white px-6 py-3 rounded hover:bg-gray-800">
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
