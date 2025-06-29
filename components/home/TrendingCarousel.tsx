import React from 'react';
import { mockProducts } from '../../lib/mockProducts';

const TrendingCarousel: React.FC = () => {
  const trending = mockProducts.slice(0, 5);

  return (
    <div className="bg-neutral-100 py-10">
      <div className="container-custom">
        <h2 className="text-2xl font-bold mb-6">Trending Now</h2>
        <div className="flex gap-4 overflow-x-auto no-scrollbar">
          {trending.map((item) => (
            <div key={item.id} className="flex-shrink-0 w-48 bg-white rounded shadow">
              <img src={item.image} alt={item.name} className="w-full h-48 object-cover rounded-t" />
              <div className="p-3 text-center">
                <p className="text-sm font-medium">{item.name}</p>
                <p className="text-gray-500 text-sm">₹{item.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TrendingCarousel;
