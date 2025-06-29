import React from 'react';

const BackInStockPrompt: React.FC = () => {
  return (
    <section className="bg-[#f2f2f2] py-10 px-4 text-center">
      <h2 className="text-xl font-semibold mb-2">Missed Out?</h2>
      <p className="text-sm text-gray-700 mb-4">Get notified when your size is back in stock.</p>
      <div className="flex justify-center gap-2 max-w-md mx-auto">
        <input
          type="email"
          placeholder="Enter your email"
          className="border px-4 py-2 rounded-md text-sm w-full"
        />
        <button className="bg-[#0a1b33] text-white px-4 py-2 rounded-md text-sm hover:bg-[#0f2647]">
          Notify Me
        </button>
      </div>
    </section>
  );
};

export default BackInStockPrompt;
