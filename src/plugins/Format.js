// import Config from '@/config/Config'
// import Validation from '@/plugins/Validation'
// import Util from '@/plugins/Util'

import dayjs from 'dayjs'
import 'dayjs/locale/id'
import customParseFormat from 'dayjs/plugin/customParseFormat'

/**For local date */
dayjs.locale('id')
dayjs.extend(customParseFormat)

const money = (value) => {
  if (value >= 0) {
    return number(value)
  } else {
    return '-' + String(number(value)).replaceAll('-', '') + ''
  }
}

// const number = (value) => {
//   let num = Intl.NumberFormat(Config.app.money, {
//     maximumSignificantDigits: 21,
//   })
//   return num.format(value)
// }

// const dateLong = (date) => {
//   date = Util.fixDate(date)
//   if (date === 'NaN-NaN-NaN') {
//     return ''
//   } else if (Validation.isDate(date, false)) {
//     return dayjs(date).format(Config.app.dateLongFormat)
//   } else {
//     return ''
//   }
// }

// const dateLongWithTime = (date) => {
//   if (Validation.isDate(date, false)) {
//     return dayjs(date).format(`${Config.app.dateLongFormat} HH:mm:ss`)
//   }
//   return ''
// }

const percentage = (value, toString = false) => {
  const result =
    Number(value) % 1 === Number(0) ? Number(value).toFixed(1) : Number(value).toFixed(5)
  return toString === true ? result.toString() : result
}

const reportNameDateFormat = () => {
  return dayjs().format('DDMMYYYY-HHmmss')
}

const dateDefault = (date) => {
  if (!date.includes('/')) {
    return date
  }
  return dayjs(date, 'DD/MM/YYYY').format('YYYY-MM-DD')
}

const Format = {
  money,
  // number,
  // dateLong,
  // dateLongWithTime,
  percentage,
  reportNameDateFormat,
  dateDefault,
}

export default Format
