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
  const [isFilterOpen, setIsFilterOpen] = useState(false); // Filter dropdown on mobile
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 5000]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<string>('featured');

  // Sort dropdown open state
  const [isSortOpen, setIsSortOpen] = useState(false);
  const sortDropdownRef = useRef<HTMLDivElement>(null);

  // Filter dropdown open state & ref (for mobile)
  const filterDropdownRef = useRef<HTMLDivElement>(null);

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

    // Filter by price (price stored in cents)
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

  // Update URL query params whenever filter state changes
  useEffect(() => {
    const searchParams = new URLSearchParams();

    if (sortBy) searchParams.set('sort', sortBy);
    if (selectedSizes.length > 0) searchParams.set('sizes', selectedSizes.join(','));
    if (selectedColors.length > 0) searchParams.set('colors', selectedColors.join(','));
    searchParams.set('minPrice', priceRange[0].toString());
    searchParams.set('maxPrice', priceRange[1].toString());

    navigate({ search: searchParams.toString() }, { replace: true });
  }, [sortBy, selectedSizes, selectedColors, priceRange, navigate]);

  // Toggle handlers
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

  // Clear filters
  const clearFilters = () => {
    setSelectedSizes([]);
    setSelectedColors([]);
    setPriceRange([0, 5000]);
    setSortBy('featured');
    navigate({ search: '' }, { replace: true });
  };

  // Close sort dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (sortDropdownRef.current && !sortDropdownRef.current.contains(event.target as Node)) {
        setIsSortOpen(false);
      }
      if (filterDropdownRef.current && !filterDropdownRef.current.contains(event.target as Node)) {
        setIsFilterOpen(false);
      }
    };
    if (isSortOpen || isFilterOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isSortOpen, isFilterOpen]);

  // Page title logic
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
        {/* Filter Sidebar - desktop */}
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
              max={priceRange[1]}
              step={100}
              value={priceRange[0]}
              onChange={e => {
                const val = Number(e.target.value);
                if (val <= priceRange[1]) setPriceRange([val, priceRange[1]]);
              }}
              className="w-full mb-2"
            />
            <input
              type="range"
              min={priceRange[0]}
              max={5000}
              step={100}
              value={priceRange[1]}
              onChange={e => {
                const val = Number(e.target.value);
                if (val >= priceRange[0]) setPriceRange([priceRange[0], val]);
              }}
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
                      ? 'border-primary bg-primary/10 text-primary font-semibold'
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
          <div className="mb-6">
            <h3 className="text-sm font-medium mb-2">Colors</h3>
            <div className="flex flex-wrap gap-2">
              {allColors.map(color => (
                <button
                  key={color}
                  className={`w-8 h-8 rounded-full border ${
                    selectedColors.includes(color)
                      ? 'border-primary'
                      : 'border-neutral-300'
                  }`}
                  style={{ backgroundColor: color }}
                  onClick={() => toggleColor(color)}
                  type="button"
                  aria-pressed={selectedColors.includes(color)}
                  title={color}
                />
              ))}
            </div>
          </div>

          <button
            onClick={clearFilters}
            className="text-sm text-primary underline mt-4"
            type="button"
          >
            Clear All Filters
          </button>
        </aside>

        {/* Main content */}
        <main className="flex-1">
          {/* Toolbar: sort and mobile filters */}
          <div className="mb-6 flex justify-between items-center">
            {/* Filter button - mobile only */}
            <div className="relative md:hidden" ref={filterDropdownRef}>
              <button
                className="flex items-center gap-2 text-neutral-700 font-semibold"
                onClick={() => setIsFilterOpen(prev => !prev)}
                aria-label="Toggle Filters"
                aria-expanded={isFilterOpen}
              >
                <Filter size={20} />
                Filters
                {isFilterOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </button>

              {isFilterOpen && (
                <div className="absolute top-full mt-2 right-0 w-72 bg-white border border-neutral-300 rounded-md shadow-lg p-4 z-50">
                  {/* Filters content */}
                  <div className="mb-4">
                    <h3 className="text-sm font-medium mb-2">Price Range (₹)</h3>
                    <div className="flex justify-between text-xs text-neutral-600 mb-2">
                      <span>{priceRange[0]}</span>
                      <span>{priceRange[1]}</span>
                    </div>
                    <input
                      type="range"
                      min={0}
                      max={priceRange[1]}
                      step={100}
                      value={priceRange[0]}
                      onChange={e => {
                        const val = Number(e.target.value);
                        if (val <= priceRange[1]) setPriceRange([val, priceRange[1]]);
                      }}
                      className="w-full mb-2"
                    />
                    <input
                      type="range"
                      min={priceRange[0]}
                      max={5000}
                      step={100}
                      value={priceRange[1]}
                      onChange={e => {
                        const val = Number(e.target.value);
                        if (val >= priceRange[0]) setPriceRange([priceRange[0], val]);
                      }}
                      className="w-full"
                    />
                  </div>

                  {/* Sizes */}
                  <div className="mb-4">
                    <h3 className="text-sm font-medium mb-2">Sizes</h3>
                    <div className="flex flex-wrap gap-2">
                      {allSizes.map(size => (
                        <button
                          key={size}
                          className={`px-3 py-1 border rounded-md text-sm ${
                            selectedSizes.includes(size)
                              ? 'border-primary bg-primary/10 text-primary font-semibold'
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
                  <div className="mb-4">
                    <h3 className="text-sm font-medium mb-2">Colors</h3>
                    <div className="flex flex-wrap gap-2">
                      {allColors.map(color => (
                        <button
                          key={color}
                          className={`w-8 h-8 rounded-full border ${
                            selectedColors.includes(color)
                              ? 'border-primary'
                              : 'border-neutral-300'
                          }`}
                          style={{ backgroundColor: color }}
                          onClick={() => toggleColor(color)}
                          type="button"
                          aria-pressed={selectedColors.includes(color)}
                          title={color}
                        />
                      ))}
                    </div>
                  </div>

                  <div className="flex justify-between mt-4">
                    <button
                      onClick={clearFilters}
                      className="text-sm text-primary underline"
                      type="button"
                    >
                      Clear
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Sort dropdown */}
            <div className="relative" ref={sortDropdownRef}>
              <button
                onClick={() => setIsSortOpen(prev => !prev)}
                className="flex items-center gap-2 bg-white border border-neutral-300 rounded-md px-3 py-2 text-sm font-medium text-neutral-700 hover:bg-neutral-100"
                aria-haspopup="listbox"
                aria-expanded={isSortOpen}
              >
                Sort: {currentSortLabel}
                {isSortOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </button>
              {isSortOpen && (
                <ul
                  role="listbox"
                  aria-label="Sort options"
                  className="absolute right-0 mt-1 w-48 bg-white border border-neutral-300 rounded-md shadow-lg z-20"
                >
                  {sortOptions.map(option => (
                    <li
                      key={option.value}
                      role="option"
                      aria-selected={sortBy === option.value}
                      onClick={() => {
                        setSortBy(option.value);
                        setIsSortOpen(false);
                      }}
                      className={`cursor-pointer px-4 py-2 text-sm hover:bg-primary hover:text-white ${
                        sortBy === option.value ? 'font-semibold bg-primary text-white' : ''
                      }`}
                    >
                      {option.label}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          {/* Product grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.length > 0 ? (
              filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))
            ) : (
              <p className="text-center col-span-full text-neutral-500 mt-16">
                No products found.
              </p>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default ShopPage;
