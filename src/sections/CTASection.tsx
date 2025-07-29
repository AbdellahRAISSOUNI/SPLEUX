'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import StarBorder from '@/components/StarBorder';
import AnimatedSection from './AnimatedSection';

export default function CTASection() {
  return (
    <section className="py-20 lg:py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-primary/5" />
      <div className="absolute inset-0 grid-pattern opacity-10" />
      
      <div className="container-responsive relative">
        <AnimatedSection className="text-center max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-6">
            Ready to Transform Your Trading?
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground mb-12 leading-relaxed">
            Join our global community of 35,000+ academy members who have elevated their performance with Spleux. 
            Start your journey with 5+ years of proven experience and daily free signals.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <motion.button
              className="px-8 py-4 rounded-full text-lg font-semibold flex items-center space-x-2 group cursor-pointer"
              style={{ background: '#c1ff72', color: '#000' }}
              whileHover={{ scale: 1.02, y: -1 }}
              whileTap={{ scale: 0.98 }}
            >
              <span>Start Free Trial</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </motion.button>
            
            <StarBorder
              as="a"
              href="https://t.me/spleux"
              target="_blank"
              rel="noopener noreferrer"
              color="#c1ff72"
              speed="4s"
              className="cursor-pointer"
            >
              <div className="flex items-center space-x-3">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
                </svg>
                <span className="font-semibold">Join Telegram</span>
              </div>
            </StarBorder>
          </div>

          <div className="mt-12 text-sm text-muted-foreground">
            <span className="font-medium">Risk Disclaimer:</span> Trading involves substantial risk. 
            Past performance does not guarantee future results.
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
} 