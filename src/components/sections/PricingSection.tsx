import { motion } from 'framer-motion';
import { pricingTiers, type PricingTier } from '../../lib/constants';

const scrollToContact = () =>
  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });

const PricingCard = ({ tier, index }: { tier: PricingTier; index: number }) => (
  <motion.div
    className={`relative flex flex-col h-full ${
      tier.featured ? 'pro-card-featured' : 'pro-card'
    } p-6`}
    initial={{ opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.4, delay: index * 0.08 }}
  >
    {/* Badge */}
    {(tier.badge || tier.featured) && (
      <div className="absolute -top-3 left-6">
        <span className={`px-3 py-1 text-xs font-bold rounded-full ${
          tier.featured
            ? 'bg-brand-blue text-white'
            : 'bg-brand-muted text-text-secondary border border-brand-border'
        }`}>
          {tier.badge || 'Popular'}
        </span>
      </div>
    )}

    {/* Plan name */}
    <div className="mb-5 mt-2">
      <h3 className="text-lg font-bold text-white mb-1">{tier.name}</h3>
      <p className="text-sm text-text-secondary leading-relaxed">{tier.description}</p>
    </div>

    {/* Price */}
    <div className="mb-6 pb-6 border-b border-brand-border">
      <div className="text-2xl font-bold text-white">{tier.priceRange}</div>
      {tier.id !== 'custom' && (
        <div className="text-xs text-text-muted mt-1">One-time or monthly retainer</div>
      )}
    </div>

    {/* Features */}
    <ul className="space-y-2.5 mb-8 flex-grow">
      {tier.features.map((feature, i) => (
        <li key={i} className="flex items-start gap-2.5 text-sm text-text-secondary">
          <svg
            className={`w-4 h-4 flex-shrink-0 mt-0.5 ${tier.featured ? 'text-blue-400' : 'text-green-400'}`}
            fill="none" stroke="currentColor" viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
          </svg>
          <span>{feature}</span>
        </li>
      ))}
    </ul>

    {/* CTA */}
    <button
      onClick={scrollToContact}
      className={tier.featured ? 'btn-primary w-full justify-center' : 'btn-secondary w-full justify-center'}
    >
      {tier.ctaLabel}
    </button>
  </motion.div>
);

const PricingSection = () => (
  <section id="pricing" className="py-24 bg-brand-black relative">
    <div className="section-divider" />

    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <motion.div
        className="mb-14 text-center max-w-2xl mx-auto"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <div className="section-label justify-center">Pricing</div>
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
          Transparent Project Pricing
        </h2>
        <p className="text-text-secondary leading-relaxed">
          Fixed-price packages for common project types. All prices are in INR and can be customised to your exact scope.
        </p>
      </motion.div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 items-start">
        {pricingTiers.map((tier, i) => (
          <PricingCard key={tier.id} tier={tier} index={i} />
        ))}
      </div>

      {/* Note */}
      <motion.div
        className="mt-10 pro-card p-5 flex flex-col sm:flex-row items-start sm:items-center gap-4"
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <svg className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <p className="text-sm text-text-secondary leading-relaxed flex-1">
          <span className="text-white font-medium">Pricing varies by scope.</span> A final quote is provided after your discovery call and requirements analysis. No surprises — we lock the price before work begins.
        </p>
        <button onClick={scrollToContact} className="btn-primary text-sm flex-shrink-0">
          Get a Free Quote
        </button>
      </motion.div>
    </div>

    <div className="section-divider mt-24" />
  </section>
);

export default PricingSection;
