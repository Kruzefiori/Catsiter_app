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
