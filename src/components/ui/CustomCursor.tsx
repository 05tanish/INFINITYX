import { useEffect, useState } from 'react';
import { motion, useSpring } from 'framer-motion';

const CustomCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Smooth spring configuration for the trailing ring
  const springConfig = { damping: 25, stiffness: 400, mass: 0.5 };
  const cursorXSpring = useSpring(0, springConfig);
  const cursorYSpring = useSpring(0, springConfig);

  useEffect(() => {
    // Detect mobile/touch devices where cursor shouldn't render
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768 || 'ontouchstart' in window || navigator.maxTouchPoints > 0);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      
      // We offset the spring by half the cursor size (e.g., 40px / 2 = 20px) to center it
      cursorXSpring.set(e.clientX - 20);
      cursorYSpring.set(e.clientY - 20);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // Triggers hover intent if clicking buttons, links, or inputs
      if (
        target.tagName.toLowerCase() === 'button' ||
        target.tagName.toLowerCase() === 'a' ||
        target.closest('button') ||
        target.closest('a') ||
        target.classList.contains('glass-card') ||
        target.classList.contains('advantage-card')
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    if (!isMobile) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseover', handleMouseOver);
    }

    return () => {
      window.removeEventListener('resize', checkMobile);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [cursorXSpring, cursorYSpring, isMobile]);

  if (isMobile) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999]" style={{ filter: 'url(#goo)' }}>
      {/* Tiny solid dot acting as the precise mouse point */}
      <motion.div
        className="absolute w-4 h-4 bg-brand-white rounded-full mix-blend-difference"
        animate={{
          x: mousePosition.x - 8, // Center offset
          y: mousePosition.y - 8,
          scale: isHovering ? 0 : 1, // Hide dot when hovering
          opacity: 1,
        }}
        transition={{ type: 'tween', ease: 'backOut', duration: 0 }}
      />
      
      {/* Glow trailing liquid ring */}
      <motion.div
        className="absolute w-10 h-10 rounded-full bg-brand-purple"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
        }}
        animate={{
          scale: isHovering ? 3 : 1,
          backgroundColor: isHovering ? '#D4AF37' : '#8A2BE2', // shifts from Purple to Gold when merging
        }}
        transition={{ duration: 0.2 }}
      />
    </div>
  );
};

export default CustomCursor;
