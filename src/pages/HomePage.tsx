import React from 'react';
import BackInStockPrompt from '../components/home/BackInStockPrompt';
import NewsletterModal from '../components/home/NewsletterModal';
import TestimonialsSlider from '../components/home/TestimonialsSlider';
import TrustBadges from '../components/home/TrustBadges';
import TrendingCarousel from '../components/home/TrendingCarousel';

const HomePage: React.FC = () => {
  return (
    <div>
      {/* Hero Banner */}
      <section
        className="relative bg-cover bg-center h-[500px] flex items-center justify-center"
        style={{
          backgroundImage: `url('https://images.pexels.com/photos/1172207/pexels-photo-1172207.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')`,
        }}
      >
        <div className="bg-black bg-opacity-50 p-8 rounded text-center max-w-3xl">
          <h1 className="text-white text-4xl md:text-5xl font-bold mb-4 font-poppins">
            Bold Fashion For The Forward
          </h1>
          <p className="text-white text-lg md:text-xl mb-6 font-inter">
            Express yourself with our latest collection of trendsetting menswear
          </p>
          <a
            href="/shop/new-arrivals"
            className="inline-block bg-white text-black font-semibold px-6 py-3 rounded hover:bg-gray-200 transition"
          >
            Shop New Arrivals
          </a>
        </div>
      </section>

      {/* Promo Bar */}
      <div className="py-4 bg-neutral-950 text-white text-center">
        <div className="container-custom max-w-7xl mx-auto px-4">
          <p className="text-sm md:text-base">
            Get FREE shipping on orders over ₹999 | Use code{' '}
            <span className="font-bold">FIRSTORDER</span> for 10% OFF
          </p>
        </div>
      </div>

      {/* Back In Stock Prompt */}
      <div className="container-custom max-w-7xl mx-auto px-4 my-10">
        <BackInStockPrompt />
      </div>

      {/* Trending Carousel */}
      <TrendingCarousel />

      {/* Testimonials */}
      <TestimonialsSlider />

      {/* Trust Badges */}
      <TrustBadges />

      {/* Newsletter Modal (usually triggered by timeout or event) */}
      <NewsletterModal />
    </div>
  );
};

export default HomePage;
