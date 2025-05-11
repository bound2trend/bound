import React, { useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import Button from '../common/Button';
import { FitRoomModel, Product } from '../../types';
import { fitRoomModels } from '../../data/mockProducts';

interface FitRoomModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product;
}

const FitRoomModal: React.FC<FitRoomModalProps> = ({ isOpen, onClose, product }) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const [selectedModel, setSelectedModel] = React.useState<FitRoomModel | null>(null);
  const [selectedSize, setSelectedSize] = React.useState(product.sizes[0]);
  const [selectedColor, setSelectedColor] = React.useState(product.colors[0]);
  
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);
  
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    };
    
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);
  
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70">
      <div 
        ref={modalRef}
        className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col"
      >
        <div className="flex items-center justify-between p-4 border-b border-neutral-200">
          <h2 className="text-xl font-semibold">Virtual FitRoom</h2>
          <button 
            onClick={onClose}
            className="text-neutral-500 hover:text-neutral-900"
            aria-label="Close modal"
          >
            <X size={20} />
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
            {/* Left column - Model selection */}
            <div>
              <h3 className="font-medium mb-4">Choose a model with similar build</h3>
              <div className="grid grid-cols-2 gap-4">
                {fitRoomModels.map(model => (
                  <div 
                    key={model.id}
                    className={`border rounded-lg overflow-hidden cursor-pointer transition-all ${
                      selectedModel?.id === model.id ? 'border-primary ring-2 ring-primary/30' : 'border-neutral-200 hover:border-primary'
                    }`}
                    onClick={() => setSelectedModel(model)}
                  >
                    <div className="aspect-[3/4] bg-neutral-100">
                      <img 
                        src={model.image} 
                        alt={model.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-2 text-center">
                      <p className="font-medium text-sm">{model.name}</p>
                      <p className="text-xs text-neutral-500">{model.height}, {model.build}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-6">
                <h3 className="font-medium mb-4">Or upload your photo</h3>
                <div className="border-2 border-dashed border-neutral-300 rounded-lg p-6 text-center">
                  <div className="flex flex-col items-center">
                    <svg 
                      className="w-10 h-10 text-neutral-400 mb-3" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth="2" 
                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                    <p className="text-sm text-neutral-600 mb-2">Drag and drop your photo here, or</p>
                    <Button 
                      variant="outline" 
                      size="sm"
                    >
                      Browse Files
                    </Button>
                    <p className="mt-2 text-xs text-neutral-500">
                      Max file size: 5MB. Supported formats: JPG, PNG
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Right column - Preview */}
            <div>
              <h3 className="font-medium mb-4">Preview</h3>
              {selectedModel ? (
                <div className="border rounded-lg overflow-hidden h-[400px] bg-neutral-100 flex items-center justify-center">
                  <div className="relative">
                    <img 
                      src={selectedModel.image} 
                      alt={selectedModel.name}
                      className="h-full object-contain"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="bg-white/70 p-2 rounded-lg backdrop-blur-sm">
                        <p className="text-center text-sm font-medium">
                          {product.name} - Size {selectedSize}
                        </p>
                        <div className="flex items-center justify-center mt-1">
                          <div 
                            className="w-4 h-4 rounded-full border border-neutral-300"
                            style={{ backgroundColor: selectedColor.value }}
                          ></div>
                          <span className="ml-1 text-xs">{selectedColor.name}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="border rounded-lg overflow-hidden h-[400px] bg-neutral-100 flex items-center justify-center">
                  <p className="text-neutral-500">
                    Select a model to see how this item fits
                  </p>
                </div>
              )}
              
              <div className="mt-4">
                <div className="mb-4">
                  <h4 className="text-sm font-medium mb-2">Size</h4>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map(size => (
                      <button
                        key={size}
                        className={`px-3 py-1 border rounded-md text-sm ${
                          selectedSize === size 
                            ? 'border-primary bg-primary/10 text-primary' 
                            : 'border-neutral-300 text-neutral-700 hover:border-primary'
                        }`}
                        onClick={() => setSelectedSize(size)}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium mb-2">Color</h4>
                  <div className="flex flex-wrap gap-3">
                    {product.colors.map(color => (
                      <button
                        key={color.name}
                        className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          selectedColor.name === color.name ? 'ring-2 ring-primary ring-offset-2' : ''
                        }`}
                        style={{ backgroundColor: color.value }}
                        onClick={() => setSelectedColor(color)}
                        title={color.name}
                      >
                        {selectedColor.name === color.name && (
                          <span className={`text-xs ${
                            color.name === 'White' ? 'text-black' : 'text-white'
                          }`}>✓</span>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="p-4 border-t border-neutral-200 flex justify-end">
          <Button 
            variant="outline"
            className="mr-2"
            onClick={onClose}
          >
            Close
          </Button>
          <Button 
            variant="primary"
            disabled={!selectedModel}
          >
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FitRoomModal;