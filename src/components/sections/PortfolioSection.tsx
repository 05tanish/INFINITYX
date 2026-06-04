import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import Magnetic from '../ui/Magnetic';
import { supabase } from '../../lib/supabase';

interface PortfolioItem {
  id: string;
  title: string;
  category: 'web-app' | 'mobile' | 'saas' | 'automation';
  thumbnail: string;
  tech: string[];
  description: string;
  result?: string;
}

type FilterCategory = 'all' | 'web-app' | 'mobile' | 'saas' | 'automation';

const filterLabels: { value: FilterCategory; label: string }[] = [
  { value: 'all', label: 'All Projects' },
  { value: 'web-app', label: 'Web Apps' },
  { value: 'saas', label: 'SaaS' },
  { value: 'mobile', label: 'Mobile' },
  { value: 'automation', label: 'Automation' },
];

const categoryLabel: Record<string, string> = {
  'web-app': 'Web App',
  'mobile': 'Mobile',
  'saas': 'SaaS Platform',
  'automation': 'Automation',
};

const PortfolioCard = ({ item, index }: { item: PortfolioItem; index: number }) => {
  const [imgError, setImgError] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.35, delay: index * 0.06 }}
      className="pro-card overflow-hidden group bg-ns-navy border-ns-graphite hover:border-ns-gold/30"
    >
      {/* Image */}
      <div className="relative h-56 overflow-hidden bg-ns-black">
        {!imgLoaded && (
          <div className="absolute inset-0 shimmer" />
        )}
        <img
          src={imgError
            ? `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='600'%3E%3Crect fill='%23101827' width='800' height='600'/%3E%3Ctext fill='%23C6A16E' font-family='Inter' font-size='20' x='50%25' y='50%25' text-anchor='middle' dominant-baseline='middle'%3E${encodeURIComponent(item.title)}%3C/text%3E%3C/svg%3E`
            : item.thumbnail}
          alt={item.title}
          loading="lazy"
          onError={() => setImgError(true)}
          onLoad={() => setImgLoaded(true)}
          className={`w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 ${imgLoaded ? 'opacity-100' : 'opacity-0'}`}
        />
        <div className="absolute inset-0 bg-ns-teal/10 mix-blend-overlay opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Category badge */}
        <div className="absolute top-4 left-4">
          <span className="badge badge-gold">
            {categoryLabel[item.category]}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-xl font-serif text-white mb-2">{item.title}</h3>
        <p className="text-sm text-ns-slate leading-relaxed mb-5 line-clamp-2">{item.description}</p>

        {/* Result */}
        {item.result && (
          <div className="flex items-center gap-2 mb-5 px-3 py-2.5 rounded border border-ns-emerald/20 bg-ns-emerald/5">
            <svg className="w-4 h-4 text-ns-emerald flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
            <span className="text-xs font-semibold text-ns-emerald">{item.result}</span>
          </div>
        )}

        {/* Tech stack */}
        <div className="flex flex-wrap gap-2 pt-4 border-t border-ns-graphite">
          {item.tech?.map(t => (
            <span key={t} className="px-2.5 py-1 text-[11px] uppercase tracking-wider rounded bg-ns-black text-ns-slate border border-ns-graphite font-semibold">
              {t}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

const PortfolioSection = () => {
  const [activeFilter, setActiveFilter] = useState<FilterCategory>('all');
  const [items, setItems] = useState<PortfolioItem[]>([]);
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  const headerY = useTransform(scrollYProgress, [0, 1], [40, -40]);

  useEffect(() => {
    const fetchPortfolio = async () => {
      const { data, error } = await supabase
        .from('portfolio')
        .select('*')
        .order('display_order', { ascending: true });
      
      if (!error && data) {
        setItems(data);
      }
    };
    fetchPortfolio();
  }, []);

  const filtered = activeFilter === 'all'
    ? items
    : items.filter(item => item.category === activeFilter);

  return (
    <section ref={containerRef} id="portfolio" className="py-24 bg-ns-black relative">
      <div className="section-divider" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
        {/* Header */}
        <motion.div
          className="mb-12"
          style={{ y: headerY }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center gap-4 mb-6">
            <span className="text-[10px] text-ns-slate uppercase tracking-[0.2em] font-semibold">Work</span>
            <div className="h-px flex-1 bg-ns-graphite max-w-[200px]" />
          </div>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">
            <h2 className="display-heading text-4xl sm:text-5xl md:text-[3.5rem] max-w-lg">
              Projects We've Shipped
            </h2>

            {/* Filter tabs */}
            <div className="flex flex-wrap gap-2">
              {filterLabels.map(f => (
                <Magnetic key={f.value}>
                  <button
                    id={`portfolio-filter-${f.value}`}
                    onClick={() => setActiveFilter(f.value)}
                    className={`px-5 py-2 text-xs font-bold uppercase tracking-wider rounded border transition-all ${
                      activeFilter === f.value
                        ? 'bg-ns-gold text-ns-black border-ns-gold shadow-gold'
                        : 'bg-transparent text-ns-slate border-ns-graphite hover:border-ns-gold/50 hover:text-white'
                    }`}
                  >
                    {f.label}
                  </button>
                </Magnetic>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filtered.map((item, i) => (
              <PortfolioCard key={item.id} item={item} index={i} />
            ))}
          </AnimatePresence>
        </motion.div>

        {filtered.length === 0 && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center text-ns-slate py-20"
          >
            No projects in this category yet.
          </motion.p>
        )}
      </div>
    </section>
  );
};

export default PortfolioSection;
