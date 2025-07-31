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
                className="px-6 py-2.5 rounded-full text-sm font-semibold cursor-pointer"
                style={{ background: '#c1ff72', color: '#000' }}
                whileHover={{ scale: 1.02, y: -1 }}
                whileTap={{ scale: 0.98 }}
              >
                Get Started
              </motion.a>
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
          <div className="py-6 space-y-6 border-t border-border">
            {/* Navigation Links */}
            <div className="space-y-4">
              {['Features', 'Pricing', 'Testimonials', 'FAQ'].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="block py-3 text-muted-foreground hover:text-foreground transition-colors font-medium"
                  onClick={() => setIsOpen(false)}
                >
                  {item}
                </a>
              ))}
            </div>
            
            {/* Mobile Language Selector */}
            <div className="pt-4 border-t border-border/50">
              <div className="mb-4">
                <span className="text-sm font-medium text-muted-foreground mb-3 block">Language</span>
                <LanguageSelector />
              </div>
            </div>
            
            {/* Mobile CTA */}
            <div className="pt-4 border-t border-border/50">
              <motion.a 
                href="#cta" 
                className="block w-full py-4 px-6 rounded-full text-base font-semibold cursor-pointer text-center"
                style={{ background: '#c1ff72', color: '#000' }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setIsOpen(false)}
              >
                Get Started
              </motion.a>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.nav>
  );
} 