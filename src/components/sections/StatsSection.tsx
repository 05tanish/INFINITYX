import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

interface StatItem {
  value: number;
  suffix: string;
  label: string;
  color: string;
}

const stats: StatItem[] = [
  { value: 50, suffix: '+', label: 'Brands Scaled', color: '#3E63DD' },
  { value: 300, suffix: '%', label: 'Avg Growth', color: '#8A2BE2' },
  { value: 5, suffix: '★', label: 'Avg Client Rating', color: '#E5C07B' },
  { value: 3, suffix: 'x', label: 'Services Combined', color: '#3E63DD' },
];

const useCountUp = (target: number, isActive: boolean, duration = 2000) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isActive) return;
    let startTime: number | null = null;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [isActive, target, duration]);

  return count;
};

const StatCard = ({ stat, index }: { stat: StatItem; index: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const count = useCountUp(stat.value, isInView);

  return (
    <motion.div
      ref={ref}
      className="flex flex-col items-center text-center group"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <div
        className="text-5xl md:text-6xl font-black mb-2 tabular-nums tracking-tight"
        style={{ color: stat.color, textShadow: `0 0 30px ${stat.color}60` }}
      >
        {count}{stat.suffix}
      </div>
      <div className="text-sm font-semibold text-gray-400 uppercase tracking-widest">
        {stat.label}
      </div>
    </motion.div>
  );
};

const StatsSection = () => {
  return (
    <section id="stats" className="py-16 bg-brand-black relative overflow-hidden">
      {/* Top gradient divider */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-blue/40 to-transparent" />
      {/* Bottom gradient divider */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-purple/30 to-transparent" />

      {/* Background subtle grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(62,99,221,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(62,99,221,0.03)_1px,transparent_1px)] bg-[size:60px_60px]" />

      {/* Ambient glow */}
      <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-32 bg-gradient-to-r from-transparent via-brand-blue-glow/10 to-transparent blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {stats.map((stat, index) => (
            <StatCard key={stat.label} stat={stat} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
