'use client';

import React, { useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { LanguageSelector } from '@/components/language-selector';
import PremiumLogo from '@/components/PremiumLogo';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const { scrollY } = useScroll();
  const backgroundColor = useTransform(
    scrollY,
    [0, 100],
    ["rgba(var(--background), 0)", "rgba(var(--background), 0.8)"]
  );

  return (
    <motion.nav 
      className="fixed top-0 w-full z-50 backdrop-blur-xl border-b border-border/40"
      style={{ backgroundColor }}
    >
      <div className="container-responsive">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <PremiumLogo />
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {['Features', 'Pricing', 'Testimonials', 'FAQ'].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-muted-foreground hover:text-foreground transition-colors font-medium"
              >
                {item}
              </a>
            ))}
          </div>

          <div className="flex items-center space-x-3">
            {/* Desktop Language Selector */}
            <div className="hidden lg:block">
              <LanguageSelector />
            </div>
            
            {/* Desktop CTA */}
            <div className="hidden lg:flex items-center space-x-3">
              <motion.a
                href="#cta"
                className="px-6 py-2.5 rounded-full text-sm font-semibold cursor-pointer relative overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
                style={{ background: '#c1ff72', color: '#000' }}
                whileHover={{ scale: 1.02, y: -1 }}
                whileTap={{ scale: 0.98 }}
              >
                {/* Glow effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
                <span className="relative z-10">Get Started</span>
              </motion.a>
            </div>

            {/* Mobile Language Selector */}
            <div className="lg:hidden">
              <LanguageSelector />
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-accent transition-colors cursor-pointer"
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <motion.div
          initial={false}
          animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
          className="lg:hidden overflow-hidden"
        >
          <div className="py-4 space-y-4 border-t border-border">
            {['Features', 'Pricing', 'Testimonials', 'FAQ'].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="block py-2 text-muted-foreground hover:text-foreground transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {item}
              </a>
            ))}
            <div className="flex flex-col space-y-3 pt-4">
              <motion.a 
                href="#cta" 
                className="py-3 px-6 rounded-full text-sm font-semibold cursor-pointer text-center relative overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
                style={{ background: '#c1ff72', color: '#000' }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setIsOpen(false)}
              >
                {/* Glow effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
                <span className="relative z-10">Get Started</span>
              </motion.a>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.nav>
  );
} 