// AboutPage.jsx

import React from 'react';

// Import images here
import HeaderRightImage from '../.././public/images/a1.jpg';
import CircularCenterLeftImage from '../.././public/images/a2.jpg';
import ExpertiseRightImage from '../.././public/images/a3.jpg';

const AboutPage = () => {

  const scrollToFeaturedSection = () => {
    const featuredSection = document.getElementById('featured-section');
    if (featuredSection) {
      featuredSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-white dark:bg-red-900 font-sans">
      
      {/* ---------------------------------------------------- */}
      {/* 1. HEADER BLOCK */}
      {/* ---------------------------------------------------- */}
      <section className="py-24 lg:py-32 px-4 sm:px-6 lg:px-8 bg-white dark:bg-red-800 relative overflow-hidden">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          
          <div>
            <h1 className="text-5xl lg:text-6xl font-extrabold text-red-900 dark:text-white mb-6 leading-tight">
              Delicious Meals <br />
              <span className="text-red-600 dark:text-red-400">Prepared Fresh</span> Daily
            </h1>
            <p className="text-red-700 dark:text-gray-200 mb-8 max-w-lg">
              At <strong>Delivery</strong>, we bring the authentic taste of <strong>Pizza & Lasagna</strong> straight to your doorstep. Fresh ingredients, traditional recipes, and a passion for flavor in every dish.
            </p>
            <button onClick={scrollToFeaturedSection} className="px-8 py-3 text-lg font-semibold text-white bg-red-700 dark:bg-red-600 rounded-full hover:bg-red-800 dark:hover:bg-red-500 transition duration-300 shadow-lg shadow-red-500/50">
              Order Now
            </button>
          </div>

          <div className="relative flex justify-center md:justify-start">
            <div className="absolute w-full h-full bg-red-700 dark:bg-red-600 opacity-20 rounded-lg transform rotate-3 -translate-y-4 translate-x-4 hidden lg:block"></div>
            <div className="w-full max-w-sm aspect-[4/3] rounded-lg overflow-hidden shadow-2xl relative z-10">
              <img 
                src={HeaderRightImage} 
                alt="Header Right" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------- */}
      {/* 2. MAIN ABOUT BLOCK */}
      {/* ---------------------------------------------------- */}
      <section className="py-24 lg:py-32 px-4 sm:px-6 lg:px-8 bg-white dark:bg-red-900">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          <div className="relative flex justify-center md:justify-end order-1 md:order-1">
            <div className="w-full max-w-sm md:max-w-md aspect-square rounded-full overflow-hidden shadow-2xl relative z-10">
              <img 
                src={CircularCenterLeftImage} 
                alt="Our Chef" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="order-2 md:order-2">
            <h2 className="text-4xl font-extrabold text-red-900 dark:text-white mb-6">
              Welcome To <span className="text-red-600 dark:text-red-400">Delivery</span>
            </h2>
            <p className="text-red-700 dark:text-gray-200 mb-8 leading-relaxed">
              From sizzling appetizers to hearty main courses, our dishes are made with love and the freshest ingredients. Enjoy an authentic <strong>Pizza & Lasagna</strong> experience without leaving your home.
            </p>
            
            <div className="flex flex-wrap gap-4 mb-10">
              <div className="text-center p-4 bg-red-100 dark:bg-red-800 rounded-lg shadow-md border-t-4 border-red-600 min-w-[120px]">
                <p className="text-3xl font-bold text-red-600 dark:text-red-400">50+</p>
                <p className="text-sm text-red-700 dark:text-gray-200">Delicious Dishes</p>
              </div>
              <div className="text-center p-4 bg-red-100 dark:bg-red-800 rounded-lg shadow-md border-t-4 border-red-600 min-w-[120px]">
                <p className="text-3xl font-bold text-red-600 dark:text-red-400">10k+</p>
                <p className="text-sm text-red-700 dark:text-gray-200">Happy Customers</p>
              </div>
              <div className="text-center p-4 bg-red-100 dark:bg-red-800 rounded-lg shadow-md border-t-4 border-red-600 min-w-[120px]">
                <p className="text-3xl font-bold text-red-600 dark:text-red-400">15</p>
                <p className="text-sm text-red-700 dark:text-gray-200">Years of Experience</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------- */}
      {/* 3. SERVICES & EXPERTISE BLOCK */}
      {/* ---------------------------------------------------- */}
      <section className="py-24 lg:py-32 px-4 sm:px-6 lg:px-8 bg-red-50 dark:bg-red-800">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-extrabold text-center text-red-900 dark:text-white mb-16">
            Our <span className="text-red-600 dark:text-red-400">Specialties</span>
          </h2>
          
          <div className="grid md:grid-cols-4 gap-8 mb-20">
            {['Fast Delivery', 'Fresh Ingredients', 'Authentic Recipes', 'Custom Orders'].map((service, index) => (
              <div key={index} className="text-center p-6 transition duration-300 transform hover:scale-[1.02]">
                <div className={`mx-auto w-16 h-16 rounded-full flex items-center justify-center mb-4 
                  ${index === 1 ? 'bg-red-700 text-white' : 'bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-400'} border-2 border-red-600`}>
                  <span className="text-3xl">🍽️</span>
                </div>
                <h4 className="text-lg font-semibold text-red-900 dark:text-white mb-2">{service}</h4>
                <p className="text-sm text-red-700 dark:text-gray-200 mb-3">Experience quality you can taste.</p>
                <button onClick={scrollToFeaturedSection} className="text-sm font-medium text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-200">Order Now →</button>
              </div>
            ))}
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            
            <div className="order-2 md:order-1">
              <h3 className="text-3xl font-bold text-red-900 dark:text-white mb-6">Why Choose Us</h3>
              
              {[{ skill: 'On-Time Delivery', percentage: 95 }, { skill: 'Quality Ingredients', percentage: 90 }, { skill: 'Customer Satisfaction', percentage: 85 }].map((item, index) => (
                <div key={index} className="mb-6">
                  <div className="flex justify-between items-center mb-1 text-red-700 dark:text-gray-200">
                    <span className="font-medium">{item.skill}</span>
                    <span className="font-bold text-red-600 dark:text-red-400">{item.percentage}%</span>
                  </div>
                  <div className="w-full bg-red-200 dark:bg-red-700 rounded-full h-2.5">
                    <div 
                      className="bg-red-700 dark:bg-red-500 h-2.5 rounded-full" 
                      style={{ width: `${item.percentage}%` }}
                    ></div>
                  </div>
                </div>
              ))}
              
              <button onClick={scrollToFeaturedSection} className="mt-6 px-8 py-3 text-lg font-semibold text-white bg-red-700 dark:bg-red-600 rounded-full hover:bg-red-800 dark:hover:bg-red-500 transition duration-300 shadow-lg shadow-red-500/50">
                Place an Order
              </button>
            </div>

            <div className="relative flex justify-center md:justify-start order-1 md:order-2">
              <div className="w-full max-w-sm aspect-[4/3] rounded-lg overflow-hidden shadow-2xl relative z-10">
                <img 
                  src={ExpertiseRightImage} 
                  alt="Our Special Dishes" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      
    </div>
  );
};

export default AboutPage;
