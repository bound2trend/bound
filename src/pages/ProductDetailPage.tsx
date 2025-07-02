import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { mockProducts } from '../data/mockProducts'; // replace with Firebase fetch later
import ProductCard from '../components/ProductCard';
import { Loader, Star, Heart, Share2 } from 'lucide-react';

interface Review {
  id: string;
  user: string;
  rating: number;
  comment: string;
  date: string;
}

const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [showSizeGuide, setShowSizeGuide] = useState(false);
  const [faqOpenIndex, setFaqOpenIndex] = useState<number | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      // TODO: replace with Firebase fetch by id
      const found = mockProducts.find(p => p.id === id);
      setProduct(found || null);
      // mock reviews
      setReviews([
        { id: 'r1', user: 'John Doe', rating: 5, comment: 'Great quality!', date: '2024-05-01' },
        { id: 'r2', user: 'Jane Smith', rating: 4, comment: 'Fits perfectly.', date: '2024-04-15' }
      ]);
      setLoading(false);
      if (found) {
        setSelectedSize(found.sizes?.[0] || null);
        setSelectedColor(found.colors?.[0] || null);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader className="animate-spin w-6 h-6" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p>Product not found.</p>
      </div>
    );
  }

  // Helpers
  const getAverageRating = () => {
    if (reviews.length === 0) return 0;
    const total = reviews.reduce((acc, r) => acc + r.rating, 0);
    return total / reviews.length;
  };

  const getProductAge = (createdAt: string) => {
    const createdDate = new Date(createdAt);
    const now = new Date();
    const diffDays = Math.floor((now.getTime() - createdDate.getTime()) / (1000 * 60 * 60 * 24));
    return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
  };

  // FAQ data (accordion)
  const faqItems = [
    {
      question: 'What is the return policy?',
      answer: 'You can return items within 30 days of receipt in original condition.'
    },
    {
      question: 'How do I know what size fits me?',
      answer: 'Refer to our Size Guide or use our AI-powered size recommendation on the product page.'
    },
    {
      question: 'Do you offer express shipping?',
      answer: 'Yes, express shipping is available at checkout for an additional fee.'
    }
  ];

  // Dummy related products (first 4 different from current)
  const relatedProducts = mockProducts.filter(p => p.id !== product.id).slice(0, 4);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="text-sm mb-4 text-gray-600" aria-label="Breadcrumb">
        <ol className="list-reset flex">
          <li><a href="/shop" className="hover:underline">Shop</a></li>
          <li><span className="mx-2">/</span></li>
          <li aria-current="page" className="text-gray-900 font-semibold">{product.name}</li>
        </ol>
      </nav>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Images */}
        <div>
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-[450px] object-cover rounded-lg shadow-md"
          />
          {/* TODO: Add image gallery, zoom, video */}
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <h1 className="text-4xl font-bold">{product.name}</h1>
          <p className="text-gray-500 uppercase tracking-wide font-semibold">{product.brand}</p>
          <p className="text-sm text-gray-400">Added: {getProductAge(product.createdAt)}</p>

          {/* Price */}
          <div className="text-3xl font-extrabold text-black">
            ₹{product.price.toLocaleString()}
            {product.originalPrice && product.originalPrice > product.price && (
              <span className="line-through text-gray-400 text-lg ml-3">₹{product.originalPrice.toLocaleString()}</span>
            )}
          </div>

          {/* Rating */}
          <div className="flex items-center space-x-2">
            {[1,2,3,4,5].map(star => (
              <Star
                key={star}
                className={`w-5 h-5 ${star <= Math.round(getAverageRating()) ? 'text-yellow-400' : 'text-gray-300'}`}
              />
            ))}
            <span className="text-sm text-gray-600">({reviews.length} reviews)</span>
          </div>

          {/* Color selector */}
          {product.colors?.length > 0 && (
            <div>
              <h3 className="font-semibold mb-1">Color</h3>
              <div className="flex space-x-3">
                {product.colors.map((color: string) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`w-8 h-8 rounded-full border-2 focus:outline-none ${selectedColor === color ? 'border-black' : 'border-gray-300'}`}
                    style={{ backgroundColor: color }}
                    aria-label={`Select color ${color}`}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Size selector */}
          {product.sizes?.length > 0 && (
            <div>
              <h3 className="font-semibold mb-1 flex items-center justify-between">
                Size
                <button
                  onClick={() => setShowSizeGuide(true)}
                  className="text-sm text-blue-600 underline"
                >
                  Size Guide
                </button>
              </h3>
              <div className="flex space-x-3">
                {product.sizes.map((size: string) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-3 py-1 border rounded-md focus:outline-none ${
                      selectedSize === size ? 'border-black font-bold' : 'border-gray-300'
                    }`}
                    aria-pressed={selectedSize === size}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity */}
          <div>
            <h3 className="font-semibold mb-1">Quantity</h3>
            <input
              type="number"
              min={1}
              max={product.stock || 10}
              value={quantity}
              onChange={(e) => setQuantity(Math.max(1, Math.min(product.stock || 10, Number(e.target.value))))}
              className="w-20 border rounded-md px-2 py-1 focus:outline-none"
              aria-label="Quantity"
            />
          </div>

          {/* Add to Cart / Wishlist */}
          <div className="flex space-x-4">
            <button
              onClick={() => alert('Added to cart!')}
              className="bg-navy-900 text-white px-6 py-2 rounded-md hover:bg-navy-700 transition"
            >
              Add to Cart
            </button>
            <button
              onClick={() => alert('Added to wishlist!')}
              className="border border-navy-900 px-6 py-2 rounded-md hover:bg-navy-100 transition"
              aria-label="Add to wishlist"
            >
              <Heart className="inline w-5 h-5 mr-1" />
              Wishlist
            </button>
          </div>

          {/* Stock and delivery */}
          <p className={`text-sm font-medium ${product.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
            {product.stock > 0 ? 'In stock' : 'Out of stock'}
          </p>
          <p className="text-sm text-gray-600">Delivery in 3-5 business days</p>

          {/* Description */}
          <div>
            <h2 className="text-lg font-semibold mb-2">Product Details</h2>
            <p className="text-gray-700">{product.description}</p>
          </div>

          {/* Fabric info */}
          {product.fabric && (
            <div>
              <h2 className="text-lg font-semibold mb-2">Fabric</h2>
              <p className="text-gray-700">{product.fabric}</p>
            </div>
          )}

          {/* Model measurements */}
          {product.modelMeasurements && (
            <div>
              <h2 className="text-lg font-semibold mb-2">Model Measurements</h2>
              <p className="text-gray-700">{product.modelMeasurements}</p>
            </div>
          )}

          {/* Accordion FAQ */}
          <div>
            <h2 className="text-lg font-semibold mb-2">Frequently Asked Questions</h2>
            <div className="border rounded-md divide-y divide-gray-200">
              {faqItems.map((item, index) => (
                <div key={index}>
                  <button
                    className="w-full text-left px-4 py-3 font-medium focus:outline-none flex justify-between items-center"
                    onClick={() => setFaqOpenIndex(faqOpenIndex === index ? null : index)}
                    aria-expanded={faqOpenIndex === index}
                  >
                    {item.question}
                    <span>{faqOpenIndex === index ? '-' : '+'}</span>
                  </button>
                  {faqOpenIndex === index && (
                    <div className="px-4 py-2 text-gray-700">
                      {item.answer}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Social Share */}
          <div className="flex space-x-4 mt-4">
            <button
              aria-label="Share on Facebook"
              className="p-2 rounded-full border hover:bg-blue-600 hover:text-white transition"
              onClick={() => window.open(`https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`, '_blank')}
            >
              <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.99 3.66 9.13 8.44 9.88v-6.99H7.9v-2.89h2.54V9.75c0-2.5 1.49-3.89 3.77-3.89 1.09 0 2.23.2 2.23.2v2.45h-1.25c-1.23 0-1.61.76-1.61 1.54v1.84h2.74l-.44 2.89h-2.3v6.99C18.34 21.13 22 16.99 22 12z"/>
              </svg>
            </button>

            <button
              aria-label="Share on Twitter"
              className="p-2 rounded-full border hover:bg-blue-400 hover:text-white transition"
              onClick={() => window.open(`https://twitter.com/intent/tweet?url=${window.location.href}`, '_blank')}
            >
              <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                <path d="M23 3a10.9 10.9 0 0 1-3.14.86 4.48 4.48 0 0 0 1.98-2.48c-.88.52-1.85.9-2.88 1.1a4.5 4.5 0 0 0-7.66 4.1A12.75 12.75 0 0 1 3 4.15a4.5 4.5 0 0 0 1.39 6.03 4.48 4.48 0 0 1-2.04-.57v.06a4.5 4.5 0 0 0 3.61 4.4 4.52 4.52 0 0 1-2.03.08 4.5 4.5 0 0 0 4.2 3.13A9.03 9.03 0 0 1 2 19.54a12.8 12.8 0 0 0 6.92 2.03c8.3 0 12.84-6.88 12.84-12.83 0-.2 0-.42-.02-.62A9.22 9.22 0 0 0 23 3z"/>
              </svg>
            </button>

            <button
              aria-label="Share on WhatsApp"
              className="p-2 rounded-full border hover:bg-green-600 hover:text-white transition"
              onClick={() => window.open(`https://api.whatsapp.com/send?text=${window.location.href}`, '_blank')}
            >
              <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                <path d="M16.5 3A9.48 9.48 0 0 0 7 12.03c0 1.67.43 3.23 1.21 4.6L5 21l4.4-3.19a9.41 9.41 0 0 0 6.1 2.22 9.5 9.5 0 0 0 9.5-9.49c0-5.24-4.26-9.5-9.5-9.5zm5 12.19l-2.18-.62a1 1 0 0 0-.88.21l-1.73 1.73a7.36 7.36 0 0 1-3.91-3.91l1.73-1.73a1 1 0 0 0 .21-.88l-.62-2.18a1 1 0 0 0-1.06-.7h-.07a.92.92 0 0 0-.88.61c-.24.7-.92 2.15-1.31 2.89a4.74 4.74 0 0 0 4.37 4.37c.74-.39 2.19-1.07 2.89-1.31a.93.93 0 0 0 .61-.88v-.06a1 1 0 0 0-.7-1.06z"/>
              </svg>
            </button>
          </div>

          {/* Trust Badges */}
          <div className="flex items-center space-x-6 mt-6">
            <img src="/images/trust-secure.svg" alt="Secure Payments" className="h-10" />
            <img src="/images/trust-shipping.svg" alt="Fast Shipping" className="h-10" />
            <img src="/images/trust-quality.svg" alt="Quality Guarantee" className="h-10" />
          </div>
        </div>
      </div>

      {/* Related Products */}
      <section className="mt-16">
        <h2 className="text-2xl font-semibold mb-6">You Might Also Like</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {relatedProducts.map(p => (
            <ProductCard
              key={p.id}
              id={p.id}
              name={p.name}
              brand={p.brand}
              image={p.image}
              price={p.price}
              originalPrice={p.originalPrice}
              isNew={p.isNew}
            />
          ))}
        </div>
      </section>

      {/* Size Guide Modal */}
      {showSizeGuide && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={() => setShowSizeGuide(false)}
        >
          <div
            className="bg-white rounded-lg p-6 max-w-lg w-full relative"
            onClick={e => e.stopPropagation()}
          >
            <h3 className="text-xl font-semibold mb-4">Size Guide</h3>
            <p className="mb-4">Here goes your detailed size chart info, measurements, and fitting tips.</p>
            <button
              onClick={() => setShowSizeGuide(false)}
              className="absolute top-3 right-3 text-gray-700 hover:text-black focus:outline-none"
              aria-label="Close size guide"
            >
              &times;
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetailPage;
