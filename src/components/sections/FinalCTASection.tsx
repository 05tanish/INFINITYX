import { motion } from 'framer-motion';
import Button from '../ui/Button';

const FinalCTASection = () => {
  const scrollToContact = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section className="py-32 bg-brand-black relative overflow-hidden">
      {/* Subtle grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:100px_100px] opacity-20" />
      
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="glass-premium rounded-lg p-12 md:p-16 text-center elevated-lg"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* Badge */}
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-navy/50 mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <div className="w-2 h-2 rounded-full bg-brand-gold"></div>
            <span className="text-sm text-brand-gold font-medium">Limited Spots Available</span>
          </motion.div>

          {/* Headline */}
          <motion.h2
            className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 text-brand-white"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Ready to Scale Your Business?
          </motion.h2>

          {/* Subtext */}
          <motion.p
            className="text-xl sm:text-2xl text-gray-300 mb-10 max-w-2xl mx-auto leading-relaxed"
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
              className="text-lg px-12 py-5"
            >
              Get Started Now
            </Button>
          </motion.div>

          {/* Trust indicators */}
          <motion.div
            className="flex flex-wrap items-center justify-center gap-8 mt-12 pt-8 border-t border-brand-gray-800/50"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <div className="flex items-center gap-2 text-gray-400">
              <div className="w-1 h-1 rounded-full bg-brand-blue"></div>
              <span className="text-sm">No commitment required</span>
            </div>
            <div className="flex items-center gap-2 text-gray-400">
              <div className="w-1 h-1 rounded-full bg-brand-gold"></div>
              <span className="text-sm">Free consultation</span>
            </div>
            <div className="flex items-center gap-2 text-gray-400">
              <div className="w-1 h-1 rounded-full bg-brand-blue"></div>
              <span className="text-sm">Quick response time</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default FinalCTASection;
