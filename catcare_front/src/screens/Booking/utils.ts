import { Visits } from '@/domain/models/Visits'

const sortVisits = (visits: Visits[]) => {
  return [...visits]
    .filter((visit) => visit.visitDate !== null)
    .sort((a, b) => new Date(a.visitDate).getTime() - new Date(b.visitDate).getTime())
}

const getFirstVisitDate = (visits: Visits[]) => {
  const sortedVisits = sortVisits(visits)
  return sortedVisits.length > 0 ? sortedVisits[0].visitDate : null
}

const getLastVisitDate = (visits: Visits[]) => {
  const sortedVisits = sortVisits(visits)
  return sortedVisits[sortedVisits.length - 1]?.visitDate || null
}

export { getLastVisitDate, getFirstVisitDate }
