import { useEffect, useRef, useState } from 'react';
import { motion, useSpring, AnimatePresence } from 'framer-motion';

type CursorState = 'default' | 'hover' | 'click' | 'view' | 'drag' | 'text' | 'link';

const LABELS: Record<CursorState, string> = {
  default: '',
  hover: '',
  click: 'Click',
  view: 'View',
  drag: 'Drag',
  text: '',
  link: 'Open',
};

const CustomCursor = () => {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [state, setState] = useState<CursorState>('default');
  const [isClicking, setIsClicking] = useState(false);
  const [isMobile, setIsMobile] = useState(true);
  const rafRef = useRef<number | null>(null);

  const springCfg = { damping: 28, stiffness: 300, mass: 0.4 };
  const trailX = useSpring(-100, springCfg);
  const trailY = useSpring(-100, springCfg);

  useEffect(() => {
    const isTouchDevice =
      window.innerWidth <= 1024 ||
      'ontouchstart' in window ||
      navigator.maxTouchPoints > 0;
    setIsMobile(isTouchDevice);
    if (isTouchDevice) return;

    // Hide the system cursor
    document.documentElement.style.cursor = 'none';

    const onMove = (e: MouseEvent) => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        setPos({ x: e.clientX, y: e.clientY });
        trailX.set(e.clientX);
        trailY.set(e.clientY);
      });

      // Detect what element the cursor is over
      const el = e.target as HTMLElement;
      const tag = el.tagName.toLowerCase();

      if (el.closest('[data-cursor="drag"]') || el.classList.contains('draggable')) {
        setState('drag');
      } else if (el.closest('[data-cursor="view"]') || el.closest('.portfolio-card') || el.closest('.case-study')) {
        setState('view');
      } else if (
        tag === 'a' ||
        el.closest('a') ||
        el.closest('nav')
      ) {
        setState('link');
      } else if (
        tag === 'button' ||
        el.closest('button') ||
        el.getAttribute('role') === 'button' ||
        el.closest('[role="button"]')
      ) {
        setState('click');
      } else if (
        tag === 'input' ||
        tag === 'textarea' ||
        tag === 'select' ||
        el.closest('input') ||
        el.closest('textarea')
      ) {
        setState('text');
      } else {
        setState('default');
      }
    };

    const onMouseDown = () => setIsClicking(true);
    const onMouseUp = () => setIsClicking(false);
    const onLeave = () => setPos({ x: -200, y: -200 });

    window.addEventListener('mousemove', onMove, { passive: true });
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    document.documentElement.addEventListener('mouseleave', onLeave);

    return () => {
      document.documentElement.style.cursor = '';
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      document.documentElement.removeEventListener('mouseleave', onLeave);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [isMobile]);

  if (isMobile) return null;

  const isExpanded = state === 'view' || state === 'drag';
  const hasLabel = LABELS[state] !== '';
  const label = LABELS[state];

  // Ring size: big with label text, medium on hover, small default
  const ringSize = isExpanded ? 80 : state !== 'default' ? 48 : 36;
  const dotSize = state === 'text' ? 2 : 6;
  const ringOpacity = state === 'default' ? 0.35 : 0.9;
  const ringColor =
    state === 'view' || state === 'drag'
      ? 'rgba(212,175,55,0.15)'   // gold tint fill
      : 'transparent';
  const ringBorder =
    state === 'click'
      ? '#D4AF37'
      : state === 'link'
      ? '#4A90E2'
      : state === 'view' || state === 'drag'
      ? '#D4AF37'
      : state === 'text'
      ? '#4A90E2'
      : 'rgba(255,255,255,0.5)';

  return (
    <>
      {/* Trailing ring */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full flex items-center justify-center"
        style={{
          x: trailX,
          y: trailY,
          translateX: '-50%',
          translateY: '-50%',
          width: ringSize,
          height: ringSize,
          backgroundColor: ringColor,
          border: `1.5px solid ${ringBorder}`,
          opacity: ringOpacity,
        }}
        animate={{
          width: ringSize,
          height: ringSize,
          backgroundColor: ringColor,
          borderColor: ringBorder,
          scale: isClicking ? 0.85 : 1,
          opacity: ringOpacity,
        }}
        transition={{ duration: 0.18, ease: 'easeOut' }}
      >
        {/* Label inside ring */}
        <AnimatePresence mode="wait">
          {hasLabel && (
            <motion.span
              key={label}
              className="text-[10px] font-bold uppercase tracking-[0.15em] select-none"
              style={{ color: ringBorder }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.12 }}
            >
              {label}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Precise dot */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full bg-white"
        style={{
          x: pos.x,
          y: pos.y,
          translateX: '-50%',
          translateY: '-50%',
          width: dotSize,
          height: dotSize,
        }}
        animate={{
          width: dotSize,
          height: dotSize,
          opacity: state === 'text' ? 1 : isExpanded ? 0 : 1,
          backgroundColor: state === 'click' ? '#D4AF37' : state === 'link' ? '#4A90E2' : '#ffffff',
          scale: isClicking ? 0.6 : 1,
        }}
        transition={{ duration: 0.1 }}
      />
    </>
  );
};

export default CustomCursor;
