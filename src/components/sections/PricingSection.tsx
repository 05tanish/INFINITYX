import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { supabase } from '../../lib/supabase';

interface PricingTier {
  id: string;
  name: string;
  price_range: string;
  description: string;
  features: string[];
  cta_label: string;
  featured: boolean;
  badge: string;
}

const scrollToContact = () =>
  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });

const PricingCard = ({ tier, index }: { tier: PricingTier; index: number }) => (
  <motion.div
    className={`relative flex flex-col h-full ${
      tier.featured ? 'pro-card-featured bg-ns-black' : 'pro-card bg-ns-navy'
    } p-8`}
    initial={{ opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.4, delay: index * 0.08 }}
  >
    {/* Badge */}
    {(tier.badge || tier.featured) && (
      <div className="absolute -top-3 left-8">
        <span className={`px-4 py-1 text-[10px] font-bold uppercase tracking-widest rounded ${
          tier.featured
            ? 'bg-ns-gold text-ns-black shadow-gold'
            : 'bg-ns-black text-ns-slate border border-ns-graphite'
        }`}>
          {tier.badge || 'Popular'}
        </span>
      </div>
    )}

    {/* Plan name */}
    <div className="mb-6 mt-2">
      <h3 className="text-2xl font-serif text-white mb-2">{tier.name}</h3>
      <p className="text-sm text-ns-slate leading-relaxed">{tier.description}</p>
    </div>

    {/* Price */}
    <div className="mb-8 pb-8 border-b border-ns-graphite">
      <div className="text-3xl font-serif font-bold text-white tracking-tight">{tier.price_range}</div>
      {tier.id !== 'custom' && (
        <div className="text-xs text-ns-slate mt-2 uppercase tracking-widest font-semibold">One-time or retainer</div>
      )}
    </div>

    {/* Features */}
    <ul className="space-y-4 mb-10 flex-grow">
      {tier.features?.map((feature, i) => (
        <li key={i} className="flex items-start gap-3 text-sm text-ns-slate">
          <svg
            className={`w-4 h-4 flex-shrink-0 mt-0.5 ${tier.featured ? 'text-ns-gold' : 'text-ns-teal'}`}
            fill="none" stroke="currentColor" viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
          </svg>
          <span className="leading-relaxed">{feature}</span>
        </li>
      ))}
    </ul>

    {/* CTA */}
    <button
      onClick={scrollToContact}
      className={tier.featured ? 'btn-primary w-full justify-center' : 'btn-outline-gold w-full justify-center'}
    >
      {tier.cta_label}
    </button>
  </motion.div>
);

const PricingSection = () => {
  const [tiers, setTiers] = useState<PricingTier[]>([]);

  useEffect(() => {
    const fetchPricing = async () => {
      const { data, error } = await supabase
        .from('pricing')
        .select('*')
        .order('display_order', { ascending: true });
      
      if (!error && data) {
        setTiers(data);
      }
    };
    fetchPricing();
  }, []);

  return (
    <section id="pricing" className="py-24 bg-ns-black relative">
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
            <span className="text-[10px] text-ns-slate uppercase tracking-[0.2em] font-semibold">Pricing</span>
            <div className="h-px flex-1 bg-ns-graphite max-w-[50px]" />
          </div>
          <h2 className="display-heading text-4xl md:text-5xl mb-4">
            Transparent Project Pricing
          </h2>
          <p className="text-ns-slate leading-relaxed">
            Fixed-price packages for common project types. All prices are in INR and can be customised to your exact scope.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-start">
          {tiers.map((tier, i) => (
            <PricingCard key={tier.id} tier={tier} index={i} />
          ))}
        </div>

        {/* Note */}
        <motion.div
          className="mt-12 pro-card p-6 flex flex-col sm:flex-row items-start sm:items-center gap-6 bg-ns-navy border-ns-graphite"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
        >
          <div className="flex-shrink-0 w-12 h-12 rounded-full bg-ns-gold/10 flex items-center justify-center border border-ns-gold/20">
            <svg className="w-5 h-5 text-ns-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div className="flex-grow">
            <p className="text-sm text-ns-slate">
              Don't see exactly what you need? We provide custom quotes based on your unique requirements and budget.
            </p>
          </div>
          <button
            onClick={scrollToContact}
            className="text-sm font-bold text-ns-gold hover:text-ns-gold-lt flex items-center gap-2 group whitespace-nowrap uppercase tracking-widest"
          >
            Custom Inquiry
            <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default PricingSection;
