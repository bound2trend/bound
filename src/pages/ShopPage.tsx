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

  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false); // for both desktop & mobile
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 5000]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<string>('featured');
  const [isSortOpen, setIsSortOpen] = useState(false);

  const sortDropdownRef = useRef<HTMLDivElement>(null);

  const allSizes = Array.from(new Set(products.flatMap(p => p.sizes)));
  const allColors = Array.from(new Set(products.flatMap(p => p.colors.map(c => c.name))));

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

  useEffect(() => {
    let filtered = [...products];

    if (category) filtered = filtered.filter(p => p.category === category);
    if (collection) filtered = filtered.filter(p => p.collections.includes(collection));
    if (selectedSizes.length > 0) filtered = filtered.filter(p => selectedSizes.some(s => p.sizes.includes(s)));
    if (selectedColors.length > 0) filtered = filtered.filter(p => selectedColors.some(c => p.colors.some(pc => pc.name === c)));
    filtered = filtered.filter(p => p.price >= priceRange[0] * 100 && p.price <= priceRange[1] * 100);

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

  useEffect(() => {
    const searchParams = new URLSearchParams();

    if (sortBy) searchParams.set('sort', sortBy);
    if (selectedSizes.length > 0) searchParams.set('sizes', selectedSizes.join(','));
    if (selectedColors.length > 0) searchParams.set('colors', selectedColors.join(','));
    searchParams.set('minPrice', priceRange[0].toString());
    searchParams.set('maxPrice', priceRange[1].toString());

    navigate({ search: searchParams.toString() }, { replace: true });
  }, [sortBy, selectedSizes, selectedColors, priceRange, navigate]);

  const toggleSize = (size: string) => {
    setSelectedSizes(prev => (prev.includes(size) ? prev.filter(s => s !== size) : [...prev, size]));
  };

  const toggleColor = (color: string) => {
    setSelectedColors(prev => (prev.includes(color) ? prev.filter(c => c !== color) : [...prev, color]));
  };

  const clearFilters = () => {
    setSelectedSizes([]);
    setSelectedColors([]);
    setPriceRange([0, 5000]);
    setSortBy('featured');
    navigate({ search: '' }, { replace: true });
  };

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

  const getPageTitle = () => {
    if (category) {
      const catObj = categories.find(c => c.slug === category);
      return catObj ? catObj.name : 'Shop';
    }
    if (collection === 'new-arrivals') return 'New Arrivals';
    if (collection === 'bestsellers') return 'Bestsellers';
    return 'All Products';
  };

  const currentSortLabel = sortOptions.find(opt => opt.value === sortBy)?.label || 'Featured';

  return (
    <div className="min-h-screen pt-20 bg-neutral-50">
      <div className="bg-neutral-950 text-white py-12">
        <div className="container-custom">
          <h1 className="text-3xl md:text-4xl font-bold">{getPageTitle()}</h1>
          <p className="text-neutral-400 mt-2">{filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'}</p>
        </div>
      </div>

      <div className="container-custom py-8">
        {/* Controls bar */}
        <div className="flex items-center justify-between mb-6">
          <button
            type="button"
            onClick={() => setIsFilterOpen(true)}
            className="flex items-center gap-2 px-3 py-2 border border-neutral-300 rounded hover:border-neutral-600"
            aria-label="Toggle filters"
          >
            <Filter size={18} />
            Filters
          </button>

          {/* Sort dropdown */}
          <div className="relative" ref={sortDropdownRef}>
            <button
              type="button"
              onClick={() => setIsSortOpen(!isSortOpen)}
              className="flex items-center gap-2 px-3 py-2 border border-neutral-300 rounded hover:border-neutral-600"
              aria-haspopup="listbox"
              aria-expanded={isSortOpen}
            >
              Sort: {currentSortLabel}
              {isSortOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </button>

            {isSortOpen && (
              <ul
                role="listbox"
                tabIndex={-1}
                className="absolute z-10 mt-1 w-48 bg-white border border-neutral-300 rounded shadow-lg"
              >
                {sortOptions.map(option => (
                  <li
                    key={option.value}
                    role="option"
                    aria-selected={sortBy === option.value}
                    className={`px-4 py-2 cursor-pointer hover:bg-neutral-100 ${
                      sortBy === option.value ? 'font-semibold' : ''
                    }`}
                    onClick={() => {
                      setSortBy(option.value);
                      setIsSortOpen(false);
                    }}
                    onKeyDown={e => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        setSortBy(option.value);
                        setIsSortOpen(false);
                      }
                    }}
                    tabIndex={0}
                  >
                    {option.label}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* Filter sidebar overlay (desktop & mobile) */}
        {isFilterOpen && (
          <div className="fixed inset-0 z-50 flex">
            <div
              className="fixed inset-0 bg-black bg-opacity-40"
              onClick={() => setIsFilterOpen(false)}
              aria-hidden="true"
            />

            <aside className="relative w-72 bg-white p-6 overflow-auto border border-neutral-200 rounded-r-md max-w-full">
              <button
                type="button"
                onClick={() => setIsFilterOpen(false)}
                className="absolute top-4 right-4 text-neutral-600 hover:text-neutral-900"
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
                      className={`px-3 py-1 border rounded text-sm ${
                        selectedSizes.includes(size)
                          ? 'bg-neutral-900 text-white border-neutral-900'
                          : 'border-neutral-300 text-neutral-800 hover:border-neutral-900 hover:text-neutral-900'
                      }`}
                      onClick={() => toggleSize(size)}
                      type="button"
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
                      className={`w-6 h-6 rounded-full border ${
                        selectedColors.includes(color)
                          ? 'border-black'
                          : 'border-neutral-300 hover:border-black'
                      }`}
                      style={{ backgroundColor: color.toLowerCase() }}
                      onClick={() => toggleColor(color)}
                      type="button"
                      aria-label={color}
                    />
                  ))}
                </div>
              </div>

              <button
                onClick={() => {
                  clearFilters();
                  setIsFilterOpen(false);
                }}
                className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                type="button"
              >
                Clear Filters
              </button>
            </aside>
          </div>
        )}

        {/* Products Grid */}
        {filteredProducts.length === 0 ? (
          <p>No products found matching filters.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ShopPage;
