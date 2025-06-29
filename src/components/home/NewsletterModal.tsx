import React, { useState, useEffect } from 'react';

const NewsletterModal: React.FC = () => {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowModal(true);
    }, 5000); // Show modal after 5 seconds
    return () => clearTimeout(timer);
  }, []);

  if (!showModal) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 px-4">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-xl font-semibold mb-2">Get 10% OFF Your First Order</h2>
        <p className="text-sm text-gray-600 mb-4">
          Subscribe to our newsletter to receive exclusive offers and updates.
        </p>
        <input
          type="email"
          placeholder="Enter your email"
          className="w-full border px-3 py-2 rounded-md mb-4 text-sm"
        />
        <button className="w-full bg-[#0a1b33] text-white py-2 rounded-md hover:bg-[#0f2647]">
          Subscribe
        </button>
        <button
          onClick={() => setShowModal(false)}
          className="absolute top-3 right-3 text-gray-500 hover:text-black"
        >
          ✕
        </button>
      </div>
    </div>
  );
};

export default NewsletterModal;
