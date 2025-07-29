'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import AnimatedSection from './AnimatedSection';

export default function PricingSection() {
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