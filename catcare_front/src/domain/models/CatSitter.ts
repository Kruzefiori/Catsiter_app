import { CalendarEvent } from '@/components/CalendarPopup'
import { Booking } from './Booking'
import { Address } from './Address'

export interface CatSitter {
  id: number
  name: string
  jobDesc: string
  price: number
  overallRating: number
  address: Address
  bookings: Booking[]
  events?: CalendarEvent[]
}

export interface CatSitterResponse {
  address: Address
  email: string
  id: number
  jobDesc: string
  name: string
  overallRating: number
  price: number
  requestsReceived: Booking[]
}
