import React from 'react';
import HeroBanner from '../components/home/HeroBanner';
import FeaturedCategories from '../components/home/FeaturedCategories';
import FeaturedProducts from '../components/home/FeaturedProducts';
import VideoGrid from '../components/home/VideoGrid';

const HomePage: React.FC = () => {
  return (
    <div>
      <HeroBanner 
        title="Bold Fashion For The Forward"
        subtitle="Express yourself with our latest collection of trendsetting menswear"
        ctaText="Shop New Arrivals"
        ctaLink="/shop/new-arrivals"
        imageSrc="https://images.pexels.com/photos/1172207/pexels-photo-1172207.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
      />
      
      <div className="py-4 bg-neutral-950 text-white text-center">
        <div className="container-custom">
          <p className="text-sm md:text-base">
            Get FREE shipping on orders over ₹999 | Use code <span className="font-bold">FIRSTORDER</span> for 10% OFF
          </p>
        </div>
      </div>
      
      <FeaturedCategories />
      
      <FeaturedProducts />
      
      <section className="section bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="order-2 md:order-1 reveal">
              <h2 className="text-3xl font-bold mb-4">The FitRoom Experience</h2>
              <p className="text-neutral-600 mb-6">
                Not sure if it will fit? Try our virtual FitRoom experience to see how our clothes 
                look on models with similar builds, or upload your own photo for a personalized preview.
              </p>
              <div>
                <a href="/fitroom" className="btn-primary">
                  Try FitRoom Now
                </a>
              </div>
            </div>
            <div className="order-1 md:order-2 reveal">
              <img 
                src="https://images.pexels.com/photos/1300550/pexels-photo-1300550.jpeg?auto=compress&cs=tinysrgb&w=800" 
                alt="FitRoom Experience" 
                className="w-full h-auto rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>
      
      <VideoGrid />
    </div>
  );
};

export default HomePage;