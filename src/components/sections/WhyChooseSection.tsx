import { useRef } from 'react';
import { motion } from 'framer-motion';

const advantages = [
  {
    id: 'engineering-excellence',
    title: 'Engineering Excellence',
    description: 'We build on modern, scalable stacks (React, Next.js, Node.js, AWS) ensuring your software is fast, reliable, and future-proof.',
    icon: (
      <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    )
  },
  {
    id: 'transparent-process',
    title: 'Transparent Delivery',
    description: 'Clear milestones, weekly sprints, and honest communication. You’ll always know exactly where your project stands.',
    icon: (
      <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    )
  },
  {
    id: 'security-first',
    title: 'Security First',
    description: 'We treat your data with enterprise-level care. Secure architectures, regular audits, and compliance best practices.',
    icon: (
      <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    )
  },
  {
    id: 'long-term-partnership',
    title: 'Long-Term Partnership',
    description: 'We don’t just launch and leave. We offer continuous maintenance, feature updates, and technical strategy as you scale.',
    icon: (
      <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
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
      className="py-24 bg-brand-black relative"
    >
      <div className="section-divider" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <motion.div
          className="mb-16 text-center max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="section-label justify-center">Why Infinityx</div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            A Software Partner You Can Trust
          </h2>
          <p className="text-text-secondary leading-relaxed">
            We combine startup agility with enterprise-grade engineering standards.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {advantages.map((adv, index) => (
            <motion.div 
              key={adv.id}
              className="pro-card p-8 group flex flex-col md:flex-row gap-6"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <div className="w-14 h-14 rounded-xl bg-blue-600/10 border border-blue-600/20 flex items-center justify-center flex-shrink-0 group-hover:bg-blue-600/20 transition-colors">
                {adv.icon}
              </div>
              <div>
                <h3 className="text-lg font-bold text-white mb-2">{adv.title}</h3>
                <p className="text-sm text-text-secondary leading-relaxed">{adv.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>

      <div className="section-divider mt-24" />
    </section>
  );
};

export default WhyChooseSection;
