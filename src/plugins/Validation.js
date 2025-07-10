/**
 * Due to keyboard event handling, we avoiding use key code from keypress event
 * because it is will deprecated
 * https://developer.mozilla.org/en-US/docs/Web/API/Document/keypress_event
 *
 * To solve those problem We are using
 * https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key
 */
// import _ from 'lodash'
// import moment from 'moment'
import Util from '@/plugins/Util'

const numberValue = '1234567890'
const alphaValue = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
const plusValue = '+'
const dotValue = '.'
const spaceValue = ' '
const symbolValue = ",-'"

const number = (event, oldValue = -1) => {
  const allowedChar = numberValue
  const key = event?.key
  const isKeyInAllowedChar = allowedChar.includes(key)
  if (!isKeyInAllowedChar) {
    event.preventDefault()
  } else if (String(oldValue) === '0' && key === '0') {
    event.preventDefault()
  } else {
    return true
  }
}

/**
 *
 * @param date
 * @param isFixed
 * @returns {boolean}
 */
// const isDate = (date, isFixed = true) => {
//   if (isFixed) {
//     date = Util.fixDate(date)
//   }
//   return moment(date).isValid()
// }

/**
 * Password Checker
 * @param password {String}
 */
const passwordChecker = (password) => {
  const lengthExp = new RegExp(/^.{6,}$/)
  const lowerCharExp = new RegExp(/(?=.*[a-z])/)
  const upperCharExp = new RegExp(/(?=.*[A-Z])/)
  const numberExp = new RegExp(/(?=.*[0-9])/)
  const symbolExp = new RegExp(/(?=.*[~`!@#$%^&*()--+={}[/\]|:;"'<>,.?/_₹])/)
  const isValidLength = lengthExp.test(password)
  const isLowerCase = lowerCharExp.test(password)
  const isUpperCase = upperCharExp.test(password)
  const isNumber = numberExp.test(password)
  const isSymbol = symbolExp.test(password)
  const weak = isValidLength && isNumber && isLowerCase
  const medium = weak && isUpperCase
  const strong = medium && isSymbol

  if (password.length < 1) {
    return ''
  } else if (strong) {
    return 'Strong'
  } else if (medium) {
    return 'Medium'
  } else if (weak) {
    return 'Weak'
  } else {
    return 'Very Weak'
  }
}

const isEmptyObject = (obj) => {
  return obj && Object.keys(obj).length === 0 && obj.constructor === Object
}

const percentage = (event, oldValue = -1) => {
  const max = 4
  const percentageRegex = new RegExp(/(?=.*[0123456789.,])/)
  const key = event?.key
  const strOldValue = String(oldValue)
  const selectionStart = event.target.selectionStart
  const validate = [
    !percentageRegex.test(key),
    key === '0' && strOldValue === '0',
    key === ',' && strOldValue.includes(','),
    key === '.' && strOldValue.includes(','),
    key === '0' && strOldValue.length > 0 && selectionStart === 0 && strOldValue[0] !== ',',
    key === '0' && strOldValue.indexOf(',') + 1 > selectionStart && strOldValue[0] === '0',
    strOldValue.indexOf('0,') === 0 && selectionStart === 1,
    strOldValue.includes(',') &&
      strOldValue.split(',').length > 1 &&
      strOldValue.split(',')[1].length > max,
  ]
  if (validate.filter((isInvalid) => isInvalid).length) {
    event.preventDefault()
  } else {
    return true
  }
}

/**
 * countDecimal
 * @param value
 * @returns {number}
 */
const countDecimal = (value) => {
  if (Math.floor(value) === value) return 0
  let str = value.toString()
  if (str.indexOf('.') !== -1 && str.indexOf('-') !== -1) {
    return str.split('-')[1] || 0
  } else if (str.indexOf('.') !== -1) {
    return str.split('.')[1].length || 0
  }
  return str.split('-')[1] || 0
}

/**
 *
 * @param event
 * @returns {boolean}
 */
const money = (event) => {
  // Add dot on latest char
  const allowedChar = `${numberValue}${dotValue}`
  return processText(allowedChar, event)
}

/**
 *
 * @param event
 * @returns {boolean}
 */
const alphabet = (event) => {
  // Add space on latest char
  const allowedChar = `${alphaValue}${spaceValue}`
  return processText(allowedChar, event)
}

/**
 *
 * @param event
 * @returns {boolean}
 */
const telephone = (event) => {
  //add plus (+) at latest telephone
  const allowedChar = `${numberValue}${plusValue}`
  return processText(allowedChar, event)
}

/**
 *
 * @param event
 * @returns {boolean}
 */
const namePerson = (event) => {
  const allowedChar = `${numberValue}${alphaValue}${spaceValue}`
  return processText(allowedChar, event)
}

/**
 *
 * @param event
 * @returns {boolean}
 */
const textDescription = (event) => {
  const allowedChar = `${numberValue}${alphaValue}${spaceValue}${dotValue}${symbolValue}`
  return processText(allowedChar, event)
}

/**
 *
 * @param allowedChar
 * @param event
 * @returns {boolean}
 */
const processText = (allowedChar, event) => {
  const key = event?.key
  const isKeyInAllowedChar = allowedChar.includes(key)
  if (!isKeyInAllowedChar) {
    event.preventDefault()
  } else {
    return true
  }
}

const Validation = {
  number,
  percentage,
  money,
  alphabet,
  telephone,
  isDate,
  passwordChecker,
  isEmptyObject,
  countDecimal,
  namePerson,
  textDescription,
}

export default Validation
