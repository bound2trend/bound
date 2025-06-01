import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Search, ShoppingBag, Heart, User, Menu, X, ChevronDown 
} from 'lucide-react';
import { useCartStore } from '../../store/cartStore';
import { useAuthStore } from '../../store/authStore';
import MiniCart from '../cart/MiniCart';
import MobileMenu from './MobileMenu';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState('');
  
  const location = useLocation();
  const totalItems = useCartStore(state => state.totalItems());
  const user = useAuthStore(state => state.user);
  
  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsCartOpen(false);
  }, [location]);
  
  // Navigation links
  const navLinks = [
    { name: 'Home', path: '/' },
    { 
      name: 'Shop', 
      path: '/shop',
     
      ]
    },
    { name: 'FitRoom', path: '/fitroom' },
    { name: 'FAQ', path: '/faq' },
    { name: 'Contact', path: '/contact' },
  ];
  
  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      isScrolled ? 'header-solid py-2' : 'header-transparent py-4'
    }`}>
      <div className="container-custom">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="font-bold text-2xl">
            BOUND
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => (
              <div key={link.name} className="relative group">
                {link.dropdown ? (
                  <div className="flex items-center">
                    <button 
                      className="text-base font-medium hover:text-primary flex items-center"
                      onClick={() => setIsDropdownOpen(isDropdownOpen === link.name ? '' : link.name)}
                    >
                      {link.name}
                      <ChevronDown size={16} className="ml-1" />
                    </button>
                    
                    {isDropdownOpen === link.name && (
                      <div className="absolute top-full left-0 mt-2 w-48 bg-white shadow-lg rounded-md overflow-hidden z-50">
                        {link.dropdown.map((item) => (
                          <Link 
                            key={item.name} 
                            to={item.path} 
                            className="block px-4 py-2 text-neutral-800 hover:bg-neutral-100 hover:text-primary"
                            onClick={() => setIsDropdownOpen('')}
                          >
                            {item.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link 
                    to={link.path} 
                    className={`text-base font-medium ${
                      location.pathname === link.path ? 'text-primary' : 'hover:text-primary'
                    }`}
                  >
                    {link.name}
                  </Link>
                )}
              </div>
            ))}
          </nav>
          
          {/* Actions */}
          <div className="flex items-center space-x-4">
            <button 
              className="hidden md:block text-neutral-800 hover:text-primary"
              aria-label="Search"
            >
              <Search size={20} />
            </button>
            
            <Link to="/wishlist" className="text-neutral-800 hover:text-primary">
              <Heart size={20} />
            </Link>
            
            <div className="relative">
              <button 
                className="text-neutral-800 hover:text-primary relative"
                onClick={() => setIsCartOpen(!isCartOpen)}
                aria-label="Cart"
              >
                <ShoppingBag size={20} />
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-primary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </button>
              
              {isCartOpen && (
                <MiniCart onClose={() => setIsCartOpen(false)} />
              )}
            </div>
            
            <Link to={user ? '/account' : '/login'} className="text-neutral-800 hover:text-primary">
              <User size={20} />
            </Link>
            
            <button 
              className="md:hidden text-neutral-800 hover:text-primary"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <MobileMenu links={navLinks} onClose={() => setIsMobileMenuOpen(false)} />
      )}
    </header>
  );
};

export default Header;
