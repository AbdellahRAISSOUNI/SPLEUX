'use client';

import { ChevronDown, Globe, Check } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const languages = [
  { code: 'en', name: 'English', flag: '🇺🇸', nativeName: 'English' },
  { code: 'es', name: 'Español', flag: '🇪🇸', nativeName: 'Español' },
  { code: 'fr', name: 'Français', flag: '🇫🇷', nativeName: 'Français' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪', nativeName: 'Deutsch' },
  { code: 'it', name: 'Italiano', flag: '🇮🇹', nativeName: 'Italiano' },
  { code: 'pt', name: 'Português', flag: '🇵🇹', nativeName: 'Português' },
  { code: 'ru', name: 'Русский', flag: '🇷🇺', nativeName: 'Русский' },
  { code: 'zh', name: '中文', flag: '🇨🇳', nativeName: '中文' },
  { code: 'ja', name: '日本語', flag: '🇯🇵', nativeName: '日本語' },
  { code: 'ar', name: 'العربية', flag: '🇸🇦', nativeName: 'العربية' },
];

export function LanguageSelector() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLang, setSelectedLang] = useState(languages[0]);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLanguageSelect = (language: typeof languages[0]) => {
    setSelectedLang(language);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="group relative flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-card/50 backdrop-blur-sm border border-border/50 hover:border-primary/30 transition-all duration-300 shadow-lg hover:shadow-xl"
        whileTap={{ scale: 0.95 }}
        whileHover={{ scale: 1.02 }}
      >
        <div className="flex items-center space-x-2">
          <div className="relative">
            <span className="text-lg filter drop-shadow-sm">{selectedLang.flag}</span>
            <div className="absolute inset-0 bg-primary/20 rounded-full blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
          <span className="text-sm font-medium text-foreground/90 hidden sm:block">
            {selectedLang.code.toUpperCase()}
          </span>
        </div>
        
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
          className="text-muted-foreground group-hover:text-primary transition-colors duration-300"
        >
          <ChevronDown className="w-4 h-4" />
        </motion.div>
        
        {/* Hover glow effect */}
        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary/10 to-secondary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40"
              onClick={() => setIsOpen(false)}
            />
            
            {/* Dropdown */}
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.9 }}
              transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
              className="absolute top-full mt-3 right-0 w-80 z-50"
            >
              <div className="bg-card/95 backdrop-blur-xl border border-border/50 rounded-2xl shadow-2xl overflow-hidden">
                {/* Header */}
                <div className="px-4 py-3 bg-gradient-to-r from-primary/5 to-secondary/5 border-b border-border/50">
                  <div className="flex items-center space-x-2 text-sm font-medium text-muted-foreground">
                    <Globe className="w-4 h-4 text-primary" />
                    <span>Select Language</span>
                  </div>
                </div>
                
                {/* Language List */}
                <div className="p-2 max-h-80 overflow-y-auto custom-scrollbar">
                  <div className="space-y-1">
                    {languages.map((language, index) => (
                      <motion.button
                        key={language.code}
                        onClick={() => handleLanguageSelect(language)}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05, duration: 0.3 }}
                        className={`group relative w-full flex items-center justify-between p-3 rounded-xl transition-all duration-300 ${
                          selectedLang.code === language.code
                            ? 'bg-primary/10 border border-primary/20 text-primary'
                            : 'hover:bg-accent/50 text-foreground hover:translate-x-1'
                        }`}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <div className="flex items-center space-x-3">
                          <div className="relative">
                            <span className="text-xl filter drop-shadow-sm">{language.flag}</span>
                            {selectedLang.code === language.code && (
                              <motion.div
                                initial={{ scale: 0, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                className="absolute -top-1 -right-1 w-3 h-3 bg-primary rounded-full flex items-center justify-center"
                              >
                                <Check className="w-2 h-2 text-primary-foreground" />
                              </motion.div>
                            )}
                          </div>
                          
                          <div className="text-left">
                            <div className="font-medium text-sm">{language.nativeName}</div>
                            <div className="text-xs text-muted-foreground">{language.name}</div>
                          </div>
                        </div>
                        
                        <div className="text-xs font-mono text-muted-foreground bg-muted/30 px-2 py-1 rounded-md">
                          {language.code.toUpperCase()}
                        </div>
                        
                        {/* Hover gradient */}
                        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </motion.button>
                    ))}
                  </div>
                </div>
                
                {/* Footer */}
                <div className="px-4 py-2 bg-gradient-to-r from-muted/20 to-transparent border-t border-border/30">
                  <div className="text-xs text-muted-foreground text-center">
                    More languages coming soon
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
} 