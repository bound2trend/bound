import React from 'react';
import HeroBanner from '../components/home/HeroBanner';
import FeaturedCategories from '../components/home/FeaturedCategories';
import FeaturedProducts from '../components/home/FeaturedProducts';
import VideoGrid from '../components/home/VideoGrid';
import BackInStockPrompt from '../components/home/BackInStockPrompt';
import NewsletterModal from '../components/home/NewsletterModal';
import TestimonialsSlider from '../components/home/TestimonialsSlider';
import TrustBadges from '../components/home/TrustBadges';
import TrendingCarousel from '../components/home/TrendingCarousel';

const HomePage: React.FC = () => {
  return (
    <div className="bg-white text-neutral-900">
      {/* Hero */}
      <HeroBanner
        title="Bold Fashion For The Forward"
        subtitle="Express yourself with our latest collection of trendsetting menswear"
        ctaText="Shop New Arrivals"
        ctaLink="/shop/new-arrivals"
        imageSrc="https://images.pexels.com/photos/1172207/pexels-photo-1172207.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
      />

      {/* Promo Bar */}
      <div className="py-3 bg-neutral-950 text-white text-center text-sm">
        <p>
          FREE shipping over ₹999 | Use code <strong>FIRSTORDER</strong> for 10% OFF
        </p>
      </div>

      {/* Carousel */}
      <TrendingCarousel />

      {/* Featured Categories */}
      <section className="section bg-white py-12">
        <div className="container-custom">
          <FeaturedCategories />
        </div>
      </section>

      {/* Featured Products */}
      <section className="section bg-gray-50 py-12">
        <div className="container-custom">
          <FeaturedProducts />
        </div>
      </section>

      {/* FitRoom CTA */}
      <section className="section bg-white py-16">
        <div className="container-custom grid grid-cols-1 md:grid-cols-2 items-center gap-10">
          <div>
            <h2 className="text-3xl font-bold mb-4">Try On Before You Buy</h2>
            <p className="text-neutral-700 mb-6 leading-relaxed">
              Not sure if it will fit? Our virtual FitRoom experience helps you preview how our clothes look on similar builds—or upload your own photo.
            </p>
            <a href="/fitroom" className="btn-primary">
              Try FitRoom Now
            </a>
          </div>
          <div>
            <img
              src="https://images.pexels.com/photos/1300550/pexels-photo-1300550.jpeg?auto=compress&cs=tinysrgb&w=800"
              alt="trywise"
              className="w-full rounded-lg shadow-xl"
            />
          </div>
        </div>
      </section>

      {/* Back In Stock */}
      <section className="section bg-gray-50 py-12">
        <div className="container-custom">
          <BackInStockPrompt />
        </div>
      </section>

      {/* Trust Badges */}
      <section className="bg-white py-12">
        <div className="container-custom">
          <TrustBadges />
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-gray-50 py-12">
        <div className="container-custom">
          <TestimonialsSlider />
        </div>
      </section>

      {/* Videos */}
      <section className="section bg-white py-12">
        <div className="container-custom">
          <VideoGrid />
        </div>
      </section>

      {/* Newsletter Modal */}
      <NewsletterModal />
    </div>
  );
};

export default HomePage;
