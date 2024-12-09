import { Address } from './Address'

export interface User {
  id: number
  name: string
  email: string
  address?: Address
  type: 'OWNER' | 'SITTER'
  onboardingDone?: boolean
}
