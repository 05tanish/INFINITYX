import { useRef } from 'react';
import { motion } from 'framer-motion';
import Magnetic from '../ui/Magnetic';

export interface HeroSectionProps {
  onGetStarted?: () => void;
}

// A simple stagger animation for the words
const headline = "WE BUILD SOFTWARE THAT SCALES.";
const words = headline.split(" ");

const HeroSection = ({ onGetStarted }: HeroSectionProps) => {
  const containerRef = useRef<HTMLElement>(null);

  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToWork = () => {
    document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleGetStarted = () => onGetStarted ? onGetStarted() : scrollToContact();

  return (
    <section
      ref={containerRef}
      id="hero"
      className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-brand-black"
    >
      {/* Background Effects */}
      <div className="absolute inset-0 tech-grid opacity-30 pointer-events-none" />
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[1000px] h-[500px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at top, rgba(37,99,235,0.12) 0%, transparent 60%)' }}
      />
      <div className="absolute top-0 left-0 right-0 h-px bg-brand-border" />

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center flex-grow pt-24 pb-12">
        


        {/* Masked Headline Reveal */}
        <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 mb-8 max-w-5xl">
          {words.map((word, idx) => (
            <div key={idx} className="overflow-hidden py-2">
              <motion.span
                className="inline-block text-6xl sm:text-7xl md:text-8xl lg:text-[8rem] font-black tracking-tighter text-white leading-[0.9]"
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{
                  duration: 0.8,
                  ease: [0.16, 1, 0.3, 1],
                  delay: 0.1 + idx * 0.05
                }}
              >
                {word === "SOFTWARE" ? <span className="text-brand-blue">{word}</span> : word}
              </motion.span>
            </div>
          ))}
        </div>

        <motion.p
          className="text-lg md:text-xl text-text-secondary mb-12 max-w-2xl text-center leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          We turn complex requirements into clean, production-ready systems. Specializing in SaaS, mobile apps, and business automation.
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row items-center gap-4"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <Magnetic>
            <motion.button
              id="hero-start-project-btn"
              onClick={handleGetStarted}
              className="btn-primary text-base px-8 py-4"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
            >
              Start a Project →
            </motion.button>
          </Magnetic>
          <Magnetic>
            <motion.button
              id="hero-view-work-btn"
              onClick={scrollToWork}
              className="btn-secondary text-base px-8 py-4"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
            >
              View Our Work
            </motion.button>
          </Magnetic>
        </motion.div>
      </div>

      {/* Bottom Anchored Strip */}
      <motion.div 
        className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8 flex flex-col md:flex-row items-center justify-between gap-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1 }}
      >
        {/* Left: Stats */}
        <div className="flex items-center gap-8">
          {[
            { value: '50+', label: 'Projects' },
            { value: '100%', label: 'Retention' },
          ].map(stat => (
            <div key={stat.label} className="flex flex-col">
              <span className="text-xl font-bold text-white">{stat.value}</span>
              <span className="text-[10px] text-text-muted font-medium uppercase tracking-widest mt-1">{stat.label}</span>
            </div>
          ))}
        </div>

        {/* Center: Scroll Indicator */}
        <div className="hidden md:flex flex-col items-center gap-3">
          <span className="text-[9px] text-text-muted uppercase tracking-widest font-semibold">Scroll</span>
          <div className="w-px h-12 bg-brand-border relative overflow-hidden">
            <motion.div 
              className="absolute top-0 left-0 w-full h-full bg-brand-blue"
              initial={{ y: "-100%" }}
              animate={{ y: "100%" }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
        </div>

        {/* Right: Trust */}
        <div className="flex items-center gap-3">
          <div className="flex -space-x-2">
            {['RK','PS','AP'].map((init, i) => (
              <div
                key={i}
                className="w-8 h-8 rounded-full border-2 border-brand-black flex items-center justify-center text-[10px] font-bold text-white"
                style={{ background: i === 0 ? '#2563EB' : i === 1 ? '#374151' : '#1F2937' }}
              >
                {init}
              </div>
            ))}
          </div>
          <div>
            <div className="flex items-center gap-1">
              {[1,2,3,4,5].map(s => (
                <svg key={s} className="w-3 h-3 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <p className="text-[10px] text-text-muted mt-1 uppercase tracking-wider">Trusted by 50+ founders</p>
          </div>
        </div>
      </motion.div>

      {/* Bottom border */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-brand-border" />
    </section>
  );
};

export default HeroSection;
