import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { categories } from '../../data/mockProducts';

const FeaturedCategories: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1,
    };
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    }, observerOptions);
    
    const elements = document.querySelectorAll('.reveal');
    elements.forEach(el => observer.observe(el));
    
    return () => {
      elements.forEach(el => observer.unobserve(el));
    };
  }, []);
  
  return (
    <section ref={sectionRef} className="section bg-white">
      <div className="container-custom">
        <div className="text-center mb-12 reveal">
          <h2 className="text-3xl font-bold mb-4">Shop by Category</h2>
          <p className="text-neutral-600 max-w-2xl mx-auto">
            Find your perfect style in our wide range of categories. From casual tees to statement outerwear, 
            we've got everything you need to elevate your wardrobe.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <Link 
              key={category.id} 
              to={`/shop/category/${category.slug}`}
              className="group relative overflow-hidden rounded-lg aspect-[3/4] reveal"
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 to-transparent opacity-60 transition-opacity group-hover:opacity-80 z-10"></div>
              <img 
                src={category.image} 
                alt={category.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute bottom-0 left-0 p-6 z-20">
                <h3 className="text-white text-xl font-bold mb-1">{category.name}</h3>
                <span className="inline-block text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  Shop Now →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedCategories;