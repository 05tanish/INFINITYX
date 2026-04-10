import { motion } from 'framer-motion';
import Card from '../ui/Card';
import Button from '../ui/Button';
import { pricingTiers, type PricingTier } from '../../lib/constants';

interface PricingCardProps {
  tier: PricingTier;
  index: number;
}

const PricingCard = ({ tier, index }: PricingCardProps) => {
  const scrollToContact = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="h-full"
    >
      <Card 
        variant="pricing" 
        featured={tier.featured}
        className="h-full flex flex-col"
      >
        {/* Most Popular Badge */}
        {tier.featured && (
          <div className="mb-4">
            <span className="inline-block px-3 py-1 text-xs font-semibold text-brand-black bg-brand-gold rounded-full">
              Most Popular
            </span>
          </div>
        )}

        {/* Plan Name */}
        <h3 className="text-2xl font-bold text-brand-white mb-2">
          {tier.name}
        </h3>

        {/* Price Range */}
        <p className="text-3xl font-bold text-brand-blue mb-6">
          {tier.priceRange}
        </p>

        {/* Features List */}
        <ul className="space-y-3 mb-8 flex-grow">
          {tier.features.map((feature, idx) => (
            <li key={idx} className="flex items-start text-gray-300">
              <svg
                className="w-5 h-5 text-brand-blue mr-3 flex-shrink-0 mt-0.5"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="text-sm">{feature}</span>
            </li>
          ))}
        </ul>

        {/* CTA Button */}
        <Button
          variant={tier.featured ? 'primary' : 'outline'}
          size="md"
          className="w-full"
          onClick={scrollToContact}
        >
          {tier.ctaLabel}
        </Button>
      </Card>
    </motion.div>
  );
};

const PricingSection = () => {
  return (
    <section id="pricing" className="py-24 bg-brand-black relative overflow-hidden">
      {/* Subtle grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:80px_80px] opacity-20" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.span 
            className="inline-block px-4 py-2 rounded-full glass-premium text-brand-gold text-sm font-medium mb-6"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            Flexible Pricing
          </motion.span>
          
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 text-brand-white">
            Choose Your Plan
          </h2>
          
          <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Transparent pricing designed to grow with your business
          </p>
        </motion.div>

        {/* Pricing Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {pricingTiers.map((tier, index) => (
            <PricingCard key={tier.id} tier={tier} index={index} />
          ))}
        </div>

        {/* Custom Solutions Note */}
        <motion.div
          className="text-center glass-premium rounded-lg p-8 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h3 className="text-xl font-semibold text-brand-white mb-2">Need something custom?</h3>
          <p className="text-gray-400 mb-4">
            We offer tailored solutions for enterprise needs and unique requirements
          </p>
          <Button variant="outline" size="sm">
            Contact Sales
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default PricingSection;
