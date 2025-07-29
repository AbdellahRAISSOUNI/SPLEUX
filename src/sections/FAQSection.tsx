'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';

const faqItems = [
  {
    question: "What makes your signals different from others?",
    answer: "Our signals are powered by advanced AI algorithms with 97% accuracy, analyzing 50+ market indicators simultaneously. We provide real-time alerts with exact entry/exit points, stop-loss levels, and position sizing recommendations. Unlike basic signal services, we include comprehensive educational content and 24/7 expert support."
  },
  {
    question: "Is this service really legitimate?",
    answer: "Absolutely! We have 35,000+ verified members with 5+ years of proven success. Our 97% accuracy rate is backed by real trading results and transparent performance tracking. We offer a 30-day money-back guarantee and 7-day trial to prove our legitimacy. Our Telegram community shows live trading results daily."
  },
  {
    question: "What's included in the academy membership?",
    answer: "Full access to our premium signals, live trading sessions, video tutorials, risk management guides, and private Telegram community. You'll also get one-on-one mentoring, market analysis reports, and priority support. Everything you need to become a successful trader is included."
  },
  {
    question: "How do I get started?",
    answer: "Getting started is simple! Choose your membership plan, complete the secure payment, and you'll receive instant access to our signals and academy. We'll guide you through setup, provide your first signals within 24 hours, and connect you with our expert support team. Start your trading journey today!"
  }
];

const FAQItem = ({ question, answer, index }: { question: string; answer: string; index: number }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="group"
    >
      <div 
        className="relative overflow-hidden rounded-2xl bg-white/95 dark:bg-card/80 backdrop-blur-sm border border-border/30 dark:border-border/30 hover:border-primary/50 dark:hover:border-primary/50 transition-all duration-300 cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        {/* Sophisticated hover effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        <div className="relative p-4 sm:p-6">
          <div className="flex items-center justify-between">
            <h3 className="flex-1 text-lg sm:text-xl font-semibold text-foreground pr-4">
              {question}
            </h3>
            <motion.div
              animate={{ rotate: isOpen ? 180 : 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="flex-shrink-0 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-300"
            >
              {isOpen ? (
                <Minus className="w-3 h-3 sm:w-4 sm:h-4 text-primary" />
              ) : (
                <Plus className="w-3 h-3 sm:w-4 sm:h-4 text-primary" />
              )}
            </motion.div>
          </div>
          
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ 
                  opacity: 0,
                  height: 0,
                  marginTop: 0
                }}
                animate={{ 
                  opacity: 1,
                  height: 'auto',
                  marginTop: '16px'
                }}
                exit={{ 
                  opacity: 0,
                  height: 0,
                  marginTop: 0
                }}
                transition={{ 
                  duration: 0.4,
                  ease: [0.25, 0.1, 0.25, 1]
                }}
                className="overflow-hidden"
              >
                <div className="text-muted-foreground leading-relaxed">
                  {answer}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
};

export default function FAQSection() {
  return (
    <section className="relative py-24 sm:py-32 overflow-hidden">
      {/* Sophisticated Background System */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-primary/5" />
      
      {/* Animated mesh pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            radial-gradient(circle at 25% 25%, rgb(var(--primary) / 0.3) 2px, transparent 2px),
            radial-gradient(circle at 75% 75%, rgb(var(--primary) / 0.2) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px, 40px 40px',
          backgroundPosition: '0 0, 30px 30px',
          animation: 'meshFloat 20s ease-in-out infinite'
        }} />
      </div>

      {/* Ambient glow effects */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-primary/8 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
      
      <div className="container-responsive relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
            viewport={{ once: true }}
            className="text-center mb-12 sm:mb-16"
          >
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1], delay: 0.2 }}
              viewport={{ once: true }}
              className="text-4xl sm:text-5xl md:text-6xl font-display font-bold text-foreground mb-6"
            >
              Frequently Asked Questions
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1], delay: 0.4 }}
              viewport={{ once: true }}
              className="text-xl text-muted-foreground max-w-2xl mx-auto"
            >
              Everything you need to know about our premium trading signals and academy
            </motion.p>
          </motion.div>

          {/* FAQ Items */}
          <div className="space-y-3 sm:space-y-4">
            {faqItems.map((item, index) => (
              <FAQItem 
                key={index}
                question={item.question}
                answer={item.answer}
                index={index}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
} 