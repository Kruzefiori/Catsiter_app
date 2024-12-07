export enum VisitStatus {
  PENDING = 'PENDING',
  DONE = 'DONE',
  CANCELLED = 'CANCELLED'
}

export interface Visits {
  id: string
  visitDate: Date
  durationInMinutes: number
  status?: VisitStatus
  notes?: string
}
