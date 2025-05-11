import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

interface NavLink {
  name: string;
  path: string;
  dropdown?: Array<{
    name: string;
    path: string;
  }>;
}

interface MobileMenuProps {
  links: NavLink[];
  onClose: () => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ links, onClose }) => {
  const location = useLocation();
  const [openSubmenu, setOpenSubmenu] = React.useState<string | null>(null);
  
  const toggleSubmenu = (linkName: string) => {
    setOpenSubmenu(openSubmenu === linkName ? null : linkName);
  };
  
  return (
    <div className="absolute top-full left-0 w-full bg-white shadow-lg py-4 z-50 animate-fade-in">
      <div className="container-custom">
        <ul className="space-y-4">
          {links.map((link) => (
            <li key={link.name} className="border-b border-neutral-100 pb-3">
              {link.dropdown ? (
                <div>
                  <button 
                    className={`flex items-center justify-between w-full text-base font-medium ${
                      location.pathname.includes(link.path) ? 'text-primary' : ''
                    }`}
                    onClick={() => toggleSubmenu(link.name)}
                  >
                    {link.name}
                    <ChevronRight 
                      size={16} 
                      className={`transition-transform ${openSubmenu === link.name ? 'rotate-90' : ''}`} 
                    />
                  </button>
                  
                  {openSubmenu === link.name && (
                    <ul className="pl-4 mt-2 space-y-2">
                      {link.dropdown.map((item) => (
                        <li key={item.name}>
                          <Link 
                            to={item.path} 
                            className={`block text-sm ${
                              location.pathname === item.path ? 'text-primary' : 'text-neutral-600'
                            }`}
                            onClick={onClose}
                          >
                            {item.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ) : (
                <Link 
                  to={link.path} 
                  className={`block text-base font-medium ${
                    location.pathname === link.path ? 'text-primary' : ''
                  }`}
                  onClick={onClose}
                >
                  {link.name}
                </Link>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MobileMenu;