'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Globe, ArrowUpRight } from 'lucide-react';
import { getContent } from '@/lib/content';

export default function Footer() {
  const content = getContent();
  const { links } = content;
  
  return (
    <footer className="py-20 border-t border-border/20 relative bg-gradient-to-b from-background to-background/95">
      <div className="container-responsive">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="lg:col-span-2">
            <div className="flex flex-col items-start mb-8">
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
                />
              </div>
              <span className="text-[10px] font-bold text-white/90 tracking-wider -mt-1">
                ACADEMY
              </span>
            </div>
            <p className="text-muted-foreground mb-8 max-w-lg leading-relaxed text-base">
              Professional trading signals service delivering consistent results to serious traders worldwide. 
              Trusted by 35,000+ academy members with 5+ years of proven experience.
            </p>
            <div className="flex items-center space-x-4">
              <motion.a
                href="#"
                className="flex items-center space-x-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                whileHover={{ x: 2 }}
              >
                <span>Learn More</span>
                <ArrowUpRight className="w-3 h-3" />
              </motion.a>
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold mb-6 text-foreground">Company</h4>
            <ul className="space-y-4 text-muted-foreground">
              {links.footer.company.map((link, index) => (
                <li key={index}>
                  <a href={link.url} className="hover:text-foreground transition-colors duration-200">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-6 text-foreground">Legal</h4>
            <ul className="space-y-4 text-muted-foreground">
              {links.footer.legal.map((link, index) => (
                <li key={index}>
                  <a href={link.url} className="hover:text-foreground transition-colors duration-200">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className="border-t border-border/20 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8">
                          <p className="text-muted-foreground/70 text-sm">
                © {new Date().getFullYear()} Spleux Trading Services. All rights reserved.
              </p>
            
            {/* Minimal made by section */}
            <div className="flex items-center space-x-4 text-muted-foreground/50 text-xs">
              <div className="flex items-center space-x-1">
                <span>Made by</span>
                <a
                  href="https://abdellah-raissouni-2025.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-muted-foreground/80 transition-colors duration-200"
                >
                  Abdellah Raissouni
                </a>
              </div>
              
              {/* Admin link - subtle but visible */}
              <a
                href="/admin"
                className="opacity-50 hover:opacity-90 transition-all duration-300 text-xs px-2 py-1 rounded-md hover:bg-muted-foreground/10 border border-transparent hover:border-border/30"
                title="Admin Portal"
              >
                ⚙
              </a>
            </div>
          </div>
          
          <div className="flex items-center space-x-6 mt-4 md:mt-0">
            <motion.a 
              href="#" 
              className="text-muted-foreground/60 hover:text-foreground transition-colors duration-200"
              whileHover={{ scale: 1.1 }}
            >
              <Globe className="w-4 h-4" />
            </motion.a>
          </div>
        </div>
      </div>
    </footer>
  );
} 