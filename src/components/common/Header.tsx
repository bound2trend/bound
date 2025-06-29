import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Search, ShoppingBag, Heart, User, Menu, X 
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
    setIsDropdownOpen('');
  }, [location]);
  
  // Navigation links - Shop is now a simple link, no dropdown
  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Shop', path: '/shop' }, // No dropdown here
    { 
      name: 'FitRoom', 
      path: '/fitroom',
      // No dropdown here but could add if needed
    },
    { 
      name: 'FAQ', 
      path: '/faq',
      // No dropdown here
    },
    { 
      name: 'Contact', 
      path: '/contact',
      // No dropdown here
    },
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
              <div key={link.name}>
                <Link 
                  to={link.path} 
                  className={`text-base font-medium ${
                    location.pathname === link.path ? 'text-primary' : 'hover:text-primary'
                  }`}
                >
                  {link.name}
                </Link>
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
