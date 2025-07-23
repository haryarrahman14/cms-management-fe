import ResponseStruct from '@/structs/networks/response/ResponseStruct'

/**
 *
 * @param message
 * @returns {ResponseStruct}
 */
const requiredFieldError = (message) => {
  const response = new ResponseStruct()
  response.code = 428
  response.message = message || 'Required Field'
  return response
}

/**
 *
 * @param data
 * @param message
 * @param totalData
 * @returns {ResponseStruct}
 */
const success = (data = [], message = 'Get Data Success', totalData = data.length) => {
  const response = new ResponseStruct()
  response.code = 200
  response.message = message
  response.data = data
  response.pagination = { totalData }
  return response
}

/**
 *
 * @param data
 * @param message
 * @returns {ResponseStruct}
 */
const storeSuccess = (data = [], message = 'Store Data Success') => {
  const response = new ResponseStruct()
  response.code = 200
  response.message = message || 'Store Data Success'
  response.data = data
  return response
}

/**
 *
 * @param message
 * @returns {ResponseStruct}
 */
const storeFailed = (message) => {
  const response = new ResponseStruct()
  response.code = 406
  response.message = message || 'Store Data Failed'
  return response
}

/**
 *
 * @param data
 * @param message
 * @returns {ResponseStruct}
 */
const dataNotFound = (data = {}, message = 'Data Not Found') => {
  const response = new ResponseStruct()
  response.code = 404
  response.message = message || 'Data Not Found'
  response.data = data
  return response
}

/**
 *
 * @param data
 * @param message
 * @returns {ResponseStruct}
 */
const redirect = (data = {}, message = 'Redirect') => {
  const response = new ResponseStruct()
  response.code = 403
  response.message = message || 'Redirect'
  response.data = data
  return response
}

const SmartResponse = {
  success,
  storeSuccess,
  storeFailed,
  requiredFieldError,
  dataNotFound,
  redirect,
}

export default SmartResponse
