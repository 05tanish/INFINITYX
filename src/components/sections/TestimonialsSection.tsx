import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { supabase } from '../../lib/supabase';

interface Review {
  id: string;
  author: string;
  role: string;
  rating: number;
  content: string;
  status: string;
}

const TestimonialCard = ({ review, index }: { review: Review; index: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.4, delay: index * 0.1 }}
    className="pro-card p-8 flex flex-col h-full bg-ns-navy border-ns-graphite hover:border-ns-gold/40"
  >
    {/* Quote Icon */}
    <div className="mb-6">
      <svg className="w-8 h-8 text-ns-gold/30" fill="currentColor" viewBox="0 0 24 24">
        <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
      </svg>
    </div>

    {/* Review */}
    <p className="text-ns-white text-base leading-relaxed flex-grow mb-8 font-serif italic">
      "{review.content}"
    </p>

    {/* Footer Info */}
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-6 border-t border-ns-graphite">
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 rounded-full bg-ns-black border border-ns-gold/30 flex items-center justify-center text-ns-gold font-bold text-sm">
          {review.author.charAt(0)}
        </div>
        <div>
          <div className="text-sm font-bold text-white tracking-wide">{review.author}</div>
          <div className="text-[11px] text-ns-slate uppercase tracking-wider mt-0.5">
            {review.role}
          </div>
        </div>
      </div>
      
      {/* Rating Badge */}
      <div className="flex text-ns-gold gap-1">
        {[...Array(review.rating)].map((_, i) => (
          <svg key={i} className="w-3.5 h-3.5 fill-current" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
    </div>
  </motion.div>
);

const TestimonialsSection = () => {
  const [reviews, setReviews] = useState<Review[]>([]);

  useEffect(() => {
    const fetchReviews = async () => {
      const { data, error } = await supabase
        .from('reviews')
        .select('*')
        .eq('status', 'approved')
        .order('created_at', { ascending: false });
      
      if (!error && data) {
        setReviews(data);
      }
    };
    fetchReviews();
  }, []);

  return (
    <section id="testimonials" className="py-24 bg-ns-black relative">
      <div className="section-divider" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
        {/* Header */}
        <motion.div
          className="mb-14 text-center max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="h-px flex-1 bg-ns-graphite max-w-[50px]" />
            <span className="text-[10px] text-ns-slate uppercase tracking-[0.2em] font-semibold">Client Feedback</span>
            <div className="h-px flex-1 bg-ns-graphite max-w-[50px]" />
          </div>
          <h2 className="display-heading text-4xl md:text-5xl mb-4">
            Trusted by Technical Leaders
          </h2>
          <p className="text-ns-slate leading-relaxed">
            Don't just take our word for it. Here's what CTOs, Founders, and Product Managers say about our engineering quality.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((review, i) => (
            <StatelessTestimonialCard key={review.id} review={review} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

const StatelessTestimonialCard = TestimonialCard;

export default TestimonialsSection;
