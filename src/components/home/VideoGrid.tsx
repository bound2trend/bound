import React, { useRef, useEffect } from 'react';

interface VideoItem {
  id: string;
  thumbnail: string;
  videoUrl: string;
  title: string;
}

const VideoGrid: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  
  // Mock video data
  const videos: VideoItem[] = [
    {
      id: '1',
      thumbnail: 'https://images.pexels.com/photos/6347892/pexels-photo-6347892.jpeg?auto=compress&cs=tinysrgb&w=800',
      videoUrl: 'https://example.com/video1.mp4',
      title: 'Summer Collection Highlights'
    },
    {
      id: '2',
      thumbnail: 'https://images.pexels.com/photos/1183266/pexels-photo-1183266.jpeg?auto=compress&cs=tinysrgb&w=800',
      videoUrl: 'https://example.com/video2.mp4',
      title: 'Street Style Lookbook'
    },
    {
      id: '3',
      thumbnail: 'https://images.pexels.com/photos/1598507/pexels-photo-1598507.jpeg?auto=compress&cs=tinysrgb&w=800',
      videoUrl: 'https://example.com/video3.mp4',
      title: 'Behind the Scenes'
    },
    {
      id: '4',
      thumbnail: 'https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=800',
      videoUrl: 'https://example.com/video4.mp4',
      title: 'Tech Jackets Showcase'
    }
  ];
  
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
    <section ref={sectionRef} className="section bg-black text-white">
      <div className="container-custom">
        <div className="text-center mb-12 reveal">
          <h2 className="text-3xl font-bold mb-4">BOUND Reels</h2>
          <p className="text-neutral-300 max-w-2xl mx-auto">
            Check out our latest content showcasing new collections, behind-the-scenes looks, and style inspiration.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {videos.map((video, index) => (
            <div 
              key={video.id} 
              className="relative group cursor-pointer overflow-hidden rounded-lg reveal"
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="aspect-square">
                <img 
                  src={video.thumbnail} 
                  alt={video.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                
                {/* Play Button */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-primary/80 flex items-center justify-center backdrop-blur-sm transition-transform group-hover:scale-110">
                    <svg 
                      className="w-6 h-6 text-white ml-1" 
                      fill="currentColor" 
                      viewBox="0 0 20 20"
                    >
                      <path 
                        fillRule="evenodd" 
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" 
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                </div>
                
                {/* Overlay with title */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                  <h3 className="text-white font-medium text-sm">{video.title}</h3>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default VideoGrid;