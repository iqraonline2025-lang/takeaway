import React, { useState, useEffect } from 'react';

// Import images here
import Img1 from '../.././public/images/t1.jpg';
import Img2 from '../.././public/images/t4.jpg';
import Img3 from '../.././public/images/t3.jpg';
import Img4 from '../.././public/images/t5.jpg';
import Img5 from '../.././public/images/t2.jpg';
import Img6 from '../.././public/images/t6.jpg';

const allTestimonials = [
  { id: 1, name: "Elizabeth Thomas", image: Img1, review: "Yogurts can be high in protein, calcium, vitamins, and live culture, or probiotics, which can enhance the gut microbiota.", rating: 4.7, taste: "Good Taste!" },
  { id: 2, name: "Chris William", image: Img2, review: "Low-fat yogurt can be a useful source of protein on a weight-loss diet. Probiotics may boost the immune system.", rating: 4.7, taste: "Good Taste!" },
  { id: 3, name: "Amanda Smith", image: Img3, review: "The texture is perfect and the quality of the ingredients truly shines through. Highly recommended for a healthy snack.", rating: 5.0, taste: "Excellent!" },
  { id: 4, name: "David Chen", image: Img4, review: "This product exceeds expectations in both flavor and nutritional value. A great addition to my daily routine.", rating: 4.5, taste: "Very Good!" },
  { id: 5, name: "Laura Kim", image: Img5, review: "Incredible results! My confidence has never been higher since starting this program. Truly transformative advice.", rating: 4.9, taste: "Fantastic!" },
  { id: 6, name: "Michael B.", image: Img6, review: "A fantastic and professional team. They provided clear guidance and support every step of the way.", rating: 5.0, taste: "Perfect!" },
];

const ITEMS_PER_PAGE = 2;
const TOTAL_PAGES = Math.ceil(allTestimonials.length / ITEMS_PER_PAGE);

const TestimonialCard = ({ testimonial }) => {
  return (
    <div className="flex flex-col items-center text-center p-6 bg-white rounded-xl shadow-md hover:shadow-xl transition">
      <div className="relative w-36 h-36 mb-6">
        <div className="w-full h-full rounded-full overflow-hidden flex items-center justify-center">
          <img src={testimonial.image} alt={testimonial.name} className="w-full h-full object-cover" />
        </div>
        <div className="absolute top-0 left-0 transform -translate-x-1/4 -translate-y-1/4 bg-red-50 shadow-md rounded-lg p-2 flex flex-col items-center text-sm font-semibold">
          <span className="text-red-600 text-lg">★</span>
          <span className="text-red-900">{testimonial.rating}/5</span>
          <span className="text-green-600">{testimonial.taste}</span>
        </div>
      </div>
      <h3 className="text-xl font-bold text-red-900 mb-2">{testimonial.name}</h3>
      <p className="text-gray-700 text-sm max-w-xs">{testimonial.review}</p>
    </div>
  );
};

const TestimonialSlider = () => {
  const [currentPage, setCurrentPage] = useState(0);

  // Auto-play every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPage((prev) => (prev + 1) % TOTAL_PAGES);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const startIndex = currentPage * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentTestimonials = allTestimonials.slice(startIndex, endIndex);

  return (
    <section className="py-20 lg:py-32 px-4 sm:px-6 lg:px-8 bg-red-50">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-extrabold text-center text-red-900 mb-16">
          Testimonials
        </h2>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-16 transition-all duration-700 ease-in-out">
          {currentTestimonials.map(testimonial => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} />
          ))}
        </div>

        <div className="flex justify-center mt-12 space-x-3">
          {Array.from({ length: TOTAL_PAGES }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentPage(index)}
              aria-label={`Go to slide ${index + 1}`}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentPage ? 'bg-red-600 w-6' : 'bg-red-300 hover:bg-red-400'}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialSlider;
