import { Visits } from './Visits'

export enum BookingStatus {
  PENDING = 'PENDING',
  ACCEPTED = 'ACCEPTED',
  REJECTED = 'REJECTED',
  REQUESTED_UPDATE = 'REQUESTED_UPDATE'
}
export interface Booking {
  status: BookingStatus
  requesterId: number
  requestedId: number
  startDate: Date
  endDate: Date
  generalNotes: string | null
  id: number
  totalVisits: number
  createdAt: Date
  updatedAt: Date
  visits: Visits[]
}
