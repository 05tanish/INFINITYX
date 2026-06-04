import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import StarLogo from '../ui/StarLogo';
import Magnetic from '../ui/Magnetic';

const FinalCTASection = () => {
  const containerRef = useRef<HTMLElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

  return (
    <section 
      ref={containerRef}
      className="py-32 relative overflow-hidden bg-gradient-to-b from-ns-black to-ns-navy border-t border-ns-graphite"
    >
      {/* Dynamic Background Elements */}
      <motion.div 
        style={{ y }}
        className="absolute inset-0 z-0 flex items-center justify-center opacity-10 pointer-events-none"
      >
        <StarLogo size={800} animated={true} />
      </motion.div>
      
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-ns-teal/5 rounded-full blur-3xl pointer-events-none aurora-pulse" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center flex flex-col items-center">
        
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <div className="w-16 h-16 rounded-full bg-ns-gold/10 border border-ns-gold/30 flex items-center justify-center mx-auto shadow-gold">
            <StarLogo size={24} />
          </div>
        </motion.div>

        <motion.h2 
          className="display-heading text-5xl md:text-7xl mb-8 leading-tight"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Ready to build <br/> <span className="italic text-ns-gold">what's next?</span>
        </motion.h2>

        <motion.p 
          className="text-lg text-ns-slate mb-12 max-w-xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Partner with Northern Star to transform your ideas into scalable, high-performance digital products.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <Magnetic>
            <button
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="btn-primary"
            >
              Start Your Project &rarr;
            </button>
          </Magnetic>
        </motion.div>
      </div>
    </section>
  );
};

export default FinalCTASection;
