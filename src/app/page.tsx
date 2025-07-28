'use client';

import React from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { 
  ArrowRight, 
  CheckCircle, 
  TrendingUp,
  Shield, 
  Clock, 
  Users,
  BarChart3, 
  Target, 
  Star,
  Globe,
  Menu,
  X
} from 'lucide-react';
import { useRef, useState } from 'react';
import { ThemeToggle } from '@/components/theme-toggle';
import { LanguageSelector } from '@/components/language-selector';
import TextType from '@/components/TextType';
import MagicBento from '@/components/MagicBento';
import StarBorder from '@/components/StarBorder';
import SpotlightCard from '@/components/SpotlightCard';
import { cn } from '@/lib/utils';

// Animation variants - keeping for potential future use
// const fadeInUp = {
//   initial: { opacity: 0, y: 30 },
//   animate: { opacity: 1, y: 0 },
//   transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }
// };

// const slideIn = {
//   initial: { opacity: 0, x: -30 },
//   animate: { opacity: 1, x: 0 },
//   transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }
// };

// const scaleIn = {
//   initial: { opacity: 0, scale: 0.8 },
//   animate: { opacity: 1, scale: 1 },
//   transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }
// };

// const staggerContainer = {
//   animate: {
//     transition: {
//       staggerChildren: 0.1
//     }
//   }
// };

