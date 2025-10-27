import { z } from 'zod';

export const createEntrySchema = z.object({
  title: z.string().min(1),
  type: z.enum(['MOVIE','TV_SHOW']),
  director: z.string().optional().nullable(),
  budget: z.string().optional().nullable(),
  location: z.string().optional().nullable(),
  duration: z.string().optional().nullable(),
  year: z.string().optional().nullable(),
  notes: z.string().optional().nullable(),
});

export const updateEntrySchema = createEntrySchema.partial();
