import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Button from '../common/Button';

interface HeroBannerProps {
  title: string;
  subtitle: string;
  ctaText: string;
  ctaLink: string;
  imageSrc: string;
}

const HeroBanner: React.FC<HeroBannerProps> = ({
  title,
  subtitle,
  ctaText,
  ctaLink,
  imageSrc,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      
      if (imageRef.current) {
        // Parallax effect for background image
        imageRef.current.style.transform = `translateY(${scrollY * 0.4}px)`;
      }
      
      if (contentRef.current && scrollY < 300) {
        // Fade out effect for content
        contentRef.current.style.opacity = `${1 - scrollY * 0.003}`;
        contentRef.current.style.transform = `translateY(${scrollY * 0.2}px)`;
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  return (
    <div 
      ref={containerRef} 
      className="relative h-screen overflow-hidden bg-neutral-900"
    >
      {/* Background image with parallax */}
      <div 
        ref={imageRef}
        className="absolute inset-0 w-full h-full z-0"
      >
        <div 
          className="absolute inset-0 bg-gradient-to-t from-neutral-900 to-transparent opacity-80 z-10"
        ></div>
        <img 
          src={imageSrc} 
          alt="Hero Banner" 
          className="w-full h-full object-cover"
        />
      </div>
      
      {/* Content */}
      <div 
        ref={contentRef}
        className="container-custom relative z-20 flex flex-col justify-center h-full text-white"
      >
        <div className="max-w-2xl">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-tight">
            {title}
          </h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90">
            {subtitle}
          </p>
          <Link to={ctaLink}>
            <Button 
              variant="primary" 
              size="lg"
              className="animate-pulse"
            >
              {ctaText}
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;