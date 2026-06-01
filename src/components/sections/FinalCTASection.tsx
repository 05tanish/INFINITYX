import { motion } from 'framer-motion';

const FinalCTASection = () => {
  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="py-32 bg-brand-black relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="pro-card p-10 md:p-16 text-center border-blue-600/30 bg-blue-600/5 relative overflow-hidden"
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* subtle grid background in CTA */}
          <div className="absolute inset-0 tech-grid opacity-30 pointer-events-none" />

          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 mb-6">
              <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
              <span className="text-sm font-bold text-blue-400 tracking-widest uppercase">
                Accepting New Projects
              </span>
            </div>

            <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-6 text-white leading-tight">
              Ready to Ship <br/> Your Next Big Idea?
            </h2>

            <p className="text-lg md:text-xl text-text-secondary mb-10 max-w-2xl mx-auto leading-relaxed">
              Partner with an engineering team that understands business goals. We build scalable software that drives real revenue.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={scrollToContact}
                className="btn-primary text-base px-10 py-4 shadow-lg shadow-blue-600/20 w-full sm:w-auto"
              >
                Schedule Discovery Call →
              </button>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-6 mt-12 pt-8 border-t border-brand-border text-sm text-text-muted">
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                <span>Free 30-min Consultation</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                <span>No Commitment Required</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                <span>NDA Protected</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FinalCTASection;
