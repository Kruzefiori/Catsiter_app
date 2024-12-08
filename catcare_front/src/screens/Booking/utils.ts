import { Visits } from '@/domain/models/Visits'

const sortVisits = (visits: Omit<Visits, 'id'>[]) => {
  return [...visits]
    .filter((visit) => visit.visitDate !== null)
    .sort((a, b) => new Date(a.visitDate).getTime() - new Date(b.visitDate).getTime())
}

const getFirstVisitDate = (visits: Omit<Visits, 'id'>[]) => {
  const sortedVisits = sortVisits(visits)
  return sortedVisits.length > 0 ? new Date(sortedVisits[0].visitDate) : null
}

const getLastVisitDate = (visits: Omit<Visits, 'id'>[]) => {
  const sortedVisits = sortVisits(visits)
  return new Date(sortedVisits[sortedVisits.length - 1]?.visitDate) || null
}

const addOneHour = (date: Date) => {
  return new Date(date.getTime() + 60 * 60 * 1000)
}

const getDifferenceInHours = (newerDate: Date, olderDate: Date) => {
  return Math.abs(newerDate.getTime() - olderDate.getTime()) / 36e5
}

export { getLastVisitDate, getFirstVisitDate, addOneHour, getDifferenceInHours }
