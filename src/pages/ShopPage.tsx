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

  // State
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false); // For mobile sidebar
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 5000]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<string>('featured');

  // All available sizes and colors from products
  const allSizes = Array.from(new Set(products.flatMap(p => p.sizes)));
  const allColors = Array.from(new Set(products.flatMap(p => p.colors.map(c => c.name))));

  // Sync filters from URL query params on mount and location change
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);

    const sort = searchParams.get('sort') || 'featured';
    const sizes = searchParams.get('sizes')?.split(',').filter(Boolean) || [];
    const colors = searchParams.get('colors')?.split(',').filter(Boolean) || [];
    const minPrice = parseInt(searchParams.get('minPrice') || '0', 10);
    const maxPrice = parseInt(searchParams.get('maxPrice') || '5000', 10);

    setSortBy(sort);
    setSelectedSizes(sizes);
    setSelectedColors(colors);
    setPriceRange([minPrice, maxPrice]);
  }, [location.search]);

  // Filter and sort products whenever filters or params change
  useEffect(() => {
    let filtered = [...products];

    // Filter by category
    if (category) filtered = filtered.filter(p => p.category === category);

    // Filter by collection
    if (collection) filtered = filtered.filter(p => p.collections.includes(collection));

    // Filter by size (if any size selected)
    if (selectedSizes.length > 0) {
      filtered = filtered.filter(p =>
        selectedSizes.some(size => p.sizes.includes(size))
      );
    }

    // Filter by color (if any color selected)
    if (selectedColors.length > 0) {
      filtered = filtered.filter(p =>
        selectedColors.some(color =>
          p.colors.some(c => c.name === color)
        )
      );
    }

    // Filter by price (price is stored in cents)
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
        filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
      case 'trending':
        filtered = filtered.filter(p => p.trending).concat(filtered.filter(p => !p.trending));
        break;
      case 'featured':
      default:
        filtered = filtered.filter(p => p.featured).concat(filtered.filter(p => !p.featured));
        break;
    }

    setFilteredProducts(filtered);
  }, [category, collection, selectedSizes, selectedColors, priceRange, sortBy]);

  // Update URL query params to reflect filters
  const updateQueryParams = () => {
    const searchParams = new URLSearchParams();

    if (sortBy) searchParams.set('sort', sortBy);
    if (selectedSizes.length > 0) searchParams.set('sizes', selectedSizes.join(','));
    if (selectedColors.length > 0) searchParams.set('colors', selectedColors.join(','));
    searchParams.set('minPrice', priceRange[0].toString());
    searchParams.set('maxPrice', priceRange[1].toString());

    navigate({ search: searchParams.toString() });
  };

  // Handlers to toggle filters
  const toggleSize = (size: string) => {
    setSelectedSizes(prev =>
      prev.includes(size) ? prev.filter(s => s !== size) : [...prev, size]
    );
  };

  const toggleColor = (color: string) => {
    setSelectedColors(prev =>
      prev.includes(color) ? prev.filter(c => c !== color) : [...prev, color]
    );
  };

  // Clear all filters and reset URL
  const clearFilters = () => {
    setSelectedSizes([]);
    setSelectedColors([]);
    setPriceRange([0, 5000]);
    setSortBy('featured');
    navigate({ search: '' });
  };

  // Apply filters (used in mobile sidebar)
  const applyFilters = () => {
    updateQueryParams();
    setIsFilterOpen(false);
  };

  // Page title based on category or collection
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
    <div className="min-h-screen pt-20 bg-neutral-50">
      {/* Header */}
      <div className="bg-neutral-950 text-white py-12">
        <div className="container-custom">
          <h1 className="text-3xl md:text-4xl font-bold">{getPageTitle()}</h1>
          <p className="text-neutral-400 mt-2">
            {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'}
          </p>
        </div>
      </div>

      <div className="container-custom flex gap-8 py-8">
        {/* Filter Sidebar - desktop only */}
        <aside className="hidden md:block sticky top-24 h-[calc(100vh-6rem)] w-64 flex-shrink-0 overflow-auto bg-white border border-neutral-200 rounded-md p-6">
          <h2 className="text-lg font-semibold mb-6">Filters</h2>

          {/* Price Range */}
          <div className="mb-6">
            <h3 className="text-sm font-medium mb-2">Price Range (₹)</h3>
            <div className="flex justify-between text-xs text-neutral-600 mb-2">
              <span>{priceRange[0]}</span>
              <span>{priceRange[1]}</span>
            </div>
            <input
              type="range"
              min={0}
              max={5000}
              step={100}
              value={priceRange[1]}
              onChange={e => setPriceRange([priceRange[0], Number(e.target.value)])}
              className="w-full"
            />
          </div>

          {/* Sizes */}
          <div className="mb-6">
            <h3 className="text-sm font-medium mb-2">Sizes</h3>
            <div className="flex flex-wrap gap-2">
              {allSizes.map(size => (
                <button
                  key={size}
                  className={`px-3 py-1 border rounded-md text-sm ${
                    selectedSizes.includes(size)
                      ? 'border-primary bg-primary/10 text-primary'
                      : 'border-neutral-300 text-neutral-700'
                  }`}
                  onClick={() => {
                    toggleSize(size);
                    updateQueryParams();
                  }}
                  type="button"
                  aria-pressed={selectedSizes.includes(size)}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Colors */}
          <div>
            <h3 className="text-sm font-medium mb-2">Colors</h3>
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
                    onClick={() => {
                      toggleColor(color);
                      updateQueryParams();
                    }}
                    type="button"
                    aria-pressed={selectedColors.includes(color)}
                  >
                    {colorObj && (
                      <span
                        className="inline-block w-4 h-4 rounded-full mr-2 border border-neutral-300"
                        style={{ backgroundColor: colorObj.value }}
                        aria-label={color}
                      />
                    )}
                    {color}
                  </button>
                );
              })}
            </div>
          </div>

          <button
            className="mt-6 w-full bg-neutral-100 text-neutral-800 py-2 rounded-md font-medium text-sm hover:bg-neutral-200"
            onClick={clearFilters}
            type="button"
          >
            Clear All
          </button>
        </aside>

        {/* Main Content */}
        <main className="flex-1">
          {/* Filters and Sort bar - mobile */}
          <div className="flex items-center justify-between mb-6 md:hidden">
            <button
              className="flex items-center text-sm font-medium px-3 py-2 border border-neutral-300 rounded-md"
              onClick={() => setIsFilterOpen(true)}
              aria-label="Open filters"
            >
              <Filter size={16} className="mr-2" />
              Filter
              {(selectedSizes.length > 0 || selectedColors.length > 0) &&
                ` (${selectedSizes.length + selectedColors.length})`}
            </button>

            <div className="relative w-44">
              <select
                className="appearance-none bg-white border border-neutral-300 rounded-md pl-4 pr-10 py-2 text-sm w-full focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
                value={sortBy}
                onChange={e => {
                  setSortBy(e.target.value);
                  updateQueryParams();
                }}
                aria-label="Sort products"
              >
                <option value="featured">Featured</option>
                <option value="newest">Newest</option>
                <option value="price-low-high">Price: Low to High</option>
                <option value="price-high-low">Price: High to Low</option>
                <option value="trending">Trending</option>
              </select>
              <ChevronDown
                size={16}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none text-neutral-500"
              />
            </div>
          </div>

          {/* Applied filters badges */}
          {(selectedSizes.length > 0 || selectedColors.length > 0) && (
            <div className="flex flex-wrap gap-2 mb-6">
              {selectedSizes.map(size => (
                <div
                  key={size}
                  className="inline-flex items-center bg-neutral-100 text-xs rounded-full px-3 py-1"
                >
                  {size}
                  <button
                    className="ml-1 text-neutral-500"
                    onClick={() => {
                      toggleSize(size);
                      updateQueryParams();
                    }}
                    aria-label={`Remove size filter ${size}`}
                    type="button"
                  >
                    <X size={12} />
                  </button>
                </div>
              ))}

              {selectedColors.map(color => (
                <div
                  key={color}
                  className="inline-flex items-center bg-neutral-100 text-xs rounded-full px-3 py-1"
                >
                  {color}
                  <button
                    className="ml-1 text-neutral-500"
                    onClick={() => {
                      toggleColor(color);
                      updateQueryParams();
                    }}
                    aria-label={`Remove color filter ${color}`}
                    type="button"
                  >
                    <X size={12} />
                  </button>
                </div>
              ))}

              <button
                className="ml-2 text-sm text-primary underline underline-offset-2"
                onClick={clearFilters}
                type="button"
              >
                Clear All
              </button>
            </div>
          )}

          {/* Products grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.length > 0 ? (
              filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))
            ) : (
              <p className="col-span-full text-center text-neutral-600">
                No products found matching your filters.
              </p>
            )}
          </div>
        </main>
      </div>

      {/* Mobile filter sidebar drawer */}
      {isFilterOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-50 flex"
          role="dialog"
          aria-modal="true"
        >
          <aside className="relative bg-white w-80 max-w-full h-full p-6 overflow-auto">
            <button
              className="absolute top-4 right-4 text-neutral-500 hover:text-neutral-700"
              onClick={() => setIsFilterOpen(false)}
              aria-label="Close filters"
              type="button"
            >
              <X size={24} />
            </button>

            <h2 className="text-lg font-semibold mb-6">Filters</h2>

            {/* Price Range */}
            <div className="mb-6">
              <h3 className="text-sm font-medium mb-2">Price Range (₹)</h3>
              <div className="flex justify-between text-xs text-neutral-600 mb-2">
                <span>{priceRange[0]}</span>
                <span>{priceRange[1]}</span>
              </div>
              <input
                type="range"
                min={0}
                max={5000}
                step={100}
                value={priceRange[1]}
                onChange={e => setPriceRange([priceRange[0], Number(e.target.value)])}
                className="w-full"
              />
            </div>

            {/* Sizes */}
            <div className="mb-6">
              <h3 className="text-sm font-medium mb-2">Sizes</h3>
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
                    type="button"
                    aria-pressed={selectedSizes.includes(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Colors */}
            <div>
              <h3 className="text-sm font-medium mb-2">Colors</h3>
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
                      type="button"
                      aria-pressed={selectedColors.includes(color)}
                    >
                      {colorObj && (
                        <span
                          className="inline-block w-4 h-4 rounded-full mr-2 border border-neutral-300"
                          style={{ backgroundColor: colorObj.value }}
                          aria-label={color}
                        />
                      )}
                      {color}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="mt-6 flex justify-between items-center">
              <button
                className="text-sm underline underline-offset-2 text-neutral-600"
                onClick={clearFilters}
                type="button"
              >
                Clear All
              </button>
              <button
                className="bg-primary text-white px-4 py-2 rounded-md text-sm font-semibold"
                onClick={applyFilters}
                type="button"
              >
                Apply
              </button>
            </div>
          </aside>
        </div>
      )}
    </div>
  );
};

export default ShopPage;
