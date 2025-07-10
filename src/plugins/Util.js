/**
 *
 * @author: @DyanGalih <dyan.galih@gmail.com>
 */

/**
 *
 * @returns {*}
 */
const uniqueDate = () => {
  let today = new Date()
  let dd = String(today.getDate()).padStart(2, '0')
  let mm = String(today.getMonth() + 1).padStart(2, '0') //January is 0!
  let yyyy = today.getFullYear()

  return yyyy + mm + dd
}

/**
 *
 * @param nominal
 * @returns {number}
 */
const moneyToInt = (nominal) => {
  return parseInt(String(nominal).replaceAll('.', '').replaceAll(',', ''))
}

const percentageToNumber = (value) => {
  return Number(String(value).replaceAll(',', '.'))
}

/**
 * Sort by default as asc
 * @param val
 * @param key
 * @param isAsc
 * @returns {*}
 */
const sortBy = (val, key, isAsc = true) => {
  return val.sort((a, b) => {
    if (typeof a[key] === 'number') {
      if (a[key] < b[key]) {
        if (isAsc) {
          return -1
        }
        return 1
      }
      if (a[key] > b[key]) {
        if (isAsc) {
          return 1
        }
        return -1
      }
      return 0
    } else {
      if (isAsc) {
        return a[key].localeCompare(b[key])
      }
      return b[key].localeCompare(a[key])
    }
  })
}

/**
 *
 * @returns {[{name: string, id: number},{name: string, id: number},{name: string, id: number},{name: string, id: number},{name: string, id: number}]}
 */
const dayActive = () => {
  return [
    {id: 2, name: 'weekdays_monday'},
    {id: 3, name: 'weekdays_tuesday'},
    {id: 4, name: 'weekdays_wednesday'},
    {id: 5, name: 'weekdays_thursday'},
    {id: 6, name: 'weekdays_friday'},
  ]
}

/**
 *
 * @returns {[{name: string, id: number},{name: string, id: number},{name: string, id: number},{name: string, id: number},{name: string, id: number}]}
 */
const weekActive = () => {
  return [
    {id: 1, name: 'dayrank_first'},
    {id: 2, name: 'dayrank_second'},
    {id: 3, name: 'dayrank_third'},
    {id: 4, name: 'dayrank_fourth'},
    {id: 5, name: 'dayrank_last'},
  ]
}

const convertToLocaleKey = (name) => {
  return name
    .toString()
    .trim()
    .replaceAll('-', '_')
    .replaceAll('.', '_')
    .replaceAll('/', '')
    .replaceAll(' ', '_')
    .replaceAll('__', '_')
    .toLowerCase()
}

/**
 *
 * @param mapMaster
 * @returns {{}}
 */
const swap = (mapMaster) => {
  let payloadStructMap = {}
  for (const payloadStructMapKey in mapMaster) {
    payloadStructMap[mapMaster[payloadStructMapKey]] = payloadStructMapKey
  }
  return payloadStructMap
}

/**
 *
 * @param date
 * @returns {string}
 */
const fixDate = (date) => {
  let currentDate = new Date(date)
  let dd = String(currentDate.getDate()).padStart(2, '0')
  let mm = String(currentDate.getMonth() + 1).padStart(2, '0') //January is 0!
  let yyyy = currentDate.getFullYear()
  return `${yyyy}-${mm}-${dd}`
}

/**
 *
 * @param meetData
 * @returns {Promise<{}>}
 */
const getCenterMeetingLocale = async (meetData) => {
  let meetDataArray = {}
  if (meetData.meetingFrequency === 2) {
    meetDataArray = {
      key: 'meeting_schedule_weekly',
      values: {
        freq: meetData.eachWeek,
        day: getDayName(meetData.eachDayAWeek.id),
      },
    }
  } else if (meetData.meetingFrequency === 3) {
    if (meetData.recurringMonthType === 1) {
      meetDataArray = {
        key: 'meeting_schedule_monthly_day',
        values: {
          day: meetData.eachDayMonth,
          freq: meetData.eachMonth,
        },
      }
    } else if (meetData.recurringMonthType === 2) {
      meetDataArray = {
        key: 'meeting_schedule_monthly_week',
        values: {
          week: meetData.eachWeekMonth.id,
          day: getDayName(meetData.eachDayAWeek.id),
          freq: meetData.eachMonth,
        },
      }
    }
  }
  return meetDataArray
}

