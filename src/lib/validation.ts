import { z } from 'zod';

export interface ContactFormData {
  name: string;
  email: string;
  businessType: string;
  message: string;
  budgetRange?: string;
}

export const contactFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email format'),
  businessType: z.string().min(1, 'Business type is required'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
  budgetRange: z.string().optional(),
});

export type ContactFormSchema = z.infer<typeof contactFormSchema>;
