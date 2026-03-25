import React from 'react';
import { motion } from 'framer-motion';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

interface GlassCardProps {
    children: React.ReactNode;
    className?: string;
    delay?: number;
}

const GlassCard: React.FC<GlassCardProps> = ({ children, className, delay = 0 }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay }}
            whileHover={{ y: -5 }}
            className={cn("bg-[rgba(255,255,255,0.05)] backdrop-blur-[20px] border border-[rgba(255,255,255,0.1)] rounded-[20px] p-6 transition-all duration-300 group relative overflow-hidden hover:shadow-[0_0_20px_rgba(124,58,237,0.5)]", className)}
        >
            {/* Subtle hover glow effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative z-10">
                {children}
            </div>
        </motion.div>
    );
};

export default GlassCard;
