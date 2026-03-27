import React, { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

export const MagneticCursor: React.FC = () => {
  const [isHovering, setIsHovering] = useState(false);
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 400 };
  const x = useSpring(cursorX, springConfig);
  const y = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX - 16);
      cursorY.set(e.clientY - 16);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'BUTTON' || 
        target.tagName === 'A' || 
        target.closest('button') || 
        target.closest('a') ||
        target.classList.contains('cursor-pointer')
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  return (
    <motion.div
      style={{
        translateX: x,
        translateY: y,
      }}
      className={`
        fixed top-0 left-0 w-8 h-8 rounded-full pointer-events-none z-[9999]
        border-2 border-primary transition-all duration-300
        ${isHovering ? 'scale-[2.5] bg-primary/10 border-primary/20 backdrop-blur-[2px]' : 'scale-100'}
        hidden md:block
      `}
    >
      <div className={`
        absolute inset-0 flex items-center justify-center
        ${isHovering ? 'opacity-100' : 'opacity-0'} transition-opacity
      `}>
        <div className="w-1 h-1 bg-primary rounded-full shadow-glow" />
      </div>
    </motion.div>
  );
};
