import { CalendarEvent } from '@/components/CalendarPopup'
import { Booking } from './Booking'

export interface CatSitter {
  id: number
  name: string
  jobDesc: string
  price: number
  address: string
  bookings: Booking[]
  events?: CalendarEvent[]
}

export interface CatSitterResponse {
  address: string
  email: string
  id: number
  jobDesc: string
  name: string
  overallRating: number
  price: number
  requestsReceived: Booking[]
}
