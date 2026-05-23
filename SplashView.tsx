import React from 'react';
import { motion } from 'motion/react';
import { Leaf, ArrowRight, Compass, ShieldCheck } from 'lucide-react';

interface SplashViewProps {
  onStart: () => void;
}

export default function SplashView({ onStart }: SplashViewProps) {
  return (
    <div 
      id="splash-container"
      className="relative flex flex-col justify-between min-h-screen bg-[#0E1511] text-[#EFEFEF] overflow-hidden font-sans px-6 py-12"
    >
      {/* Background Image Panel representing green nature / eco-friendly textures */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-30 mix-blend-color-burn md:mix-blend-normal transition-opacity duration-700"
        style={{ 
          backgroundImage: 'url("https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=800")'
        }}
      />
      
      {/* Dynamic Overlay Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0E1511]/20 via-[#0E1511]/75 to-[#0E1511]" />

      {/* Brand Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 flex items-center justify-center gap-2 mt-4"
      >
        <div className="bg-gradient-to-tr from-[#2E7D32] to-[#4CAF50] p-2.5 rounded-2xl shadow-xl">
          <Leaf className="w-6 h-6 text-white" />
        </div>
        <span className="text-xl font-bold tracking-wider text-white font-sans">
          Eco<span className="text-[#4CAF50]">Shop</span>
        </span>
      </motion.div>

      {/* Central Content Callout */}
      <div className="relative z-10 flex flex-col items-center justify-end max-w-md mx-auto mt-auto mb-6 text-center">
        <motion.h1 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-4xl md:text-5xl font-semibold tracking-tight leading-tight text-white mb-4"
        >
          Sustain, Style, <br />
          <span className="text-[#4CAF50] font-bold relative inline-block">
            Smile.
            <span className="absolute bottom-1 left-0 w-full h-1 bg-[#4CAF50]/40 rounded-full" />
          </span> Your Green Life.
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-[#98A39C] text-sm md:text-base leading-relaxed mb-10 px-4"
        >
          Discover curated green products, from recycled essentials and organic care to sustainable fashion and smart energy savers.
        </motion.p>

        {/* Action Button */}
        <motion.button
          id="btn-get-started"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          onClick={onStart}
          className="w-full flex items-center justify-center gap-3 bg-[#2E7D32] hover:bg-[#388E3C] text-white py-4 px-8 rounded-2xl font-semibold text-base transition-colors duration-300 shadow-lg shadow-[#2E7D32]/20 cursor-pointer"
        >
          Start Exploring
          <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
        </motion.button>
      </div>

      {/* Small Aesthetic Badges */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 1 }}
        className="relative z-10 flex items-center justify-center gap-6 mt-4 text-xs text-[#5D6B60]"
      >
        <span className="flex items-center gap-1.5">
          <Compass className="w-4 h-4 text-[#4CAF50]" /> Track Carbon Footprint
        </span>
        <span className="w-1 h-1 bg-[#3A473E] rounded-full" />
        <span className="flex items-center gap-1.5">
          <ShieldCheck className="w-4 h-4 text-[#4CAF50]" /> 100% Certified Eco
        </span>
      </motion.div>
    </div>
  );
}
