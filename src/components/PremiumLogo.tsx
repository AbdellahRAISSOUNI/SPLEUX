'use client';

import React from 'react';
import { motion } from 'framer-motion';

export default function PremiumLogo() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <motion.div 
      className="flex flex-col items-center justify-center cursor-pointer group relative"
      onClick={scrollToTop}
      whileHover={{ 
        scale: 1.02,
        transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }
      }}
      whileTap={{ scale: 0.98 }}
    >
      {/* Subtle gradient glow background */}
      <motion.div
        className="absolute inset-0 rounded-full bg-gradient-to-r from-[#c1ff72]/5 to-[#a8e85a]/5 blur-xl"
        initial={{ opacity: 0, scale: 0.8 }}
        whileHover={{ 
          opacity: 1, 
          scale: 1.2,
          transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }
        }}
      />
      <motion.div className="relative">
        <div className="relative">
          <span className="font-display font-bold text-2xl lg:text-3xl bg-gradient-to-r from-[#c1ff72] to-[#a8e85a] bg-clip-text text-transparent">
            SPLEUX
          </span>
                     <motion.img
             src="/arrow.png"
             alt="Arrow"
             className="absolute w-4 h-4 lg:w-5 lg:h-5 opacity-90"
             style={{
               left: 'calc(50% - 0.2rem)',
               top: '-0.5rem',
               transform: 'translateX(-50%)'
             }}
             whileHover={{ 
               scale: 1.15,
               rotate: 5,
               transition: { duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }
             }}
           />
        </div>
        
        {/* Premium underline effect */}
        <motion.div
          className="absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-[#c1ff72] to-[#a8e85a]"
          initial={{ width: 0 }}
          whileHover={{ width: "100%" }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        />
      </motion.div>
      
                          <motion.span 
          className="text-[10px] font-bold text-white/90 tracking-wider -mt-1"
          whileHover={{ 
            opacity: 1,
            y: -2,
            transition: { duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }
          }}
          initial={{ opacity: 0.8 }}
        >
          ACADEMY
        </motion.span>
    </motion.div>
  );
} 