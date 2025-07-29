'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Globe } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="py-16 border-t border-border relative">
      <div className="container-responsive">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-2 mb-6">
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-primary/60 rounded-lg flex items-center justify-center">
                <span className="font-bold text-primary-foreground text-sm">S</span>
              </div>
              <span className="font-display font-bold text-xl">Spleux</span>
            </div>
            <p className="text-muted-foreground mb-6 max-w-md leading-relaxed">
              Professional trading signals service delivering consistent results to serious traders worldwide. 
              Trusted by 35,000+ academy members with 5+ years of proven experience.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-3 text-muted-foreground">
              <li><a href="#" className="hover:text-foreground transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Contact</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Support</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Blog</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Legal</h4>
            <ul className="space-y-3 text-muted-foreground">
              <li><a href="#" className="hover:text-foreground transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Risk Disclosure</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Cookies</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8">
            <p className="text-muted-foreground text-sm">
              © 2025 Spleux Trading Services. All rights reserved.
            </p>
            
            {/* Made by Abdellah Raissouni */}
            <motion.a
              href="https://abdellah-raissouni-2025.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center space-x-2 text-muted-foreground hover:text-foreground transition-all duration-300 cursor-pointer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="text-sm font-medium">Made by</span>
              <span className="text-sm font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent group-hover:from-primary group-hover:to-primary transition-all duration-300">
                Abdellah Raissouni
              </span>
              <motion.div
                className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                initial={{ rotate: 0 }}
                whileHover={{ rotate: 180 }}
                transition={{ duration: 0.3 }}
              >
                <Globe className="w-4 h-4" style={{ color: '#c1ff72' }} />
              </motion.div>
            </motion.a>
          </div>
          
          <div className="flex items-center space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
              <Globe className="w-5 h-5" />
            </a>
          </div>
        </div>
        </div>
      </footer>
  );
} 