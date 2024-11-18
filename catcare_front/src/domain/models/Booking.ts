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
  startDate: string
  endDate: string
  generalNotes: string | null
  id: number
  totalVisits: number
  createdAt: Date
  updatedAt: Date
}
