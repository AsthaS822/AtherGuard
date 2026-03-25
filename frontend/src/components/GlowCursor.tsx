import React, { useEffect } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

const GlowCursor: React.FC = () => {
    const cursorX = useMotionValue(-100);
    const cursorY = useMotionValue(-100);

    const springConfig = { damping: 25, stiffness: 150 };
    const x = useSpring(cursorX, springConfig);
    const y = useSpring(cursorY, springConfig);

    useEffect(() => {
        const moveCursor = (e: MouseEvent) => {
            cursorX.set(e.clientX);
            cursorY.set(e.clientY);
        };

        window.addEventListener('mousemove', moveCursor);

        return () => {
            window.removeEventListener('mousemove', moveCursor);
        };
    }, [cursorX, cursorY]);

    return (
        <motion.div
            className="fixed top-0 left-0 w-64 h-64 bg-primary-glow/20 rounded-full blur-[80px] pointer-events-none z-[9999] mix-blend-screen"
            style={{
                x: x,
                y: y,
                translateX: '-50%',
                translateY: '-50%',
            }}
        />
    );
};

export default GlowCursor;
