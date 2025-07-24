export const formatDate = (input) => {
  let date
  if (input instanceof Date) {
    date = input
  } else if (typeof input === 'string') {
    const sanitized = input.replace(/\.\d{3,}$/, '')
    date = new Date(sanitized)
  } else {
    return null
  }
  if (isNaN(date)) return null
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')

  return `${year}-${month}-${day}`
}

export const getCurrentDate = () => formatDate(new Date())

export const getOneWeekBeforeDate = () => {
  return subtractDateByDays(7)
}

export const subtractDateByDays = (days, startDate = new Date()) => {
  const date = new Date()
  date.setDate(startDate.getDate() - days)
  return formatDate(date)
}
