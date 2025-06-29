import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

const mockSearchSuggestions = [
  'Shirts',
  'Jeans',
  'Cargo Pants',
  'T-Shirts',
];

const Header: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (searchTerm.trim().length === 0) {
      setSuggestions([]);
      return;
    }
    // Simple filter to mock AI autosuggest
    const filtered = mockSearchSuggestions.filter(item =>
      item.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSuggestions(filtered);
  }, [searchTerm]);

  useEffect(() => {
    // Close suggestions on outside click
    function handleClickOutside(event: MouseEvent) {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="bg-[#f9f9f6] border-b border-gray-300 sticky top-0 z-50">
      <div className="container-custom flex flex-wrap items-center justify-between py-4">
        <Link to="/" className="text-2xl font-bold text-[#0B1E3D]">
          BoundMenswear
        </Link>

        {/* Navigation */}
        <nav className="hidden md:flex space-x-6 font-medium text-[#0B1E3D]">
          <Link to="/shop/new-arrivals" className="hover:text-[#1E40AF]">New Arrivals</Link>
          <Link to="/shop/suits" className="hover:text-[#1E40AF]">Suits</Link>
          <Link to="/shop/shirts" className="hover:text-[#1E40AF]">Shirts</Link>
          <Link to="/shop/trousers" className="hover:text-[#1E40AF]">Trousers</Link>
          <Link to="/shop/accessories" className="hover:text-[#1E40AF]">Accessories</Link>
          <Link to="/shop/sale" className="hover:text-[#1E40AF]">Sale</Link>
        </nav>

        {/* Search Bar */}
        <div className="relative w-full max-w-xs md:max-w-sm" ref={wrapperRef}>
          <input
            type="text"
            placeholder="Search products..."
            className="w-full border border-gray-400 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#0B1E3D]"
            value={searchTerm}
            onChange={e => {
              setSearchTerm(e.target.value);
              setShowSuggestions(true);
            }}
            onFocus={() => setShowSuggestions(true)}
          />
          {showSuggestions && suggestions.length > 0 && (
            <ul className="absolute z-50 bg-white border border-gray-300 w-full mt-1 rounded-md max-h-48 overflow-y-auto shadow-lg">
              {suggestions.map((s, idx) => (
                <li
                  key={idx}
                  className="px-3 py-2 hover:bg-[#0B1E3D] hover:text-white cursor-pointer"
                  onMouseDown={() => {
                    setSearchTerm(s);
                    setShowSuggestions(false);
                    // Add your redirect logic here if needed
                  }}
                >
                  {s}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
