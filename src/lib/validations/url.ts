import { z } from 'zod';

export const createUrlSchema = z.object({
  originalUrl: z.string()
    .url('Please enter a valid URL')
    .min(1, 'URL is required')
    .max(2048, 'URL is too long'),
  customCode: z.string()
    .optional()
    .refine((val) => !val || /^[a-zA-Z0-9-_]{3,20}$/.test(val), {
      message: 'Custom code must be 3-20 characters and contain only letters, numbers, hyphens, and underscores'
    }),
  title: z.string()
    .optional()
    .refine((val) => !val || val.length <= 100, {
      message: 'Title must be 100 characters or less'
    }),
  description: z.string()
    .optional()
    .refine((val) => !val || val.length <= 500, {
      message: 'Description must be 500 characters or less'
    }),
  expiresAt: z.string().optional(),
});

export type CreateUrlInput = z.infer<typeof createUrlSchema>;