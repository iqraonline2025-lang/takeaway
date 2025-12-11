import React, { useRef } from 'react';
import Navbar from '../components/Navbar';
import HeroSection from '../components/PremiumHeroSection';
import FeaturedSection from '../components/FeaturedSection';
import AboutUs from '../components/AboutUs';
import TestimonialSlider from '../components/TestimonialsSection';
import ContactSection from '../components/ContactSection';
import HeroFooter from '../components/Footer';

const Home = () => {
  const featuredRef = useRef(null);

  return (
    <>
      <Navbar />
      <HeroSection featuredRef={featuredRef} />
      <FeaturedSection ref={featuredRef} />
      <AboutUs />
      <TestimonialSlider />
      <ContactSection />
      <HeroFooter />
    </>
  );
};

export default Home;
