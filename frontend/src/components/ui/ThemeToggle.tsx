import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../../hooks/useTheme';

export const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="relative p-2 rounded-xl bg-bg-surface border border-border-main hover:border-primary/50 transition-colors shadow-sm group overflow-hidden"
      aria-label="Toggle Theme"
    >
      <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
      
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={theme}
          initial={{ y: 20, opacity: 0, rotate: -45 }}
          animate={{ y: 0, opacity: 1, rotate: 0 }}
          exit={{ y: -20, opacity: 0, rotate: 45 }}
          transition={{ duration: 0.2, ease: "easeInOut" }}
          className="relative z-10"
        >
          {theme === 'dark' ? (
            <Sun className="w-5 h-5 text-accent group-hover:text-primary transition-colors" />
          ) : (
            <Moon className="w-5 h-5 text-primary" />
          )}
        </motion.div>
      </AnimatePresence>
    </button>
  );
};
