import React from 'react';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import HeroBanner from '../components/home/HeroBanner';
import TestimonialsSlider from '../components/home/TestimonialsSlider';
import TrendingCarousel from '../components/home/TrendingCarousel';
import TrustBadges from '../components/home/TrustBadges';
import NewsletterModal from '../components/home/NewsletterModal';
import BackInStockPrompt from '../components/home/BackInStockPrompt';
import { mockProducts } from '../data/mockProducts';

const HomePage: React.FC = () => {
  const featuredProducts = mockProducts.slice(0, 6); // Use mock data for now

  return (
    <>
      <Header />

      <main className="bg-[#f9f9f6] text-neutral-900 min-h-screen">
        <HeroBanner
          title="Bold Fashion For The Forward"
          subtitle="Express yourself with our latest collection of trendsetting menswear"
          ctaText="Shop Now"
          ctaLink="/shop"
          imageSrc="https://images.pexels.com/photos/1172207/pexels-photo-1172207.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        />

        <div className="py-3 bg-neutral-950 text-white text-center text-sm md:text-base">
          <div className="container-custom">
            Get FREE shipping on orders over ₹999 | Use code <strong>FIRSTORDER</strong> for 10% OFF
          </div>
        </div>

        {/* Combined Featured Section */}
        <section className="py-12 container-custom">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-2">Featured Selections</h2>
            <p className="text-gray-600 text-sm">
              Explore premium categories & our bestselling pieces
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
            {['Shirts', 'Jeans', 'Trousers', 'T-Shirts', 'Suits', 'Accessories'].map(
              (cat, idx) => (
                <a
                  key={idx}
                  href={`/shop?category=${cat.toLowerCase()}`}
                  className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition text-center text-sm font-medium"
                >
                  {cat}
                </a>
              )
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {featuredProducts.map(product => (
              <div
                key={product.id}
                className="bg-white p-4 rounded-lg shadow hover:shadow-md transition"
              >
                <a href={`/product/${product.slug}`}>
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-64 object-cover rounded-md mb-4"
                  />
                  <h3 className="font-semibold">{product.name}</h3>
                  <p className="text-sm text-gray-500 mt-1">₹{product.price}</p>
                </a>
              </div>
            ))}
          </div>
        </section>

        <TestimonialsSlider />
        <TrendingCarousel />
        <TrustBadges />
        <NewsletterModal />
        <BackInStockPrompt />
      </main>

      <Footer />
    </>
  );
};

export default HomePage;
