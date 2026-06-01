import { motion } from 'framer-motion';
import { testimonials, type Testimonial } from '../../lib/constants';

const TestimonialCard = ({ testimonial, index }: { testimonial: Testimonial; index: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.4, delay: index * 0.1 }}
    className="pro-card p-8 flex flex-col h-full"
  >
    {/* Quote Icon */}
    <div className="mb-6">
      <svg className="w-8 h-8 text-brand-muted" fill="currentColor" viewBox="0 0 24 24">
        <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
      </svg>
    </div>

    {/* Review */}
    <p className="text-text-primary text-sm leading-relaxed flex-grow mb-8 font-medium">
      "{testimonial.review}"
    </p>

    {/* Footer Info */}
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-6 border-t border-brand-border">
      <div className="flex items-center gap-3">
        {testimonial.avatar ? (
          <img
            src={testimonial.avatar}
            alt={testimonial.clientName}
            className="w-10 h-10 rounded-full object-cover grayscale opacity-80"
          />
        ) : (
          <div className="w-10 h-10 rounded-full bg-brand-muted flex items-center justify-center text-text-muted font-bold text-sm">
            {testimonial.clientName.charAt(0)}
          </div>
        )}
        <div>
          <div className="text-sm font-bold text-white">{testimonial.clientName}</div>
          <div className="text-xs text-text-muted">
            {testimonial.role}, {testimonial.company}
          </div>
        </div>
      </div>
      
      {/* Project Type Badge */}
      {testimonial.projectType && (
        <span className="badge text-[10px]">
          {testimonial.projectType}
        </span>
      )}
    </div>
  </motion.div>
);

const TestimonialsSection = () => (
  <section id="testimonials" className="py-24 bg-brand-surface relative">
    <div className="section-divider" />
    
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <motion.div
        className="mb-14 text-center max-w-2xl mx-auto"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <div className="section-label justify-center">Client Feedback</div>
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
          Trusted by Technical Leaders
        </h2>
        <p className="text-text-secondary leading-relaxed">
          Don't just take our word for it. Here's what CTOs, Founders, and Product Managers say about our engineering quality.
        </p>
      </motion.div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {testimonials.map((testimonial, i) => (
          <TestimonialCard key={testimonial.id} testimonial={testimonial} index={i} />
        ))}
      </div>
    </div>

    <div className="section-divider mt-24" />
  </section>
);

export default TestimonialsSection;
