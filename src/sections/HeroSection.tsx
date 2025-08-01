'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowRight, 
  CheckCircle, 
  TrendingUp,
  Shield, 
  Clock, 
  Users,
  BarChart3, 
  Target
} from 'lucide-react';
import { getContent } from '@/lib/content';
import TextType from '@/components/TextType';
import StarBorder from '@/components/StarBorder';

export default function HeroSection() {
  const content = getContent();
  const { hero, links } = content;
  
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-28 pb-10">
      {/* Sophisticated Background System */}
      <div className="absolute inset-0 hero-gradient-system" />
      <div className="absolute inset-0 hero-mesh" />
      
      {/* Diagonal Accent Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-1/3 h-1/2 diagonal-accent-1" />
        <div className="absolute bottom-0 left-0 w-1/2 h-1/3 diagonal-accent-2" />
      </div>

      <div className="container-responsive relative z-10">
        <div className="space-y-12 max-w-7xl mx-auto">

          {/* Revolutionary Main Content Layout */}
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            {/* Left: Content */}
            <div className="space-y-8 text-left lg:pr-8">
              {/* Main Headline with Typing Effect */}
              <div className="space-y-4">
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1], delay: 0.2 }}
                  className="text-5xl sm:text-6xl md:text-6xl lg:text-7xl font-display font-bold leading-tight whitespace-normal sm:whitespace-nowrap overflow-visible"
                >
                  {/* Desktop: Typing Effect */}
                  <div className="hidden md:block">
                    <TextType
                      text={[
                        "Elite Trading",
                        "Premium Signals", 
                        "Smart Analytics",
                        "Pro Intelligence",
                        "Advanced Trading"
                      ]}
                      as="h1"
                      typingSpeed={100}
                      pauseDuration={2000}
                      deletingSpeed={50}
                      showCursor={true}
                      cursorCharacter="|"
                      cursorClassName="text-primary"
                      className="inline-block whitespace-nowrap text-black dark:text-white"
                    />
                  </div>
                  
                  {/* Mobile: Static Text */}
                  <div className="md:hidden">
                    <span className="text-black dark:text-white">{hero.title.split(' ')[0]} {hero.title.split(' ')[1]}</span>
                  </div>
                </motion.div>
                <motion.h2
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1], delay: 0.4 }}
                  className="text-5xl sm:text-6xl md:text-6xl lg:text-7xl font-display font-bold leading-tight whitespace-normal sm:whitespace-nowrap"
                  style={{ color: '#c1ff72' }}
                >
                  {hero.title.split(' ')[2]}
                </motion.h2>
              </div>

              {/* Premium Description */}
              <motion.p
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1], delay: 0.6 }}
                className="text-xl md:text-2xl text-muted-foreground leading-relaxed"
              >
                {hero.subtitle}
              </motion.p>

              {/* Action Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1], delay: 0.8 }}
                className="flex flex-col sm:flex-row gap-4"
              >
                <motion.a
                  href={links.primary.contact}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative px-8 py-4 font-semibold rounded-2xl overflow-hidden cursor-pointer"
                  style={{ background: '#c1ff72', color: '#000' }}
                  whileHover={{ y: -1 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                >
                  {/* Base Button Background */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#c1ff72] via-[#c1ff72] to-[#a8e85a]" />
                  
                  {/* Orbiting Light Animation */}
                  <div className="absolute inset-0 rounded-2xl overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute inset-0">
                      {/* Orbiting Light Trail */}
                      <div 
                        className="absolute w-16 h-1 bg-gradient-to-r from-transparent via-white/60 to-transparent rounded-full blur-sm"
                        style={{
                          top: '2px',
                          left: '50%',
                          transformOrigin: '50% 22px',
                          animation: 'orbit 2s linear infinite',
                        }}
                      />
                      {/* Secondary Light Trail (offset) */}
                      <div 
                        className="absolute w-12 h-0.5 bg-gradient-to-r from-transparent via-white/40 to-transparent rounded-full blur-sm"
                        style={{
                          top: '2px',
                          left: '50%',
                          transformOrigin: '50% 22px',
                          animation: 'orbit 2s linear infinite',
                          animationDelay: '1s',
                        }}
                      />
                    </div>
                  </div>
                  
                  {/* Sophisticated Inner Glow */}
                  <div className="absolute inset-[1px] rounded-2xl bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  {/* Micro Interaction - Ripple Effect */}
                  <div className="absolute inset-0 rounded-2xl">
                    <div className="absolute inset-0 rounded-2xl bg-white/5 scale-0 group-hover:scale-100 transition-transform duration-700 ease-out" />
                  </div>
                  
                  {/* Premium Text Animation */}
                  <span className="relative z-20 flex items-center justify-center">
                    <span className="transition-all duration-300 group-hover:text-shadow-sm">Start Trading Now</span>
                    <ArrowRight className="ml-3 w-5 h-5 transition-all duration-300 group-hover:translate-x-0.5" />
                  </span>
                  
                  {/* Elegant Drop Shadow */}
                  <div className="absolute inset-0 rounded-2xl shadow-lg shadow-[#c1ff72]/20 group-hover:shadow-xl group-hover:shadow-[#c1ff72]/30 transition-shadow duration-300 -z-10" />
                </motion.a>

                <StarBorder
                  as="a"
                  href={links.primary.academy}
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
              </motion.div>

              {/* Trust Indicators */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1], delay: 1.0 }}
                className="flex items-center space-x-6 text-sm text-muted-foreground"
              >
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-primary" />
                  <span>Verified Results</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Shield className="w-4 h-4 text-primary" />
                  <span>Risk Managed</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4 text-primary" />
                  <span>24/7 Active</span>
                </div>
              </motion.div>
            </div>

            {/* Right: Interactive Stats & Visuals */}
            <div className="relative">
              {/* Floating Stats Cards */}
              <div className="relative h-80 sm:h-96 lg:h-[500px]">
                {/* Main Stats Card */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8, y: 50 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1], delay: 0.5 }}
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10"
                >
                  <div className="bg-card/90 dark:bg-card/90 backdrop-blur-xl border border-border/50 dark:border-border/50 rounded-3xl p-6 sm:p-8 shadow-2xl shadow-primary/10 dark:shadow-primary/10 bg-white/95 dark:bg-card/90">
                    <div className="text-center space-y-4">
                      <motion.div
                        animate={{ 
                          scale: [1, 1.05, 1],
                          rotate: [0, 1, -1, 0]
                        }}
                        transition={{ 
                          duration: 4,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                        className="w-12 h-12 sm:w-16 sm:h-16 mx-auto bg-gradient-to-br from-[#c1ff72] to-[#a8e85a] rounded-2xl flex items-center justify-center shadow-lg shadow-[#c1ff72]/25"
                      >
                        <TrendingUp className="w-6 h-6 sm:w-8 sm:h-8 text-black stroke-[2.5]" />
                      </motion.div>
                      <div>
                        <motion.div 
                          className="text-3xl sm:text-4xl font-bold"
                          style={{ color: '#c1ff72' }}
                          animate={{ opacity: [0.7, 1, 0.7] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        >
                          {hero.stats.winRate}
                        </motion.div>
                        <div className="text-xs sm:text-sm text-muted-foreground">Win Rate</div>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Floating Stat 1 */}
                <motion.div
                  initial={{ opacity: 0, x: -100, y: 0 }}
                  animate={{ opacity: 1, x: 0, y: 0 }}
                  transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1], delay: 0.7 }}
                  className="absolute top-4 sm:top-8 md:top-12 left-1 sm:left-2"
                >
                  <motion.div
                    animate={{ 
                      y: [0, -10, 0],
                      rotate: [0, 2, -2, 0]
                    }}
                    transition={{ 
                      duration: 6,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                    className="bg-white/95 dark:bg-card/80 backdrop-blur-sm border border-border/30 dark:border-border/30 rounded-2xl p-3 sm:p-4 shadow-lg dark:shadow-lg"
                  >
                    <div className="flex items-center space-x-2 sm:space-x-3">
                      <div className="w-8 h-8 sm:w-10 sm:h-10 bg-primary/20 rounded-xl flex items-center justify-center">
                        <Users className="w-4 h-4 sm:w-5 sm:h-5" style={{ color: '#c1ff72' }} />
                      </div>
                      <div>
                        <div className="text-lg sm:text-2xl font-bold text-foreground">{hero.stats.members}</div>
                        <div className="text-xs text-muted-foreground">Academy</div>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>

                {/* Floating Stat 2 */}
                <motion.div
                  initial={{ opacity: 0, x: 100, y: 0 }}
                  animate={{ opacity: 1, x: 0, y: 0 }}
                  transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1], delay: 0.9 }}
                  className="absolute top-8 sm:top-16 md:top-24 right-1 sm:right-2"
                >
                  <motion.div
                    animate={{ 
                      y: [0, 10, 0],
                      rotate: [0, -2, 2, 0]
                    }}
                    transition={{ 
                      duration: 5,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 1
                    }}
                    className="bg-white/95 dark:bg-card/80 backdrop-blur-sm border border-border/30 dark:border-border/30 rounded-2xl p-3 sm:p-4 shadow-lg dark:shadow-lg"
                  >
                    <div className="flex items-center space-x-2 sm:space-x-3">
                      <div className="w-8 h-8 sm:w-10 sm:h-10 bg-primary/20 rounded-xl flex items-center justify-center">
                        <BarChart3 className="w-4 h-4 sm:w-5 sm:h-5" style={{ color: '#c1ff72' }} />
                      </div>
                      <div>
                        <div className="text-lg sm:text-2xl font-bold text-foreground">{hero.stats.vip}</div>
                        <div className="text-xs text-muted-foreground">VIP</div>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>

                {/* Floating Stat 3 */}
                <motion.div
                  initial={{ opacity: 0, x: -80, y: 100 }}
                  animate={{ opacity: 1, x: 0, y: 0 }}
                  transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1], delay: 1.1 }}
                  className="absolute bottom-8 sm:bottom-12 md:bottom-16 left-1 sm:left-2 md:left-8"
                >
                  <motion.div
                    animate={{ 
                      y: [0, -8, 0],
                      scale: [1, 1.02, 1]
                    }}
                    transition={{ 
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 2
                    }}
                    className="bg-white/95 dark:bg-card/80 backdrop-blur-sm border border-border/30 dark:border-border/30 rounded-2xl p-3 sm:p-4 shadow-lg dark:shadow-lg"
                  >
                    <div className="flex items-center space-x-2 sm:space-x-3">
                      <div className="w-8 h-8 sm:w-10 sm:h-10 bg-primary/20 rounded-xl flex items-center justify-center">
                        <Clock className="w-4 h-4 sm:w-5 sm:h-5" style={{ color: '#c1ff72' }} />
                      </div>
                      <div>
                        <div className="text-lg sm:text-2xl font-bold text-foreground">{hero.stats.support}</div>
                        <div className="text-xs text-muted-foreground">Support</div>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>

                {/* Floating Stat 4 */}
                <motion.div
                  initial={{ opacity: 0, x: 80, y: 100 }}
                  animate={{ opacity: 1, x: 0, y: 0 }}
                  transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1], delay: 1.3 }}
                  className="absolute bottom-2 sm:bottom-4 md:bottom-8 right-1 sm:right-2 md:right-12"
                >
                  <motion.div
                    animate={{ 
                      y: [0, 8, 0],
                      rotate: [0, 1, -1, 0]
                    }}
                    transition={{ 
                      duration: 7,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 3
                    }}
                    className="bg-white/95 dark:bg-card/80 backdrop-blur-sm border border-border/30 dark:border-border/30 rounded-2xl p-3 sm:p-4 shadow-lg dark:shadow-lg"
                  >
                    <div className="flex items-center space-x-2 sm:space-x-3">
                      <div className="w-8 h-8 sm:w-10 sm:h-10 bg-primary/20 rounded-xl flex items-center justify-center">
                        <Target className="w-4 h-4 sm:w-5 sm:h-5" style={{ color: '#c1ff72' }} />
                      </div>
                      <div>
                        <div className="text-lg sm:text-2xl font-bold text-foreground">{hero.stats.experience}</div>
                        <div className="text-xs text-muted-foreground">Years</div>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>

                {/* Connection Lines Animation */}
                <div className="absolute inset-0 overflow-hidden">
                  <svg className="w-full h-full opacity-20">
                    <motion.path
                      d="M100,50 Q200,100 300,150 T500,200"
                      stroke="rgb(var(--primary))"
                      strokeWidth="2"
                      fill="none"
                      strokeDasharray="5,5"
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={{ pathLength: 1, opacity: 0.3 }}
                      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    />
                    <motion.path
                      d="M400,80 Q300,150 200,220 T50,300"
                      stroke="rgb(var(--primary))"
                      strokeWidth="2"
                      fill="none"
                      strokeDasharray="3,7"
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={{ pathLength: 1, opacity: 0.2 }}
                      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                    />
                  </svg>
                </div>

                {/* Ambient Glow Effects */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-pulse" />
                <div className="absolute top-1/4 right-1/4 w-32 h-32 bg-primary/5 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '1s' }} />
                <div className="absolute bottom-1/4 left-1/4 w-48 h-48 bg-primary/8 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
              </div>
            </div>
          </div>

          {/* Bottom Trust Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1], delay: 0.8 }}
            className="pt-8 sm:pt-12"
          >
            <div className="bg-white/95 dark:bg-card/30 backdrop-blur-sm border border-border/30 dark:border-border/30 rounded-2xl p-6 sm:p-8 shadow-lg dark:shadow-lg">
              <div className="flex flex-col lg:flex-row items-center justify-center space-y-6 lg:space-y-0 lg:space-x-12 text-sm">
                <div className="flex items-center space-x-3">
                  <div className="flex -space-x-2">
                    {[1,2,3,4,5].map(i => (
                      <motion.div 
                        key={i} 
                        className="w-8 h-8 rounded-full bg-primary/20 border-2 border-background flex items-center justify-center text-xs font-medium text-primary"
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
                      >
                        {i}
                      </motion.div>
                    ))}
                  </div>
                  <span className="font-medium text-foreground">Trusted by 35,000+ Academy Members</span>
                </div>
                
                <div className="h-px w-16 bg-border lg:h-6 lg:w-px" />
                
                <div className="flex items-center space-x-3">
                  <div className="flex items-center space-x-1">
                    {[1,2,3,4,5].map(i => (
                      <motion.div key={i} className="w-4 h-4 text-yellow-500 fill-current">⭐</motion.div>
                    ))}
                  </div>
                  <span className="font-medium text-foreground">4.9/5 Average Rating</span>
                </div>
                
                <div className="h-px w-16 bg-border lg:h-6 lg:w-px" />
                
                <div className="flex items-center space-x-3">
                  <motion.div 
                    className="w-3 h-3 rounded-full bg-green-500 shadow-lg shadow-green-500/50"
                    animate={{ 
                      opacity: [0.5, 1, 0.5],
                      scale: [1, 1.2, 1]
                    }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  />
                  <span className="font-medium text-foreground">Live Trading Active</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
} 