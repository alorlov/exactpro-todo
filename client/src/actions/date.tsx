export function formatDuein(curDateFull: Date, dueinDateFull: Date): string {
  const curDate = new Date(curDateFull.setHours(0,0,0,0))
  const dueinDate = new Date(dueinDateFull.setHours(0,0,0,0))

  const curYear = curDate.getFullYear()
  const curMonth = curDate.getMonth()
  const curDay = curDate.getDay()
  const dueDays = (dueinDate.getTime() - curDate.getTime())  / (3600 * 24 * 1000)

  const months = [31,28,31,30,31,30,31,31,30,31,30,31]
  const isThisYearBig = (curYear - 2016) % 4 == 0
  const isNextYearBig = (curYear + 1 - 2016) % 4 == 0
  if (isThisYearBig) months[1]++

  // find key days for the first month and year
  const pivotMonth = (months[curMonth] - curDay) + Math.min(months[curMonth+1], curDay)
  const pivotYear = isNextYearBig || (isThisYearBig && curMonth == 1 && curDay < 29) ? 366 : 365

  if (dueDays > pivotYear) return Math.ceil(dueDays / 365) + " years"
  else if (dueDays > pivotMonth) return Math.floor(dueDays / 30) + " months"
  else if (dueDays > 0) return dueDays + " days"
  else if (dueDays === 0) return "today"
  else return "overdue"
}
