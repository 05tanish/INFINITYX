import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

interface StatItem {
  value: number;
  suffix: string;
  label: string;
  description: string;
}

const stats: StatItem[] = [
  { value: 50, suffix: '+', label: 'Projects Delivered', description: 'Across web, mobile, and SaaS' },
  { value: 98, suffix: '%', label: 'On-Time Delivery', description: 'Consistent sprint-based delivery' },
  { value: 30, suffix: '+', label: 'Happy Clients', description: 'Founders, startups & enterprises' },
  { value: 3, suffix: 'yr', label: 'In Business', description: 'Building reliable software since 2022' },
];

const useCountUp = (target: number, isActive: boolean, duration = 1800) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!isActive) return;
    let startTime: number | null = null;
    const step = (ts: number) => {
      if (!startTime) startTime = ts;
      const progress = Math.min((ts - startTime) / duration, 1);
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
      className="text-center"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
    >
      <div className="stat-number mb-1 text-white">
        {count}{stat.suffix}
      </div>
      <div className="text-sm font-semibold text-white mb-1">{stat.label}</div>
      <div className="text-xs text-text-muted">{stat.description}</div>
    </motion.div>
  );
};

const StatsSection = () => (
  <section id="stats" className="py-16 bg-brand-surface relative">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-6">
        {stats.map((stat, i) => (
          <StatCard key={stat.label} stat={stat} index={i} />
        ))}
      </div>
    </div>
  </section>
);

export default StatsSection;