function AnimatedSection({ 
  children, 
  className = "",
  delay = 0,
  variant = "fadeUp"
}: { 
  children: React.ReactNode; 
  className?: string;
  delay?: number;
  variant?: "fadeUp" | "slideIn" | "scaleIn";
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const variants = {
    fadeUp: { initial: { opacity: 0, y: 30 }, animate: { opacity: 1, y: 0 } },
    slideIn: { initial: { opacity: 0, x: -30 }, animate: { opacity: 1, x: 0 } },
    scaleIn: { initial: { opacity: 0, scale: 0.8 }, animate: { opacity: 1, scale: 1 } }
  };

  return (
    <motion.div
      ref={ref}
      initial={variants[variant].initial}
      animate={isInView ? variants[variant].animate : variants[variant].initial}
      transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1], delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function Navigation() {
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
            className="flex items-center space-x-2"
          >
            <div className="w-8 h-8 bg-gradient-to-br from-[#c1ff72] to-[#a8e85a] rounded-lg flex items-center justify-center">
              <TrendingUp className="w-4 h-4 text-black stroke-[2.5]" />
          </div>
            <span className="font-display font-bold text-xl">SPLEUX</span>
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
            <LanguageSelector />
            <ThemeToggle />
            
            {/* Desktop CTA */}
            <div className="hidden lg:flex items-center space-x-3">
              <button className="px-4 py-2 text-sm font-medium text-foreground hover:text-primary transition-colors cursor-pointer">
                Sign In
              </button>
              <motion.button
                className="px-6 py-2.5 rounded-full text-sm font-semibold cursor-pointer"
                style={{ background: '#c1ff72', color: '#000' }}
                whileHover={{ scale: 1.02, y: -1 }}
                whileTap={{ scale: 0.98 }}
              >
              Get Started
              </motion.button>
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
               <div className="flex items-center justify-between">
                 <LanguageSelector />
                 <ThemeToggle />
               </div>
               <button className="py-2 text-sm font-medium text-foreground cursor-pointer">
                 Sign In
               </button>
               <button className="py-2.5 rounded-full text-sm font-semibold cursor-pointer" style={{ background: '#c1ff72', color: '#000' }}>
                 Get Started
               </button>
             </div>
          </div>
        </motion.div>
      </div>
    </motion.nav>
  );
}

function HeroSection() {
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
                </motion.div>
                <motion.h2
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1], delay: 0.4 }}
                  className="text-5xl sm:text-6xl md:text-6xl lg:text-7xl font-display font-bold leading-tight whitespace-normal sm:whitespace-nowrap"
                  style={{ color: '#c1ff72' }}
                >
                  Intelligence
                </motion.h2>
              </div>

              {/* Premium Description */}
              <motion.p
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1], delay: 0.6 }}
                className="text-xl md:text-2xl text-muted-foreground leading-relaxed"
              >
                Advanced algorithmic signals with{" "}
                <span className="font-semibold" style={{ color: '#c1ff72' }}>97% accuracy</span>.
                Join our global community of 35,000+ members with 5+ years of proven success.
              </motion.p>

              {/* Action Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1], delay: 0.8 }}
                className="flex flex-col sm:flex-row gap-4"
              >
                <motion.button
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
                  <div className="bg-card/90 dark:bg-card/90 backdrop-blur-xl border border-border/50 dark:border-border/50 rounded-3xl p-8 shadow-2xl shadow-primary/10 dark:shadow-primary/10 bg-white/95 dark:bg-card/90">
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
                        className="w-16 h-16 mx-auto bg-gradient-to-br from-[#c1ff72] to-[#a8e85a] rounded-2xl flex items-center justify-center shadow-lg shadow-[#c1ff72]/25"
                      >
                        <TrendingUp className="w-8 h-8 text-black stroke-[2.5]" />
                      </motion.div>
                      <div>
                        <motion.div 
                          className="text-4xl font-bold"
                          style={{ color: '#c1ff72' }}
                          animate={{ opacity: [0.7, 1, 0.7] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        >
                          97%
                        </motion.div>
                        <div className="text-sm text-muted-foreground">Win Rate</div>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Floating Stat 1 */}
                <motion.div
                  initial={{ opacity: 0, x: -100, y: 0 }}
                  animate={{ opacity: 1, x: 0, y: 0 }}
                  transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1], delay: 0.7 }}
                  className="absolute top-8 sm:top-12 left-0 sm:left-2"
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
                    className="bg-white/95 dark:bg-card/80 backdrop-blur-sm border border-border/30 dark:border-border/30 rounded-2xl p-4 shadow-lg dark:shadow-lg"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-primary/20 rounded-xl flex items-center justify-center">
                        <Users className="w-5 h-5" style={{ color: '#c1ff72' }} />
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-foreground">35K+</div>
                        <div className="text-xs text-muted-foreground">Academy Members</div>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>

                {/* Floating Stat 2 */}
                <motion.div
                  initial={{ opacity: 0, x: 100, y: 0 }}
                  animate={{ opacity: 1, x: 0, y: 0 }}
                  transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1], delay: 0.9 }}
                  className="absolute top-16 sm:top-24 right-0 sm:right-2"
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
                    className="bg-white/95 dark:bg-card/80 backdrop-blur-sm border border-border/30 dark:border-border/30 rounded-2xl p-4 shadow-lg dark:shadow-lg"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-primary/20 rounded-xl flex items-center justify-center">
                        <BarChart3 className="w-5 h-5" style={{ color: '#c1ff72' }} />
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-foreground">700+</div>
                        <div className="text-xs text-muted-foreground">VIP Members</div>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>

                {/* Floating Stat 3 */}
                <motion.div
                  initial={{ opacity: 0, x: -80, y: 100 }}
                  animate={{ opacity: 1, x: 0, y: 0 }}
                  transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1], delay: 1.1 }}
                  className="absolute bottom-12 sm:bottom-16 left-2 sm:left-8"
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
                    className="bg-white/95 dark:bg-card/80 backdrop-blur-sm border border-border/30 dark:border-border/30 rounded-2xl p-4 shadow-lg dark:shadow-lg"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-primary/20 rounded-xl flex items-center justify-center">
                        <Clock className="w-5 h-5" style={{ color: '#c1ff72' }} />
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-foreground">24/7</div>
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
                  className="absolute bottom-4 sm:bottom-8 right-2 sm:right-12"
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
                    className="bg-white/95 dark:bg-card/80 backdrop-blur-sm border border-border/30 dark:border-border/30 rounded-2xl p-4 shadow-lg dark:shadow-lg"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-primary/20 rounded-xl flex items-center justify-center">
                        <Target className="w-5 h-5" style={{ color: '#c1ff72' }} />
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-foreground">5+</div>
                        <div className="text-xs text-muted-foreground">Years Experience</div>
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
                      <Star key={i} className="w-4 h-4 text-yellow-500 fill-current" />
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

