import { motion } from 'framer-motion';
import { processSteps } from '../../lib/constants';
import StarLogo from '../ui/StarLogo';

const ProcessSection = () => (
  <section id="process" className="py-24 bg-ns-navy relative">
    <div className="section-divider" />

    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
      {/* Header */}
      <motion.div
        className="mb-16 text-center max-w-2xl mx-auto"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center justify-center gap-4 mb-6">
          <div className="h-px flex-1 bg-ns-graphite max-w-[50px]" />
          <span className="text-[10px] text-ns-slate uppercase tracking-[0.2em] font-semibold">How We Work</span>
          <div className="h-px flex-1 bg-ns-graphite max-w-[50px]" />
        </div>
        <h2 className="display-heading text-4xl md:text-5xl mb-4">
          From Brief to Launch
        </h2>
        <p className="text-ns-slate leading-relaxed">
          A transparent, structured process so you always know what's happening and when to expect delivery.
        </p>
      </motion.div>

      {/* Steps — vertical timeline on mobile, horizontal on desktop */}
      <div className="relative">
        {/* Connecting line (desktop) */}
        <div className="hidden lg:block absolute top-6 left-0 right-0 h-px bg-ns-graphite z-0" />
        {/* Progress line */}
        <div className="hidden lg:block absolute top-6 left-0 w-1/3 h-px bg-ns-gold z-0" />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 relative z-10">
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
              <div className="flex items-center gap-4 lg:flex-col lg:gap-3 lg:items-center mb-5">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center font-serif text-lg border flex-shrink-0 transition-colors ${
                  index === 0
                    ? 'bg-ns-gold border-ns-gold text-ns-black shadow-gold'
                    : 'bg-ns-black border-ns-graphite text-ns-gold hover:border-ns-gold/50'
                }`}>
                  {step.step}
                </div>
                {/* Mobile connector line */}
                <div className="flex-1 h-px bg-ns-graphite lg:hidden" />
              </div>

              <div className="lg:px-2">
                <div className="text-[10px] font-mono text-ns-teal uppercase tracking-widest mb-2 font-semibold">{step.duration}</div>
                <h3 className="text-base font-serif text-white mb-2">{step.title}</h3>
                <p className="text-xs text-ns-slate leading-relaxed">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Callout */}
      <motion.div
        className="mt-20 pro-card p-6 md:p-10 flex flex-col md:flex-row items-start md:items-center gap-8 bg-ns-black border-ns-graphite"
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <div className="w-16 h-16 rounded-2xl bg-ns-gold/10 border border-ns-gold/20 flex items-center justify-center flex-shrink-0">
           <StarLogo size={24} color="#C6A16E" />
        </div>
        <div className="flex-1">
          <h3 className="text-xl font-serif text-white mb-2">Fixed-price or time-and-materials</h3>
          <p className="text-sm text-ns-slate leading-relaxed max-w-2xl">
            We offer both engagement models. Fixed-price gives you budget certainty; T&M is ideal for evolving scope. We'll recommend the right model during your proposal call.
          </p>
        </div>
        <button
          onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
          className="btn-outline-gold flex-shrink-0"
        >
          Discuss Your Project
        </button>
      </motion.div>
    </div>

    <div className="section-divider mt-24" />
  </section>
);

export default ProcessSection;
