'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  variant?: "fadeUp" | "slideIn" | "scaleIn";
}

export default function AnimatedSection({ 
  children, 
  className = "",
  delay = 0,
  variant = "fadeUp"
}: AnimatedSectionProps) {
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