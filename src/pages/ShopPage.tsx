import React, { useState } from 'react';
import ProductCard from '../components/ProductCard';
import { mockProducts } from '../data/mockProducts';
import { Filter, X, ChevronDown } from 'lucide-react';

const ShopPage: React.FC = () => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [sortBy, setSortBy] = useState('featured');

  const toggleFilterDrawer = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortBy(e.target.value);
  };

  const sortedProducts = [...mockProducts].sort((a, b) => {
    if (sortBy === 'price-low-high') return a.price - b.price;
    if (sortBy === 'price-high-low') return b.price - a.price;
    return 0;
  });

  return (
    <div className="bg-[#f9f9f9] min-h-screen">
      <div className="container-custom py-6">
        {/* Top Bar */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Shop All Products</h2>
          <div className="flex gap-3 items-center">
            <div className="relative">
              <select
                value={sortBy}
                onChange={handleSortChange}
                className="appearance-none border px-4 py-2 rounded-md text-sm bg-white"
              >
                <option value="featured">Featured</option>
                <option value="price-low-high">Price: Low to High</option>
                <option value="price-high-low">Price: High to Low</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none" />
            </div>
            <button
              onClick={toggleFilterDrawer}
              className="flex items-center gap-1 px-4 py-2 text-sm border rounded-md bg-white hover:bg-gray-100"
            >
              <Filter size={16} />
              Filter
            </button>
          </div>
        </div>

        {/* Filter Drawer */}
        {isFilterOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-30" onClick={toggleFilterDrawer}>
            <div
              className="fixed top-0 right-0 w-full md:w-[400px] h-full bg-white z-40 p-6 overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Filters</h3>
                <button onClick={toggleFilterDrawer}>
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-6">
                {/* Category Filter */}
                <div>
                  <h4 className="text-sm font-medium mb-2">Category</h4>
                  <div className="space-y-1">
                    <label><input type="checkbox" className="mr-2" /> Shirts</label><br />
                    <label><input type="checkbox" className="mr-2" /> Pants</label><br />
                    <label><input type="checkbox" className="mr-2" /> Suits</label>
                  </div>
                </div>

                {/* Color Filter */}
                <div>
                  <h4 className="text-sm font-medium mb-2">Color</h4>
                  <div className="flex gap-2">
                    <span className="w-5 h-5 bg-black rounded-full border" />
                    <span className="w-5 h-5 bg-white border" />
                    <span className="w-5 h-5 bg-blue-800 rounded-full border" />
                    <span className="w-5 h-5 bg-gray-500 rounded-full border" />
                  </div>
                </div>

                {/* Price Filter */}
                <div>
                  <h4 className="text-sm font-medium mb-2">Price Range</h4>
                  <input
                    type="range"
                    min="500"
                    max="5000"
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>₹500</span>
                    <span>₹5000</span>
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <button className="btn-primary w-full">Apply Filters</button>
              </div>
            </div>
          </div>
        )}

        {/* Product Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
          {sortedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ShopPage;
