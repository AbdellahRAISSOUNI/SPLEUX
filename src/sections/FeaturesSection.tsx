'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle, Shield } from 'lucide-react';
import MagicBento from '@/components/MagicBento';
import SpotlightCard from '@/components/SpotlightCard';
import StarBorder from '@/components/StarBorder';
import AnimatedSection from './AnimatedSection';

export default function FeaturesSection() {
  return (
    <section id="features" className="py-20 lg:py-32 relative overflow-hidden">
      {/* Elegant background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 -right-40 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -left-40 w-80 h-80 bg-primary/8 rounded-full blur-3xl" />
      </div>
      
      <div className="container-responsive relative">
        {/* Enhanced Section Header */}
        <AnimatedSection className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="relative inline-flex items-center px-6 py-3 rounded-full mb-8"
            style={{ 
              background: 'linear-gradient(135deg, rgba(193, 255, 114, 0.1) 0%, rgba(126, 247, 71, 0.05) 100%)',
              border: '1px solid rgba(193, 255, 114, 0.2)'
            }}
          >
            <motion.div 
              className="w-2 h-2 rounded-full mr-3"
              style={{ backgroundColor: '#c1ff72' }}
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.7, 1, 0.7]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <span className="text-sm font-semibold tracking-wide" style={{ color: '#c1ff72' }}>
              PROFESSIONAL TRADING PLATFORM
            </span>
            <motion.div 
              className="w-2 h-2 rounded-full ml-3"
              style={{ backgroundColor: '#c1ff72' }}
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.7, 1, 0.7]
              }}
              transition={{ duration: 2, repeat: Infinity, delay: 1 }}
            />
            
            {/* Subtle glow effect */}
            <div 
              className="absolute inset-0 rounded-full blur-xl opacity-30"
              style={{ background: 'rgba(193, 255, 114, 0.3)' }}
            />
          </motion.div>
          
          <h2 className="text-5xl md:text-7xl font-display font-bold mb-8 leading-tight">
            <span className="block mb-2">Why Professionals</span>
            <span className="block">
              Choose{" "}
              <span 
                className="relative inline-block"
                style={{ color: '#c1ff72' }}
              >
              Spleux
                <motion.div
                  className="absolute -bottom-2 left-0 h-1 rounded-full"
                  style={{ 
                    background: 'linear-gradient(90deg, #c1ff72 0%, rgba(126, 247, 71, 0.5) 100%)',
                    width: '100%'
                  }}
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  transition={{ duration: 1, delay: 0.5 }}
                />
              </span>
            </span>
          </h2>
          
          <motion.p 
            className="text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Advanced trading infrastructure trusted by{" "}
            <span className="font-semibold" style={{ color: '#c1ff72' }}>35,000+ academy members</span>{" "}
            worldwide. <span className="font-semibold" style={{ color: '#c1ff72' }}>5+ years</span> of proven 
            experience with 24/7 support and daily market insights.
          </motion.p>

          {/* Premium stats row */}
          <motion.div
            className="flex flex-wrap justify-center gap-8 text-sm"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {[
              { label: "Win Rate", value: "97%" },
              { label: "Members", value: "35K+" },
              { label: "Experience", value: "5+ Years" },
              { label: "Support", value: "24/7" }
            ].map((stat) => (
              <div key={stat.label} className="flex items-center space-x-2">
                <div 
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: '#c1ff72' }}
                />
                <span className="font-medium text-foreground">{stat.label}:</span>
                <span className="font-bold" style={{ color: '#c1ff72' }}>{stat.value}</span>
                    </div>
            ))}
          </motion.div>
        </AnimatedSection>

        {/* MagicBento Grid */}
        <AnimatedSection className="flex justify-center" delay={0.6}>
          <MagicBento 
            textAutoHide={true}
            enableStars={false}
            enableSpotlight={true}
            enableBorderGlow={false}
            enableTilt={false}
            enableMagnetism={false}
            clickEffect={false}
            spotlightRadius={400}
            particleCount={8}
            glowColor="193, 255, 114"
          />
                </AnimatedSection>
        
        {/* Join Our Community Section */}
        <AnimatedSection className="mt-20" delay={0.8}>
          <div className="max-w-5xl mx-auto">
            <SpotlightCard 
              className="bg-gradient-to-br from-black/90 to-gray-900/90 border-gray-700"
              spotlightColor="rgba(193, 255, 114, 0.15)"
            >
              <div className="text-center space-y-8">
                {/* Header */}
                <div className="space-y-4">
                  <motion.h3 
                    className="text-4xl md:text-5xl font-display font-bold text-white"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                  >
                    Join Our <span style={{ color: '#c1ff72' }}>Community</span>
                  </motion.h3>
                  <motion.p 
                    className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                  >
                    Connect with 35,000+ academy members, get exclusive signals, and access our premium trading community on Telegram.
                  </motion.p>
                          </div>
                          
                {/* Stats Grid */}
                              <motion.div
                  className="grid grid-cols-2 md:grid-cols-4 gap-6"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  {[
                    { number: "35K+", label: "Academy Members" },
                    { number: "700+", label: "VIP Traders" },
                    { number: "97%", label: "Win Rate" },
                    { number: "24/7", label: "Support" }
                  ].map((stat, index) => (
                    <div key={index} className="text-center">
                      <div className="text-3xl font-bold text-white mb-1" style={{ color: '#c1ff72' }}>
                        {stat.number}
                            </div>
                      <div className="text-sm text-gray-400">
                        {stat.label}
                          </div>
                        </div>
                  ))}
              </motion.div>

                {/* CTA Buttons */}
            <motion.div
                  className="flex flex-col sm:flex-row gap-4 justify-center items-center"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                >
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
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
                      </svg>
                      <span className="font-semibold">Join Telegram</span>
                </div>
                  </StarBorder>

              <motion.button
                    className="px-8 py-4 rounded-2xl font-semibold cursor-pointer border border-gray-600 hover:border-gray-500 transition-all duration-300"
                    style={{ 
                      background: 'linear-gradient(135deg, rgba(193, 255, 114, 0.1) 0%, rgba(193, 255, 114, 0.05) 100%)',
                      color: '#c1ff72'
                    }}
                whileHover={{ scale: 1.02, y: -1 }}
                whileTap={{ scale: 0.98 }}
              >
                    <div className="flex items-center space-x-3">
                      <ArrowRight className="w-5 h-5" />
                      <span>Start Free Trial</span>
                    </div>
              </motion.button>
                </motion.div>

                {/* Trust Indicators */}
                <motion.div 
                  className="flex flex-wrap justify-center items-center gap-6 text-sm text-gray-400"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    <span>Live Trading Active</span>
                    </div>
                  <div className="h-4 w-px bg-gray-600" />
                  <div className="flex items-center space-x-2">
                    <Shield className="w-4 h-4 text-gray-400" />
                    <span>100% Secure</span>
                </div>
                  <div className="h-4 w-px bg-gray-600" />
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>Verified Results</span>
          </div>
                </motion.div>
            </div>
            </SpotlightCard>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
} 