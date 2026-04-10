import { type HTMLAttributes } from 'react';
import { motion, type MotionProps } from 'framer-motion';

export interface CardProps extends Omit<HTMLAttributes<HTMLDivElement>, keyof MotionProps> {
  variant?: 'service' | 'pricing' | 'portfolio' | 'testimonial';
  featured?: boolean;
  children: React.ReactNode;
  onHover?: () => void;
}

const Card = ({ 
  variant = 'service', 
  featured = false, 
  className = '', 
  children, 
  onHover,
  ...props 
}: CardProps) => {
  const baseStyles = 'rounded-2xl transition-all duration-300 relative overflow-hidden backdrop-blur-md';
  
  const variantStyles = {
    service: 'glass-card p-8',
    pricing: 'glass-card p-8 flex flex-col',
    portfolio: 'glass-card overflow-hidden relative',
    testimonial: 'glass-card p-6',
  };
  
  const featuredStyles = featured 
    ? 'ring-[3px] ring-brand-purple shadow-[0_0_30px_rgba(138,43,226,0.3)] transform scale-105 z-10' 
    : '';
  
  const combinedClassName = `${baseStyles} ${variantStyles[variant]} ${featuredStyles} ${className}`;
  
  return (
    <motion.div
      className={combinedClassName}
      whileHover={{ 
        y: -10,
        transition: { duration: 0.3 }
      }}
      onHoverStart={onHover}
      {...(props as any)}
    >
      <div className="relative z-10 h-full flex flex-col">
        {children}
      </div>
      
      {/* Decorative gradient orb for featured cards */}
      {featured && (
        <div className="absolute top-0 right-0 w-32 h-32 bg-brand-purple opacity-20 blur-3xl rounded-full pointer-events-none"></div>
      )}
    </motion.div>
  );
};

export default Card;
