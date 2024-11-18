export enum VisitStatus {
  PENDING = 'PENDING',
  DONE = 'DONE',
  CANCELLED = 'CANCELLED'
}

export interface Visits {
  visitDate: string
  status?: VisitStatus
  notes?: string
}
