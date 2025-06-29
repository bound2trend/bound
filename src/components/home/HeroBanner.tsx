import React from 'react';
import { Link } from 'react-router-dom';

interface HeroBannerProps {
  title: string;
  subtitle: string;
  ctaText: string;
  ctaLink: string;
  imageSrc: string;
}

const HeroBanner: React.FC<HeroBannerProps> = ({ title, subtitle, ctaText, ctaLink, imageSrc }) => {
  return (
    <section className="relative w-full h-[80vh] overflow-hidden">
      <img
        src={imageSrc}
        alt="Hero"
        className="object-cover w-full h-full absolute inset-0 z-0"
      />
      <div className="absolute inset-0 bg-black bg-opacity-40 z-10"></div>
      <div className="relative z-20 flex flex-col items-center justify-center h-full text-center text-white px-4">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">{title}</h1>
        <p className="text-lg md:text-xl mb-6 max-w-2xl">{subtitle}</p>
        <Link
          to={ctaLink}
          className="bg-navy text-white px-6 py-3 text-sm font-semibold rounded hover:bg-opacity-80 transition"
        >
          {ctaText}
        </Link>
      </div>
    </section>
  );
};

export default HeroBanner;
