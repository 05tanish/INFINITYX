import { useRef } from 'react';
import { motion } from 'framer-motion';
import Magnetic from '../ui/Magnetic';

export interface HeroSectionProps {
  onGetStarted?: () => void;
}

const HeroSection = ({ onGetStarted }: HeroSectionProps) => {
  const containerRef = useRef<HTMLElement>(null);

  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleGetStarted = () => onGetStarted ? onGetStarted() : scrollToContact();

  return (
    <section
      ref={containerRef}
      id="hero"
      className="relative min-h-[100vh] w-full flex flex-col items-center justify-center overflow-hidden bg-ns-black"
    >
      {/* Background Image with Aurora & Mountains */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{ 
          backgroundImage: "url('/hero-aurora.jpg')",
        }}
      />
      {/* Overlay to ensure text readability */}
      <div className="absolute inset-0 z-0 bg-ns-black/40 bg-gradient-to-t from-ns-black via-ns-black/20 to-transparent" />
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-ns-black/60 to-transparent" />

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-start justify-center flex-grow pt-32 pb-24 md:pt-40 md:pb-32">
        
        {/* Micro-label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-8"
        >
          <span className="text-[0.65rem] md:text-xs font-bold text-ns-gold uppercase tracking-[0.3em] font-sans">
            Digital Growth. Purposeful Design.
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-semibold text-white leading-[1.05] max-w-4xl tracking-tight font-serif mb-6"
        >
          We help ambitious brands reach <br className="hidden md:block" />
          <span className="text-ns-gold italic pr-4">what's next.</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          className="text-base md:text-lg text-ns-slate mb-12 max-w-xl leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
        >
          Northern Star is a digital agency crafting strategy, design and experiences that drive measurable growth.
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
        >
          <Magnetic>
            <button
              onClick={handleGetStarted}
              className="btn-primary"
            >
              Let's Build Something Great &rarr;
            </button>
          </Magnetic>
        </motion.div>
      </div>

      {/* Bottom Client Logo Strip */}
      <motion.div 
        className="relative z-10 w-full bg-ns-black/80 backdrop-blur-md border-t border-ns-graphite py-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-[0.65rem] text-ns-slate font-bold uppercase tracking-[0.2em] mb-4">
            Trusted by growing brands
          </div>
          <div className="flex flex-wrap items-center justify-between gap-8 opacity-70">
            {/* Wordmarks based on the reference */}
            <div className="text-lg md:text-xl font-serif tracking-widest text-white">verve</div>
            <div className="text-lg md:text-xl font-sans font-light tracking-[0.3em] text-white">LUMEN</div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
              <span className="text-lg md:text-xl font-sans font-medium tracking-wide text-white">Peakline</span>
            </div>
            <div className="text-lg md:text-xl font-serif font-bold italic tracking-wide text-white">native</div>
            <div className="text-lg md:text-xl font-sans uppercase tracking-[0.2em] text-white">WESTHILL</div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor"><path d="M4 4h6v6H4V4zm10 0h6v6h-6V4zM4 14h6v6H4v-6zm10 0h6v6h-6v-6z"/></svg>
              <span className="text-lg md:text-xl font-sans font-semibold tracking-widest text-white">FORMA</span>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
