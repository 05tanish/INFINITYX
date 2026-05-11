import { motion } from 'framer-motion';

const steps = [
  {
    number: '01',
    title: 'Discover',
    description: 'We deep-dive into your brand, audience, and competition. No guesswork — just data-backed strategy.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
    ),
    color: '#3E63DD',
    glow: 'rgba(62,99,221,0.3)',
  },
  {
    number: '02',
    title: 'Strategy',
    description: 'We craft a bespoke roadmap — from content calendars to tech architecture — tailored to your goals.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
    color: '#8A2BE2',
    glow: 'rgba(138,43,226,0.3)',
  },
  {
    number: '03',
    title: 'Execute',
    description: 'Our team ships fast — high-quality content, pixel-perfect websites, and bulletproof security systems.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    color: '#E5C07B',
    glow: 'rgba(229,192,123,0.3)',
  },
  {
    number: '04',
    title: 'Scale',
    description: 'We optimize, iterate, and grow with you — continuously improving performance and expanding reach.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
      </svg>
    ),
    color: '#3E63DD',
    glow: 'rgba(62,99,221,0.3)',
  },
];

const ProcessSection = () => {
  return (
    <section id="process" className="py-32 bg-brand-navy/20 relative overflow-hidden">
      {/* Accent lines */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-purple/30 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-blue/30 to-transparent" />

      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-brand-blue-glow rounded-full blur-[150px] opacity-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <motion.span className="inline-block px-4 py-2 rounded-full glass-premium text-brand-blue text-sm font-bold uppercase tracking-widest mb-6"
            initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}>
            How We Work
          </motion.span>
          <h2 className="text-5xl md:text-6xl font-extrabold text-brand-white mb-4">
            Our <span className="text-gradient">Process</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
            From first conversation to measurable results — a proven 4-step system.
          </p>
        </motion.div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              id={`process-step-${index + 1}`}
              className="glass-card p-8 relative group overflow-hidden"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: index * 0.12 }}
            >
              {/* Step number watermark */}
              <div className="absolute -top-4 -right-2 text-8xl font-black text-white/[0.03] select-none pointer-events-none">
                {step.number}
              </div>

              {/* Colored left accent border */}
              <div className="absolute left-0 top-0 bottom-0 w-[3px] rounded-l-3xl" style={{ background: step.color }} />

              {/* Icon */}
              <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-110"
                style={{ background: `${step.color}20`, border: `1px solid ${step.color}40`, color: step.color, boxShadow: `0 0 20px ${step.glow}` }}>
                {step.icon}
              </div>

              {/* Content */}
              <div className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: step.color }}>
                Step {step.number}
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">{step.title}</h3>
              <p className="text-gray-400 leading-relaxed text-sm">{step.description}</p>

              {/* Connector arrow (hidden on last) */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 z-20">
                  <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
