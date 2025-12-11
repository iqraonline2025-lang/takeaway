// HeroVideoSection.jsx

import React from "react";
import { motion } from "framer-motion";
import takeawayVideo from "/images/hhs2.mp4";

const HeroVideoSection = ({ featuredRef }) => {
  const handleOrderClick = () => {
    featuredRef?.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center text-white overflow-hidden">

      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-10"
      >
        <source src={takeawayVideo} type="video/mp4" />
      </video>

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/60 z-20"></div>

      {/* Animated Content */}
      <div className="relative z-30 text-center px-4">

        {/* Floating Animated Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="text-5xl md:text-7xl font-extrabold drop-shadow-2xl mb-6"
        >
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 1 }}
            className="inline-block animate-pulse"
          >
            Fresh,
          </motion.span>{" "}
          <motion.span
            initial={{ x: -80, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 1.4, duration: 0.9 }}
            className="text-red-500 inline-block"
          >
            Hot,
          </motion.span>{" "}
          <motion.span
            initial={{ x: 80, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 1.6, duration: 0.9 }}
            className="inline-block"
          >
            Delivered Fast
          </motion.span>
        </motion.h1>

        {/* Subtext Animation */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="text-xl md:text-2xl font-light text-gray-200 mb-4"
        >
          Your favourite meals, delivered with unbeatable speed.
        </motion.p>

        {/* ⭐ NEW Extra Line ⭐ */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.6, duration: 1 }}
          className="text-lg md:text-xl text-gray-300 mb-10"
        >
          Open 7 days a week — Freshly cooked, packed with flavour.
        </motion.p>

        {/* Button Animation */}
        <motion.div
          initial={{ scale: 0.7, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 3, duration: 0.6 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <motion.button
            onClick={handleOrderClick}
            className="
              relative
              bg-red-600 
              hover:bg-red-700 
              text-white 
              font-bold 
              py-4 px-14 
              rounded-full 
              text-xl 
              shadow-[0_4px_20px_rgba(255,0,0,0.4)]
              overflow-hidden
              transition-shadow duration-300
            "
            whileHover={{ boxShadow: "0 8px 30px rgba(255,0,0,0.6)" }}
          >
            {/* Animated glow effect */}
            <motion.div
              className="absolute inset-0 rounded-full bg-red-500 opacity-0"
              animate={{ opacity: [0, 0.2, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <span className="relative z-10">Order Now</span>
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroVideoSection;
