import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { supabase } from '../../lib/supabase';

interface Service {
  id: string;
  name: string;
  icon: string;
  description: string;
  features: string[];
  tags: string[];
}

const iconMap: Record<string, React.ReactNode> = {
  Code2: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
    </svg>
  ),
  Smartphone: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
    </svg>
  ),
  Server: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
    </svg>
  ),
  Shield: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    </svg>
  ),
  Cpu: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 3H7a2 2 0 00-2 2v2M9 3h6M9 3v18m6-18h2a2 2 0 012 2v2m-4-4v18m4-18v2M3 9h18M3 15h18M3 9v6M21 9v6" />
    </svg>
  ),
  Layers: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
    </svg>
  ),
  Video: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
    </svg>
  ),
};

const ServicesSection = () => {
  const [services, setServices] = useState<Service[]>([]);
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  const headerY = useTransform(scrollYProgress, [0, 1], [40, -40]);

  useEffect(() => {
    const fetchServices = async () => {
      const { data, error } = await supabase
        .from('services')
        .select('*')
        .order('display_order', { ascending: true });
      
      if (!error && data) {
        setServices(data);
      }
    };
    fetchServices();
  }, []);

  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section ref={containerRef} id="services" className="py-24 bg-ns-black relative">
      <div className="section-divider" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
        {/* Header */}
        <motion.div
          className="mb-16"
          style={{ y: headerY }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center gap-4 mb-6">
            <span className="text-[10px] text-ns-slate uppercase tracking-[0.2em] font-semibold">What We Do</span>
            <div className="h-px flex-1 bg-ns-graphite max-w-[200px]" />
          </div>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
            <h2 className="display-heading text-4xl sm:text-5xl md:text-[3.5rem] max-w-2xl">
              Strategy-led. <br />Design-driven. <br />Growth-focused.
            </h2>
            <p className="text-ns-slate max-w-sm leading-relaxed text-base md:text-lg">
              We combine clarity of strategy with world-class design and smart execution to help brands scale.
            </p>
          </div>
        </motion.div>

        {/* Services Grid (4 cols on desktop matching reference) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              className="pro-card p-6 md:p-8 group cursor-pointer flex flex-col h-full bg-ns-navy"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              onClick={scrollToContact}
            >
              {/* Icon */}
              <div className="mb-6">
                <div className="w-12 h-12 rounded-full border border-ns-gold text-ns-gold flex items-center justify-center group-hover:bg-ns-gold/10 transition-colors">
                  {iconMap[service.icon]}
                </div>
              </div>
              
              {/* Content */}
              <div className="flex-1">
                <h3 className="text-xl font-serif text-white mb-3">{service.name}</h3>
                <p className="text-sm text-ns-slate leading-relaxed mb-6">{service.description}</p>
              </div>

              {/* Link */}
              <div className="flex items-center text-sm font-semibold text-ns-gold group-hover:text-ns-gold-lt transition-colors mt-auto">
                Learn more &rarr;
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="section-divider mt-24" />
    </section>
  );
};

export default ServicesSection;
