'use client';

import { motion, useScroll, useTransform, useInView, AnimatePresence } from 'framer-motion';
import { 
  ArrowRight, 
  CheckCircle, 
  TrendingUp,
  Shield, 
  Clock, 
  BarChart3, 
  Target, 
  MessageCircle,
  Star,
  Play,
  Award,
  Globe,
  Menu,
  X
} from 'lucide-react';
import { useRef, useState } from 'react';
import { ThemeToggle } from '@/components/theme-toggle';
import { LanguageSelector } from '@/components/language-selector';
import { cn } from '@/lib/utils';

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }
};

const slideIn = {
  initial: { opacity: 0, x: -30 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }
};

const scaleIn = {
  initial: { opacity: 0, scale: 0.8 },
  animate: { opacity: 1, scale: 1 },
  transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

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
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-primary/60 rounded-lg flex items-center justify-center">
              <span className="font-bold text-primary-foreground text-sm">S</span>
          </div>
            <span className="font-display font-bold text-xl">Spleux</span>
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
              <button className="px-4 py-2 text-sm font-medium text-foreground hover:text-primary transition-colors">
                Sign In
              </button>
              <motion.button
                className="btn-primary px-6 py-2.5 rounded-full text-sm font-semibold"
                whileHover={{ scale: 1.02, y: -1 }}
                whileTap={{ scale: 0.98 }}
              >
              Get Started
              </motion.button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-accent transition-colors"
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
               <button className="py-2 text-sm font-medium text-foreground">
                 Sign In
               </button>
               <button className="btn-primary py-2.5 rounded-full text-sm font-semibold">
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
    <section className="pt-32 pb-20 lg:pt-40 lg:pb-32 relative overflow-hidden">
      {/* Sophisticated gradient background */}
      <div className="absolute inset-0">
        {/* Multi-layer gradient system */}
        <div className="absolute inset-0 hero-gradient-system" />
        
        {/* Diagonal accent elements */}
        <div className="absolute top-0 right-0 w-1/2 h-3/4 diagonal-accent-1" />
        <div className="absolute bottom-0 left-0 w-2/3 h-1/2 diagonal-accent-2" />
        
        {/* Animated mesh overlay */}
        <div className="absolute inset-0 hero-mesh" />
      </div>
      
      <div className="container-responsive relative">
        <div className="max-w-4xl mx-auto text-center">

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-6xl lg:text-7xl font-display font-bold leading-tight mb-6"
          >
            Professional Trading
            <span className="block bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              Signals & Analytics
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="text-lg md:text-xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed"
          >
            Join 1000+ professional traders using our premium telegram signals service. 
            Advanced analytics, risk management, and consistent 87% win rate.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
          >
            <motion.button
              className="btn-primary px-8 py-4 rounded-full text-lg font-semibold flex items-center space-x-2 group"
              whileHover={{ scale: 1.02, y: -1 }}
              whileTap={{ scale: 0.98 }}
            >
              <span>Start Trading Now</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </motion.button>
            
            <motion.button
              className="flex items-center space-x-3 px-6 py-4 rounded-full border border-border hover:bg-accent transition-colors group"
              whileHover={{ scale: 1.02 }}
            >
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                <Play className="w-4 h-4 text-primary fill-current" />
              </div>
              <span className="font-medium">Watch Demo</span>
            </motion.button>
          </motion.div>

          {/* Social Proof */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center"
          >
            {[
              { number: "87%", label: "Win Rate" },
              { number: "1000+", label: "Active Traders" },
              { number: "$2.1M+", label: "Profits Generated" },
              { number: "24/7", label: "Support" }
            ].map((stat, index) => (
              <div key={index} className="space-y-2">
                <div className="text-2xl md:text-3xl font-bold text-primary">{stat.number}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function FeaturesSection() {
  const [activeFeature, setActiveFeature] = useState<string | null>(null);
  
  const features = [
    {
      id: "signals",
      title: "Premium Trading Signals",
      description: "Advanced algorithmic analysis delivers precise entry and exit points with industry-leading accuracy.",
      metric: "87%",
      metricLabel: "Win Rate",
      icon: TrendingUp,
      gradient: "from-emerald-500/20 to-primary/20"
    },
    {
      id: "analytics", 
      title: "Market Intelligence",
      description: "Real-time market analysis powered by machine learning algorithms and professional insights.",
      metric: "0.3s",
      metricLabel: "Analysis Speed",
      icon: BarChart3,
      gradient: "from-blue-500/20 to-primary/20"
    },
    {
      id: "risk",
      title: "Risk Management",
      description: "Sophisticated position sizing and risk assessment tools that protect and grow your capital.",
      metric: "2.1:1",
      metricLabel: "Risk/Reward",
      icon: Shield,
      gradient: "from-orange-500/20 to-primary/20"
    },
    {
      id: "support",
      title: "Expert Support",
      description: "Direct access to professional traders with 24/7 support and personalized guidance.",
      metric: "< 2min",
      metricLabel: "Response Time", 
      icon: MessageCircle,
      gradient: "from-purple-500/20 to-primary/20"
    }
  ];

  return (
    <section id="features" className="py-20 lg:py-32 relative overflow-hidden">
      {/* Elegant background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 -right-40 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -left-40 w-80 h-80 bg-primary/8 rounded-full blur-3xl" />
      </div>
      
      <div className="container-responsive relative">
        {/* Section Header */}
        <AnimatedSection className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6"
          >
            <div className="w-2 h-2 rounded-full bg-primary mr-2 animate-pulse" />
            <span className="text-sm font-medium text-primary">Professional Trading Platform</span>
          </motion.div>
          
          <h2 className="text-4xl md:text-6xl font-display font-bold mb-6 leading-tight">
            Why Professionals Choose{" "}
            <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              Spleux
            </span>
          </h2>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Advanced trading infrastructure designed for serious traders who demand
            exceptional performance and reliability.
          </p>
        </AnimatedSection>

        {/* Modern Feature Display */}
        <div className="max-w-7xl mx-auto">
          {/* Feature Navigation */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              const isActive = activeFeature === feature.id;
              
              return (
                <AnimatedSection key={feature.id} delay={index * 0.1}>
                  <motion.button
                    onClick={() => setActiveFeature(isActive ? null : feature.id)}
                    className={cn(
                      "group relative flex items-center space-x-3 px-6 py-4 rounded-2xl transition-all duration-500",
                      "bg-card/50 backdrop-blur-sm border border-border/50 hover:border-primary/30",
                      isActive && "bg-primary/10 border-primary/30 shadow-lg shadow-primary/10"
                    )}
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className={cn(
                      "w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300",
                      "bg-primary/10 group-hover:bg-primary/20",
                      isActive && "bg-primary/20"
                    )}>
                      <IconComponent className={cn(
                        "w-5 h-5 transition-colors duration-300",
                        isActive ? "text-primary" : "text-muted-foreground group-hover:text-primary"
                      )} />
                    </div>
                    
                    <div className="text-left">
                      <div className={cn(
                        "font-semibold text-sm transition-colors duration-300",
                        isActive ? "text-primary" : "text-foreground"
                      )}>
                        {feature.title}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {feature.metricLabel}: {feature.metric}
                      </div>
                    </div>
                    
                    {/* Active indicator */}
                    {isActive && (
                      <motion.div
                        layoutId="activeFeature"
                        className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary/5 to-primary/10 border border-primary/20"
                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                  </motion.button>
                </AnimatedSection>
              );
            })}
          </div>

          {/* Feature Content Display */}
          <AnimatePresence mode="wait">
            {activeFeature && (
              <motion.div
                key={activeFeature}
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.95 }}
                transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
                className="mb-12"
              >
                {(() => {
                  const feature = features.find(f => f.id === activeFeature);
                  if (!feature) return null;
                  
                  const IconComponent = feature.icon;
                  
                  return (
                    <div className="relative">
                      <div className={cn(
                        "relative p-8 md:p-12 rounded-3xl backdrop-blur-xl border border-border/50",
                        "bg-gradient-to-br", feature.gradient
                      )}>
                        {/* Content */}
                        <div className="grid md:grid-cols-2 gap-8 items-center">
                          {/* Text Content */}
                          <div className="space-y-6">
                            <div className="flex items-center space-x-4">
                              <div className="w-16 h-16 rounded-2xl bg-primary/20 flex items-center justify-center">
                                <IconComponent className="w-8 h-8 text-primary" />
                              </div>
                              <div>
                                <h3 className="text-3xl font-bold text-foreground">{feature.title}</h3>
                                <div className="flex items-center space-x-2 mt-1">
                                  <span className="text-2xl font-bold text-primary">{feature.metric}</span>
                                  <span className="text-sm text-muted-foreground">{feature.metricLabel}</span>
                                </div>
                              </div>
                            </div>
                            
                            <p className="text-lg text-muted-foreground leading-relaxed">
                              {feature.description}
                            </p>
                            
                            <div className="flex items-center space-x-4">
                              <motion.button
                                className="btn-primary px-6 py-3 rounded-xl text-sm font-semibold"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                              >
                                Learn More
                              </motion.button>
                              <button className="flex items-center space-x-2 text-primary hover:text-primary/80 transition-colors">
                                <Play className="w-4 h-4" />
                                <span className="text-sm font-medium">Watch Demo</span>
                              </button>
                            </div>
                          </div>
                          
                          {/* Visual Element */}
                          <div className="relative">
                            <div className="aspect-square rounded-2xl bg-card/30 backdrop-blur-sm border border-border/30 p-8 flex items-center justify-center">
                              <motion.div
                                animate={{ 
                                  rotate: [0, 5, -5, 0],
                                  scale: [1, 1.05, 1]
                                }}
                                transition={{ 
                                  duration: 4,
                                  repeat: Infinity,
                                  ease: "easeInOut"
                                }}
                                className="w-32 h-32 rounded-full bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center shadow-2xl shadow-primary/25"
                              >
                                <IconComponent className="w-16 h-16 text-primary-foreground" />
                              </motion.div>
                            </div>
                            
                            {/* Floating elements */}
                            <motion.div
                              animate={{ y: [0, -10, 0], opacity: [0.5, 1, 0.5] }}
                              transition={{ duration: 3, repeat: Infinity }}
                              className="absolute -top-4 -right-4 w-6 h-6 rounded-full bg-primary/40 blur-sm"
                            />
                            <motion.div
                              animate={{ y: [0, 10, 0], opacity: [0.3, 0.8, 0.3] }}
                              transition={{ duration: 4, repeat: Infinity, delay: 1 }}
                              className="absolute -bottom-2 -left-2 w-4 h-4 rounded-full bg-primary/30 blur-sm"
                            />
                          </div>
                        </div>
                        
                        {/* Decorative elements */}
                        <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-transparent via-primary/5 to-transparent opacity-50" />
                      </div>
                    </div>
                  );
                })()}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Default state when no feature is selected */}
          {!activeFeature && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <div className="max-w-2xl mx-auto">
                <motion.div
                  animate={{ 
                    scale: [1, 1.05, 1],
                    rotate: [0, 1, -1, 0]
                  }}
                  transition={{ 
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center shadow-2xl shadow-primary/25"
                >
                  <Target className="w-12 h-12 text-primary-foreground" />
                </motion.div>
                
                <h3 className="text-2xl font-bold mb-4">Explore Our Features</h3>
                <p className="text-muted-foreground mb-6">
                  Click on any feature above to discover how Spleux can transform your trading experience.
                </p>
                
                <div className="flex flex-wrap justify-center gap-2 text-sm text-muted-foreground">
                  <span className="px-3 py-1 bg-primary/10 rounded-full">87% Win Rate</span>
                  <span className="px-3 py-1 bg-primary/10 rounded-full">1000+ Traders</span>
                  <span className="px-3 py-1 bg-primary/10 rounded-full">24/7 Support</span>
                  <span className="px-3 py-1 bg-primary/10 rounded-full">Real-time Analysis</span>
                </div>
              </div>
            </motion.div>
          )}
        </div>

        {/* Bottom CTA */}
        <AnimatedSection className="mt-20 text-center" delay={0.6}>
          <div className="max-w-4xl mx-auto p-8 rounded-3xl bg-gradient-to-r from-primary/5 to-primary/10 border border-primary/20 backdrop-blur-sm">
            <h3 className="text-2xl font-bold mb-4">
              Ready to Transform Your Trading?
            </h3>
            <p className="text-muted-foreground mb-6 text-lg">
              Join thousands of professional traders who trust Spleux for consistent results.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <motion.button
                className="btn-primary px-8 py-4 rounded-full text-lg font-semibold"
                whileHover={{ scale: 1.02, y: -1 }}
                whileTap={{ scale: 0.98 }}
              >
                Start Free Trial
              </motion.button>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <div className="flex -space-x-2">
                  {[1,2,3,4].map(i => (
                    <div key={i} className="w-8 h-8 rounded-full bg-primary/20 border-2 border-background flex items-center justify-center text-xs font-medium">
                      {i}
                    </div>
                  ))}
                </div>
                <span>Join 1000+ active traders</span>
              </div>
            </div>
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
            Professional trading signals for traders who demand the best results.
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
                  "w-full py-3 rounded-full font-semibold transition-all duration-200",
                  plan.popular
                    ? "btn-primary"
                    : "border border-border hover:bg-accent"
                )}
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

function TestimonialsSection() {
  const testimonials = [
    {
      name: "Michael Chen",
      role: "Professional Trader",
      profit: "+$47,200",
      content: "Spleux signals have completely transformed my trading. The accuracy and timing are incredible.",
      rating: 5,
      avatar: "MC"
    },
    {
      name: "Sarah Williams",
      role: "Portfolio Manager", 
      profit: "+$31,850",
      content: "Best investment I've made. The risk management alone has saved me thousands.",
      rating: 5,
      avatar: "SW"
    },
    {
      name: "David Rodriguez",
      role: "Hedge Fund Analyst",
      profit: "+$68,900", 
      content: "Professional service with exceptional results. My portfolio has never looked better.",
      rating: 5,
      avatar: "DR"
    }
  ];

  return (
    <section id="testimonials" className="py-20 lg:py-32 relative">
      <div className="absolute inset-0 dot-pattern opacity-10" />
      
      <div className="container-responsive relative">
        <AnimatedSection className="text-center mb-16">
          <div className="inline-block px-4 py-2 rounded-full border border-border bg-card/50 text-sm text-primary mb-6">
            Testimonials
          </div>
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-6">
            Trusted by Traders
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Real results from real members who trust Spleux with their trading success.
          </p>
        </AnimatedSection>

        <motion.div 
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              variants={fadeInUp}
              className="p-8 rounded-2xl border border-border hover:border-primary/20 transition-all duration-300 glass group"
              whileHover={{ y: -4 }}
            >
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold mr-4">
                  {testimonial.avatar}
                </div>
                <div className="flex-1">
                  <div className="font-semibold">{testimonial.name}</div>
                  <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                </div>
                <div className="text-primary font-bold text-lg">{testimonial.profit}</div>
              </div>

              <div className="flex mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                ))}
              </div>

              <p className="text-muted-foreground italic leading-relaxed">
                &ldquo;{testimonial.content}&rdquo;
              </p>
            </motion.div>
          ))}
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
            Join thousands of successful traders who have elevated their performance with Spleux. 
            Start your journey to consistent profits today.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <motion.button
              className="btn-primary px-8 py-4 rounded-full text-lg font-semibold flex items-center space-x-2 group"
              whileHover={{ scale: 1.02, y: -1 }}
              whileTap={{ scale: 0.98 }}
            >
              <span>Start Free Trial</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </motion.button>
            
            <motion.button
              className="px-8 py-4 rounded-full border border-border hover:bg-accent transition-colors font-semibold"
              whileHover={{ scale: 1.02 }}
            >
              Schedule Demo
            </motion.button>
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
              Trusted by 1000+ active traders.
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
          <p className="text-muted-foreground text-sm">
            © 2024 Spleux Trading Services. All rights reserved.
          </p>
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
