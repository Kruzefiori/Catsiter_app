export enum VisitStatus {
  PENDING = 'PENDING',
  DONE = 'DONE',
  CANCELLED = 'CANCELLED'
}

export interface Visits {
  id: number
  bookingId: number
  visitDate: Date
  durationInMinutes: number
  status?: VisitStatus
  visitNotes?: string
}
