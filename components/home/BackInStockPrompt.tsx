import React, { useState } from 'react';

const BackInStockPrompt: React.FC = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Subscribed for back in stock: ${email}`);
    setEmail('');
  };

  return (
    <div className="bg-white py-6 px-4 rounded shadow-md text-center">
      <h3 className="text-lg font-semibold mb-2">Get Notified</h3>
      <p className="text-sm text-gray-600 mb-3">Sign up to know when items are back in stock.</p>
      <form onSubmit={handleSubmit} className="flex flex-col items-center">
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          className="border border-gray-300 px-3 py-2 rounded-md text-sm w-64 mb-2"
        />
        <button type="submit" className="bg-black text-white px-4 py-2 rounded-md text-sm hover:bg-gray-800">
          Notify Me
        </button>
      </form>
    </div>
  );
};

export default BackInStockPrompt;
