import { useState, useRef, type MouseEvent } from 'react';
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion';
import { portfolioItems, type PortfolioItem } from '../../lib/constants';

type FilterCategory = 'all' | 'video' | 'social-media' | 'website';

const filterLabels: { value: FilterCategory; label: string }[] = [
  { value: 'all', label: 'All Work' },
  { value: 'video', label: 'Video' },
  { value: 'social-media', label: 'Social Media' },
  { value: 'website', label: 'Websites' },
];

interface PortfolioItemCardProps {
  item: PortfolioItem;
  index: number;
}

const PortfolioItemCard = ({ item, index }: PortfolioItemCardProps) => {
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 20 });
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['10deg', '-10deg']);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-10deg', '10deg']);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => { x.set(0); y.set(0); };

  const fallbackImage = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='600' viewBox='0 0 800 600'%3E%3Crect fill='%231A1A1A' width='800' height='600'/%3E%3Ctext fill='%233E63DD' font-family='Outfit' font-size='24' x='50%25' y='50%25' text-anchor='middle' dominant-baseline='middle'%3E${encodeURIComponent(item.title)}%3C/text%3E%3C/svg%3E`;

  const categoryColors: Record<string, string> = {
    'video': '#3E63DD',
    'social-media': '#8A2BE2',
    'website': '#E5C07B',
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ perspective: 1000 }}
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      className="group"
    >
      <motion.div
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
        className="relative overflow-hidden rounded-xl glass-premium aspect-[4/3] shadow-2xl transition-shadow duration-300 group-hover:shadow-[0_20px_40px_rgba(62,99,221,0.2)]"
      >
        <motion.div className="relative w-full h-full" style={{ transform: 'translateZ(30px)' }}>
          {!imageLoaded && <div className="absolute inset-0 shimmer" />}
          <img
            src={imageError ? fallbackImage : item.thumbnail}
            alt={item.title}
            loading="lazy"
            onError={() => setImageError(true)}
            onLoad={() => setImageLoaded(true)}
            className={`w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
          />
        </motion.div>

        <motion.div
          className="absolute inset-0 bg-gradient-to-t from-brand-black via-brand-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6"
          style={{ transform: 'translateZ(60px)' }}
        >
          <span className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: categoryColors[item.category] }}>
            {item.category.replace('-', ' ')}
          </span>
          <h3 className="text-xl font-bold text-brand-white mb-1">{item.title}</h3>
          <p className="text-gray-300 text-sm leading-relaxed">{item.description}</p>
        </motion.div>

        <motion.div
          className="absolute top-3 right-3 px-3 py-1 glass-premium rounded-full"
          style={{ transform: 'translateZ(40px)' }}
        >
          <span className="text-xs font-bold uppercase tracking-widest" style={{ color: categoryColors[item.category] }}>
            {item.category.replace('-', ' ')}
          </span>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

const PortfolioSection = () => {
  const [activeFilter, setActiveFilter] = useState<FilterCategory>('all');

  const filtered = activeFilter === 'all'
    ? portfolioItems
    : portfolioItems.filter(item => item.category === activeFilter);

  return (
    <section id="portfolio" className="py-32 bg-brand-black relative overflow-hidden">
      <div className="absolute top-[10%] inset-x-0 mx-auto w-full max-w-4xl h-[500px] bg-brand-blue-glow rounded-full blur-[150px] opacity-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div className="text-center mb-16" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <motion.span className="inline-block px-4 py-2 rounded-full glass-premium text-brand-purple text-sm font-bold uppercase tracking-widest mb-6"
            initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}>
            Our Portfolio
          </motion.span>
          <h2 className="text-5xl md:text-6xl font-extrabold mb-6 text-brand-white">
            Featured <span className="text-gradient">Projects</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed mb-10">
            Explore our curated selection of high-velocity transformations and digital masterpieces.
          </p>

          {/* Filter Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            {filterLabels.map((filter) => (
              <motion.button
                key={filter.value}
                id={`portfolio-filter-${filter.value}`}
                onClick={() => setActiveFilter(filter.value)}
                className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                  activeFilter === filter.value
                    ? 'text-white shadow-[0_0_15px_rgba(62,99,221,0.4)]'
                    : 'glass-premium text-gray-400 hover:text-white'
                }`}
                style={activeFilter === filter.value ? { background: 'linear-gradient(135deg, #3E63DD, #8A2BE2)' } : {}}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
              >
                {filter.label}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Portfolio Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filtered.map((item, index) => (
              <PortfolioItemCard key={item.id} item={item} index={index} />
            ))}
          </AnimatePresence>
        </motion.div>

        {filtered.length === 0 && (
          <motion.p className="text-center text-gray-500 py-20 text-lg"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            No projects in this category yet. Check back soon!
          </motion.p>
        )}
      </div>
    </section>
  );
};

export default PortfolioSection;
