import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { mockProducts } from '../lib/mockProducts';
import { Loader, Star, Heart, Truck, ShieldCheck, RotateCcw, Shirt, Info } from 'lucide-react';

const ProductDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [product, setProduct] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState('');
  const [showFAQ, setShowFAQ] = useState(false);

  useEffect(() => {
    const found = mockProducts.find((p) => p.slug === slug);
    setProduct(found || null);
    setLoading(false);
  }, [slug]);

  const getProductAge = (createdAt: string) => {
    const createdDate = new Date(createdAt);
    const now = new Date();
    const diff = Math.floor((now.getTime() - createdDate.getTime()) / (1000 * 60 * 60 * 24));
    return `${diff} days ago`;
  };

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

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="grid md:grid-cols-2 gap-8">
        {/* Image Gallery */}
        <div>
          <img src={product.images[selectedImage]} alt={product.name} className="rounded-lg w-full object-cover" />
          <div className="grid grid-cols-4 gap-2 mt-4">
            {product.images.map((img: string, i: number) => (
              <img
                key={i}
                src={img}
                className={`rounded cursor-pointer border ${selectedImage === i ? 'border-black' : 'border-transparent'}`}
                onClick={() => setSelectedImage(i)}
                alt=""
              />
            ))}
          </div>
        </div>

        {/* Product Details */}
        <div>
          <h1 className="text-3xl font-bold">{product.name}</h1>
          <p className="text-sm text-gray-500 mt-1">{product.brand} · {getProductAge(product.createdAt)}</p>

          {/* Rating */}
          <div className="flex items-center gap-1 mt-2">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={16} className={i < 4 ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'} />
            ))}
            <span className="text-sm text-gray-600 ml-2">4.2 (87 reviews)</span>
          </div>

          {/* Price */}
          <p className="text-2xl font-semibold mt-4">₹{product.price}</p>

          {/* Size Selector */}
          <div className="mt-4">
            <label className="text-sm font-medium mb-2 block">Size</label>
            <div className="flex gap-2">
              {product.sizes?.map((s: string) => (
                <button
                  key={s}
                  className={`border px-4 py-2 rounded-md text-sm ${selectedSize === s ? 'border-black font-semibold' : 'border-gray-300'}`}
                  onClick={() => setSelectedSize(s)}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Buttons */}
          <div className="mt-6 flex flex-wrap gap-4">
            <button className="bg-black text-white px-5 py-2 rounded hover:bg-gray-800">Add to Cart</button>
            <button className="flex items-center gap-1 border px-5 py-2 rounded hover:bg-gray-100">
              <Shirt size={16} /> Try On
            </button>
            <button className="flex items-center gap-1 px-5 py-2 border rounded hover:bg-gray-100">
              <Heart size={16} /> Wishlist
            </button>
          </div>

          {/* Description */}
          <div className="mt-8 text-sm text-gray-700 leading-relaxed">
            {product.description}
          </div>

          {/* Delivery, Authenticity, Return */}
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="flex gap-2 items-start">
              <Truck className="text-primary" />
              <div>
                <p className="font-medium">Fast Delivery</p>
                <p className="text-xs text-gray-500">Get within 3-5 working days</p>
              </div>
            </div>
            <div className="flex gap-2 items-start">
              <ShieldCheck className="text-primary" />
              <div>
                <p className="font-medium">100% Authentic</p>
                <p className="text-xs text-gray-500">Original quality guaranteed</p>
              </div>
            </div>
            <div className="flex gap-2 items-start">
              <RotateCcw className="text-primary" />
              <div>
                <p className="font-medium">Easy Returns</p>
                <p className="text-xs text-gray-500">Within 7 days of delivery</p>
              </div>
            </div>
          </div>

          {/* Fabric Info */}
          <div className="mt-6">
            <h3 className="font-medium mb-1">Fabric & Care</h3>
            <p className="text-sm text-gray-600">98% Cotton, 2% Spandex. Machine wash cold. Do not bleach.</p>
          </div>

          {/* Model Measurements */}
          <div className="mt-4">
            <h3 className="font-medium mb-1">Model Measurements</h3>
            <p className="text-sm text-gray-600">Height: 6'1", Wearing Size: M</p>
          </div>

          {/* FAQ */}
          <div className="mt-6">
            <button onClick={() => setShowFAQ(!showFAQ)} className="flex items-center gap-2 text-sm font-medium">
              <Info size={18} /> Product FAQs
            </button>
            {showFAQ && (
              <div className="mt-2 text-sm text-gray-600 space-y-2">
                <p><strong>Q:</strong> Is it machine washable?</p>
                <p><strong>A:</strong> Yes, cold wash recommended.</p>
                <p><strong>Q:</strong> Does it shrink?</p>
                <p><strong>A:</strong> Minimal shrinkage after first wash.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Related Products */}
      <div className="mt-16">
        <h2 className="text-xl font-bold mb-4">Complete the Look</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {mockProducts.slice(0, 4).map((p) => (
            <div key={p.id} className="border rounded-md overflow-hidden hover:shadow">
              <img src={p.image} alt={p.name} className="w-full h-48 object-cover" />
              <div className="p-2">
                <p className="text-sm font-medium">{p.name}</p>
                <p className="text-xs text-gray-500">₹{p.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
