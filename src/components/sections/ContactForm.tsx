import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import Input from '../ui/Input';
import Select from '../ui/Select';
import Button from '../ui/Button';
import { contactFormSchema, type ContactFormSchema } from '../../lib/validation';

const budgetOptions = [
  { value: 'under-10k', label: 'Under ₹10,000' },
  { value: '10k-30k', label: '₹10,000 - ₹30,000' },
  { value: '30k-80k', label: '₹30,000 - ₹80,000' },
  { value: '80k-plus', label: '₹80,000+' },
  { value: 'custom', label: 'Custom Quote' },
];

type FormState = 'idle' | 'submitting' | 'success' | 'error';

const ContactForm = () => {
  const [formState, setFormState] = useState<FormState>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormSchema>({
    resolver: zodResolver(contactFormSchema),
  });

  const onSubmit = async (data: ContactFormSchema) => {
    setFormState('submitting');
    setErrorMessage('');

    try {
      // Mock API call - replace with actual submission logic
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      console.log('Form submitted:', data);
      
      setFormState('success');
      reset();
      
      // Reset success message after 5 seconds
      setTimeout(() => {
        setFormState('idle');
      }, 5000);
    } catch (error) {
      setFormState('error');
      setErrorMessage('Something went wrong. Please try again later.');
    }
  };

  return (
    <motion.form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-3xl mx-auto"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <div className="glass-premium rounded-lg p-8 md:p-10 elevated">
        <div className="space-y-6">
          {/* Name and Email Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              label="Name"
              type="text"
              placeholder="Your full name"
              required
              error={errors.name?.message}
              {...register('name')}
            />

            <Input
              label="Email"
              type="email"
              placeholder="your.email@example.com"
              required
              error={errors.email?.message}
              {...register('email')}
            />
          </div>

          {/* Business Type and Budget Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              label="Business Type"
              type="text"
              placeholder="E.g., E-commerce, SaaS, Agency"
              required
              error={errors.businessType?.message}
              {...register('businessType')}
            />

            <Select
              label="Budget Range (Optional)"
              options={budgetOptions}
              placeholder="Select your budget range"
              error={errors.budgetRange?.message}
              {...register('budgetRange')}
            />
          </div>

          {/* Message Field */}
          <Input
            label="Message"
            isTextarea
            placeholder="Tell us about your project and goals..."
            required
            error={errors.message?.message}
            {...register('message')}
          />

          {/* Submit Button */}
          <Button
            type="submit"
            variant="primary"
            size="lg"
            className="w-full"
            disabled={formState === 'submitting'}
          >
            {formState === 'submitting' ? (
              <span className="flex items-center justify-center">
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                Sending...
              </span>
            ) : (
              'Send Message'
            )}
          </Button>

          {/* Success Message */}
          {formState === 'success' && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="p-5 glass-premium rounded-lg border border-green-500/50"
            >
              <div className="flex items-center gap-3">
                <svg className="w-6 h-6 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <div>
                  <p className="text-green-500 font-medium">Message sent successfully!</p>
                  <p className="text-gray-400 text-sm mt-1">We'll get back to you within 24 hours.</p>
                </div>
              </div>
            </motion.div>
          )}

          {/* Error Message */}
          {formState === 'error' && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="p-5 glass-premium rounded-lg border border-red-500/50"
            >
              <div className="flex items-center gap-3">
                <svg className="w-6 h-6 text-red-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
                <p className="text-red-500">{errorMessage}</p>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </motion.form>
  );
};

export default ContactForm;
