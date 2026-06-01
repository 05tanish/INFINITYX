import { motion } from 'framer-motion';
import { processSteps } from '../../lib/constants';

const ProcessSection = () => (
  <section id="process" className="py-24 bg-brand-surface relative">
    <div className="section-divider" />

    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <motion.div
        className="mb-16 text-center max-w-2xl mx-auto"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <div className="section-label justify-center">How We Work</div>
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
          From Brief to Launch
        </h2>
        <p className="text-text-secondary leading-relaxed">
          A transparent, structured process so you always know what's happening and when to expect delivery.
        </p>
      </motion.div>

      {/* Steps — vertical timeline on mobile, horizontal on desktop */}
      <div className="relative">
        {/* Connecting line (desktop) */}
        <div className="hidden lg:block absolute top-10 left-0 right-0 h-px bg-brand-border z-0" />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6 relative z-10">
          {processSteps.map((step, index) => (
            <motion.div
              key={step.step}
              className="flex flex-col items-start lg:items-center lg:text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
            >
              {/* Step circle */}
              <div className="flex items-center gap-3 lg:flex-col lg:gap-2 lg:items-center mb-4">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 ${
                  index === 0
                    ? 'bg-brand-blue text-white'
                    : 'bg-brand-card border border-brand-border text-text-secondary'
                }`}>
                  {step.step}
                </div>
                {/* Mobile connector line */}
                <div className="flex-1 h-px bg-brand-border lg:hidden" />
              </div>

              <div className="lg:px-2">
                <div className="text-xs font-mono text-text-muted mb-1 font-medium">{step.duration}</div>
                <h3 className="text-sm font-semibold text-white mb-2">{step.title}</h3>
                <p className="text-xs text-text-secondary leading-relaxed">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Callout */}
      <motion.div
        className="mt-14 pro-card p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center gap-6"
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <div className="w-12 h-12 rounded-xl bg-blue-600/10 border border-blue-600/20 flex items-center justify-center flex-shrink-0">
          <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
        </div>
        <div className="flex-1">
          <h3 className="text-base font-semibold text-white mb-1">Fixed-price or time-and-materials — your choice</h3>
          <p className="text-sm text-text-secondary leading-relaxed">
            We offer both engagement models. Fixed-price gives you budget certainty; T&M is ideal for evolving scope. We'll recommend the right model during your proposal call.
          </p>
        </div>
        <button
          onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
          className="btn-secondary text-sm flex-shrink-0"
        >
          Discuss Your Project
        </button>
      </motion.div>
    </div>

    <div className="section-divider mt-24" />
  </section>
);

export default ProcessSection;
