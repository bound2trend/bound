import React from 'react';

const testimonials = [
  {
    name: 'Aman',
    quote: 'Best menswear I’ve ever bought. Quality and fit are top-notch.',
  },
  {
    name: 'Rahul',
    quote: 'Stylish and comfortable. Will definitely order again!',
  },
  {
    name: 'Dev',
    quote: 'Customer support was fantastic, and delivery was fast!',
  },
];

const TestimonialsSlider: React.FC = () => {
  return (
    <div className="bg-gray-100 py-10 px-4 text-center">
      <h2 className="text-2xl font-bold mb-6">What Our Customers Say</h2>
      <div className="grid gap-6 md:grid-cols-3">
        {testimonials.map((testimonial, index) => (
          <div key={index} className="bg-white p-6 rounded shadow">
            <p className="text-sm text-gray-700 italic">"{testimonial.quote}"</p>
            <p className="mt-4 font-medium text-gray-900">- {testimonial.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TestimonialsSlider;
