import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';

import HeroScene from '../3d/HeroScene';

export interface HeroSectionProps {
  onGetStarted?: () => void;
  onBookCall?: () => void;
}

const HeroSection = ({ onGetStarted, onBookCall }: HeroSectionProps) => {
  const containerRef = useRef<HTMLElement>(null);
  const textPhase1Ref = useRef<HTMLDivElement>(null);
  const textPhase2Ref = useRef<HTMLDivElement>(null);
  const textPhase3Ref = useRef<HTMLDivElement>(null);

  const scrollToContact = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleGetStarted = () => onGetStarted ? onGetStarted() : scrollToContact();
  const handleBookCall = () => onBookCall ? onBookCall() : scrollToContact();

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Create an Apple-style Scrub Timeline locked to the container
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '+=400%', // 4 window heights of cinematic scrolling
          pin: true,
          scrub: 1, // Smooth scrub
        }
      });

      // Initially Phase 1 is visible, hide Phase 2 and 3
      gsap.set([textPhase2Ref.current, textPhase3Ref.current], { opacity: 0, scale: 0.8, y: 50, pointerEvents: 'none' });

      // Phase 1 -> Phase 2 Transition
      tl.to(textPhase1Ref.current, {
        opacity: 0,
        scale: 1.1,
        y: -100,
        duration: 1,
        pointerEvents: 'none'
      }, 0);

      tl.to(textPhase2Ref.current, {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 1,
        pointerEvents: 'auto'
      }, 0.5);

      // Phase 2 -> Phase 3 Transition
      tl.to(textPhase2Ref.current, {
        opacity: 0,
        scale: 1.1,
        y: -100,
        duration: 1,
        pointerEvents: 'none'
      }, 2);

      tl.to(textPhase3Ref.current, {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 1,
        pointerEvents: 'auto'
      }, 2.5);

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      {/* 3D Global Ecosystem pinned independently across the window */}
      {/* <HeroScene /> */}
      
      <section 
        ref={containerRef} 
        id="hero" 
        className="relative h-screen w-full flex items-center justify-center pointer-events-none"
      >
        <div className="absolute inset-0 z-0 bg-brand-black/40 backdrop-blur-[2px]" />

        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center h-full flex flex-col justify-center pointer-events-auto">
          
          {/* Phase 1: Massive Establishing Intro */}
          <div ref={textPhase1Ref} className="absolute inset-0 flex flex-col items-center justify-center px-4 w-full h-full">
            <motion.div
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full glass-premium mb-8 uppercase tracking-widest text-xs font-bold shadow-[0_0_15px_rgba(62,99,221,0.3)]"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="w-2 h-2 rounded-full bg-brand-blue animate-pulse-glow"></div>
              <span className="text-gray-300">Next-Gen Digital Solutions</span>
            </motion.div>

            <h1 className="text-7xl sm:text-8xl md:text-9xl font-extrabold mb-6 leading-[1.0] tracking-tighter mix-blend-screen text-brand-white drop-shadow-2xl">
              Build The <br /> <span className="text-gradient">Future.</span>
            </h1>
            
            <p className="text-xl sm:text-2xl text-gray-300 mb-12 max-w-2xl font-medium leading-relaxed drop-shadow-lg">
              Scroll down to discover our ecosystem.
            </p>
          </div>

          {/* Phase 2: Engagement / 3D Detail view */}
          <div ref={textPhase2Ref} className="absolute inset-0 flex flex-col items-center justify-center px-4 w-full h-full pb-32">
             <h2 className="text-5xl sm:text-7xl font-bold mb-4 text-brand-white">
               Apple-style Precision.
             </h2>
             <p className="text-2xl text-gray-400 max-w-2xl mx-auto">
               Every pixel mapped mathematically to user interaction. We forge high-fidelity models.
             </p>
          </div>

          {/* Phase 3: Final Call To Action */}
          <div ref={textPhase3Ref} className="absolute inset-0 flex flex-col items-center justify-center px-4 w-full h-full">
             <h2 className="text-6xl sm:text-8xl font-black mb-8 text-brand-white tracking-tighter">
               Ready to Launch?
             </h2>
             <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                <button 
                  onClick={handleGetStarted}
                  className="px-8 py-4 bg-brand-white text-brand-black font-extrabold text-xl rounded-full transition-transform hover:scale-105 shadow-[0_0_40px_rgba(255,255,255,0.4)] pointer-events-auto"
                >
                  Start Your Project
                </button>
                <button 
                  onClick={handleBookCall}
                  className="px-8 py-4 glass-premium text-brand-white font-bold text-xl rounded-full transition-transform hover:scale-105 hover:bg-white/10 pointer-events-auto"
                >
                  View Our Work 
                </button>
             </div>
          </div>

        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20 pointer-events-none"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <div className="text-xs text-gray-500 uppercase tracking-widest font-bold mb-2 text-center">Scroll</div>
          <div className="w-6 h-10 border-2 border-gray-600 rounded-full flex justify-center p-1 mx-auto">
            <div className="w-1.5 h-1.5 bg-brand-blue rounded-full"></div>
          </div>
        </motion.div>
      </section>
    </>
  );
};

export default HeroSection;
