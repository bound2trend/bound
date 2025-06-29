import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Instagram, Twitter, Facebook, Youtube, Mail, Phone, MapPin 
} from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-neutral-900 text-white pt-16 pb-8">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-bold mb-4">BOUND</h3>
            <p className="text-neutral-400 mb-6">
              Fashion-forward menswear for the bold and confident. Elevate your style with our cutting-edge designs.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-white hover:text-primary" aria-label="Instagram">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-white hover:text-primary" aria-label="Twitter">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-white hover:text-primary" aria-label="Facebook">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-white hover:text-primary" aria-label="Youtube">
                <Youtube size={20} />
              </a>
            </div>
          </div>
          
          {/* Shop */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Shop</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/shop/new-arrivals" className="text-neutral-400 hover:text-primary">
                  New Arrivals
                </Link>
              </li>
              <li>
                <Link to="/shop/bestsellers" className="text-neutral-400 hover:text-primary">
                  Bestsellers
                </Link>
              </li>
              <li>
                <Link to="/shop/category/tees" className="text-neutral-400 hover:text-primary">
                  Tees
                </Link>
              </li>
              <li>
                <Link to="/shop/category/bottoms" className="text-neutral-400 hover:text-primary">
                  Bottoms
                </Link>
              </li>
              <li>
                <Link to="/shop/category/outerwear" className="text-neutral-400 hover:text-primary">
                  Outerwear
                </Link>
              </li>
              <li>
                <Link to="/shop/category/hoodies" className="text-neutral-400 hover:text-primary">
                  Hoodies
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Information */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Information</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/about-us" className="text-neutral-400 hover:text-primary">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-neutral-400 hover:text-primary">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/shipping-returns" className="text-neutral-400 hover:text-primary">
                  Shipping & Returns
                </Link>
              </li>
              <li>
                <Link to="/privacy-policy" className="text-neutral-400 hover:text-primary">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms-conditions" className="text-neutral-400 hover:text-primary">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-neutral-400 hover:text-primary">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin size={20} className="text-primary mr-2 mt-1 flex-shrink-0" />
                <span className="text-neutral-400">
                  123 Fashion Street, Trendy City, TC 12345
                </span>
              </li>
              <li className="flex items-center">
                <Phone size={20} className="text-primary mr-2 flex-shrink-0" />
                <a href="tel:+1234567890" className="text-neutral-400 hover:text-primary">
                  +1 (234) 567-890
                </a>
              </li>
              <li className="flex items-center">
                <Mail size={20} className="text-primary mr-2 flex-shrink-0" />
                <a href="mailto:hello@boundfashion.com" className="text-neutral-400 hover:text-primary">
                  hello@boundfashion.com
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-neutral-800 flex flex-col md:flex-row justify-between items-center">
          <p className="text-neutral-500 text-sm mb-4 md:mb-0">
            © {new Date().getFullYear()} Bound. All rights reserved.
          </p>
          <div className="flex items-center space-x-6">
            <img src="https://via.placeholder.com/40x25" alt="Visa" className="h-6" />
            <img src="https://via.placeholder.com/40x25" alt="Mastercard" className="h-6" />
            <img src="https://via.placeholder.com/40x25" alt="PayPal" className="h-6" />
            <img src="https://via.placeholder.com/40x25" alt="Apple Pay" className="h-6" />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
