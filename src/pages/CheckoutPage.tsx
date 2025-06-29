import React, { useState } from 'react';
import { useCartStore } from '../store/cartStore';
import { useNavigate } from 'react-router-dom';

const CheckoutPage: React.FC = () => {
  const { cartItems, clearCart } = useCartStore();
  const navigate = useNavigate();

  const [shippingInfo, setShippingInfo] = useState({
    fullName: '',
    address: '',
    city: '',
    state: '',
    postalCode: '',
    phone: '',
    email: '',
  });

  const [paymentMethod, setPaymentMethod] = useState('card');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setShippingInfo({ ...shippingInfo, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (Object.values(shippingInfo).some((v) => !v.trim())) {
      alert('Please fill in all required fields.');
      return;
    }

    clearCart();
    navigate('/account');
    alert('Order placed successfully!');
  };

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shipping = subtotal > 999 ? 0 : 49;
  const total = subtotal + shipping;

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center text-center px-4">
        <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
        <p className="text-gray-600 mb-6">Please add items to your cart before checking out.</p>
        <button
          onClick={() => navigate('/shop')}
          className="bg-black text-white px-6 py-2 rounded-md hover:bg-neutral-800 transition"
        >
          Back to Shop
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Shipping Details */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold mb-4">Shipping Details</h2>
          {['fullName', 'address', 'city', 'state', 'postalCode', 'phone', 'email'].map((field) => (
            <input
              key={field}
              type={field === 'email' ? 'email' : 'text'}
              name={field}
              placeholder={field
                .replace(/([A-Z])/g, ' $1')
                .replace(/^./, (str) => str.toUpperCase())}
              value={shippingInfo[field as keyof typeof shippingInfo]}
              onChange={handleInputChange}
              required
              className="w-full border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black"
            />
          ))}
        </div>

        {/* Order Summary */}
        <div className="bg-gray-50 border rounded-lg p-6 space-y-4">
          <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
          <ul className="space-y-2 text-sm">
            {cartItems.map((item) => (
              <li key={item.id} className="flex justify-between">
                <span>{item.name} × {item.quantity}</span>
                <span>₹{item.price * item.quantity}</span>
              </li>
            ))}
          </ul>
          <div className="flex justify-between border-t pt-2">
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

          {/* Payment Method Selection */}
          <div>
            <h3 className="font-semibold mb-2">Payment Method</h3>
            <div className="space-y-2 text-sm">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  value="card"
                  checked={paymentMethod === 'card'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                Credit/Debit Card
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  value="upi"
                  checked={paymentMethod === 'upi'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                UPI
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  value="cod"
                  checked={paymentMethod === 'cod'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                Cash on Delivery
              </label>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-black text-white py-2 rounded-md hover:bg-neutral-800 transition"
          >
            Place Order
          </button>
        </div>
      </form>
    </div>
  );
};

export default CheckoutPage;
