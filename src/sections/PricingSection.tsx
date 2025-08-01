'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Clock, TrendingUp, Crown, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { getContent } from '@/lib/content';
import AnimatedSection from './AnimatedSection';
import SpotlightCard from '@/components/SpotlightCard';

export default function PricingSection() {
  const content = getContent();
  const { pricing } = content;
  
  const iconMap = {
    "Monthly": Clock,
    "3 Months": TrendingUp,
    "Yearly": Crown
  };
  
  const plansWithIcons = pricing.plans.map(plan => ({
    ...plan,
    icon: iconMap[plan.name as keyof typeof iconMap] || Clock
  }));

  return (
    <section id="pricing" className="py-20 lg:py-32 relative">
      <div className="absolute inset-0 gradient-mesh opacity-10" />
      
      <div className="container-responsive relative">
        <AnimatedSection className="text-center mb-16">
          <div className="inline-block px-4 py-2 rounded-full border border-border bg-card/50 text-sm text-primary mb-6">
            Simple Pricing
          </div>
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-6">
            {pricing.title}
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-8">
            {pricing.subtitle}
          </p>
          <div className="text-center">
            <p className="text-xl font-semibold text-foreground mb-2">
              You don&apos;t need luck — you need the right team.
            </p>
            <p className="text-lg" style={{ color: '#c1ff72' }}>
              Start now, and let&apos;s build your trading journey together.
            </p>
          </div>
        </AnimatedSection>

        {/* Free Trial Highlight */}
        <AnimatedSection className="mb-12">
          <div className="max-w-3xl mx-auto text-center">
            <div className="bg-gradient-to-br from-primary/20 via-primary/10 to-primary/5 border border-primary/30 rounded-3xl p-8 md:p-12 shadow-2xl shadow-primary/10 backdrop-blur-sm">
              <div className="mb-6">
                <h3 className="text-2xl md:text-3xl font-bold mb-4" style={{ color: '#c1ff72' }}>
                  {pricing.freeTrial.title}
                </h3>
                <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                  {pricing.freeTrial.description}
                </p>
              </div>
              
              <motion.a
                href={content.links.primary.contact}
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 md:px-12 py-4 rounded-full text-lg md:text-xl font-semibold flex items-center space-x-3 group cursor-pointer mx-auto inline-block"
                style={{ background: '#c1ff72', color: '#000' }}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <span>{pricing.freeTrial.cta}</span>
                <ArrowRight className="w-5 h-5 md:w-6 md:h-6 group-hover:translate-x-1 transition-transform" />
              </motion.a>
            </div>
          </div>
        </AnimatedSection>

        {/* Pricing Options */}
        <AnimatedSection className="mb-12">
          <div className="text-center mb-8">
            <p className="text-lg text-muted-foreground mb-2">
              After your trial, you can choose to continue with us:
            </p>
            <p className="text-xl font-semibold">
              <span style={{ color: '#c1ff72' }}>$70/month</span> or <span style={{ color: '#c1ff72' }}>$150/3 months</span> or <span style={{ color: '#c1ff72' }}>$200/yearly</span> — it&apos;s your choice.
            </p>
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-5xl mx-auto">
          {plansWithIcons.map((plan, index) => {
            const Icon = plan.icon;
            const spotlightColors = [
              "rgba(193, 255, 114, 0.15)", // Primary green for Monthly
              "rgba(193, 255, 114, 0.25)", // Brighter green for 3 Months (Most Popular)
              "rgba(193, 255, 114, 0.35)"  // Brightest green for Yearly (Best Value)
            ];
            
            return (
              <AnimatedSection
                key={index}
                delay={index * 0.1}
                className={cn(
                  "relative",
                  plan.popular ? "md:scale-105" : ""
                )}
              >
                {/* Badge */}
                {plan.badge && (
                  <div className={cn(
                    "absolute -top-3 left-1/2 transform -translate-x-1/2 px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap z-10",
                    plan.popular 
                      ? "bg-primary text-primary-foreground"
                      : "bg-card border border-border text-foreground"
                  )}>
                    {plan.badge}
                  </div>
                )}
                
                <SpotlightCard 
                  className={cn(
                    "p-6 md:p-8 text-center border-0",
                    plan.popular 
                      ? "bg-gradient-to-br from-primary/10 via-primary/5 to-transparent"
                      : "bg-gradient-to-br from-card/50 to-card/30"
                  )}
                  spotlightColor={spotlightColors[index]}
                >
                  {/* Icon */}
                  <div className="flex justify-center mb-4 md:mb-6">
                    <div className={cn(
                      "p-3 rounded-full border",
                      plan.popular
                        ? "bg-primary/20 border-primary/40"
                        : "bg-primary/10 border-primary/20"
                    )}>
                      <Icon className="w-6 h-6 md:w-8 md:h-8 text-primary" />
                    </div>
                  </div>
                  
                  {/* Plan Name */}
                  <h3 className="text-lg md:text-xl font-bold mb-2">{plan.name}</h3>
                  
                  {/* Price */}
                  <div className="mb-4 md:mb-6">
                    <div className="flex items-baseline justify-center mb-1">
                      <span className="text-3xl md:text-4xl font-bold text-primary">{plan.price}</span>
                      <span className="text-muted-foreground ml-1 text-sm md:text-base">{plan.period}</span>
                    </div>
                    
                    {/* Original Price & Savings */}
                    {plan.originalPrice && (
                      <div className="flex items-center justify-center gap-2 text-xs md:text-sm">
                        <span className="text-muted-foreground line-through">{plan.originalPrice}</span>
                        {plan.savings && (
                          <span className="text-primary font-medium">{plan.savings}</span>
                        )}
                      </div>
                    )}
                    
                    <p className="text-muted-foreground mt-2 text-sm md:text-base">{plan.description}</p>
                  </div>

                  {/* CTA Button */}
                  <motion.a
                    href={content.links.primary.contact}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(
                      "w-full py-3 rounded-full font-semibold transition-all duration-200 cursor-pointer text-sm md:text-base inline-block text-center",
                      plan.popular
                        ? "bg-primary text-primary-foreground hover:bg-primary/90"
                        : "border border-border hover:bg-accent hover:border-primary/20"
                    )}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {plan.cta}
                  </motion.a>
                </SpotlightCard>
              </AnimatedSection>
            );
          })}
          </div>
        </div>
      </section>
  );
} 