function FeaturesSection() {
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

function PricingSection() {
  const plans = [
    {
      name: "Monthly",
      price: "$89",
      period: "/month",
      description: "Perfect for getting started with professional trading signals",
      features: [
        "Premium Telegram Access",
        "Daily Market Analysis",
        "Real-time Trading Signals",
        "Risk Management Guidelines",
        "24/7 Support",
        "Performance Analytics"
      ],
      cta: "Get Started",
      popular: false
    },
    {
      name: "Annual",
      price: "$790",
      period: "/year",
      description: "Best value for serious traders committed to long-term success",
      features: [
        "Everything in Monthly",
        "24/7 Priority Support",
        "Exclusive Webinars",
        "Advanced Analytics",
        "Custom Risk Assessment",
        "Direct Access to Analysts",
        "API Access"
      ],
      cta: "Get Started",
      popular: true,
      savings: "Save $278"
    }
  ];

  return (
    <section id="pricing" className="py-20 lg:py-32 relative">
      <div className="absolute inset-0 gradient-mesh opacity-10" />
      
      <div className="container-responsive relative">
        <AnimatedSection className="text-center mb-16">
          <div className="inline-block px-4 py-2 rounded-full border border-border bg-card/50 text-sm text-primary mb-6">
            Pricing
          </div>
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-6">
            Choose Your Plan
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Professional trading signals trusted by 35,000+ academy members with 5+ years of proven results.
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {plans.map((plan, index) => (
            <AnimatedSection
              key={index}
              delay={index * 0.1}
              className={cn(
                "relative p-8 rounded-2xl border transition-all duration-300",
                plan.popular
                  ? "border-primary bg-primary/5 scale-105"
                  : "border-border hover:border-primary/20 glass"
              )}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 px-4 py-2 bg-primary text-primary-foreground rounded-full text-sm font-semibold">
                  Most Popular
                </div>
              )}
              
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <div className="flex items-baseline justify-center mb-2">
                  <span className="text-4xl font-bold text-primary">{plan.price}</span>
                  <span className="text-muted-foreground">{plan.period}</span>
            </div>
                {plan.savings && (
                  <div className="text-sm text-primary font-medium">{plan.savings}</div>
                )}
                <p className="text-muted-foreground mt-4">{plan.description}</p>
          </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-primary mr-3 flex-shrink-0" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>

              <motion.button
                className={cn(
                  "w-full py-3 rounded-full font-semibold transition-all duration-200 cursor-pointer",
                  plan.popular
                    ? ""
                    : "border border-border hover:bg-accent"
                )}
                style={plan.popular ? { background: '#c1ff72', color: '#000' } : {}}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {plan.cta}
              </motion.button>
            </AnimatedSection>
          ))}
          </div>
        </div>
      </section>
  );
}

  const testimonials = [
    {
    text: "Spleux signals completely transformed my trading. The 97% accuracy is incredible and I'm finally profitable consistently.",
    name: "Marcus Chen",
    username: "@traderwithconfidence",
    profit: "+$47,200"
  },
  {
    text: "The VIP signals are phenomenal. Made back my membership fee in the first week. Best investment I've ever made.",
      name: "Sarah Williams",
    username: "@sarahtradesfx",
    profit: "+$31,850"
  },
  {
    text: "5 years of proven results speaks volumes. The academy taught me everything I needed to become consistently profitable.",
      name: "David Rodriguez",
    username: "@davecryptoking",
    profit: "+$68,900"
  },
  {
    text: "24/7 support is amazing. They helped me understand every signal and dramatically improve my trading strategy.",
    name: "Emma Thompson",
    username: "@emmaswingtrader",
    profit: "+$29,450"
  },
  {
    text: "Being part of this global community changed my life. The daily insights and market analysis are absolutely invaluable.",
    name: "Alex Kim",
    username: "@alexoptionspro",
    profit: "+$52,100"
  },
  {
    text: "From complete beginner to profitable in just 3 months. The free signals alone are worth following religiously.",
    name: "Michael Johnson",
    username: "@mikejforex",
    profit: "+$38,750"
  },
  {
    text: "The risk management strategies saved me from major losses. This service has completely revolutionized my approach.",
    name: "Lisa Park",
    username: "@lisadaytrader",
    profit: "+$41,300"
  },
  {
    text: "Crystal clear signals with perfect timing. My win rate went from 45% to 94% after joining the VIP program.",
    name: "James Wilson",
    username: "@jamestradesetups",
    profit: "+$55,680"
  },
  {
    text: "The educational content in the academy is top-tier. I learned more in 2 months than I did in 2 years of solo trading.",
    name: "Rachel Green",
    username: "@rachelcryptotrader",
    profit: "+$33,920"
  }
];

const firstColumn = testimonials.slice(0, 3);
const secondColumn = testimonials.slice(3, 6);
const thirdColumn = testimonials.slice(6, 9);

