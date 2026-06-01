import { useState, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import Magnetic from '../ui/Magnetic';
import { portfolioItems, type PortfolioItem } from '../../lib/constants';

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
      className="pro-card overflow-hidden group"
    >
      {/* Image */}
      <div className="relative h-48 overflow-hidden bg-brand-muted">
        {!imgLoaded && (
          <div className="absolute inset-0 shimmer" />
        )}
        <img
          src={imgError
            ? `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='600'%3E%3Crect fill='%23161616' width='800' height='600'/%3E%3Ctext fill='%23555' font-family='Inter' font-size='20' x='50%25' y='50%25' text-anchor='middle' dominant-baseline='middle'%3E${encodeURIComponent(item.title)}%3C/text%3E%3C/svg%3E`
            : item.thumbnail}
          alt={item.title}
          loading="lazy"
          onError={() => setImgError(true)}
          onLoad={() => setImgLoaded(true)}
          className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 ${imgLoaded ? 'opacity-100' : 'opacity-0'}`}
        />
        <div className="absolute inset-0 bg-brand-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Category badge */}
        <div className="absolute top-3 left-3">
          <span className="badge text-xs">
            {categoryLabel[item.category]}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="text-base font-semibold text-white mb-1.5">{item.title}</h3>
        <p className="text-sm text-text-secondary leading-relaxed mb-4">{item.description}</p>

        {/* Result */}
        {item.result && (
          <div className="flex items-center gap-2 mb-4 px-3 py-2 rounded-lg bg-blue-600/6 border border-blue-600/15">
            <svg className="w-3.5 h-3.5 text-blue-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
            <span className="text-xs font-semibold text-blue-400">{item.result}</span>
          </div>
        )}

        {/* Tech stack */}
        <div className="flex flex-wrap gap-1.5">
          {item.tech.map(t => (
            <span key={t} className="px-2 py-0.5 text-xs rounded bg-brand-muted text-text-muted font-medium">
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
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  const headerY = useTransform(scrollYProgress, [0, 1], [40, -40]);

  const filtered = activeFilter === 'all'
    ? portfolioItems
    : portfolioItems.filter(item => item.category === activeFilter);

  return (
    <section ref={containerRef} id="portfolio" className="py-24 bg-brand-black relative">
      <div className="section-divider" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="mb-12"
          style={{ y: headerY }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="section-label">Work</div>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <h2 className="text-4xl md:text-5xl font-bold text-white max-w-lg">
              Projects We've Shipped
            </h2>

            {/* Filter tabs */}
            <div className="flex flex-wrap gap-2">
              {filterLabels.map(f => (
                <Magnetic key={f.value}>
                  <button
                    id={`portfolio-filter-${f.value}`}
                    onClick={() => setActiveFilter(f.value)}
                    className={`px-4 py-1.5 text-sm font-medium rounded-lg border transition-all ${
                      activeFilter === f.value
                        ? 'bg-brand-blue text-white border-brand-blue'
                        : 'bg-transparent text-text-secondary border-brand-border hover:border-brand-muted hover:text-white'
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
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
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
            className="text-center text-text-muted py-20"
          >
            No projects in this category yet.
          </motion.p>
        )}
      </div>

      <div className="section-divider mt-24" />
    </section>
  );
};

export default PortfolioSection;
