import React from 'react';
import { useCartStore } from '../store/cartStore';
import { Link } from 'react-router-dom';
import { Trash2, Minus, Plus } from 'lucide-react';

const CartPage: React.FC = () => {
  const { cartItems, removeFromCart, updateQuantity } = useCartStore();

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shipping = subtotal > 1499 ? 0 : 49;
  const total = subtotal + shipping;

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center text-center px-4">
        <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
        <p className="text-gray-600 mb-6">Start exploring our latest collection.</p>
        <Link to="/shop" className="bg-black text-white px-6 py-2 rounded-md hover:bg-neutral-800 transition">
          Browse Products
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">Your Shopping Cart</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          {cartItems.map((item) => (
            <div key={item.id} className="flex items-center gap-4 border-b pb-4">
              <img src={item.image} alt={item.name} className="w-24 h-24 object-cover rounded" />
              <div className="flex-1">
                <h2 className="text-lg font-semibold">{item.name}</h2>
                <p className="text-sm text-gray-500">₹{item.price} x {item.quantity}</p>
                <div className="flex items-center gap-2 mt-2">
                  <button
                    className="border rounded px-2 py-1"
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    disabled={item.quantity === 1}
                  >
                    <Minus size={14} />
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    className="border rounded px-2 py-1"
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  >
                    <Plus size={14} />
                  </button>
                  <button
                    className="ml-4 text-red-500 hover:text-red-700"
                    onClick={() => removeFromCart(item.id)}
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
              <div className="font-bold">₹{item.price * item.quantity}</div>
            </div>
          ))}
        </div>

        <div className="border rounded-lg p-6 bg-gray-50 space-y-4">
          <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>₹{subtotal}</span>
          </div>
          <div className="flex justify-between">
            <span>Shipping</span>
            <span>{shipping === 0 ? 'Free' : `₹${shipping}`}</span>
          </div>
          <div className="flex justify-between font-bold text-lg border-t pt-2">
            <span>Total</span>
            <span>₹{total}</span>
          </div>
          <Link
            to="/checkout"
            className="block w-full bg-black text-white text-center py-2 rounded-md hover:bg-neutral-800 transition"
          >
            Proceed to Checkout
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
