import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { supabase } from '../../lib/supabase';

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
      const { error } = await supabase
        .from('quotes')
        .insert([{
          client_name: data.name,
          client_email: data.email,
          client_phone: data.phone,
          service: data.projectType,
          amount: data.budget,
          description: data.requirements,
          status: 'pending'
        }]);

      if (error) throw error;

      setFormState('success');
      reset();
      setTimeout(() => setFormState('idle'), 5000);
    } catch (error) {
      console.error('Error submitting quote:', error);
      setFormState('error');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="pro-card bg-ns-navy p-8 md:p-10 w-full"
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
            {errors.name && <span className="text-xs text-ns-error mt-1 block">Required</span>}
          </div>
          <div>
            <label className="form-label">Work Email</label>
            <input 
              type="email" 
              {...register('email', { required: true })} 
              className="form-input" 
              placeholder="jane@company.com" 
            />
            {errors.email && <span className="text-xs text-ns-error mt-1 block">Required</span>}
          </div>
        </div>

        {/* Phone Row */}
        <div>
          <label className="form-label">Phone Number</label>
          <input 
            type="tel" 
            {...register('phone', { 
              required: 'Phone number is required',
              pattern: {
                value: /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/,
                message: 'Please enter a valid phone number'
              }
            })} 
            className="form-input" 
            placeholder="+91 98765 43210" 
          />
          {errors.phone && <span className="text-xs text-ns-error mt-1 block">{errors.phone.message as string}</span>}
        </div>

        {/* Project Details Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="form-label">Project Type</label>
            <select 
              {...register('projectType', { required: true })} 
              className="form-input appearance-none bg-ns-black"
            >
              <option value="" disabled selected>Select project type...</option>
              {projectTypes.map(pt => (
                <option key={pt.value} value={pt.value}>{pt.label}</option>
              ))}
            </select>
            {errors.projectType && <span className="text-xs text-ns-error mt-1 block">Required</span>}
          </div>
          <div>
            <label className="form-label">Estimated Budget (INR)</label>
            <select 
              {...register('budget', { required: true })} 
              className="form-input appearance-none bg-ns-black"
            >
              <option value="" disabled selected>Select budget range...</option>
              {budgetOptions.map(b => (
                <option key={b.value} value={b.value}>{b.label}</option>
              ))}
            </select>
            {errors.budget && <span className="text-xs text-ns-error mt-1 block">Required</span>}
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
          {errors.requirements && <span className="text-xs text-ns-error mt-1 block">Please provide more details (min 20 chars).</span>}
        </div>

        {/* Submit */}
        <button 
          type="submit" 
          disabled={formState === 'submitting'}
          className="btn-primary w-full py-4 text-[13px] mt-2 tracking-widest"
        >
          {formState === 'submitting' ? 'Submitting Inquiry...' : 'Submit Project Inquiry'}
        </button>

        {/* Status Messages */}
        {formState === 'success' && (
          <div className="p-4 mt-4 bg-ns-emerald/10 border border-ns-emerald/30 rounded-lg flex items-center gap-3">
            <svg className="w-5 h-5 text-ns-emerald" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <p className="text-sm font-semibold text-ns-emerald">Inquiry submitted successfully. We'll be in touch within 24 hours.</p>
          </div>
        )}
        
        {formState === 'error' && (
          <div className="p-4 mt-4 bg-ns-error/10 border border-ns-error/30 rounded-lg flex items-center gap-3">
            <svg className="w-5 h-5 text-ns-error" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-sm font-semibold text-ns-error">Something went wrong. Please email us directly.</p>
          </div>
        )}
      </form>
    </motion.div>
  );
};

export default ContactForm;
