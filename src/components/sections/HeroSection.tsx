import { motion } from 'framer-motion';
import { Suspense, lazy } from 'react';

// Use the Iframe approach to safely embed Spline Community files
const SplineIframe = lazy(() => import('../3d/SplineIframe'));

export interface HeroSectionProps {
  onGetStarted?: () => void;
  onBookCall?: () => void;
}

const HeroSection = ({ onGetStarted, onBookCall }: HeroSectionProps) => {
  const scrollToContact = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleGetStarted = () => {
    if (onGetStarted) {
      onGetStarted();
    } else {
      scrollToContact();
    }
  };

  const handleBookCall = () => {
    if (onBookCall) {
      onBookCall();
    } else {
      scrollToContact();
    }
  };

  return (
    <section 
      id="hero" 
      className="relative min-h-screen flex items-center justify-center bg-brand-black overflow-hidden"
    >
      {/* 3D Spline Backdrop using requested community file */}
      <div className="absolute inset-0 z-0 opacity-80 mix-blend-screen overflow-hidden">
        <Suspense fallback={
          <div className="w-full h-full bg-brand-navy flex items-center justify-center">
            <div className="w-12 h-12 border-4 border-brand-blue border-t-transparent rounded-full animate-spin"></div>
          </div>
        }>
          <div className="w-full h-full scale-[1.1] transform-gpu">
            {/* Embedded Spline Using the user's specific Community File ID */}
            {/* Note: if my.spline.design isn't public for this ID, the fallback inside SplineIframe will handle it */}
            <SplineIframe sceneId="a1f156f7-ef01-42d1-bf7b-5be1b7967b0a" fallbackToR3F={true} />
          </div>
        </Suspense>
      </div>

      {/* Grid overlay to give it a techy agency feel */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px] z-0 opacity-30 mask-image-radial" style={{ maskImage: 'radial-gradient(ellipse at center, black 40%, transparent 80%)', WebkitMaskImage: 'radial-gradient(ellipse at center, black 40%, transparent 80%)' }} />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-20">
        {/* Premium badge */}
        <motion.div
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full glass-premium mb-8 uppercase tracking-widest text-xs font-bold shadow-[0_0_15px_rgba(62,99,221,0.3)]"
          initial={{ opacity: 0, scale: 0.9, y: -20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="w-2 h-2 rounded-full bg-brand-blue animate-pulse-glow"></div>
          <span className="text-gray-300">Next-Gen Digital Solutions</span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          className="text-6xl sm:text-7xl md:text-8xl lg:text-[7rem] font-extrabold mb-6 leading-[1.05] tracking-tighter"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, Math: [0.22, 1, 0.36, 1] }}
        >
          <span className="text-white drop-shadow-2xl">We Build The</span>
          <br />
          <span className="text-gradient-blue filter drop-shadow-[0_0_30px_rgba(62,99,221,0.5)]">Future.</span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          className="text-xl sm:text-2xl text-gray-400 mb-12 max-w-3xl mx-auto font-medium leading-relaxed tracking-tight"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
        >
          Transforming standard ideas into awe-inspiring digital experiences. 
          <span className="text-gray-200"> Content. Technology. Scale.</span>
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
        >
          <button 
            onClick={handleGetStarted}
            className="group relative px-8 py-4 bg-brand-white text-brand-black font-extrabold text-lg rounded-full overflow-hidden transition-all hover:scale-105 shadow-[0_0_30px_rgba(255,255,255,0.3)]"
          >
            <span className="relative z-10">Start Your Project</span>
            <div className="absolute inset-0 bg-gradient-to-r from-gray-200 to-white transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></div>
          </button>
          
          <button 
            onClick={handleBookCall}
            className="group px-8 py-4 glass-premium text-brand-white font-bold text-lg rounded-full transition-all hover:scale-105 hover:bg-white/10"
          >
            View Our Work 
            <svg className="inline-block w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
          </button>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-20"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      >
        <div className="w-6 h-10 border-2 border-gray-500 rounded-full flex justify-center p-1">
          <div className="w-1.5 h-1.5 bg-brand-blue rounded-full"></div>
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
