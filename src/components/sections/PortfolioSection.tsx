import { useState } from 'react';
import { motion } from 'framer-motion';
import { portfolioItems, type PortfolioItem } from '../../lib/constants';

interface PortfolioItemCardProps {
  item: PortfolioItem;
  index: number;
}

const PortfolioItemCard = ({ item, index }: PortfolioItemCardProps) => {
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleImageError = () => {
    setImageError(true);
  };

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  const fallbackImage = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="800" height="600" viewBox="0 0 800 600"%3E%3Crect fill="%231A1A1A" width="800" height="600"/%3E%3Ctext fill="%23007BFF" font-family="Arial" font-size="24" x="50%25" y="50%25" text-anchor="middle" dominant-baseline="middle"%3E' + encodeURIComponent(item.title) + '%3C/text%3E%3C/svg%3E';

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group relative overflow-hidden rounded-lg glass-premium aspect-[4/3] hover:shadow-xl transition-all duration-300"
      whileHover={{ y: -8 }}
    >
      {/* Image */}
      <div className="relative w-full h-full">
        {!imageLoaded && (
          <div className="absolute inset-0 bg-brand-navy/50 animate-pulse" />
        )}
        <img
          src={imageError ? fallbackImage : item.thumbnail}
          alt={item.title}
          loading="lazy"
          onError={handleImageError}
          onLoad={handleImageLoad}
          className={`w-full h-full object-cover transition-all duration-700 group-hover:scale-110 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
        />
      </div>

      {/* Overlay with project details */}
      <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-brand-black/90 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col justify-end p-6">
        <span className="text-brand-blue text-sm font-semibold uppercase tracking-wide mb-2">
          {item.category.replace('-', ' ')}
        </span>
        <h3 className="text-xl font-bold text-brand-white mb-2">
          {item.title}
        </h3>
        <p className="text-gray-300 text-sm leading-relaxed">
          {item.description}
        </p>
      </div>

      {/* Category Badge */}
      <div className="absolute top-4 right-4 px-3 py-1.5 glass-premium rounded-full backdrop-blur-md">
        <span className="text-brand-blue text-xs font-semibold uppercase tracking-wide">
          {item.category.replace('-', ' ')}
        </span>
      </div>
    </motion.div>
  );
};

const PortfolioSection = () => {
  return (
    <section id="portfolio" className="py-24 bg-brand-black relative overflow-hidden">
      {/* Subtle accent line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-blue/30 to-transparent" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.span 
            className="inline-block px-4 py-2 rounded-full glass-premium text-brand-blue text-sm font-medium mb-6"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            Our Portfolio
          </motion.span>
          
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 text-brand-white">
            Featured Projects
          </h2>
          
          <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Explore our portfolio of successful projects and transformations
          </p>
        </motion.div>

        {/* Portfolio Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {portfolioItems.map((item, index) => (
            <PortfolioItemCard key={item.id} item={item} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PortfolioSection;
