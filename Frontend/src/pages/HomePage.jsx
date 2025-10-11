import React from "react";
import { motion } from "framer-motion";

const HomePage = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section with background that shows the NavBar effect */}
      <section className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900 flex items-center justify-center relative overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white/5 via-transparent to-transparent"></div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center text-white z-10 px-4"
        >
          <h1 className="text-5xl md:text-7xl font-light mb-6 tracking-wider">
            Welcome to <span className="text-[#d4af37]">Élégance</span>
          </h1>
          <p className="text-xl md:text-2xl font-light text-white/80 mb-8 max-w-2xl mx-auto">
            Discover timeless luxury and sophisticated design
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-[#d4af37] text-white px-8 py-4 rounded-2xl hover:shadow-2xl transition-all duration-300"
          >
            <span className="text-lg font-medium">Explore Collections</span>
          </motion.button>
        </motion.div>
      </section>

      {/* Content sections to demonstrate scroll effect */}
      <section className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center text-gray-800">
          <h2 className="text-4xl font-light mb-4">
            Scroll down to see the effect
          </h2>
          <p className="text-lg text-gray-600">
            The navbar transforms elegantly as you scroll
          </p>
        </div>
      </section>

      <section className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center text-gray-800">
          <h2 className="text-4xl font-light mb-4">Smooth Transitions</h2>
          <p className="text-lg text-gray-600">
            Framer Motion powered animations
          </p>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
