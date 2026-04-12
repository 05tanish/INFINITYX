import { useState, useRef, type MouseEvent } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { portfolioItems, type PortfolioItem } from '../../lib/constants';

interface PortfolioItemCardProps {
  item: PortfolioItem;
  index: number;
}

const PortfolioItemCard = ({ item, index }: PortfolioItemCardProps) => {
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  // 3D Parallax Tilt Logic using Framer Motion
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    // Normalize coordinates from -0.5 to 0.5
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const fallbackImage = `data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="800" height="600" viewBox="0 0 800 600"%3E%3Crect fill="%231A1A1A" width="800" height="600"/%3E%3Ctext fill="%23007BFF" font-family="Arial" font-size="24" x="50%25" y="50%25" text-anchor="middle" dominant-baseline="middle"%3E${encodeURIComponent(item.title)}%3C/text%3E%3C/svg%3E`;

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        perspective: 1000,
      }}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group"
    >
      <motion.div 
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d"
        }}
        className="relative overflow-hidden rounded-xl glass-premium aspect-[4/3] shadow-2xl transition-shadow duration-300 group-hover:shadow-[0_20px_40px_rgba(62,99,221,0.2)]"
      >
        {/* Parallax inner content */}
        <motion.div 
          className="relative w-full h-full"
          style={{ transform: "translateZ(30px)" }}
        >
          {!imageLoaded && (
            <div className="absolute inset-0 bg-brand-navy/50 animate-pulse" />
          )}
          <img
            src={imageError ? fallbackImage : item.thumbnail}
            alt={item.title}
            loading="lazy"
            onError={() => setImageError(true)}
            onLoad={() => setImageLoaded(true)}
            className={`w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
          />
        </motion.div>

        {/* Overlay with project details floating higher in Z-space */}
        <motion.div 
          className="absolute inset-0 bg-gradient-to-t from-brand-black via-brand-black/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6"
          style={{ transform: "translateZ(60px)" }}
        >
          <span className="text-brand-blue text-xs font-bold uppercase tracking-widest mb-2">
            {item.category.replace('-', ' ')}
          </span>
          <h3 className="text-2xl font-bold text-brand-white mb-2">
            {item.title}
          </h3>
          <p className="text-gray-300 text-sm leading-relaxed">
            {item.description}
          </p>
        </motion.div>

        {/* Category Badge */}
        <motion.div 
          className="absolute top-4 right-4 px-4 py-2 glass-premium rounded-full backdrop-blur-md"
          style={{ transform: "translateZ(40px)" }}
        >
          <span className="text-brand-purple text-xs font-bold uppercase tracking-widest drop-shadow-md">
            {item.category.replace('-', ' ')}
          </span>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

const PortfolioSection = () => {
  return (
    <section id="portfolio" className="py-32 bg-brand-black relative overflow-hidden">
      {/* Background ambient light */}
      <div className="absolute top-[10%] inset-x-0 mx-auto w-full max-w-4xl h-[500px] bg-brand-blue-glow rounded-full blur-[150px] opacity-10 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          className="text-center mb-24"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.span 
            className="inline-block px-4 py-2 rounded-full glass-premium text-brand-purple text-sm font-bold uppercase tracking-widest mb-6"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            Our Portfolio
          </motion.span>
          
          <h2 className="text-5xl md:text-6xl font-extrabold mb-6 text-brand-white">
            Featured <span className="text-gradient">Projects</span>
          </h2>
          
          <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Explore our curated selection of high-velocity transformations and digital masterpieces.
          </p>
        </motion.div>

        {/* Portfolio Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
          {portfolioItems.map((item, index) => (
            <PortfolioItemCard key={item.id} item={item} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PortfolioSection;
