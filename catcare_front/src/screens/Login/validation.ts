import { z } from 'zod'

export type LoginSchema = z.infer<typeof loginSchema>

export const loginSchema = z.object({
  email: z.string().email({ message: 'Endereço de email inválido' }),
  password: z
    .string()
    .min(8, { message: 'A senha deve ter pelo menos 8 caracteres.' }) // Limite mínimo de caracteres
    .regex(/[a-z]/, { message: 'A senha deve conter pelo menos uma letra minúscula.' }) // Letra minúscula
    .regex(/[A-Z]/, { message: 'A senha deve conter pelo menos uma letra maiúscula.' }) // Letra maiúscula
    .regex(/[0-9]/, { message: 'A senha deve conter pelo menos um número.' }) // Número
    .regex(/[^a-zA-Z0-9]/, { message: 'A senha deve conter pelo menos um caractere especial.' }) // Caractere especial
})
