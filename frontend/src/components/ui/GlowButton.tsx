import React from 'react';
import { motion, type HTMLMotionProps } from 'framer-motion';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface GlowButtonProps extends HTMLMotionProps<"button"> {
  variant?: 'primary' | 'secondary' | 'cyan' | 'outline';
  children: React.ReactNode;
  className?: string;
}


const GlowButton = ({ 
  variant = 'primary', 
  children, 
  className, 
  ...props 
}: GlowButtonProps) => {
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={cn(
        variant === 'primary' ? 'glow-button-primary' : 
        variant === 'secondary' ? 'glow-button-secondary' : 
        variant === 'outline' ? 'border border-[var(--border-dim)] hover:border-[var(--accent-primary)]/50 text-[var(--text-secondary)] hover:text-[var(--text-primary)] px-6 py-2.5 rounded-xl bg-[var(--bg-surface)]' :
        'bg-[var(--accent-primary)] text-white font-bold shadow-neon hover:shadow-[var(--shadow-glow)] py-3 px-8 rounded-xl',

        className
      )}


      {...props}
    >
      {children}
    </motion.button>
  );
};

export default GlowButton;
