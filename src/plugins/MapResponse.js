import ResponseStruct from '@/structs/networks/response/ResponseStruct'
/**
 *
 * @param {Object} response Standard response:
 * { responseStatus: { responseCode: Number, responseMessage: Number }, data: any, detailErrors: [String] }
 */
const mapResponse = (response) => {
  const responseStruct = new ResponseStruct()
  const rawCode = response.responseStatus?.responseCode
  responseStruct.code = rawCode === 0 || rawCode === '00' ? 200 : rawCode
  responseStruct.message = response.responseStatus.responseMessage
  responseStruct.data = response.data
  responseStruct.subErrors = response.detailErrors
  responseStruct.pagination = response.pagination
  return responseStruct
}

const mapErrorResponse = (error) => {
  if (error.response?.data?.responseStatus) {
    return mapResponse(error.response.data)
  }

  const fallback = new ResponseStruct()
  fallback.code = error.response?.status || 500
  fallback.message = error.message || 'System Error Please Contact Administrator'
  fallback.data = null
  fallback.subErrors = null
  fallback.pagination = null
  return fallback
}

const MapResponse = { mapResponse, mapErrorResponse }

export default MapResponse
