export const ageByMonths = (months: number) => {
  return months < 12
    ? `${months} meses`
    : `${Math.floor(months / 12)} anos ${months % 12 === 0 ? '' : `e ${months % 12} meses`}`
}
