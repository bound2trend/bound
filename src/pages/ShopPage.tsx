import React, { useState, useEffect, useRef } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { SlidersHorizontal, X, ChevronDown, Filter, ChevronUp } from 'lucide-react';
import ProductCard from '../components/products/ProductCard';
import { products, categories } from '../data/mockProducts';
import type { Product } from '../types';

const sortOptions = [
  { value: 'featured', label: 'Featured' },
  { value: 'newest', label: 'Newest' },
  { value: 'price-low-high', label: 'Price: Low to High' },
  { value: 'price-high-low', label: 'Price: High to Low' },
  { value: 'trending', label: 'Trending' },
];

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

  // Sort dropdown open state
  const [isSortOpen, setIsSortOpen] = useState(false);
  const sortDropdownRef = useRef<HTMLDivElement>(null);

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

  // Close sort dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (sortDropdownRef.current && !sortDropdownRef.current.contains(event.target as Node)) {
        setIsSortOpen(false);
      }
    };
    if (isSortOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isSortOpen]);

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

  const currentSortLabel = sortOptions.find(opt => opt.value === sortBy)?.label || 'Featured';

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
                    className={`w-8 h-8 rounded-full border ${
                      selectedColors.includes(color)
                        ? 'border-primary ring-2 ring-primary'
                        : 'border-neutral-300'
                    }`}
                    style={{ backgroundColor: colorObj?.value || '#ccc' }}
                    onClick={() => {
                      toggleColor(color);
                      updateQueryParams();
                    }}
                    type="button"
                    aria-pressed={selectedColors.includes(color)}
                    title={color}
                  />
                );
              })}
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-grow">
          {/* Mobile filter + sort bar */}
          <div className="md:hidden flex items-center justify-between mb-4">
            {/* Filters toggle */}
            <button
              className="flex items-center gap-2 text-neutral-900 px-3 py-1.5 border rounded-md"
              onClick={() => setIsFilterOpen(true)}
              type="button"
              aria-label="Open filters"
            >
              <Filter size={18} />
              Filters
            </button>

            {/* Sort dropdown */}
            <div className="relative" ref={sortDropdownRef}>
              <button
                className="flex items-center gap-1 px-3 py-1.5 border rounded-md text-neutral-900"
                onClick={() => setIsSortOpen(open => !open)}
                type="button"
                aria-haspopup="listbox"
                aria-expanded={isSortOpen}
                aria-label="Sort options"
              >
                Sort: {currentSortLabel}
                {isSortOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </button>

              {isSortOpen && (
                <ul
                  className="absolute right-0 mt-1 w-48 bg-white border border-neutral-300 rounded-md shadow-lg z-20"
                  role="listbox"
                  tabIndex={-1}
                >
                  {sortOptions.map(option => (
                    <li
                      key={option.value}
                      role="option"
                      aria-selected={sortBy === option.value}
                      tabIndex={0}
                      className={`cursor-pointer px-4 py-2 hover:bg-primary/20 ${
                        sortBy === option.value ? 'font-semibold text-primary' : ''
                      }`}
                      onClick={() => {
                        setSortBy(option.value);
                        updateQueryParams();
                        setIsSortOpen(false);
                      }}
                      onKeyDown={e => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          setSortBy(option.value);
                          updateQueryParams();
                          setIsSortOpen(false);
                        }
                      }}
                    >
                      {option.label}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          {/* Products grid */}
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <p className="text-center text-neutral-600">No products found matching your filters.</p>
          )}
        </main>
      </div>

      {/* Mobile filter sidebar */}
      {isFilterOpen && (
        <div className="fixed inset-0 z-50 flex">
          <div
            className="fixed inset-0 bg-black/50"
            onClick={() => setIsFilterOpen(false)}
            aria-hidden="true"
          />
          <aside className="relative bg-white w-72 p-6 overflow-auto">
            <button
              className="absolute top-4 right-4 text-neutral-600 hover:text-neutral-900"
              onClick={() => setIsFilterOpen(false)}
              type="button"
              aria-label="Close filters"
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
                      className={`w-8 h-8 rounded-full border ${
                        selectedColors.includes(color)
                          ? 'border-primary ring-2 ring-primary'
                          : 'border-neutral-300'
                      }`}
                      style={{ backgroundColor: colorObj?.value || '#ccc' }}
                      onClick={() => toggleColor(color)}
                      type="button"
                      aria-pressed={selectedColors.includes(color)}
                      title={color}
                    />
                  );
                })}
              </div>
            </div>

            {/* Actions */}
            <div className="mt-6 flex justify-between">
              <button
                className="px-4 py-2 bg-neutral-200 rounded-md text-neutral-700 hover:bg-neutral-300"
                onClick={clearFilters}
                type="button"
              >
                Clear All
              </button>
              <button
                className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark"
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
