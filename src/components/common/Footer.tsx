import React from 'react';
import {
  FaInstagram,
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
} from 'react-icons/fa';

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#0B1E3D] text-white py-10 mt-20">
      <div className="container-custom grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* About */}
        <div>
          <h3 className="text-lg font-semibold mb-4">About BoundMenswear</h3>
          <p className="text-sm text-gray-300 leading-relaxed">
            BoundMenswear is your destination for premium menswear combining timeless style and modern trends. Shop confidently with quality guaranteed.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="/about" className="hover:underline">About Us</a></li>
            <li><a href="/contact" className="hover:underline">Contact</a></li>
            <li><a href="/faq" className="hover:underline">FAQ</a></li>
            <li><a href="/returns" className="hover:underline">Return Policy</a></li>
            <li><a href="/privacy" className="hover:underline">Privacy Policy</a></li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
          <div className="flex space-x-5 text-xl">
            <a
              href="https://instagram.com/yourhandle"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="hover:text-[#f0f0f0]"
            >
              <FaInstagram />
            </a>
            <a
              href="https://facebook.com/yourhandle"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="hover:text-[#f0f0f0]"
            >
              <FaFacebookF />
            </a>
            <a
              href="https://twitter.com/yourhandle"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Twitter"
              className="hover:text-[#f0f0f0]"
            >
              <FaTwitter />
            </a>
            <a
              href="https://linkedin.com/company/yourhandle"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="hover:text-[#f0f0f0]"
            >
              <FaLinkedinIn />
            </a>
          </div>
        </div>
      </div>

      <div className="mt-10 text-center text-gray-400 text-xs">
        &copy; {new Date().getFullYear()} BoundMenswear. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
