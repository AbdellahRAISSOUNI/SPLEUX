'use client';

import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { 
  ArrowRight, 
  CheckCircle, 
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
  const features = [
    {
      id: "insights",
      title: "Unlock Insights with Our Dashboard",
      description: "Transform your past performance into clear, actionable insights, and sharpen your trading strategy with an intuitive dashboard built for traders who want an edge.",
      cta: "Start learning",
      image: "/api/placeholder/400/300",
      background: "bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-900",
      accent: "text-blue-600 dark:text-blue-400"
    },
    {
      id: "support", 
      title: "Enjoy Instant Support",
      description: "With an average response time of just 33 seconds, our customer-obsessed support team is here to assist you every step of the way, offering solutions to any problem, big or small, through live chat and email.",
      cta: "Chat 24/7",
      stat: "87%",
      statLabel: "of conversations rated as or even better",
      background: "bg-gradient-to-br from-blue-900 to-blue-800",
      accent: "text-green-400",
      darkCard: true
    },
    {
      id: "news",
      title: "Trade News", 
      description: "Trade during most economic events on a regular account. For major events, choose swing trading.",
      cta: "Read trading rules",
      background: "bg-gradient-to-br from-blue-600 to-purple-600",
      accent: "text-white",
      darkCard: true
    }
  ];

  return (
    <section id="features" className="py-20 lg:py-32">
      <div className="container-responsive">
        {/* Section Header */}
        <AnimatedSection className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-6">
            Why Professionals Choose{" "}
            <span className="text-primary">Spleux</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Professional trading tools designed for serious traders who demand exceptional results.
          </p>
        </AnimatedSection>

        {/* Features Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {features.map((feature, index) => (
            <AnimatedSection
              key={feature.id}
              delay={index * 0.1}
              className={`${feature.id === 'insights' ? 'lg:col-span-2' : ''}`}
            >
              <motion.div
                className={`relative p-8 rounded-2xl overflow-hidden h-full ${feature.background} ${
                  feature.darkCard ? 'text-white' : 'text-foreground'
                }`}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.3 }}
              >
                {/* Content */}
                <div className="relative z-10 flex flex-col h-full">
                  <div className="flex-1">
                    <h3 className="text-2xl md:text-3xl font-bold mb-4 leading-tight">
                      {feature.title}
                    </h3>
                    <p className={`text-lg leading-relaxed mb-6 ${
                      feature.darkCard ? 'text-gray-200' : 'text-muted-foreground'
                    }`}>
                      {feature.description}
                    </p>
                  </div>

                  {/* Stats for support card */}
                  {feature.stat && (
                    <div className="mb-6">
                      <div className="flex items-center space-x-4">
                        <div className="text-right">
                          <div className="text-4xl font-bold text-green-400">{feature.stat}</div>
                          <div className="text-sm text-gray-300">{feature.statLabel}</div>
                        </div>
                        <div className="w-12 h-20 bg-green-400 rounded-full flex items-center justify-center">
                          <div className="text-2xl">😊</div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* CTA Button */}
                  <div>
                    <motion.button
                      className={`px-6 py-3 rounded-lg font-semibold transition-all duration-200 ${
                        feature.darkCard 
                          ? 'bg-white/20 text-white hover:bg-white/30 backdrop-blur-sm'
                          : 'bg-primary text-primary-foreground hover:bg-primary/90'
                      }`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {feature.cta}
                    </motion.button>
                  </div>
                </div>

                {/* Dashboard preview for insights card */}
                {feature.id === 'insights' && (
                  <div className="absolute bottom-4 right-4 opacity-20 dark:opacity-10">
                    <div className="w-64 h-40 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
                      <div className="space-y-2">
                        <div className="h-2 bg-gray-200 dark:bg-gray-600 rounded w-3/4"></div>
                        <div className="h-2 bg-gray-200 dark:bg-gray-600 rounded w-1/2"></div>
                        <div className="h-16 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900 rounded mt-4"></div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Wave pattern for news card */}
                {feature.id === 'news' && (
                  <div className="absolute bottom-0 right-0 opacity-20">
                    <svg width="200" height="100" viewBox="0 0 200 100" className="text-white">
                      <path
                        d="M0,50 Q50,20 100,50 T200,50 L200,100 L0,100 Z"
                        fill="currentColor"
                      />
                    </svg>
                  </div>
                )}
              </motion.div>
            </AnimatedSection>
          ))}
        </div>
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
