import { z } from 'zod';

export const travelerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().regex(/^[0-9]{10}$/, 'Please enter a valid 10-digit phone number'),
  age: z.number().min(1, 'Age must be at least 1').max(100, 'Age must be less than 100'),
  gender: z.enum(['male', 'female', 'other'], {
    message: 'Please select a gender',
  }),
});

export const emergencyContactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  phone: z.string().regex(/^[0-9]{10}$/, 'Please enter a valid 10-digit phone number'),
  relation: z.string().min(2, 'Relation must be specified'),
});

export const bookingSchema = z.object({
  travelers: z.array(travelerSchema).min(1, 'At least one traveler is required'),
  emergencyContact: emergencyContactSchema,
  specialRequests: z.string().optional(),
  termsAccepted: z.boolean().refine((val) => val === true, {
    message: 'You must accept the terms and conditions',
  }),
});

export const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  subject: z.string().min(5, 'Subject must be at least 5 characters'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

export type TravelerFormData = z.infer<typeof travelerSchema>;
export type EmergencyContactFormData = z.infer<typeof emergencyContactSchema>;
export type BookingFormData = z.infer<typeof bookingSchema>;
export type ContactFormData = z.infer<typeof contactSchema>;