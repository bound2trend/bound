import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Lock } from 'lucide-react';
import Button from '../components/common/Button';
import { useCartStore } from '../store/cartStore';
import { useAuthStore } from '../store/authStore';

type CheckoutStep = 'information' | 'shipping' | 'payment';

const CheckoutPage: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<CheckoutStep>('information');
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [address, setAddress] = useState('');
  const [apartment, setApartment] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [phone, setPhone] = useState('');
  const [shippingMethod, setShippingMethod] = useState('standard');
  const [paymentMethod, setPaymentMethod] = useState('credit-card');
  
  const { items, totalPrice, clearCart } = useCartStore();
  const user = useAuthStore((state) => state.user);
  
  // Calculate subtotal
  const subtotal = totalPrice();
  
  // Calculate shipping based on selected method
  const shipping = shippingMethod === 'express' ? 19900 : (subtotal > 99900 ? 0 : 9900);
  
  // Calculate tax (assuming 18% GST)
  const tax = Math.round(subtotal * 0.18);
  
  // Calculate total
  const total = subtotal + shipping + tax;
  
  const handleContinue = () => {
    if (currentStep === 'information') {
      setCurrentStep('shipping');
    } else if (currentStep === 'shipping') {
      setCurrentStep('payment');
    } else {
      // Submit order
      alert('Thank you for your order!');
      clearCart();
      window.location.href = '/';
    }
  };
  
  return (
    <div className="min-h-screen pt-20 pb-16 bg-neutral-50">
      <div className="container-custom py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Checkout</h1>
          
          {/* Checkout Steps */}
          <div className="flex items-center justify-between mb-8 text-sm">
            <div className="flex items-center">
              <span className={`${currentStep === 'information' ? 'text-primary font-medium' : 'text-neutral-500'}`}>
                Information
              </span>
              <ChevronRight size={16} className="mx-2 text-neutral-400" />
            </div>
            <div className="flex items-center">
              <span className={`${currentStep === 'shipping' ? 'text-primary font-medium' : 'text-neutral-500'}`}>
                Shipping
              </span>
              <ChevronRight size={16} className="mx-2 text-neutral-400" />
            </div>
            <div className="flex items-center">
              <span className={`${currentStep === 'payment' ? 'text-primary font-medium' : 'text-neutral-500'}`}>
                Payment
              </span>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Checkout Form */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-sm p-6">
                {currentStep === 'information' && (
                  <div>
                    <h2 className="text-lg font-bold mb-4">Contact Information</h2>
                    
                    {!user && (
                      <div className="mb-4 text-sm">
                        <span className="text-neutral-600">Already have an account?</span> 
                        <Link to="/login" className="text-primary ml-1 hover:underline">
                          Log in
                        </Link>
                      </div>
                    )}
                    
                    <div className="space-y-4">
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-neutral-700 mb-1">
                          Email
                        </label>
                        <input
                          id="email"
                          type="email"
                          className="w-full rounded-md border-neutral-300 shadow-sm focus:border-primary focus:ring focus:ring-primary/30"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                        />
                      </div>
                      
                      <h2 className="text-lg font-bold pt-4">Shipping Address</h2>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="firstName" className="block text-sm font-medium text-neutral-700 mb-1">
                            First Name
                          </label>
                          <input
                            id="firstName"
                            type="text"
                            className="w-full rounded-md border-neutral-300 shadow-sm focus:border-primary focus:ring focus:ring-primary/30"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            required
                          />
                        </div>
                        
                        <div>
                          <label htmlFor="lastName" className="block text-sm font-medium text-neutral-700 mb-1">
                            Last Name
                          </label>
                          <input
                            id="lastName"
                            type="text"
                            className="w-full rounded-md border-neutral-300 shadow-sm focus:border-primary focus:ring focus:ring-primary/30"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            required
                          />
                        </div>
                      </div>
                      
                      <div>
                        <label htmlFor="address" className="block text-sm font-medium text-neutral-700 mb-1">
                          Address
                        </label>
                        <input
                          id="address"
                          type="text"
                          className="w-full rounded-md border-neutral-300 shadow-sm focus:border-primary focus:ring focus:ring-primary/30"
                          value={address}
                          onChange={(e) => setAddress(e.target.value)}
                          required
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="apartment" className="block text-sm font-medium text-neutral-700 mb-1">
                          Apartment, suite, etc. (optional)
                        </label>
                        <input
                          id="apartment"
                          type="text"
                          className="w-full rounded-md border-neutral-300 shadow-sm focus:border-primary focus:ring focus:ring-primary/30"
                          value={apartment}
                          onChange={(e) => setApartment(e.target.value)}
                        />
                      </div>
                      
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                        <div>
                          <label htmlFor="city" className="block text-sm font-medium text-neutral-700 mb-1">
                            City
                          </label>
                          <input
                            id="city"
                            type="text"
                            className="w-full rounded-md border-neutral-300 shadow-sm focus:border-primary focus:ring focus:ring-primary/30"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            required
                          />
                        </div>
                        
                        <div>
                          <label htmlFor="state" className="block text-sm font-medium text-neutral-700 mb-1">
                            State
                          </label>
                          <input
                            id="state"
                            type="text"
                            className="w-full rounded-md border-neutral-300 shadow-sm focus:border-primary focus:ring focus:ring-primary/30"
                            value={state}
                            onChange={(e) => setState(e.target.value)}
                            required
                          />
                        </div>
                        
                        <div>
                          <label htmlFor="postalCode" className="block text-sm font-medium text-neutral-700 mb-1">
                            Postal Code
                          </label>
                          <input
                            id="postalCode"
                            type="text"
                            className="w-full rounded-md border-neutral-300 shadow-sm focus:border-primary focus:ring focus:ring-primary/30"
                            value={postalCode}
                            onChange={(e) => setPostalCode(e.target.value)}
                            required
                          />
                        </div>
                      </div>
                      
                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-neutral-700 mb-1">
                          Phone
                        </label>
                        <input
                          id="phone"
                          type="tel"
                          className="w-full rounded-md border-neutral-300 shadow-sm focus:border-primary focus:ring focus:ring-primary/30"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          required
                        />
                      </div>
                    </div>
                  </div>
                )}
                
                {currentStep === 'shipping' && (
                  <div>
                    <h2 className="text-lg font-bold mb-4">Shipping Method</h2>
                    
                    <div className="space-y-3">
                      <div className="border rounded-md p-4">
                        <label className="flex items-center">
                          <input
                            type="radio"
                            name="shipping"
                            value="standard"
                            checked={shippingMethod === 'standard'}
                            onChange={() => setShippingMethod('standard')}
                            className="text-primary focus:ring-primary"
                          />
                          <div className="ml-3 flex-1">
                            <span className="block font-medium">Standard Shipping</span>
                            <span className="block text-sm text-neutral-500">
                              {subtotal > 99900 ? 'Free' : '₹99.00'} · 5-7 business days
                            </span>
                          </div>
                          {subtotal > 99900 ? (
                            <span className="text-success font-medium">Free</span>
                          ) : (
                            <span>₹99.00</span>
                          )}
                        </label>
                      </div>
                      
                      <div className="border rounded-md p-4">
                        <label className="flex items-center">
                          <input
                            type="radio"
                            name="shipping"
                            value="express"
                            checked={shippingMethod === 'express'}
                            onChange={() => setShippingMethod('express')}
                            className="text-primary focus:ring-primary"
                          />
                          <div className="ml-3 flex-1">
                            <span className="block font-medium">Express Shipping</span>
                            <span className="block text-sm text-neutral-500">
                              ₹199.00 · 2-3 business days
                            </span>
                          </div>
                          <span>₹199.00</span>
                        </label>
                      </div>
                    </div>
                  </div>
                )}
                
                {currentStep === 'payment' && (
                  <div>
                    <h2 className="text-lg font-bold mb-4">Payment Method</h2>
                    
                    <div className="space-y-3">
                      <div className="border rounded-md p-4">
                        <label className="flex items-center">
                          <input
                            type="radio"
                            name="payment"
                            value="credit-card"
                            checked={paymentMethod === 'credit-card'}
                            onChange={() => setPaymentMethod('credit-card')}
                            className="text-primary focus:ring-primary"
                          />
                          <div className="ml-3 flex-1">
                            <span className="block font-medium">Credit Card</span>
                            <span className="flex items-center mt-1 space-x-2">
                              <img src="https://via.placeholder.com/40x25" alt="Visa" className="h-6" />
                              <img src="https://via.placeholder.com/40x25" alt="Mastercard" className="h-6" />
                              <img src="https://via.placeholder.com/40x25" alt="Amex" className="h-6" />
                            </span>
                          </div>
                        </label>
                      </div>
                      
                      <div className="border rounded-md p-4">
                        <label className="flex items-center">
                          <input
                            type="radio"
                            name="payment"
                            value="paypal"
                            checked={paymentMethod === 'paypal'}
                            onChange={() => setPaymentMethod('paypal')}
                            className="text-primary focus:ring-primary"
                          />
                          <div className="ml-3 flex-1">
                            <span className="block font-medium">PayPal</span>
                            <span className="flex items-center mt-1">
                              <img src="https://via.placeholder.com/40x25" alt="PayPal" className="h-6" />
                            </span>
                          </div>
                        </label>
                      </div>
                      
                      <div className="border rounded-md p-4">
                        <label className="flex items-center">
                          <input
                            type="radio"
                            name="payment"
                            value="cod"
                            checked={paymentMethod === 'cod'}
                            onChange={() => setPaymentMethod('cod')}
                            className="text-primary focus:ring-primary"
                          />
                          <div className="ml-3">
                            <span className="block font-medium">Cash on Delivery</span>
                            <span className="block text-sm text-neutral-500">
                              Pay when you receive your order
                            </span>
                          </div>
                        </label>
                      </div>
                    </div>
                    
                    {paymentMethod === 'credit-card' && (
                      <div className="mt-6 space-y-4">
                        <div>
                          <label htmlFor="cardNumber" className="block text-sm font-medium text-neutral-700 mb-1">
                            Card Number
                          </label>
                          <div className="relative">
                            <input
                              id="cardNumber"
                              type="text"
                              placeholder="1234 5678 9012 3456"
                              className="w-full rounded-md border-neutral-300 shadow-sm focus:border-primary focus:ring focus:ring-primary/30 pl-10"
                            />
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <Lock size={16} className="text-neutral-400" />
                            </div>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label htmlFor="expiry" className="block text-sm font-medium text-neutral-700 mb-1">
                              Expiry Date
                            </label>
                            <input
                              id="expiry"
                              type="text"
                              placeholder="MM/YY"
                              className="w-full rounded-md border-neutral-300 shadow-sm focus:border-primary focus:ring focus:ring-primary/30"
                            />
                          </div>
                          
                          <div>
                            <label htmlFor="cvv" className="block text-sm font-medium text-neutral-700 mb-1">
                              CVV
                            </label>
                            <input
                              id="cvv"
                              type="text"
                              placeholder="123"
                              className="w-full rounded-md border-neutral-300 shadow-sm focus:border-primary focus:ring focus:ring-primary/30"
                            />
                          </div>
                        </div>
                        
                        <div>
                          <label htmlFor="nameOnCard" className="block text-sm font-medium text-neutral-700 mb-1">
                            Name on Card
                          </label>
                          <input
                            id="nameOnCard"
                            type="text"
                            className="w-full rounded-md border-neutral-300 shadow-sm focus:border-primary focus:ring focus:ring-primary/30"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                )}
                
                <div className="mt-8 flex justify-between items-center">
                  <button
                    className="text-primary hover:underline flex items-center"
                    onClick={() => {
                      if (currentStep === 'shipping') setCurrentStep('information');
                      if (currentStep === 'payment') setCurrentStep('shipping');
                    }}
                  >
                    &larr; Back
                  </button>
                  
                  <Button
                    variant="primary"
                    onClick={handleContinue}
                  >
                    {currentStep === 'payment'
                      ? 'Complete Order'
                      : 'Continue to ' + (currentStep === 'information' ? 'Shipping' : 'Payment')}
                  </Button>
                </div>
              </div>
            </div>
            
            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-lg font-bold mb-4">Order Summary</h2>
                
                <div className="max-h-80 overflow-y-auto mb-6">
                  {items.map(item => (
                    <div key={item.id} className="flex py-3 border-b border-neutral-100">
                      <div className="relative w-16 h-16 bg-neutral-100 rounded flex-shrink-0">
                        <img 
                          src={item.product.images[0]} 
                          alt={item.product.name}
                          className="w-full h-full object-cover rounded"
                        />
                        <span className="absolute -top-2 -right-2 bg-neutral-800 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                          {item.quantity}
                        </span>
                      </div>
                      <div className="ml-3 flex-1">
                        <h4 className="text-sm font-medium">{item.product.name}</h4>
                        <p className="text-xs text-neutral-500">
                          Size: {item.size} | Color: {item.color.name}
                        </p>
                        <p className="text-sm font-medium mt-1">
                          ₹{((item.price * item.quantity) / 100).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                
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
                
                <div className="text-sm text-neutral-500 mt-4">
                  <div className="flex items-center">
                    <Lock size={14} className="mr-1" />
                    Secure checkout
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;