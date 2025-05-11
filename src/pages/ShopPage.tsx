import React, { useState, useEffect } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { SlidersHorizontal, X, ChevronDown, Filter } from 'lucide-react';
import ProductCard from '../components/products/ProductCard';
import { products, categories } from '../data/mockProducts';
import type { Product } from '../types';

const ShopPage: React.FC = () => {
  const { category, collection } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 5000]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<string>('featured');
  
  // Get all available sizes and colors from products
  const allSizes = Array.from(new Set(products.flatMap(p => p.sizes)));
  const allColors = Array.from(
    new Set(products.flatMap(p => p.colors.map(c => c.name)))
  );
  
  // Get query params
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const sort = searchParams.get('sort');
    const sizes = searchParams.get('sizes')?.split(',').filter(Boolean);
    const colors = searchParams.get('colors')?.split(',').filter(Boolean);
    const minPrice = searchParams.get('minPrice');
    const maxPrice = searchParams.get('maxPrice');
    
    if (sort) setSortBy(sort);
    if (sizes) setSelectedSizes(sizes);
    if (colors) setSelectedColors(colors);
    if (minPrice && maxPrice) {
      setPriceRange([parseInt(minPrice), parseInt(maxPrice)]);
    }
  }, [location.search]);
  
  // Filter products based on category, collection, and filters
  useEffect(() => {
    let filtered = [...products];
    
    // Filter by category
    if (category) {
      filtered = filtered.filter(p => p.category === category);
    }
    
    // Filter by collection
    if (collection) {
      filtered = filtered.filter(p => p.collections.includes(collection));
    }
    
    // Filter by size
    if (selectedSizes.length > 0) {
      filtered = filtered.filter(p => 
        selectedSizes.some(size => p.sizes.includes(size))
      );
    }
    
    // Filter by color
    if (selectedColors.length > 0) {
      filtered = filtered.filter(p => 
        selectedColors.some(color => 
          p.colors.some(c => c.name === color)
        )
      );
    }
    
    // Filter by price
    filtered = filtered.filter(p => 
      p.price >= priceRange[0] * 100 && p.price <= priceRange[1] * 100
    );
    
    // Sort products
    switch (sortBy) {
      case 'price-low-high':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high-low':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
        filtered.sort((a, b) => 
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        break;
      case 'trending':
        filtered = filtered.filter(p => p.trending).concat(
          filtered.filter(p => !p.trending)
        );
        break;
      default:
        // Default is 'featured'
        filtered = filtered.filter(p => p.featured).concat(
          filtered.filter(p => !p.featured)
        );
    }
    
    setFilteredProducts(filtered);
  }, [category, collection, selectedSizes, selectedColors, priceRange, sortBy]);
  
  // Update URL with filters
  const updateQueryParams = () => {
    const searchParams = new URLSearchParams();
    
    if (sortBy) searchParams.set('sort', sortBy);
    if (selectedSizes.length) searchParams.set('sizes', selectedSizes.join(','));
    if (selectedColors.length) searchParams.set('colors', selectedColors.join(','));
    searchParams.set('minPrice', priceRange[0].toString());
    searchParams.set('maxPrice', priceRange[1].toString());
    
    navigate({ search: searchParams.toString() });
  };
  
  // Toggle size selection
  const toggleSize = (size: string) => {
    setSelectedSizes(prev => 
      prev.includes(size) 
        ? prev.filter(s => s !== size)
        : [...prev, size]
    );
  };
  
  // Toggle color selection
  const toggleColor = (color: string) => {
    setSelectedColors(prev => 
      prev.includes(color) 
        ? prev.filter(c => c !== color)
        : [...prev, color]
    );
  };
  
  // Clear all filters
  const clearFilters = () => {
    setSelectedSizes([]);
    setSelectedColors([]);
    setPriceRange([0, 5000]);
    setSortBy('featured');
    
    navigate({ search: '' });
  };
  
  // Apply filters
  const applyFilters = () => {
    updateQueryParams();
    setIsFilterOpen(false);
  };
  
  // Get page title
  const getPageTitle = () => {
    if (category) {
      const categoryObj = categories.find(c => c.slug === category);
      return categoryObj ? categoryObj.name : 'Shop';
    }
    
    if (collection === 'new-arrivals') return 'New Arrivals';
    if (collection === 'bestsellers') return 'Bestsellers';
    
    return 'All Products';
  };
  
  return (
    <div className="min-h-screen pt-20">
      {/* Page Header */}
      <div className="bg-neutral-950 text-white py-12">
        <div className="container-custom">
          <h1 className="text-3xl md:text-4xl font-bold">{getPageTitle()}</h1>
          <p className="text-neutral-400 mt-2">
            {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'}
          </p>
        </div>
      </div>
      
      {/* Filters and Sort */}
      <div className="bg-white border-b border-neutral-200 sticky top-16 z-20">
        <div className="container-custom py-4">
          <div className="flex items-center justify-between">
            <button
              className="flex items-center text-sm font-medium"
              onClick={() => setIsFilterOpen(!isFilterOpen)}
            >
              <Filter size={16} className="mr-2" />
              Filter{selectedSizes.length > 0 || selectedColors.length > 0 ? ' (' + (selectedSizes.length + selectedColors.length) + ')' : ''}
            </button>
            
            <div className="relative">
              <select
                className="appearance-none bg-white border border-neutral-300 rounded-md pl-4 pr-10 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
                value={sortBy}
                onChange={(e) => {
                  setSortBy(e.target.value);
                  updateQueryParams();
                }}
              >
                <option value="featured">Featured</option>
                <option value="newest">Newest</option>
                <option value="price-low-high">Price: Low to High</option>
                <option value="price-high-low">Price: High to Low</option>
                <option value="trending">Trending</option>
              </select>
              <ChevronDown size={16} className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none text-neutral-500" />
            </div>
          </div>
          
          {/* Applied filters */}
          {(selectedSizes.length > 0 || selectedColors.length > 0) && (
            <div className="flex flex-wrap gap-2 mt-3">
              {selectedSizes.map(size => (
                <div key={size} className="inline-flex items-center bg-neutral-100 text-xs rounded-full px-3 py-1">
                  {size}
                  <button 
                    className="ml-1 text-neutral-500"
                    onClick={() => {
                      toggleSize(size);
                      updateQueryParams();
                    }}
                  >
                    <X size={12} />
                  </button>
                </div>
              ))}
              
              {selectedColors.map(color => (
                <div key={color} className="inline-flex items-center bg-neutral-100 text-xs rounded-full px-3 py-1">
                  {color}
                  <button 
                    className="ml-1 text-neutral-500"
                    onClick={() => {
                      toggleColor(color);
                      updateQueryParams();
                    }}
                  >
                    <X size={12} />
                  </button>
                </div>
              ))}
              
              <button 
                className="text-xs text-primary hover:underline"
                onClick={clearFilters}
              >
                Clear All
              </button>
            </div>
          )}
        </div>
      </div>
      
      {/* Filter Sidebar (Mobile) */}
      {isFilterOpen && (
        <div className="fixed inset-0 z-40 overflow-hidden">
          <div className="absolute inset-0 bg-black bg-opacity-50" onClick={() => setIsFilterOpen(false)}></div>
          <div className="absolute inset-y-0 right-0 max-w-full flex">
            <div className="relative w-screen max-w-md">
              <div className="h-full flex flex-col bg-white shadow-xl overflow-y-scroll">
                <div className="flex items-center justify-between px-4 py-3 border-b border-neutral-200">
                  <h2 className="text-lg font-medium">Filters</h2>
                  <button
                    className="text-neutral-500 hover:text-neutral-900"
                    onClick={() => setIsFilterOpen(false)}
                  >
                    <X size={20} />
                  </button>
                </div>
                
                <div className="flex-1 px-4 py-6 space-y-6">
                  {/* Price Range */}
                  <div>
                    <h3 className="text-sm font-medium mb-3">Price Range</h3>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-neutral-500">
                        ₹{priceRange[0]} - ₹{priceRange[1]}
                      </span>
                    </div>
                    <div className="mt-2">
                      <input
                        type="range"
                        min="0"
                        max="5000"
                        step="500"
                        value={priceRange[1]}
                        onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                        className="w-full"
                      />
                    </div>
                  </div>
                  
                  {/* Sizes */}
                  <div>
                    <h3 className="text-sm font-medium mb-3">Sizes</h3>
                    <div className="flex flex-wrap gap-2">
                      {allSizes.map(size => (
                        <button
                          key={size}
                          className={`px-3 py-1 border rounded-md text-sm ${
                            selectedSizes.includes(size) 
                              ? 'border-primary bg-primary/10 text-primary' 
                              : 'border-neutral-300 text-neutral-700'
                          }`}
                          onClick={() => toggleSize(size)}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  {/* Colors */}
                  <div>
                    <h3 className="text-sm font-medium mb-3">Colors</h3>
                    <div className="flex flex-wrap gap-2">
                      {allColors.map(color => {
                        const colorObj = products.find(p => 
                          p.colors.some(c => c.name === color)
                        )?.colors.find(c => c.name === color);
                        
                        return (
                          <button
                            key={color}
                            className={`flex items-center px-3 py-1 border rounded-md text-sm ${
                              selectedColors.includes(color) 
                                ? 'border-primary bg-primary/10 text-primary' 
                                : 'border-neutral-300 text-neutral-700'
                            }`}
                            onClick={() => toggleColor(color)}
                          >
                            {colorObj && (
                              <span 
                                className="inline-block w-3 h-3 rounded-full mr-2"
                                style={{ backgroundColor: colorObj.value }}
                              ></span>
                            )}
                            {color}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
                
                <div className="border-t border-neutral-200 px-4 py-4 flex space-x-3">
                  <button
                    className="flex-1 bg-neutral-100 text-neutral-800 py-2 rounded-md font-medium text-sm hover:bg-neutral-200"
                    onClick={clearFilters}
                  >
                    Clear All
                  </button>
                  <button
                    className="flex-1 bg-primary text-white py-2 rounded-md font-medium text-sm hover:bg-primary/90"
                    onClick={applyFilters}
                  >
                    Apply Filters
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Product Grid */}
      <div className="bg-neutral-50 py-8">
        <div className="container-custom">
          {filteredProducts.length === 0 ? (
            <div className="text-center py-12">
              <SlidersHorizontal size={48} className="mx-auto text-neutral-300 mb-4" />
              <h2 className="text-xl font-semibold mb-2">No products found</h2>
              <p className="text-neutral-600 mb-6">
                Try adjusting your filters to find what you're looking for
              </p>
              <button
                className="text-primary font-medium hover:underline"
                onClick={clearFilters}
              >
                Clear All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShopPage;