'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import AnimatedSection from './AnimatedSection';

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

export default function TestimonialsSection() {
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