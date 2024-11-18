export enum VisitStatus {
  PENDING = 'PENDING',
  DONE = 'DONE',
  CANCELLED = 'CANCELLED'
}

export interface Visits {
  visitDate: Date
  status?: VisitStatus
  notes?: string
}
