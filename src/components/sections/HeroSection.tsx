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

  const scrollToPortfolio = () => {
    const portfolioSection = document.getElementById('portfolio');
    if (portfolioSection) {
      portfolioSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleGetStarted = () => onGetStarted ? onGetStarted() : scrollToContact();
  const handleBookCall = () => onBookCall ? onBookCall() : scrollToPortfolio();

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Apple-style Scrub Timeline locked to the container
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '+=400%',
          pin: true,
          scrub: 1,
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
      <section
        ref={containerRef}
        id="hero"
        className="relative h-screen w-full flex items-center justify-center pointer-events-none noise-overlay overflow-hidden"
      >
        {/* Live 3D Hero Scene as background */}
        <div className="absolute inset-0 z-0">
          <HeroScene />
        </div>

        {/* Dark overlay so text is legible over 3D */}
        <div className="absolute inset-0 z-[1] bg-gradient-to-b from-brand-black/60 via-brand-black/30 to-brand-black/70" />

        {/* Ambient glow orbs */}
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-brand-blue-glow rounded-full blur-[140px] opacity-20 pointer-events-none mix-blend-screen z-[2]" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-[rgba(138,43,226,0.2)] rounded-full blur-[120px] opacity-25 pointer-events-none mix-blend-screen z-[2]" />

        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center h-full flex flex-col justify-center pointer-events-auto">
          
          {/* Phase 1: Massive Establishing Intro */}
          <div ref={textPhase1Ref} className="absolute inset-0 flex flex-col items-center justify-center px-4 w-full h-full">
            <motion.div
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full glass-premium mb-8 uppercase tracking-widest text-xs font-bold shadow-[0_0_15px_rgba(62,99,221,0.3)]"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <div className="w-2 h-2 rounded-full bg-brand-blue animate-pulse"></div>
              <span className="text-gray-300">Next-Gen Digital Solutions</span>
            </motion.div>

            <motion.h1
              className="text-7xl sm:text-8xl md:text-9xl font-extrabold mb-6 leading-[1.0] tracking-tighter text-brand-white drop-shadow-2xl"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              Build The <br /> <span className="text-gradient">Future.</span>
            </motion.h1>
            
            <motion.p
              className="text-xl sm:text-2xl text-gray-300 mb-12 max-w-2xl font-medium leading-relaxed drop-shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
            >
              Scroll down to discover our ecosystem.
            </motion.p>
          </div>

          {/* Phase 2: Value Proposition */}
          <div ref={textPhase2Ref} className="absolute inset-0 flex flex-col items-center justify-center px-4 w-full h-full pb-32">
            <motion.div className="inline-flex items-center gap-2 px-6 py-2 rounded-full glass-premium mb-8 uppercase tracking-widest text-xs font-bold">
              <div className="w-2 h-2 rounded-full bg-brand-purple"></div>
              <span className="text-gray-300">Content · Design · Development · Security</span>
            </motion.div>
            <h2 className="text-5xl sm:text-7xl font-bold mb-6 text-brand-white leading-tight">
              One Agency.<br/>
              <span className="text-gradient">Infinite Growth.</span>
            </h2>
            <p className="text-xl sm:text-2xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
              We don't just build websites. We engineer digital ecosystems that capture attention, convert visitors, and drive real revenue.
            </p>
          </div>

          {/* Phase 3: Final Call To Action */}
          <div ref={textPhase3Ref} className="absolute inset-0 flex flex-col items-center justify-center px-4 w-full h-full">
            <h2 className="text-6xl sm:text-8xl font-black mb-4 text-brand-white tracking-tighter">
              Ready to <span className="text-gradient">Launch?</span>
            </h2>
            <p className="text-xl text-gray-400 mb-10 max-w-xl mx-auto">
              Join 50+ brands that trusted Infinityx to scale their digital presence.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <motion.button
                id="hero-start-project-btn"
                onClick={handleGetStarted}
                className="px-10 py-4 font-extrabold text-lg rounded-full text-white shadow-[0_0_30px_rgba(62,99,221,0.5)] pointer-events-auto relative overflow-hidden group"
                style={{ background: 'linear-gradient(135deg, #3E63DD, #8A2BE2)' }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
              >
                <span className="relative z-10">Start Your Project →</span>
                <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
              </motion.button>
              <motion.button
                id="hero-view-work-btn"
                onClick={handleBookCall}
                className="px-10 py-4 glass-premium text-brand-white font-bold text-lg rounded-full transition-all hover:bg-white/10 pointer-events-auto border border-white/10"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
              >
                View Our Work
              </motion.button>
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
            <motion.div
              className="w-1.5 h-1.5 bg-brand-blue rounded-full"
              animate={{ y: [0, 16, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            />
          </div>
        </motion.div>
      </section>
    </>
  );
};

export default HeroSection;
