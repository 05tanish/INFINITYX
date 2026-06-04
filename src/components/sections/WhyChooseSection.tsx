import { useRef } from 'react';
import { motion } from 'framer-motion';
import StarLogo from '../ui/StarLogo';

const advantages = [
  {
    id: 'engineering-excellence',
    title: '50+',
    subtitle: 'Brands helped',
    description: 'to grow',
    icon: (
      <svg className="w-5 h-5 text-ns-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" />
      </svg>
    )
  },
  {
    id: 'transparent-process',
    title: '10+',
    subtitle: 'Industries we work',
    description: 'across',
    icon: (
      <svg className="w-5 h-5 text-ns-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
      </svg>
    )
  },
  {
    id: 'security-first',
    title: '100%',
    subtitle: 'Focused on results',
    description: 'that matter',
    icon: (
      <svg className="w-5 h-5 text-ns-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    )
  }
];

const WhyChooseSection = () => {
  const containerRef = useRef<HTMLElement>(null);

  return (
    <section 
      ref={containerRef} 
      id="why-choose" 
      className="py-24 bg-ns-navy relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
        
        {/* Left Side Content */}
        <div className="flex-1">
          <motion.div
            className="mb-12"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-[10px] text-ns-slate uppercase tracking-[0.2em] font-semibold mb-6">
              Why Northern Star
            </div>
            <h2 className="display-heading text-4xl sm:text-5xl md:text-[3.5rem] mb-4">
              We're not just another agency.<br/>
              We're your growth partner.
            </h2>
          </motion.div>

          {/* Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
            {advantages.map((adv, index) => (
              <motion.div 
                key={adv.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <div className="w-10 h-10 rounded-full bg-ns-gold/10 border border-ns-gold/20 flex items-center justify-center flex-shrink-0 mb-4">
                  {adv.icon}
                </div>
                <div className="stat-number text-4xl md:text-5xl mb-2">{adv.title}</div>
                <p className="text-sm font-semibold text-white">{adv.subtitle}</p>
                <p className="text-sm text-ns-slate">{adv.description}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Right Side Decoration (Big Compass Star) */}
        <motion.div 
          className="flex-1 flex justify-center lg:justify-end relative"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          {/* Subtle radar rings */}
          <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none">
            <div className="w-[300px] h-[300px] border rounded-full border-ns-gold absolute" />
            <div className="w-[450px] h-[450px] border rounded-full border-ns-gold absolute" />
            <div className="w-[600px] h-[600px] border rounded-full border-ns-gold absolute" />
            <div className="w-full h-px bg-ns-gold absolute" />
            <div className="h-full w-px bg-ns-gold absolute" />
          </div>

          <StarLogo size={400} glow={true} animated={true} className="opacity-80 drop-shadow-[0_0_50px_rgba(198,161,110,0.3)]" />
        </motion.div>

      </div>
    </section>
  );
};

export default WhyChooseSection;
