import React from 'react';
import { mockProducts } from '../../data/mockProducts';
import { Link } from 'react-router-dom';

const TrendingCarousel: React.FC = () => {
  return (
    <section className="py-10 bg-white">
      <div className="container-custom px-4">
        <h2 className="text-3xl font-bold mb-6">Trending Now</h2>
        <div className="flex overflow-x-auto gap-4 scrollbar-hide">
          {mockProducts.slice(0, 8).map((product) => (
            <Link
              to={`/product/${product.id}`}
              key={product.id}
              className="flex-shrink-0 w-56"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-72 object-cover rounded-lg shadow-sm"
              />
              <h3 className="mt-2 font-medium text-sm text-gray-900">
                {product.name}
              </h3>
              <p className="text-gray-600 text-sm">₹{product.price}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrendingCarousel;
