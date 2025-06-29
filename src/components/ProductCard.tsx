import React from 'react';
import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';

interface ProductCardProps {
  id: string;
  name: string;
  brand: string;
  image: string;
  price: number;
  originalPrice?: number;
  isNew?: boolean;
  showWishlist?: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({
  id,
  name,
  brand,
  image,
  price,
  originalPrice,
  isNew = false,
  showWishlist = true
}) => {
  return (
    <div className="group relative border border-neutral-200 rounded-lg overflow-hidden bg-white hover:shadow-xl transition duration-300">
      <Link to={`/product/${id}`}>
        <img
          src={image}
          alt={name}
          className="w-full h-[350px] object-cover object-center"
        />
        {isNew && (
          <span className="absolute top-2 left-2 bg-black text-white text-xs px-2 py-0.5 rounded">
            New
          </span>
        )}
      </Link>

      <div className="p-4 space-y-1">
        <h3 className="text-sm text-gray-500">{brand}</h3>
        <Link to={`/product/${id}`} className="block">
          <h2 className="text-md font-semibold text-neutral-900">{name}</h2>
        </Link>

        <div className="flex items-center justify-between">
          <div className="text-md font-semibold text-black">
            ₹{price}
            {originalPrice && originalPrice > price && (
              <span className="line-through text-gray-400 text-sm ml-2">
                ₹{originalPrice}
              </span>
            )}
          </div>

          {showWishlist && (
            <button className="text-gray-600 hover:text-black transition">
              <Heart className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
