import React from 'react';
import { motion, type HTMLMotionProps } from 'framer-motion';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

interface GlowButtonProps extends Omit<HTMLMotionProps<"button">, 'onDrag' | 'onDragStart' | 'onDragEnd' | 'onAnimationStart'> {
    variant?: 'primary' | 'cyan' | 'outline';
    children: React.ReactNode;
}

const GlowButton: React.FC<GlowButtonProps> = ({
    variant = 'primary',
    children,
    className,
    ...props
}) => {
    const baseStyles = variant === 'primary'
        ? 'glow-btn'
        : variant === 'cyan'
            ? 'glow-btn-cyan'
            : 'px-6 py-2.5 rounded-xl font-semibold border border-gray-600 bg-transparent hover:bg-gray-100 dark:hover:bg-white/5 flex items-center justify-center gap-2 transition-all';

    return (
        <motion.button
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
            className={cn(baseStyles, className)}
            {...(props as any)}
        >
            {children}
        </motion.button>
    );
};

export default GlowButton;
