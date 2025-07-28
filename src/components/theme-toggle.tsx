'use client';

import { Moon } from 'lucide-react';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleClick = () => {
    setShowMessage(true);
    setTimeout(() => setShowMessage(false), 3000); // Hide message after 3 seconds
  };

  if (!mounted) {
    return (
      <div className="h-10 w-10 rounded-full bg-muted animate-pulse" />
    );
  }

  return (
    <div className="relative">
      <motion.button
        onClick={handleClick}
        className="relative h-10 w-10 rounded-full bg-background border border-border hover:bg-accent transition-colors duration-200 flex items-center justify-center group cursor-pointer"
        whileTap={{ scale: 0.95 }}
        whileHover={{ scale: 1.05 }}
      >
        <motion.div
          className="absolute"
          whileHover={{ rotate: 15 }}
          transition={{ duration: 0.2 }}
        >
          <Moon className="h-4 w-4 text-blue-400" />
        </motion.div>
        
        <span className="sr-only">Theme toggle (coming soon)</span>
      </motion.button>

      {/* Tooltip Message */}
      {showMessage && (
        <motion.div
          initial={{ opacity: 0, y: 10, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 10, scale: 0.9 }}
          className="absolute top-12 right-0 bg-card border border-border rounded-lg px-3 py-2 shadow-lg z-50 whitespace-nowrap"
        >
          <div className="text-xs text-foreground font-medium">
            We are working on this feature...
          </div>
          <div className="absolute -top-1 right-4 w-2 h-2 bg-card border-l border-t border-border transform rotate-45"></div>
        </motion.div>
      )}
    </div>
  );
} 