import { z } from 'zod'

export type RegisterSchema = z.infer<typeof registerSchema>

export const registerSchema = z
  .object({
    email: z.string().email({ message: 'Endereço de email inválido' }),
    name: z.string(),
    password: z
      .string()
      .min(8, { message: 'A senha deve ter pelo menos 8 caracteres.' }) // Limite mínimo de caracteres
      .regex(/[a-z]/, { message: 'A senha deve conter pelo menos uma letra minúscula.' }) // Letra minúscula
      .regex(/[A-Z]/, { message: 'A senha deve conter pelo menos uma letra maiúscula.' }) // Letra maiúscula
      .regex(/[0-9]/, { message: 'A senha deve conter pelo menos um número.' }) // Número
      .regex(/[^a-zA-Z0-9]/, { message: 'A senha deve conter pelo menos um caractere especial.' }), // Caractere especial
    confirm: z.string()
  })
  .refine(
    (values) => {
      return values.password === values.confirm
    },
    {
      message: 'As senhas não coincidem',
      path: ['confirm']
    }
  )
