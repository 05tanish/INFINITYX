import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { supabase } from '../../lib/supabase';

interface StatItem {
  value: number;
  suffix: string;
  label: string;
  description?: string;
}

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

// Map based on reference to give some static icons. 
// If it was dynamic we could use an icon map, but since this is hardcoded visually:
const getIconForIndex = (index: number) => {
  if (index === 0) return (
    <svg className="w-8 h-8 mx-auto mb-4 text-ns-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" />
    </svg>
  );
  if (index === 1) return (
    <svg className="w-8 h-8 mx-auto mb-4 text-ns-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
    </svg>
  );
  return (
    <svg className="w-8 h-8 mx-auto mb-4 text-ns-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
    </svg>
  );
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
      {getIconForIndex(index)}
      <div className="stat-number mb-2 text-ns-white">
        {count}{stat.suffix}
      </div>
      <div className="text-sm font-semibold text-ns-white mb-2">{stat.label}</div>
      {stat.description && <div className="text-xs text-ns-slate leading-relaxed px-4">{stat.description}</div>}
    </motion.div>
  );
};

const StatsSection = () => {
  const [stats, setStats] = useState<StatItem[]>([]);

  useEffect(() => {
    const fetchStats = async () => {
      const { data, error } = await supabase
        .from('stats')
        .select('*')
        .order('display_order', { ascending: true });
      
      if (!error && data) {
        setStats(data.map(s => ({
          value: parseInt(s.value),
          suffix: s.suffix,
          label: s.label,
          description: s.description
        })));
      }
    };
    fetchStats();
  }, []);

  return (
    <section id="stats" className="py-20 bg-ns-navy relative border-y border-ns-graphite">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-12 md:gap-6 divide-y sm:divide-y-0 sm:divide-x divide-ns-graphite">
          {stats.slice(0,3).map((stat, i) => (
            <div key={stat.label} className={i !== 0 ? "pt-10 sm:pt-0" : ""}>
               <StatCard stat={stat} index={i} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