/**
 *
 * @param meetData
 * @returns {Promise<{}>}
 */
const getMeetingLocale = async (meetData) => {
  let meetDataArray = {}
  if (meetData.meetingRecurrence === 'WEEKLY') {
    meetDataArray = {
      key: 'meeting_schedule_weekly',
      values: {
        freq: meetData.meetingFrequency,
        day: getDayName(meetData.meetingDay),
      },
    }
  } else if (meetData.meetingRecurrence === 'MONTHLY' && meetData.dayOfMonth) {
    meetDataArray = {
      key: 'meeting_schedule_monthly_day',
      values: {
        day: meetData.dayOfMonth,
        freq: meetData.meetingFrequency,
      },
    }
  } else if (meetData.meetingRecurrence === 'MONTHLY' && meetData.weekOfMonth) {
    meetDataArray = {
      key: 'meeting_schedule_monthly_week',
      values: {
        week: getWeekOfTheMonthName(meetData.weekOfMonth),
        day: getDayName(meetData.meetingDay),
        freq: meetData.meetingFrequency,
      },
    }
  }
  return meetDataArray
}

/**
 *
 * @param val
 * @returns {string}
 */
const getDayName = (val) => {
  let result = Util.dayActive().filter((x) => x.id === Number(val))
  return result[0].name
}

/**
 *
 * @param val
 * @returns {string}
 */
const getWeekOfTheMonthName = (val) => {
  const result = Util.weekActive().filter((x) => x.id === Number(val))
  return result[0].name
}

/**
 *
 * @param file as Blob
 */
const downloadFile = (file) => {
  const fileLink = document.createElement('a')
  fileLink.href = URL.createObjectURL(file.data)
  fileLink.download = file.name

  fileLink.click()
  URL.revokeObjectURL(fileLink.href)
}

/**
 * TODO - Will be developed for dynamic setting for dual control
 * @param route
 * @returns {any}
 */
const isDualControl = (route) => {
  return route.meta.isDualControl
}

const generateSortType = (payload) => {
  if (payload.length === 0) {
    return null
  } else {
    return payload[0] === true ? 'desc' : 'asc'
  }
}

const downloadFileBase64 = (fileName, base64) => {
  const fileLink = document.createElement('a')
  fileLink.href = base64
  fileLink.download = fileName
  fileLink.click()
}

const getFileTypeFromUrl = (url) => {
  if (url.includes('.pdf')) {
    return '.pdf'
  } else if (url.includes('.jpeg')) {
    return '.jpeg'
  } else if (url.includes('.png')) {
    return '.png'
  } else {
    return '.jpg'
  }
}

const getBase64FromFile = (fileType, base64) => {
  const base64String = base64.substr(base64.indexOf(',') + 1)
  switch (fileType) {
    case '.pdf':
      return `data:application/pdf;base64, ${base64String}`
    case '.jpeg':
      return `data:image/jpeg;base64, ${base64String}`
    case '.png':
      return `data:image/png;base64, ${base64String}`
    default:
      return `data:image/jpg;base64, ${base64String}`
  }
}

/**
 * Use cryptoGenerator for random id instead of Math.random
 * Risk CVE-2013-6386, CVE-2006-3419, CVE-2008-4102
 */
const cryptoGenerator = (digit = 17) => {
  const crypto = window.crypto || window.msCrypto
  const byteArray = new Uint32Array(4)
  const random = crypto.getRandomValues(byteArray).join('')
  if (random.length < digit) {
    cryptoGenerator(digit)
  }
  const result = random.substr(0, digit)
  return parseInt(result)
}

const Util = {
  uniqueDate,
  dayActive,
  weekActive,
  moneyToInt,
  sortBy,
  convertToLocaleKey,
  fixDate,
  swap,
  getMeetingLocale,
  getCenterMeetingLocale,
  getDayName,
  getWeekOfTheMonthName,
  downloadFile,
  isDualControl,
  percentageToNumber,
  generateSortType,
  downloadFileBase64,
  getFileTypeFromUrl,
  getBase64FromFile,
  cryptoGenerator,
}
export default Util
