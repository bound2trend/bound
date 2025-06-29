import React from 'react';

const testimonials = [
  {
    name: 'Arjun M.',
    text: 'Best menswear brand out there. The quality is unmatched!',
  },
  {
    name: 'Rahul K.',
    text: 'Got so many compliments. Already ordered again.',
  },
  {
    name: 'Ishaan R.',
    text: 'Delivered fast. Fit perfectly. Love the design!',
  },
];

const TestimonialsSlider: React.FC = () => {
  return (
    <section className="bg-neutral-100 py-12">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold">What Our Customers Say</h2>
      </div>
      <div className="flex overflow-x-auto gap-6 px-4 md:px-16 scrollbar-hide">
        {testimonials.map((t, i) => (
          <div
            key={i}
            className="min-w-[280px] max-w-sm bg-white p-6 rounded-lg shadow-md flex-shrink-0"
          >
            <p className="text-sm text-gray-700 mb-4">"{t.text}"</p>
            <p className="font-semibold text-gray-900">– {t.name}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TestimonialsSlider;
