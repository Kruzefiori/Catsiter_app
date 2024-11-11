import { z } from 'zod'

export type ProfileSchema = z.infer<typeof profileSchema>

export const profileSchema = z.object({
  name: z.string(),
  jobDesc: z.enum(['owner', 'sitter']),
  userId: z.number().optional(),
  rating: z.number().optional(),
  price: z.number().optional()
})
