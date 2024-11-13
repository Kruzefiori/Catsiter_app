import { z } from 'zod'

export type CatSchema = z.infer<typeof catSchema>

export const catSchema = z.object({
  name: z.string(),
  gender: z.string(),
  ageYears: z.number(),
  ageMonths: z.number().max(12),
  owner: z.number().optional(),
  breed: z.string().optional(),
  weight: z.number(),
  castrated: z.boolean().optional(),
  conditions: z.array(z.string()),
  protectionScreen: z.boolean().optional(),
  streetAccess: z.boolean().optional(),
  additionalInfo: z.string().optional()
})
