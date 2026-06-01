import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';

const projectTypes = [
  { value: 'web-app', label: 'Web Application' },
  { value: 'mobile-app', label: 'Mobile App (iOS/Android)' },
  { value: 'saas', label: 'SaaS Platform' },
  { value: 'automation', label: 'Automation & Scripts' },
  { value: 'cybersecurity', label: 'Cybersecurity Audit' },
  { value: 'other', label: 'Other / Custom' },
];

const budgetOptions = [
  { value: 'under-50k', label: 'Under ₹50,000' },
  { value: '50k-1.5L', label: '₹50,000 - ₹1,50,000' },
  { value: '1.5L-5L', label: '₹1,50,000 - ₹5,00,000' },
  { value: '5L-plus', label: '₹5,00,000+' },
];

const ContactForm = () => {
  const [formState, setFormState] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const onSubmit = async (data: any) => {
    setFormState('submitting');
    try {
      // Mock API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      console.log('Project Inquiry:', data);
      setFormState('success');
      reset();
      setTimeout(() => setFormState('idle'), 5000);
    } catch (error) {
      setFormState('error');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="pro-card p-8 md:p-10 max-w-3xl mx-auto"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        
        {/* Personal Details Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="form-label">Full Name</label>
            <input 
              {...register('name', { required: true })} 
              className="form-input" 
              placeholder="Jane Doe" 
            />
            {errors.name && <span className="text-xs text-red-500 mt-1 block">Required</span>}
          </div>
          <div>
            <label className="form-label">Work Email</label>
            <input 
              type="email" 
              {...register('email', { required: true })} 
              className="form-input" 
              placeholder="jane@company.com" 
            />
            {errors.email && <span className="text-xs text-red-500 mt-1 block">Required</span>}
          </div>
        </div>

        {/* Project Details Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="form-label">Project Type</label>
            <select 
              {...register('projectType', { required: true })} 
              className="form-input appearance-none bg-brand-surface"
            >
              <option value="" disabled selected>Select project type...</option>
              {projectTypes.map(pt => (
                <option key={pt.value} value={pt.value}>{pt.label}</option>
              ))}
            </select>
            {errors.projectType && <span className="text-xs text-red-500 mt-1 block">Required</span>}
          </div>
          <div>
            <label className="form-label">Estimated Budget (INR)</label>
            <select 
              {...register('budget', { required: true })} 
              className="form-input appearance-none bg-brand-surface"
            >
              <option value="" disabled selected>Select budget range...</option>
              {budgetOptions.map(b => (
                <option key={b.value} value={b.value}>{b.label}</option>
              ))}
            </select>
            {errors.budget && <span className="text-xs text-red-500 mt-1 block">Required</span>}
          </div>
        </div>

        {/* Requirements */}
        <div>
          <label className="form-label">Project Requirements</label>
          <textarea 
            {...register('requirements', { required: true, minLength: 20 })} 
            className="form-input min-h-[120px] resize-y" 
            placeholder="Tell us about the problem you're trying to solve, target audience, and key features..." 
          />
          {errors.requirements && <span className="text-xs text-red-500 mt-1 block">Please provide more details (min 20 chars).</span>}
        </div>

        {/* Submit */}
        <button 
          type="submit" 
          disabled={formState === 'submitting'}
          className="btn-primary w-full py-4 text-base mt-2"
        >
          {formState === 'submitting' ? 'Submitting Inquiry...' : 'Submit Project Inquiry'}
        </button>

        {/* Status Messages */}
        {formState === 'success' && (
          <div className="p-4 mt-4 bg-green-500/10 border border-green-500/20 rounded-lg flex items-center gap-3">
            <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <p className="text-sm text-green-500">Inquiry submitted successfully. We'll be in touch within 24 hours.</p>
          </div>
        )}
        
        {formState === 'error' && (
          <div className="p-4 mt-4 bg-red-500/10 border border-red-500/20 rounded-lg flex items-center gap-3">
            <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-sm text-red-500">Something went wrong. Please email us directly at hello@infinityx.com.</p>
          </div>
        )}
      </form>
    </motion.div>
  );
};

export default ContactForm;
