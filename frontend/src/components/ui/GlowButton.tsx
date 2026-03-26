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
        variant === 'outline' ? 'border border-border-main hover:border-primary/50 text-text-secondary hover:text-text-primary px-6 py-2.5 rounded-xl bg-bg-surface/50' :
        'bg-accent text-black font-bold shadow-neon hover:shadow-[0_0_30px_rgba(0,245,255,0.6)] py-3 px-8 rounded-xl',
        className
      )}


      {...props}
    >
      {children}
    </motion.button>
  );
};

export default GlowButton;
