import { Address } from './Address'

export interface User {
  id: number
  name: string
  email: string
  address?: Address
  isCatsitter?: boolean
  onBoardingDone?: boolean
}
