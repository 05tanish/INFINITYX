import { motion } from 'framer-motion';
import { Suspense, lazy } from 'react';
import Button from '../ui/Button';

// Reusing the beautiful Three.js scene that was previously in the hero
const HeroScene = lazy(() => import('../3d/HeroScene'));

const FinalCTASection = () => {
  const scrollToContact = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section className="py-32 bg-brand-black relative overflow-hidden">
      {/* Deep gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-brand-black via-brand-navy/50 to-brand-purple/10" />
      
      {/* Subtle grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:100px_100px] opacity-20" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="glass-card rounded-3xl p-8 md:p-12 overflow-hidden border border-white/5 shadow-2xl"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* Left side: Content */}
            <div className="relative z-20 order-2 lg:order-1 text-center lg:text-left">
              {/* Badge */}
              <motion.div
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-premium mb-8"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                <div className="w-2 h-2 rounded-full bg-brand-purple animate-pulse"></div>
                <span className="text-sm text-brand-gray-200 font-bold tracking-widest uppercase">Limited Spots Available</span>
              </motion.div>

              {/* Headline */}
              <motion.h2
                className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-6 text-brand-white leading-tight"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                Ready to <span className="text-gradient">Scale</span> Your Business?
              </motion.h2>

              {/* Subtext */}
              <motion.p
                className="text-xl sm:text-2xl text-gray-400 mb-10 max-w-lg mx-auto lg:mx-0 leading-relaxed"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                Let's build, grow, and secure your brand together. Start your transformation today.
              </motion.p>

              {/* CTA Button */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <Button
                  variant="primary"
                  size="lg"
                  onClick={scrollToContact}
                  className="text-lg px-12 py-5 shadow-[0_0_20px_rgba(62,99,221,0.4)] hover:shadow-[0_0_30px_rgba(138,43,226,0.6)] transition-shadow duration-300 rounded-full"
                >
                  Start Your Project
                </Button>
              </motion.div>

              {/* Trust indicators */}
              <motion.div
                className="flex flex-wrap items-center justify-center lg:justify-start gap-6 mt-12 pt-8 border-t border-brand-gray-800/50"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                <div className="flex items-center gap-2 text-gray-400">
                  <div className="w-1.5 h-1.5 rounded-full bg-brand-blue"></div>
                  <span className="text-sm font-semibold">No commitment</span>
                </div>
                <div className="flex items-center gap-2 text-gray-400">
                  <div className="w-1.5 h-1.5 rounded-full bg-brand-gold"></div>
                  <span className="text-sm font-semibold">Free consultation</span>
                </div>
                <div className="flex items-center gap-2 text-gray-400">
                  <div className="w-1.5 h-1.5 rounded-full bg-brand-purple"></div>
                  <span className="text-sm font-semibold">Quick response</span>
                </div>
              </motion.div>
            </div>

            {/* Right side: Interactive 3D */}
            <div className="relative z-10 order-1 lg:order-2 h-[400px] lg:h-full w-full rounded-2xl overflow-hidden glass-premium group">
              <div className="absolute inset-0 bg-brand-blue-glow/10 opacity-50 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none z-10 mix-blend-screen" />
              <Suspense fallback={
                <div className="w-full h-full flex items-center justify-center bg-black/20">
                  <div className="w-12 h-12 border-4 border-brand-purple border-t-transparent rounded-full animate-spin"></div>
                </div>
              }>
                 {/* Make it scale wildly on hover for interactivity feel */}
                 <div className="w-full h-full transform-gpu transition-transform duration-1000 group-hover:scale-110">
                   <HeroScene />
                 </div>
              </Suspense>
            </div>

          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FinalCTASection;
