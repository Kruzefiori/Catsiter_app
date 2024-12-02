export enum VisitStatus {
  PENDING = 'PENDING',
  DONE = 'DONE',
  CANCELLED = 'CANCELLED'
}

export interface Visits {
  id: string
  visitDate: Date
  status?: VisitStatus
  notes?: string
}
