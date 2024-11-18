export enum BookingStatus {
  PENDING = 'PENDING',
  ACCEPTED = 'ACCEPTED',
  REJECTED = 'REJECTED'
}
export interface Booking {
  status: BookingStatus
  requesterId: number
  requestedId: number
  startDate: string
  endDate: string
  generalNotes: string | null
  id: number
  totalVisits: number
  createdAt: Date
  updatedAt: Date
}
