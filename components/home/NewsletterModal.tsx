import React, { useEffect, useState } from 'react';

const NewsletterModal: React.FC = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShow(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 w-80 text-center relative">
        <button onClick={() => setShow(false)} className="absolute top-2 right-2 text-gray-500 text-xl">×</button>
        <h2 className="text-xl font-bold mb-2">Get 10% Off</h2>
        <p className="text-sm text-gray-600 mb-4">Subscribe to our newsletter and get 10% off your first order.</p>
        <input
          type="email"
          placeholder="Your email"
          className="border border-gray-300 px-3 py-2 rounded w-full mb-2"
        />
        <button className="bg-black text-white py-2 w-full rounded hover:bg-gray-800">
          Subscribe
        </button>
      </div>
    </div>
  );
};

export default NewsletterModal;
