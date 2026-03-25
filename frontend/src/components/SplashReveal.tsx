import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface SplashRevealProps {
    children: React.ReactNode;
    color?: string;
}

const SplashReveal: React.FC<SplashRevealProps> = ({ children, color = "#7C3AED" }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"],
    });

    const scale = useTransform(scrollYProgress, [0, 0.4], [0, 5]);
    const opacity = useTransform(scrollYProgress, [0, 0.1, 0.8, 1], [0, 1, 1, 0]);
    const rotate = useTransform(scrollYProgress, [0, 0.5], [0, 45]);

    return (
        <div ref={containerRef} className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-black">
            {/* The Organic Splash Effect */}
            <motion.div
                className="absolute inset-0 z-0 pointer-events-none flex items-center justify-center"
                style={{ scale, opacity, rotate }}
            >
                <svg viewBox="0 0 200 200" className="w-[100vw] h-[100vw] opacity-30 blur-2xl">
                    <path
                        fill={color}
                        d="M44.7,-76.4C58.1,-69.2,69.2,-58.1,76.4,-44.7C83.6,-31.3,86.9,-15.7,85.2,-0.9C83.6,13.8,77,27.7,68.9,39.8C60.8,51.9,51.2,62.1,39.4,69.5C27.6,76.9,13.8,81.5,-0.6,82.5C-15,83.5,-30,81,-43.3,73.8C-56.6,66.6,-68.2,54.7,-76.3,40.8C-84.4,26.9,-89.1,11,-88.4,-4.3C-87.8,-19.6,-81.8,-34.3,-72.1,-46.5C-62.5,-58.7,-49.2,-68.4,-35.1,-75.1C-21,-81.8,-10.5,-85.4,2.6,-89.9C15.7,-94.4,31.3,-83.6,44.7,-76.4Z"
                        transform="translate(100 100)"
                    />
                </svg>
            </motion.div>

            {/* Content Segment */}
            <motion.div 
                className="relative z-10 w-full"
                initial={{ opacity: 0, y: 50, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                viewport={{ once: true, margin: "-100px" }}
            >
                {children}
            </motion.div>
        </div>
    );
};


export default SplashReveal;