const TestimonialsColumn = (props: {
  className?: string;
  testimonials: typeof testimonials;
  duration?: number;
}) => (
  <div className={props.className}>
        <motion.div 
      animate={{
        translateY: "-50%",
      }}
      transition={{
        duration: props.duration || 10,
        repeat: Infinity,
        ease: "linear",
        repeatType: "loop",
      }}
      className="flex flex-col gap-6 pb-6"
    >
      {[...new Array(2)].fill(0).map((_, index) => (
        <React.Fragment key={index}>
          {props.testimonials.map(({ text, name, username, profit }, testimonialIndex) => (
            <motion.div 
              key={testimonialIndex} 
              className="p-5 rounded-2xl border border-border/50 bg-card/80 backdrop-blur-sm hover:border-primary/30 transition-all duration-500 group"
              whileHover={{ scale: 1.02, y: -2 }}
              transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <div className="mb-4">
                <motion.div 
                  className="flex mb-3"
                  initial={{ opacity: 0.7 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current transition-all duration-300" style={{ color: '#c1ff72' }} />
                  ))}
                </motion.div>
                <p className="text-foreground leading-relaxed text-sm">&ldquo;{text}&rdquo;</p>
              </div>
              <div className="flex items-center justify-between pt-3 border-t border-border/30">
                <div className="flex flex-col">
                  <div className="font-semibold text-foreground tracking-tight leading-5 text-sm">
                    {name}
                  </div>
                  <div className="text-xs text-muted-foreground leading-4 tracking-tight">{username}</div>
                </div>
                <motion.div 
                  className="text-xs font-bold px-2.5 py-1 rounded-full border group-hover:shadow-lg transition-all duration-300" 
                  style={{ 
                    color: '#c1ff72', 
                    borderColor: '#c1ff72',
                    backgroundColor: 'rgba(193, 255, 114, 0.1)'
                  }}
                  whileHover={{ 
                    backgroundColor: 'rgba(193, 255, 114, 0.2)',
                    scale: 1.05
                  }}
                  transition={{ duration: 0.2 }}
                >
                  {profit}
                </motion.div>
              </div>
            </motion.div>
          ))}
        </React.Fragment>
      ))}
    </motion.div>
              </div>
);

function TestimonialsSection() {
  return (
    <section id="testimonials" className="py-12 lg:py-20 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 dot-pattern opacity-10" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl opacity-30" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-secondary/10 rounded-full blur-3xl opacity-20" />
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] opacity-20">
        <div className="w-full h-full rounded-full border border-primary/20 animate-pulse" />
      </div>
      
      <div className="container-responsive relative">
        <AnimatedSection className="text-center mb-12" delay={0.1}>
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/20 backdrop-blur-sm mb-6"
            style={{ background: 'rgba(193, 255, 114, 0.05)' }}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <Star className="w-4 h-4" style={{ color: '#c1ff72' }} />
            <span className="text-sm font-medium" style={{ color: '#c1ff72' }}>Testimonials</span>
          </motion.div>
          <motion.h2 
            className="text-4xl md:text-5xl font-display font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1], delay: 0.1 }}
          >
            What Our <span style={{ color: '#c1ff72' }}>Traders</span> Say
          </motion.h2>
          <motion.p 
            className="text-muted-foreground text-lg max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1], delay: 0.2 }}
          >
            From consistent profits to life-changing results, discover how our signals and academy have transformed traders worldwide.
          </motion.p>
        </AnimatedSection>

        <motion.div 
          className="relative"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1], delay: 0.3 }}
        >
          <div className="flex justify-center gap-6 [mask-image:linear-gradient(to_bottom,transparent_0%,black_20%,black_80%,transparent_100%)] max-h-[400px] overflow-hidden">
            <TestimonialsColumn testimonials={firstColumn} duration={20} />
            <TestimonialsColumn
              testimonials={secondColumn}
              className="hidden md:block"
              duration={25}
            />
            <TestimonialsColumn
              testimonials={thirdColumn}
              className="hidden lg:block"
              duration={22}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function CTASection() {
  return (
    <section className="py-20 lg:py-32 relative overflow-hidden">
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

function Footer() {
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

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <HeroSection />
      <FeaturesSection />
      <PricingSection />
      <TestimonialsSection />
      <CTASection />
      <Footer />
    </div>
  );
}
