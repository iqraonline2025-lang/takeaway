// HeroFooter.jsx

import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Instagram, Facebook, Twitter, Send } from 'lucide-react';

const HeroFooter = () => {
  const [subscribeMessage, setSubscribeMessage] = useState('');

  const scrollToFeaturedSection = () => {
    const featuredSection = document.getElementById('featured-section');
    if (featuredSection) {
      featuredSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSubscribe = (e) => {
    e.preventDefault();
    setSubscribeMessage("Thank you for subscribing! You'll receive weekly updates.");
  };

  return (
    <footer className="bg-red-50 text-red-900">
      <div className="max-w-7xl mx-auto px-6 py-20">

        {/* ---------- Top CTA ---------- */}
        <div className="text-center mb-16">
          <div className="text-4xl font-black text-red-600 mb-3">🍽️ Your Takeaway</div>
          <h2 className="text-4xl md:text-5xl font-extrabold mb-4">Fresh Meals, Delivered Fast</h2>
          <p className="text-lg text-red-700 mb-8 max-w-2xl mx-auto">
            Skip the queue and order directly for your next delicious meal.
          </p>
          <button
            onClick={scrollToFeaturedSection}
            className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-10 rounded-full text-lg shadow-md transition transform hover:scale-105"
          >
            Order Now
          </button>
        </div>

        {/* ---------- Main Grid (Now 4 Columns) ---------- */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 lg:gap-8 mb-16">

          {/* About */}
          <div>
            <h4 className="text-xl font-bold text-red-800 mb-4">About Us</h4>
            <p className="text-sm text-red-700 mb-2">
              Serving the community with authentic flavors and fresh ingredients since 2020.
            </p>
            <p className="text-xs font-semibold text-red-600">Our Mission: Quality, Speed, Taste</p>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-xl font-bold text-red-800 mb-4">Contact</h4>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center">
                <Phone className="w-4 h-4 mr-2 text-red-600" />
                <a href="tel:+441234567890" className="text-red-700 hover:text-red-900">+44 1234 567890</a>
              </li>
              <li className="flex items-center">
                <Mail className="w-4 h-4 mr-2 text-red-600" />
                <a href="mailto:order@takeaway.com" className="text-red-700 hover:text-red-900">order@takeaway.com</a>
              </li>
              <li className="flex items-start">
                <MapPin className="w-4 h-4 mr-2 text-red-600 mt-1" />
                <span className="text-red-700">14 Fake Street, Anytown, AB1 2CD</span>
              </li>
            </ul>
          </div>

          {/* Hours */}
          <div>
            <h4 className="text-xl font-bold text-red-800 mb-4">Opening Hours</h4>
            <ul className="space-y-2 text-sm text-red-700">
              <li className="flex justify-between">
                <span>Mon – Fri:</span>
                <span className="font-semibold text-red-900">10:00 – 22:00</span>
              </li>
              <li className="flex justify-between">
                <span>Sat – Sun:</span>
                <span className="font-semibold text-red-900">11:00 – 23:00</span>
              </li>
              <li className="pt-1 flex items-center text-xs text-red-600">
                <Clock className="w-4 h-4 mr-1" />
                <span>Subject to holiday changes</span>
              </li>
            </ul>
          </div>

          {/* Social + Newsletter */}
          <div>
            <h4 className="text-xl font-bold text-red-800 mb-4">Get Deals</h4>

            <div className="flex space-x-4 mb-4">
              {[
                { Icon: Instagram, url: 'https://www.instagram.com' },
                { Icon: Facebook, url: 'https://www.facebook.com' },
                { Icon: Twitter, url: 'https://www.twitter.com' }
              ].map(({ Icon, url }, idx) => (
                <a key={idx} href={url} target="_blank" rel="noopener noreferrer" aria-label={Icon.name} className="text-red-700 hover:text-red-900 transition duration-150">
                  <Icon className="w-6 h-6" />
                </a>
              ))}
            </div>

            <form onSubmit={handleSubscribe}>
              <p className="text-sm font-semibold text-red-700 mb-2">Subscribe for Weekly Updates:</p>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Your email"
                  className="w-full p-2 text-red-900 rounded-l-md focus:outline-none focus:ring-2 focus:ring-red-400"
                  required
                />
                <button
                  type="submit"
                  className="bg-red-600 hover:bg-red-700 text-white p-2 rounded-r-md transition duration-150"
                  aria-label="Subscribe"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
              {subscribeMessage && (
                <p className="text-sm text-green-600 mt-2">{subscribeMessage}</p>
              )}
            </form>
          </div>

        </div>

        {/* ---------- Bottom Row ---------- */}
        <div className="pt-8 border-t border-red-200 flex flex-col md:flex-row justify-between items-center text-sm">
          <span className="text-red-700">&copy; 2025 Your Takeaway. All rights reserved.</span>
          <div className="flex space-x-4 mt-2 md:mt-0">
            <a href="#" className="text-red-700 hover:text-red-900">Privacy Policy</a>
            <span className="text-red-400">|</span>
            <a href="#" className="text-red-700 hover:text-red-900">Terms of Service</a>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default HeroFooter;
